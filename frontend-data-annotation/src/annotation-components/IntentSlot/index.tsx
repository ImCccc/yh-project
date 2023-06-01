import { getLabelListByObject } from '@/annotation-components/AudioAnnotation/tool';
import DryTag from '@/components/DryTag';
import Loading from '@/components/Loading';
import useLabels from '@/hooks/useLabels';
import { INTENT_VALUE, SLOT_VALUE } from '@/utils/globalData';
import { remToNumber, splitJsx } from '@/utils/util';
import { useDebounceFn } from 'ahooks';
import { message } from 'antd';
import classNames from 'classnames';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import AnnotationLayout from '../AnnotationLayout';
import SelectLables, {
  LablesValuesProps,
  SelectLablesValuesProps,
} from '../SelectLables';
import Dropdown from './Dropdown';
import styles from './index.module.less';

type EntitiesProps = {
  id: string;
  color?: string;
  value: string;
  label: string;
  start: number;
  end: number;
};

type RsProps = {
  text: string;
  labels?: string[];
  invalid?: boolean;
  entities?: EntitiesProps[];
};

type ContentProps = EntitiesProps & {
  type: 'span' | 'tag';
};

type CompProps = {
  data: any;
  ref?: any;
  noPass?: boolean;
  disabled?: boolean;
  operButtons?: React.ReactNode;
  nextClick?: () => void;
  prevClick?: () => void;
  showInvalid?: boolean; // 是否显示废弃按钮
};

const getId = () => `${Math.random()}`;

const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

const getContentList = (entities: EntitiesProps[], text: string) => {
  if (!entities || !entities.length) {
    return getSpan(text, 0, text.length - 1);
  }
  let list: ContentProps[] = [];
  let pointer = 0;
  const len = entities.length;
  entities.forEach((item, index) => {
    const { end, start } = item;
    if (start > pointer) {
      list = [...list, ...getSpan(text, pointer, start - 1)];
    }
    list.push({ ...item, type: 'tag' });
    pointer = end + 1;
    if (index === len - 1 && pointer < text.length) {
      list = [...list, ...getSpan(text, pointer, text.length - 1)];
    }
  });
  return list;
};

const getSpan = (text: string, start: number, end: number) => {
  const list: ContentProps[] = [];
  for (let i = start; i < end + 1; i++) {
    const value = text[i];
    list.push({
      value,
      end: i,
      start: i,
      label: '',
      type: 'span',
      id: getId(),
    });
  }
  return list;
};

const Tip: React.FC<{ title: string }> = ({ title }) => (
  <span className={styles.tip}>{title}</span>
);

const Comp: React.FC<CompProps> = React.forwardRef(
  (
    { disabled, operButtons, showInvalid, nextClick, prevClick, data, noPass },
    ref,
  ) => {
    const { labels, labelsColor } = useLabels();
    const [selectLabels, setSelectLabels] = useState<LablesValuesProps>({});
    const chooseLabels = useCallback((values: SelectLablesValuesProps) => {
      setSelectLabels(values);
    }, []);

    const _originalParams = useRef('');
    const [invalid, setInvalid] = useState(false);

    // 当前选中的槽位标签: 单击已标注的文字，重新选择槽位标签；双击已标注的文字，则这些文字取消标注。
    const [selectTag, setSelectTag] = useState<ContentProps>();

    // 选择的意图标签列表
    const intentValues = useMemo(() => {
      return getLabelListByObject(selectLabels, labelsColor);
    }, [labelsColor, selectLabels]);

    // 槽位标签
    const slotLabels = useMemo(() => {
      return labels?.filter((label) => +label.type === SLOT_VALUE) || [];
    }, [labels]);

    // 意图标签
    const intentLabels = useMemo(() => {
      return labels?.filter((label) => +label.type === INTENT_VALUE) || [];
    }, [labels]);

    // 槽位标签颜色
    const slotColors = useMemo<{ [key: string]: string }>(() => {
      const lables = slotLabels.length && slotLabels[0].lables;
      if (!lables) return {};
      return lables.reduce((data, cur) => {
        data[cur.name] = cur.color;
        return data;
      }, {});
    }, [slotLabels]);

    const [contentList, setContentList] = useState<ContentProps[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropStyle, setStyle] = useState({ top: '0px', left: '0px' });

    // 选择的槽位标签坐标信息
    const [entities, setEntities] = useState<EntitiesProps[]>([]);
    // contentList 需要排序后的 entities
    const sortEntities = useMemo(() => {
      return [...entities].sort((a, b) => a.start - b.start);
    }, [entities]);
    // 显示界面的槽位标注结果, 需要去重
    const distinctEntities = useMemo(() => {
      const list: EntitiesProps[] = [];
      const obj: Record<string, boolean> = {};
      entities.forEach((item) => {
        if (!obj[item.label]) list.push(item);
        obj[item.label] = true;
      });
      return list;
    }, [entities]);
    // 原始文本
    const [originalText, setOriginalText] = useState('');
    // 选中文本的开始下标位置
    const [selectStartIndex, setStartIndex] = useState(-1);
    // 选中文本的结束下标位置
    const [selectEndIndex, setEndIndex] = useState(-1);
    // 是否按下鼠标
    const isDown = useRef(false);
    // 判断是否双击标签
    const isDoubleClick = useRef(false);

    const _initData = useCallback(() => {
      isDown.current = false;
      setStartIndex(-1);
      setSelectTag(undefined);
      setEndIndex(-1);
      setShowDropdown(false);
    }, []);

    const _setStyle = (target: any) => {
      try {
        const { top, left } = target.getBoundingClientRect();
        setStyle({ top: `${top + remToNumber(5)}px`, left: `${left}px` });
      } catch (error) {
        console.error(error);
      }
    };

    // 判断是否选中， 添加背景颜色
    const _isSelect = (index: number) => {
      if (selectStartIndex === -1 || selectEndIndex === -1) return false;
      return index >= selectStartIndex && selectEndIndex >= index;
    };

    // 鼠标放下回调， 显示槽位标签下拉列表
    const onMouseUp = () => {
      if (disabled || !isDown.current) return;
      if (selectEndIndex === -1 || selectStartIndex === -1) return;
      setShowDropdown(true);
      setSelectTag(undefined); // 清空选择的标签
      isDown.current = false;
    };

    // 鼠标按下， 记录一些信息
    const onMouseDown = (e: any) => {
      if (disabled) return;
      const target = e.target;

      if (!target.className.includes(styles.span)) {
        return _initData();
      }

      const index = +target.getAttribute('data-index');
      setShowDropdown(false);
      isDown.current = true;
      setStartIndex(index);
      setEndIndex(index);
      _setStyle(target);
    };

    // 鼠标进入元素
    const onMouseEnter = (e: any) => {
      if (disabled) return;
      if (!isDown.current || selectStartIndex === -1) return;
      // 获取当前元素的下标
      const index = +e.target.getAttribute('data-index');
      // 不能往后选择， 只能往前选择
      if (selectStartIndex > index) return _initData();
      // 如果中间隔着标记好的元素，不能隔空选择
      for (let i = selectStartIndex; i < index + 1; i++) {
        const element = contentList[i];
        if (element.type === 'tag') return setEndIndex(i - 1);
      }
      setEndIndex(index);
    };

    // 选中槽位标签回调
    const onChange = (value: ANNOTATION.dataAnnotationLabel) => {
      if (selectTag) {
        // 重新选择槽位标签
        const item = entities.find((v) => v.id === selectTag.id);
        if (item) {
          item.color = slotColors[value.name];
          item.label = value.name;
        }
        setEntities([...entities]);
        return _initData();
      }

      if (selectEndIndex === -1 || selectStartIndex === -1) {
        return _initData();
      }

      let selection = '';
      for (let i = selectStartIndex; i < selectEndIndex + 1; i++) {
        const item = contentList[i];
        selection += item.value;
      }

      const start = contentList[selectStartIndex].start;
      const addItem = {
        start,
        id: getId(),
        value: selection,
        label: value.name,
        color: slotColors[value.name],
        end: start + selection.length - 1,
      };
      setEntities([...entities, addItem]);
      _initData();
    };

    const deleteEntitieById = (id?: string) => {
      if (disabled) return;
      const i = entities.findIndex((v) => v.id === id);
      if (i === -1) return;
      entities.splice(i, 1);
      setEntities([...entities]);
    };

    // 单击时，需要先判断是否双击， 所以需要延迟执行
    const { run } = useDebounceFn(
      (item: ContentProps) => {
        if (disabled) return;
        if (!isDoubleClick.current) {
          setSelectTag(item);
          setShowDropdown(true);
        }
        isDoubleClick.current = false;
      },
      { wait: 300 },
    );

    const isNull = useMemo(() => {
      return () => {
        if (invalid) return false;
        return !entities.length && !intentValues.length;
      };
    }, [entities.length, intentValues.length, invalid]);

    const getParams = useMemo(
      () => () => {
        if (invalid) {
          return {
            invalid,
            text: originalText,
            labels: [],
            entities: [],
          };
        }

        if (isNull()) return '';

        return {
          invalid,
          text: originalText,
          labels: intentValues.map((v) => v.label),
          entities: entities.map((item) => ({
            value: item.value,
            label: item.label,
            start: item.start,
            end: item.end,
          })),
        };
      },
      [entities, intentValues, invalid, isNull, originalText],
    );

    const checkParams = useMemo(
      () => () => {
        if (invalid) return false;
        if (intentValues.length) return false;
        message.error('请在右侧标签集选择归属意图');
        return true;
      },
      [intentValues.length, invalid],
    );

    const isUpdate = useMemo(
      () => () => _originalParams.current !== JSON.stringify(getParams()),
      [getParams],
    );

    const imperativeHandle = useMemo(
      () => () => ({
        isNull,
        getParams,
        isUpdate,
        checkParams,
      }),
      [checkParams, getParams, isNull, isUpdate],
    );

    useImperativeHandle(ref, imperativeHandle);

    // 添加槽位意图更新
    useEffect(() => {
      if (!sortEntities || !sortEntities.length) {
        setContentList(getSpan(originalText, 0, originalText.length - 1));
      } else {
        setContentList(getContentList(sortEntities, originalText));
      }
    }, [originalText, sortEntities]);

    // 数据初始化
    useEffect(() => {
      if (!data) return;
      _initData();
      const { context, result } = data;
      let _invalid = false;
      let _originalText: string = context || '';
      let _entities: EntitiesProps[] = [];
      let _selectLabels: LablesValuesProps = {};
      _originalParams.current = result || JSON.stringify('');
      if (result) {
        const rs = JSON.parse(result) as RsProps;
        _invalid = !!rs.invalid;
        _originalText = rs.text || _originalText;
        _entities = (rs.entities || []).map((item) => ({
          ...item,
          id: getId(),
          color: slotColors[item.label],
        }));
        _selectLabels = intentLabels.length
          ? { [intentLabels[0].name]: rs.labels || '' }
          : {};
      }
      setInvalid(_invalid);
      setEntities(_entities);
      setOriginalText(_originalText);
      setSelectLabels(_selectLabels);
    }, [_initData, data, intentLabels, slotColors]);

    return (
      <div className="page-padding-tb flex" onClick={_initData}>
        <AnnotationLayout
          noPass={noPass}
          invalid={invalid}
          operButtons={operButtons}
          nextClick={nextClick}
          prevClick={prevClick}
          showInvalid={showInvalid}
          onChangeInvalid={setInvalid}
        >
          {!data && (
            <div className={classNames(styles.unselect, styles.borderBox)}>
              <Loading />
            </div>
          )}
          {data && (
            <div className={classNames(styles.unselect, styles.borderBox)}>
              <div className="base-head base-border">
                <span className="base-font-title">原始文本</span>
              </div>
              <div
                onMouseUp={onMouseUp}
                onMouseDown={onMouseDown}
                onClick={stopPropagation}
                className={classNames('base-border relative', styles.text)}
              >
                {contentList.map((item, index) => {
                  if (item.type === 'tag') {
                    return (
                      <DryTag
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          isDoubleClick.current = true;
                          deleteEntitieById(item.id);
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          _setStyle(e.target);
                          run(item);
                        }}
                        key={item.start}
                        color={item.color}
                        data-index={index}
                        className={styles.tag}
                      >
                        {splitJsx(
                          <span className={styles.spacing}></span>,
                          ...item.value.split(''),
                        )}
                      </DryTag>
                    );
                  }
                  return (
                    <span
                      key={item.start}
                      data-index={index}
                      onMouseEnter={onMouseEnter}
                      className={classNames({
                        [styles.select]: _isSelect(index),
                        [styles.span]: true,
                      })}
                    >
                      {item.value}
                    </span>
                  );
                })}
              </div>
              <div className="base-head base-border">
                <span className="base-font-title">槽位标注结果</span>
              </div>
              <div className={classNames('base-border', styles.textBox)}>
                {!!distinctEntities.length &&
                  distinctEntities.map(({ color, label }, index) => (
                    <div className={styles.card} key={index}>
                      <span className="sk0">标注{index + 1}:</span>
                      <DryTag className={styles.cardTag} color={color}>
                        {label}
                      </DryTag>
                    </div>
                  ))}
                {!distinctEntities.length && (
                  <Tip title="请在原始文本中选中待标注文字，然后从弹出的列表中选择对应槽位标签进行标注。可输入标签名称进行搜索；可多次选择同一个标签。" />
                )}
              </div>
              <div className="base-head base-border">
                <span className="base-font-title">归属意图</span>
              </div>
              <div className={styles.textBox}>
                {!!intentValues.length && (
                  <>
                    <span className={styles.label}>归属意图: </span>
                    {intentValues.map(({ color, label }, index) => (
                      <DryTag key={index} color={color} className={styles.card}>
                        {label}
                      </DryTag>
                    ))}
                  </>
                )}
                {!intentValues.length && (
                  <Tip title="暂无归属意图，请在右侧标签集选择归属意图" />
                )}
              </div>
            </div>
          )}
        </AnnotationLayout>
        <Dropdown
          value={selectTag?.label}
          onChange={onChange}
          style={dropStyle}
          labels={slotLabels}
          show={showDropdown}
        />
        {!disabled && (
          <SelectLables
            labels={intentLabels}
            value={selectLabels}
            onChange={chooseLabels}
          />
        )}
      </div>
    );
  },
);

export default Comp;
