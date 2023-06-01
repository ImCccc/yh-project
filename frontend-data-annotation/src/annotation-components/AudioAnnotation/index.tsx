// http://wavesurfer-js.org/docs/options.html
import DryTag from '@/components/DryTag';
import Loading from '@/components/Loading';
import { AnnotationLabelsProps, LabelsColorProps } from '@/hooks/useLabels';
import { remToNumber, splitJsx } from '@/utils/util';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Empty, Input, message, Modal } from 'antd';
import classNames from 'classnames';
import React, { createRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import Cursor from 'wavesurfer.js/src/plugin/cursor';
import Regions, { RegionParams } from 'wavesurfer.js/src/plugin/regions';
import { TimelinePluginParams } from 'wavesurfer.js/src/plugin/timeline';
import AnnotationParam from '../AnnotationParam';
import SelectLables, {
  LablesValuesProps,
  SelectLablesValuesProps,
} from '../SelectLables';
import './index.less';
import {
  checkInputTime,
  checkTabs,
  checkText,
  checkTime,
  ErrorInfoProps,
  getColor,
  getLabelListByObject,
  getLabels,
  getMenuWidth,
  getRegionsId,
  getRegionsList,
  getResult,
  getTabParams,
  getTimeslice,
  RegionsProps,
  ResultProps,
  SegmentParamsProps,
} from './tool';

export type PlayInfoProps = {
  name: string;
  serialNo: string;
  zoom: number;
  speed: number;
};

export type AudioDataProps =
  | {
      id: number; // 任务id
      name: string; // 样本名称
      serialNo: string; // 样本序号
      audioUrl: string; // 播放地址
      result?: string; // 标注结果
    }
  | null
  | undefined;

type IState = {
  duration: number; // 时长
  chooseId: string; // 当前选中的音频
  isPlaying: boolean; // 是否在播放中
  playInfo: PlayInfoProps; // 一些参数
  regionsList: RegionsProps[]; // 分段音频列表
  selectLabels: LablesValuesProps;
  labelsColor?: LabelsColorProps; // 标签颜色
  labelList?: AnnotationLabelsProps;
  invalid?: boolean; // 是否废弃
};

export type AudioAnnotationProps = {
  data: AudioDataProps; // 当前音频数据
  children?: React.ReactNode;
  noPass?: boolean; // 质检时, 是否不通过
  nextClick?: () => void; // 点击右箭头
  prevClick?: () => void; // 点击左箭头
  hideText?: boolean; // 是否显示音频内容
  disabled?: boolean; // 能否编辑, 验收时不能编辑
  canPause?: boolean; // 时间段能否暂停,再次播放定位到上次播放的位置
  operButtons?: React.ReactNode; // 操作按钮, 不同的角色有不一样的操作
  onChangeInvalid?: (invalid: boolean) => void; // 点击废弃回调
  showInvalid?: boolean; // 是否显示废弃按钮
};

const wave_backgroundColor = '#fff'; // 背景颜色
const wave_cursorColor = 'rgba(0, 0, 0, 0)'; // 时间指针的颜色
const wave_play_cursorColor = 'rgba(0, 0, 0, 1)'; // 播放时, 时间指针的颜色
const wave_waveColor = '#6BFF74'; // 未播放那些波形的颜色
const wave_progressColor = '#6BFF74'; // 已经播放那些波形的颜色
const range_choose_background = 'rgba(24, 144, 255, 1)'; // 默认时间段的背景颜色

const CursorConfig = {
  opacity: '1',
  showTime: true,
  customShowTimeStyle: {
    color: '#fff',
    padding: '4px',
    'font-size': '10px',
    'background-color': '#000',
  },
};

export const TimelineConfig: Omit<TimelinePluginParams, 'container'> = {
  primaryColor: '#666',
  secondaryColor: '#666',
  primaryFontColor: '#666',
  secondaryFontColor: '#666',
};

const getDefVal = () =>
  ({
    invalid: false,
    isPlaying: false,
    selectLabels: {},
    duration: 0, // 时长
    chooseId: '', // 当前选中的ID
    regionsList: [], // 区域列表
    playInfo: { name: '', serialNo: '', zoom: 1, speed: 1 },
  } as IState);

const errorDefVal: ErrorInfoProps = {
  end: '',
  start: '',
  text: '',
  tabs: '',
};

const waveboxMargin = 50;
const waveboxStyle = { padding: `0 ${waveboxMargin}px` };
const correctLeft = remToNumber(2.4) + waveboxMargin;

let menuWidth: number;
let _saveX: number | undefined;
let _thisEnd: number | undefined;
let _thisStart: number | undefined;

class App extends React.Component<AudioAnnotationProps, IState> {
  state = getDefVal();
  wavesurfer: WaveSurfer | null = null;
  domWave = createRef<HTMLDivElement>();
  domAddArea = createRef<HTMLDivElement>();
  domTimeline = createRef<HTMLDivElement>();

  // 初始化参数
  _originalParams = '';

  destroyWavesurfer = () => {
    const wavesurfer = this.wavesurfer;
    if (!wavesurfer) return;
    wavesurfer.unAll();
    wavesurfer.cancelAjax();
    wavesurfer.destroy();
    this.wavesurfer = null;
    this.setState(getDefVal());
  };

  regionCreated = () => {
    const wavesurfer = this.wavesurfer;
    if (!wavesurfer) return;
    const canEdit = !this.props.disabled;
    const regionsList = this.state.regionsList;
    regionsList.map((regions) => {
      wavesurfer.addRegion({
        id: regions.id,
        start: +regions.start,
        end: +regions.end,
        loop: false,
        drag: canEdit, // 能否拖动区域
        resize: canEdit, // 能否改变时间段
        color: getColor(),
        // 添加标识, 在 region-created 钩子函数, 不触发添加事件；因为多次触发 region-created，setState 会合并
        data: { isDone: true },
      });
    });
    wavesurfer.drawBuffer();
  };

  createWavesurfer = (url: string) => {
    const domWave = this.domWave.current;
    const domTimeline = this.domTimeline.current;
    if (!domWave || !domTimeline) return;

    const wavesurfer = WaveSurfer.create({
      // barWidth: 1,
      cursorWidth: 1,
      container: domWave,
      waveColor: wave_waveColor,
      cursorColor: wave_cursorColor,
      progressColor: wave_progressColor,
      backgroundColor: wave_backgroundColor,
      plugins: [
        Regions.create({}),
        Cursor.create(CursorConfig),
        // Timeline.create({ container: domTimeline, ...TimelineConfig }),
      ],
    });
    this.wavesurfer = wavesurfer;
    wavesurfer.load(url);

    // 准备好了, 获取时长, 重置缩放
    wavesurfer.on('ready', () => {
      const duration = +(wavesurfer.getDuration() || 0).toFixed(2);
      this.setState({ duration });
      menuWidth = getMenuWidth();
      this.regionCreated(); // 创建时段

      const canEdit = !this.props.disabled;
      // 默认选中第一个
      if (canEdit) {
        setTimeout(() => {
          const firstRegions = this.state.regionsList[0];
          if (firstRegions) this.chooseRegion(firstRegions.id);
        }, 60);
      }
    });

    // 播放时, 设置时间进度条
    wavesurfer.on('play', () => {
      wavesurfer.setCursorColor(wave_play_cursorColor);
    });

    // 结束播放, 取消时间进度条
    wavesurfer.on('pause', () => {
      // 播放结束, 重置播放状态
      const regionsList = this.state.regionsList;
      this.setState({
        isPlaying: false,
        regionsList: regionsList.map((v) => ({ ...v, isPlaying: false })),
      });
      wavesurfer.setCursorColor(wave_cursorColor);
    });

    // 创建时间段
    wavesurfer.on('region-created', (region: Required<RegionParams>) => {
      // 编辑模式才有删除按钮
      if (!this.props.disabled) {
        const img = document.createElement('img');
        img.className = 'delete-icon';
        img.src = '/delete.svg';
        img.setAttribute('data-id', region.id);
        const dom = document.querySelector(`[data-id="${region.id}"]`);
        dom?.appendChild(img);
      }

      // 初始化时段，regionsList 已经初始化好了， 无需添加
      if (region.data.isDone) return;

      const regionsList = [
        {
          id: region.id,
          end: region.end.toFixed(2),
          start: region.start.toFixed(2),
          isPlaying: false,
          text: '',
          errorInfo: {},
          tabs: [],
        },
        ...this.state.regionsList,
      ];
      this.setState({ regionsList });
    });

    // 修改时间段
    wavesurfer.on('region-update-end', (region: Required<RegionParams>) => {
      const regionsList = [...this.state.regionsList];
      const updateItem = regionsList.find((item) => item.id === region.id);
      if (!updateItem) return;
      updateItem.start = region.start.toFixed(2);
      updateItem.end = region.end.toFixed(2);
      updateItem.errorInfo.end = '';
      updateItem.errorInfo.start = '';
      this.setState({ regionsList });
      // 拖拽过程中, 会取消选中, 需要重新选中
      const chooseId = this.state.chooseId;
      if (!chooseId) return;
      const cohhseRegion = wavesurfer.regions.list[chooseId];
      if (!cohhseRegion) return;
      cohhseRegion.element.style.border = `1px solid ${range_choose_background}`;
    });
  };

  // 根据区间 Id 删除区间
  deleteRegionById = (id: string) => {
    const wavesurfer = this.wavesurfer;
    if (!wavesurfer) return;

    wavesurfer.regions.list[id].remove();
    const { chooseId, regionsList } = this.state;
    this.setState({
      chooseId: chooseId === id ? '' : chooseId,
      regionsList: regionsList?.filter((v) => v.id !== id),
    });
  };

  // 播放区间音频
  playById = (item: RegionsProps) => {
    const id = item.id;

    const wavesurfer = this.wavesurfer;
    if (!wavesurfer) return;
    wavesurfer.regions.list[id].play();

    const regionsList = this.state.regionsList.map((v) => ({
      ...v,
      isPlaying: item.id === v.id,
    }));
    this.setState({ regionsList });
  };

  // 播放或者暂停
  playPause = (item?: RegionsProps) => {
    const wavesurfer = this.wavesurfer;
    if (!wavesurfer) return;

    if (!item) {
      // 全局播放按钮点击
      const { isPlaying, duration } = this.state;
      if (!duration) return;
      wavesurfer.playPause();
      this.setState({ isPlaying: !isPlaying });
      return;
    }

    const id = item.id;
    const { end, start } = wavesurfer.regions.list[id];
    const currentTime = wavesurfer.getCurrentTime();

    // 当前播放进度, 如果不在时间段范围内, 那么默认重新播放
    if (currentTime > end || currentTime < start) {
      wavesurfer.play(start, end);
      const regionsList = this.state.regionsList.map((v) => ({
        ...v,
        isPlaying: item.id === v.id,
      }));
      return this.setState({ regionsList });
    }

    // 当前播放进度, 如果在某个时间段内, 那边可以切换播放状态
    const isPlaying = wavesurfer.isPlaying();
    isPlaying ? wavesurfer.pause() : wavesurfer.play(currentTime, end);
    item.isPlaying = !isPlaying;
    this.setState({ regionsList: [...this.state.regionsList] });
  };

  // 选中区域
  chooseRegion = (id: string) => {
    const wavesurfer = this.wavesurfer;
    if (!wavesurfer) return;

    const chooseId = this.state.chooseId;
    const thisRegion = wavesurfer.regions.list[id];
    // 选中, 需要添加选中的背景颜色
    if (thisRegion) {
      const element = thisRegion.element;
      element.style.border = `1px solid ${range_choose_background}`;
    }

    if (chooseId === id) return;

    // 取消上一个选中
    if (chooseId) {
      const prevRegion = wavesurfer.regions.list[chooseId];
      prevRegion.element.style.border = 'none';
    }

    this.setState({ chooseId: id });
  };

  // 点击音频区域
  waveClick = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const wavesurfer = this.wavesurfer;
    if (!wavesurfer) return;
    if (_thisStart) return;

    wavesurfer.stop();
    const target = ev.target as HTMLDivElement;
    const className = target.className;
    if (className.includes('delete-icon')) {
      const id = target.getAttribute('data-id') || '';
      this.deleteRegionById(id);
    } else if (className.includes('wavesurfer-region')) {
      const id = target.getAttribute('data-id') || '';
      this.chooseRegion(id);
    } else {
      wavesurfer.setCursorColor(wave_cursorColor);
    }
  };

  // 双击音频区域
  waveDblClick = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const areaDom = this.domAddArea.current;
    if (!areaDom) return;
    const wavesurfer = this.wavesurfer;
    if (!wavesurfer) return;

    if (_thisStart === undefined) {
      // 第一次双击, 记录相关信息
      const target = ev.target as any;
      _saveX = ev.clientX;

      _thisStart = getTimeslice();
      // 很难选中开始或者结束时间, 需要给大一点区域选中
      if (target.className === 'correct-right') {
        _thisStart = this.state.duration;
      }
      if (target.className === 'correct-left') {
        _thisStart = 0;
      }
      areaDom.style.width = '1px';
      areaDom.style.left = `${_saveX - menuWidth - correctLeft}px`;
      return;
    }

    // 2次双击创建时段
    _thisEnd = getTimeslice();
    if (!_thisEnd || _thisEnd === _thisStart) return;
    const canEdit = !this.props.disabled;
    const id = getRegionsId();
    wavesurfer.addRegion({
      id,
      loop: false,
      drag: canEdit, // 能否拖动区域
      resize: canEdit, // 能否改变时间段
      color: getColor(),
      end: Math.max(_thisEnd, _thisStart),
      start: Math.min(_thisEnd, _thisStart),
    });
    this.chooseRegion(id);
    _saveX = undefined;
    _thisEnd = undefined;
    _thisStart = undefined;
    areaDom.style.width = '0';
    areaDom.style.left = `0`;
  };

  // 鼠标在音频区域移动
  waveMouseMove = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!_saveX || _thisStart === undefined) return;
    const areaDom = this.domAddArea.current;
    if (!areaDom) return;
    const offsetX = ev.clientX - _saveX;
    areaDom.style.left =
      offsetX > 0
        ? `${_saveX - menuWidth - correctLeft}px`
        : `${ev.clientX - menuWidth - correctLeft}px`;
    areaDom.style.width = `${Math.abs(offsetX)}px`;
  };

  // 修改开始时间
  startTimeChange = (
    ev: React.ChangeEvent<HTMLInputElement>,
    item: RegionsProps,
  ) => {
    const wavesurfer = this.wavesurfer;
    if (!wavesurfer) return;
    const value = ev.target.value;
    const duration = this.state.duration;

    // 输入开始时间,需要校验输入格式
    item.errorInfo.start = checkInputTime(value, item.end, duration);

    if (+value >= 0) {
      const thisRegion = wavesurfer.regions.list[item.id];
      const { start, end } = thisRegion;
      // 偏移量
      const updateTime = +value - start;
      // 不能超过结束时间
      if (updateTime + start < end) {
        thisRegion.onResize(updateTime, 'start');
        const element = thisRegion.element;
        element.style.border = `1px solid ${range_choose_background}`;
      }
    }

    item.start = value;
    this.setState({ regionsList: [...this.state.regionsList] });
  };

  // 修改结束时间
  endTimeChange = (
    ev: React.ChangeEvent<HTMLInputElement>,
    item: RegionsProps,
  ) => {
    const wavesurfer = this.wavesurfer;
    if (!wavesurfer) return;

    const value = ev.target.value;
    const duration = this.state.duration;

    // 输入结束时间,需要校验输入格式
    item.errorInfo.end = checkInputTime(item.start, value, duration, 'end');

    if (+value >= 0) {
      const thisRegion = wavesurfer.regions.list[item.id];
      const { start, end } = thisRegion;
      // 偏移量
      const updateTime = +value - end;

      // 不能超过结束
      if (updateTime + end > duration) {
        thisRegion.onResize(duration - end, 'end');
      }

      // 不能低于开始时间
      if (updateTime + end > start) {
        thisRegion.onResize(updateTime, 'end');
      }

      const element = thisRegion.element;
      element.style.border = `1px solid ${range_choose_background}`;
    }

    item.end = value;
    this.setState({ regionsList: [...this.state.regionsList] });
  };

  // 音速修改
  speedChange = (value: number) => {
    const wavesurfer = this.wavesurfer;
    if (!wavesurfer) return;
    wavesurfer.setPlaybackRate(value);
  };

  // 缩放修改
  zoomChange = (value: number) => {
    const wavesurfer = this.wavesurfer;
    if (!wavesurfer) return;
    wavesurfer.zoom(value);
    this.setState({ playInfo: { ...this.state.playInfo, zoom: value } });
  };

  // 判断是否为空
  isNull = () => {
    if (this.state.invalid) return false;
    return !this.state.regionsList.length;
  };

  // 判断组件有没有修改过
  isUpdate = () => {
    const params = this.getParams();
    return this._originalParams !== JSON.stringify(params);
  };

  // 数据格式校验, false 代表校验通过，反之
  checkParams = () => {
    const invalid = this.state.invalid;
    // 废弃的任务直接校验通过
    if (invalid) return false;

    const regionsList = [...this.state.regionsList];
    const regionsLen = regionsList.length;
    if (!regionsLen) {
      message.error('请添加时间段!');
      return true;
    }

    const { duration, labelList } = this.state;
    const { hideText } = this.props;

    let scrollId = '';
    let tabErrors: any;

    regionsList.forEach((regions, index) => {
      const { start, end, text, tabs, errorInfo, id } = regions;

      // 初始化校验结果
      Object.assign(errorInfo, errorDefVal);

      errorInfo.start = checkTime(start, duration);
      if (errorInfo.start) scrollId = scrollId || `start-${id}`;

      errorInfo.end = checkTime(end, duration, 'end');
      if (errorInfo.end) scrollId = scrollId || `end-${id}`;

      // 时间必填和格式都校验通过, 校验开始时间
      if (!errorInfo.end && !errorInfo.start) {
        if (+start >= +end) {
          scrollId = scrollId || `start-${id}`;
          errorInfo.start = '开始时间不能大于结束时间';
        }
      }

      errorInfo.text = checkText(hideText, text);
      if (errorInfo.text) scrollId = scrollId || `text-${id}`;

      if (!tabs || !tabs.length) errorInfo.tabs = '音频标签不能为空';
      if (errorInfo.tabs) scrollId = scrollId || `tabs-${id}`;

      // 前面的都校验通过, 需要检验标签
      if (!scrollId && labelList) {
        tabErrors = tabErrors || checkTabs(tabs, labelList, regionsLen - index);
        if (tabErrors) scrollId = scrollId || `tabs-${id}`;
      }
    });

    if (scrollId) {
      document.getElementById(scrollId)?.scrollIntoView();
      if (scrollId.startsWith('tabs-') && tabErrors) {
        // 标签检验不通过, 弹窗提示
        Modal.confirm({
          width: '60rem',
          content: <div>{splitJsx(<br />, ...tabErrors)}</div>,
          closable: true,
          title: '提示',
          okText: '确定',
          okCancel: false,
        });
      }
    }

    this.setState({ regionsList });
    return !!scrollId;
  };

  // 获取请求参数
  getParams = () => {
    const { invalid, playInfo } = this.state;
    if (invalid) {
      return { invalid, key: playInfo.name, segment: [] };
    }
    if (this.isNull()) return '';
    const regionsList = [...this.state.regionsList];
    const { hideText } = this.props;
    const segment = regionsList.map((regions) => {
      const params: SegmentParamsProps = {
        time_end: +regions.end,
        time_start: +regions.start,
        ...getTabParams(regions.tabs),
      };
      if (!hideText) params.text = regions.text || '';
      return params;
    }) as SegmentParamsProps[];
    return {
      invalid,
      key: playInfo.name,
      segment: segment,
    } as ResultProps;
  };

  chooseLabels = (labels: SelectLablesValuesProps) => {
    const { chooseId, regionsList, labelsColor } = this.state;
    if (!labelsColor) return;

    if (!chooseId) {
      message.error('请先选择时间段!');
      return;
    }
    const item = regionsList.find((region) => region.id === chooseId);
    if (item) {
      item.tabs = getLabelListByObject(labels, labelsColor);
      item.errorInfo.tabs = item.tabs.length ? '' : '音频标签不能为空';
    }
    this.setState({ selectLabels: labels, regionsList: [...regionsList] });
  };

  initData = (audioData?: AudioDataProps) => {
    this.destroyWavesurfer();

    const labelsColor = this.state.labelsColor;
    if (!audioData?.id || !labelsColor) return;

    this.createWavesurfer(audioData.audioUrl);
    const defVal = getDefVal();
    const { segment, invalid } = getResult(audioData.result);
    const regionsList = getRegionsList(segment, labelsColor);
    this._originalParams = audioData.result || JSON.stringify('');
    this.setState({
      ...defVal,
      invalid,
      regionsList,
      playInfo: {
        ...defVal.playInfo,
        name: audioData.name,
        serialNo: audioData.serialNo,
      },
    });
  };

  componentDidMount() {
    getLabels().then(({ labelList, labelsColor }) =>
      this.setState({ labelList, labelsColor }, () => {
        if (this.props.data) this.initData(this.props.data);
      }),
    );
  }

  componentDidUpdate(prevProps: AudioAnnotationProps, prevState: IState) {
    // 切换音频
    const prevData = prevProps.data;
    const thisData = this.props.data;
    if (!thisData) return;

    // 首次加载
    if (!prevData) {
      if (this.state.labelList) this.initData(thisData);
      return;
    }

    // 切换音频
    const prevId = prevData?.id;
    const thisId = thisData?.id;
    if (thisId && prevId && thisId !== prevId) {
      this.initData(thisData);
    }

    // 改变选中时间段, 需要修改标签
    const prevChooseId = prevState.chooseId;
    const thisChooseId = this.state.chooseId;
    if (thisChooseId !== prevChooseId) {
      const item = this.state.regionsList.find((v) => v.id === thisChooseId);
      this.setState({ selectLabels: getTabParams(item?.tabs) });
    }
  }

  componentWillUnmount() {
    this.destroyWavesurfer();
  }

  render() {
    const {
      state,
      domWave,
      domAddArea,
      domTimeline,
      playById,
      playPause,
      waveClick,
      chooseLabels,
      waveDblClick,
      chooseRegion,
      endTimeChange,
      waveMouseMove,
      startTimeChange,
      deleteRegionById,
    } = this;

    const {
      invalid,
      duration,
      chooseId,
      regionsList,
      selectLabels,
      isPlaying,
      labelList,
      playInfo,
    } = state;

    const {
      data,
      noPass,
      canPause,
      children,
      disabled,
      hideText,
      operButtons,
      showInvalid,
      nextClick,
      prevClick,
      onChangeInvalid,
    } = this.props;

    const canEdit = !disabled;
    const regionsLen = regionsList.length;

    let reactNode: React.ReactNode;
    if (data === undefined || labelList === undefined) {
      reactNode = (
        <div className="audio-segmentation loading">
          <Loading />
        </div>
      );
    }

    if (data === null) {
      reactNode = (
        <div className="audio-segmentation empty">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      );
    }

    const letf = (
      <>
        {noPass && <span className="iconfont icon-butongguo"></span>}
        {invalid && <span className="iconfont icon-feiqi"></span>}
      </>
    );

    const right = (
      <div>
        {showInvalid !== false && (
          <Button
            className="btn-mr"
            onClick={() => {
              this.setState({ invalid: !invalid });
              onChangeInvalid && onChangeInvalid(!invalid);
            }}
          >
            {invalid ? '取消废弃' : '废弃'}
          </Button>
        )}
        <Button type="primary" className="btn-mr" onClick={() => playPause()}>
          {isPlaying ? '暂停' : '播放'}
        </Button>
        {operButtons}
      </div>
    );

    if (data) {
      reactNode = (
        <div className="audio-segmentation">
          <AnnotationParam
            left={letf}
            right={right}
            playInfo={playInfo}
            zoomChange={this.zoomChange}
            speedChange={this.speedChange}
          />
          <div style={waveboxStyle} className="wavebox">
            <div
              className="wave"
              ref={domWave}
              onClick={canEdit ? waveClick : undefined}
              onMouseMove={canEdit ? waveMouseMove : undefined}
              onDoubleClick={canEdit ? waveDblClick : undefined}
            >
              {!duration && <Loading />}
              <div ref={domAddArea} className="add-area sk0"></div>
              <div className="correct-left"></div>
              <div className="correct-right"></div>
            </div>
            <div ref={domTimeline} className="time-line sk0"></div>
            <LeftOutlined
              onClick={prevClick}
              className={classNames({
                'dry-arrow': true,
                prev: true,
                hide: !prevClick || !data,
              })}
            />
            <RightOutlined
              onClick={nextClick}
              className={classNames({
                'dry-arrow': true,
                next: true,
                hide: !nextClick || !data,
              })}
            />
          </div>
          {regionsList.map((item, index) => {
            const errMsg = item.errorInfo;
            const buttons = (
              <>
                <Button
                  className={classNames({ hide: !canEdit })}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteRegionById(item.id);
                  }}
                >
                  删除
                </Button>
                <Button
                  type="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    chooseRegion(item.id);
                    playById(item);
                  }}
                >
                  播放
                </Button>
                <Button
                  type="primary"
                  className={classNames({ hide: !canPause })}
                  onClick={(e) => {
                    e.stopPropagation();
                    chooseRegion(item.id);
                    playPause(item);
                  }}
                >
                  {item.isPlaying ? '暂停' : '播放'}
                </Button>
              </>
            );
            return (
              <div
                key={item.id}
                onClick={() => canEdit && chooseRegion(item.id)}
                className={classNames({
                  fragment: true,
                  choose: item.id === chooseId,
                })}
              >
                <div className="base-head border">
                  <span className="base-font-title subtitle">
                    时间分段{regionsLen - index}
                  </span>
                  <div className="btnBox">{buttons}</div>
                </div>
                <div className="form">
                  <div className="between field">
                    <div className="relative">
                      <span id={`start-${item.id}`} className="label require">
                        开始时间:
                      </span>
                      <Input
                        value={item.start}
                        readOnly={disabled}
                        placeholder="请输入开始时间"
                        onChange={(e) => startTimeChange(e, item)}
                        className={classNames('startInput', {
                          'err-border': errMsg.start,
                        })}
                      ></Input>
                      <span className="err-info">{errMsg.start}</span>
                    </div>
                    <div className="relative">
                      <span id={`end-${item.id}`} className="label require">
                        结束时间:
                      </span>
                      <Input
                        value={item.end}
                        readOnly={disabled}
                        placeholder="请输入结束时间"
                        onChange={(e) => endTimeChange(e, item)}
                        className={classNames({ 'err-border': errMsg.end })}
                      ></Input>
                      <span className="err-info">{errMsg.end}</span>
                    </div>
                  </div>
                  <div className={classNames('fieldArea', { hide: hideText })}>
                    <span id={`text-${item.id}`} className="label require">
                      音频内容:
                    </span>
                    <Input.TextArea
                      readOnly={disabled}
                      value={item.text}
                      placeholder="请输入音频内容"
                      className={classNames({ 'err-border': errMsg.text })}
                      onChange={(e) => {
                        item.text = e.target.value;
                        item.errorInfo.text = checkText(false, item.text);
                        this.setState({ regionsList: [...regionsList] });
                      }}
                    ></Input.TextArea>
                    <span className="err-info">{errMsg.text}</span>
                  </div>
                  <div className="field tabs">
                    <span id={`tabs-${item.id}`} className="label require">
                      音频标签:
                    </span>
                    <div
                      className={classNames({
                        tabsList: true,
                        empty: !item.tabs?.length,
                        'err-border': errMsg.tabs,
                      })}
                    >
                      {item.tabs?.map((tab, index) => (
                        <DryTag
                          closable={canEdit}
                          color={tab.color}
                          key={`${tab.parentLabel}-${tab.label}`}
                          onClose={() => {
                            item.tabs.splice(index, 1);
                            if (!item.tabs.length) {
                              item.errorInfo.tabs = '音频标签不能为空';
                            }
                            this.setState({ regionsList: [...regionsList] });
                            if (item.id === chooseId) {
                              this.setState({
                                selectLabels: getTabParams(item.tabs),
                              });
                            } else {
                              chooseRegion(item.id);
                            }
                          }}
                        >
                          {tab.label}
                        </DryTag>
                      ))}

                      {!item.tabs?.length && (
                        <span className="tip">
                          请从右侧标签集内选择对应标签
                        </span>
                      )}
                    </div>
                    <span className="err-info">{errMsg.tabs}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <>
        <div className="page-padding-tb flex">
          {reactNode}
          {!disabled && (
            <SelectLables
              labels={labelList}
              value={selectLabels}
              onChange={chooseLabels}
            />
          )}
        </div>
        {data && children}
      </>
    );
  }
}

export default App;
