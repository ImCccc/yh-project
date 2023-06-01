import DatePicker from '@/components/DatePicker';
import Select from '@/components/Select';
import {
  TaskServiceAdd,
  TaskServiceCopy,
} from '@/services/dataAnnotation/TaskService';
import {
  audioMarkTypeList,
  AUDIO_CLASS,
  AUDIO_DIVISION,
  AUDIO_TRANSCRIPTION,
  INTENT_SLOT,
  isQualityList,
  roleMapText,
  textMarkTypeList,
  TEXT_CLASS,
  TEXT_GENERALIZATION,
} from '@/utils/globalData';
import {
  dataIdRule,
  labelCommonRule,
  labelIntentRule,
  labelSlotRule,
  markTeamRule,
  qualityRate,
  qualityTeamRule,
  requiredRule,
  taskDescribeRule,
  taskFinishDate,
  taskNameRule,
} from '@/utils/verification';
import {
  Button,
  Form,
  FormInstance,
  Input,
  InputNumber,
  message,
  Radio,
  Table,
  TableColumnProps,
} from 'antd';
import classNames from 'classnames';
import { createRef, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import useData from './useData';
import useFillData from './useFillData';
import useLabel from './useLabel';
import useTeam from './useTeam';

type FieldValuesProps = {
  name: string;
  describe: string;
  data_id: string | null;
  labelIntent: string | null;
  labelSlot: string | null;
  labelCommon: string[];
  mark_team_id: string | null;
  quality_team_id: string | null;
  quality_rate: number | null;
  need_finish_time: number | null;
  is_quality: number;
  isAudioType: boolean;
  markTypeAudio: number;
  markTypeText: number;
};

const tableColumns: TableColumnProps<{ name: string; role_code: string }>[] = [
  {
    title: '成员名称',
    dataIndex: 'name',
  },
  {
    title: '角色',
    dataIndex: 'role_code',
    render: (code) => roleMapText[code],
  },
];

const tableScroll = { y: 400 };
const labelCol = { span: 5 };
const emptySpan = <span></span>;
const textClass: any[] = [INTENT_SLOT, TEXT_CLASS];
const audioClass: any[] = [AUDIO_CLASS, AUDIO_TRANSCRIPTION, AUDIO_DIVISION];

/*
  需求描述:
  1.  标签显示逻辑:
      标注类型为音频转写、文本泛化：不显示标签集选择
      标注类型为意图/槽位：        显示: 1意图标签集(必填) 2槽位标签集(必填)
      标注类型为其他:              显示:  标签集(必填)
  2.  是否质检选择是显示: 质检团队 * 抽检比例
  3.  选择团队后显示团队成员列表

  其他说明:
  1. 如果在数据集跳转过来, 需要填充 '数据集' 和 '标注类型',  并且数据集不能修改, 标注类型哪些能修改, 需要通过数据集反推
  2. 如果是复制任务, 除了名称, 其他字段需要填充, 并且数据集不能修改, 标注类型不能修改;
     标签集只能添加不能修改, 意图标签集, 槽位标签集不能修改
*/

const Comp: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formRef = createRef<FormInstance<FieldValuesProps>>();
  const [fieldValues, setFieldValues] = useState<FieldValuesProps>();

  // 是否复制任务
  const [copyTaskId, setCopyTaskId] = useState('');

  // 是否来自数据集跳转过来
  const [isFromDataset, setIsFromDataset] = useState(false);

  // 数据集能否编辑
  const dataIdDisabled = useMemo(() => {
    return isFromDataset || !!copyTaskId;
  }, [copyTaskId, isFromDataset]);

  // 音频文本标注类型, 能否切换
  const markTypeDisabled = useMemo(() => {
    return isFromDataset || !!copyTaskId;
  }, [copyTaskId, isFromDataset]);

  // 复制任务的标签集
  const [initlabels, setInitlabels] = useState<string[]>([]);

  // 标注类型
  const markType = useMemo(
    () =>
      fieldValues?.isAudioType
        ? fieldValues.markTypeAudio
        : fieldValues?.markTypeText,
    [
      fieldValues?.isAudioType,
      fieldValues?.markTypeAudio,
      fieldValues?.markTypeText,
    ],
  );

  // 标签列表
  const labelList = useLabel();

  const commonlabelList = useMemo(
    () =>
      labelList.commonList.map((item) => ({
        ...item,
        disabled: initlabels.includes(item.value as string),
      })),
    [initlabels, labelList.commonList],
  );

  // 标注团队下拉列表 和 选中团队的成员列表
  const teamData = useTeam(
    fieldValues?.mark_team_id,
    fieldValues?.quality_team_id,
  );

  // 数据集
  const dataList = useData(markType);

  // 字段显示隐藏控制
  const showCols = useMemo(() => {
    return {
      // 如果没有选择标注类型 或者 标注类型为 "音频转写、文本泛化" => 不显示标签集
      showTag:
        markType &&
        markType !== AUDIO_TRANSCRIPTION &&
        markType !== TEXT_GENERALIZATION &&
        markType !== INTENT_SLOT,
      // 标注类型为意图/槽位 => 显示意图标签集和槽位标签集
      showIntentSlot: markType === INTENT_SLOT,
    };
  }, [markType]);

  const audioMarkList = useMemo(
    () =>
      audioMarkTypeList.map((item) => ({ ...item, disabled: !!copyTaskId })),
    [copyTaskId],
  );

  const textMarkList = useMemo(() => {
    return textMarkTypeList.map((item) => {
      let disabled = false;
      if (copyTaskId) {
        disabled = true;
      } else if (isFromDataset) {
        if (markType === TEXT_GENERALIZATION) {
          disabled = true;
        } else if (textClass.includes(markType)) {
          disabled = !textClass.includes(item.value);
        }
      }
      return { ...item, disabled };
    });
  }, [copyTaskId, isFromDataset, markType]);

  const getParams = (values: FieldValuesProps) => {
    const label_set_ids = showCols.showIntentSlot
      ? [values.labelIntent, values.labelSlot]
      : showCols.showTag
      ? values.labelCommon
      : [];
    return {
      name: values.name,
      mark_type: markType,
      data_id: values.data_id,
      describe: values.describe,
      label_set_ids: label_set_ids,
      is_quality: values.is_quality,
      quality_rate: values.quality_rate,
      mark_team_id: values.mark_team_id,
      quality_team_id: values.quality_team_id,
      need_finish_time: values.need_finish_time,
    } as ANNOTATION.dataAnnotationTaskAddReq;
  };

  const getCopyParams = (values: FieldValuesProps) => ({
    ...getParams(values),
    source_id: copyTaskId,
  });

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      if (copyTaskId) {
        const params = getCopyParams(values);
        await TaskServiceCopy(params);
      } else {
        const params = getParams(values);
        await TaskServiceAdd(params);
      }
      message.success('标注任务创建成功');
      navigate('/task/index');
    } catch (error) {}
    setLoading(false);
  };

  const resetFields = useCallback(
    (...args: string[]) => {
      args.forEach((field) => {
        const val = field === 'labelCommon' ? [] : null;
        formRef.current?.setFieldValue(field, val);
      });
    },
    [formRef],
  );

  const valuesChange = (
    _: Partial<FieldValuesProps>,
    allValues: FieldValuesProps,
  ) => {
    const { is_quality, isAudioType, markTypeAudio, markTypeText } = allValues;

    if (!is_quality) {
      // 如果不质检, 需要清空数据
      resetFields('quality_rate', 'quality_team_id');
    }

    if (allValues?.isAudioType !== fieldValues?.isAudioType) {
      // 标准类型"音频"和"文本"切换
      resetFields('data_id', 'labelIntent', 'labelSlot', 'labelCommon');
      return setFieldValues(allValues);
    }

    const thisMarkType = isAudioType ? markTypeAudio : markTypeText;
    if (markType !== thisMarkType) {
      // 标注类型切换
      if (audioClass.includes(thisMarkType) && audioClass.includes(markType)) {
        // 音频切换
        if (
          thisMarkType === AUDIO_TRANSCRIPTION ||
          markType === AUDIO_TRANSCRIPTION
        ) {
          // "音频转写"和"音频分类/音频分割"切换
          resetFields('labelIntent', 'labelSlot', 'labelCommon');
        }
        return setFieldValues(allValues);
      }

      if (textClass.includes(thisMarkType) && textClass.includes(markType)) {
        // "文本分类"和"意图槽位"切换
        resetFields('labelIntent', 'labelSlot', 'labelCommon');
      } else {
        // "文本泛化"和"文本分类/意图槽位"切换
        resetFields('data_id', 'labelIntent', 'labelSlot', 'labelCommon');
      }
    }

    setFieldValues(allValues);
  };

  const getPopupContainer = useCallback(() => {
    return document.querySelector(`.${styles.container}`) as HTMLElement;
  }, []);

  // 便签集, 点击 X 清除, 会将所有数据清除, 如果是复制任务, 需要重新赋值
  const labelCommonClear = useCallback(() => {
    if (!copyTaskId) return;
    const _formRef = formRef.current;
    setTimeout(() => {
      // 需要延迟,并且 formRef 需要写在外面, 不然设置失败
      _formRef?.resetFields(['labelCommon']);
      _formRef?.setFieldValue('labelCommon', [...initlabels]);
    }, 100);
  }, [formRef, initlabels, copyTaskId]);

  // 初始化数据表单数据
  useFillData(
    useCallback((data, taskId) => {
      setFieldValues(data);
      if (taskId) {
        // 说明是复制任务
        setCopyTaskId(taskId);
        setInitlabels(data.labelCommon);
      }

      if (data.data_id) {
        setIsFromDataset(true);
      }
    }, []),
  );

  return (
    <div className="page-padding">
      <div className={styles.container}>
        {fieldValues && (
          <Form
            ref={formRef}
            colon={false}
            scrollToFirstError
            labelCol={labelCol}
            onFinish={onFinish}
            className={styles.form}
            initialValues={fieldValues}
            onValuesChange={valuesChange}
          >
            <Form.Item name="name" label="任务名称" rules={taskNameRule}>
              <Input placeholder="请输入任务名称" />
            </Form.Item>
            <Form.Item
              name="describe"
              label="任务描述"
              rules={taskDescribeRule}
            >
              <Input.TextArea rows={4} placeholder="请输入任务描述" />
            </Form.Item>
            <Form.Item name="isAudioType" label="标注类型" rules={requiredRule}>
              <Radio.Group disabled={markTypeDisabled}>
                <Radio value={true}>音频</Radio>
                <Radio value={false}>文本</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="markTypeAudio"
              label={emptySpan}
              className={classNames({ hide: !fieldValues.isAudioType })}
            >
              <Radio.Group
                optionType="button"
                options={audioMarkList}
                className={styles.radioButton}
              />
            </Form.Item>
            <Form.Item
              name="markTypeText"
              label={emptySpan}
              className={classNames({ hide: fieldValues.isAudioType })}
            >
              <Radio.Group
                optionType="button"
                options={textMarkList}
                className={styles.radioButton}
              />
            </Form.Item>
            <Form.Item name="data_id" label="数据集" rules={dataIdRule}>
              <Select
                disabled={dataIdDisabled}
                options={dataList}
                placeholder="请选择数据集"
                getPopupContainer={getPopupContainer}
              ></Select>
            </Form.Item>
            {showCols.showIntentSlot && (
              <>
                <Form.Item
                  name="labelIntent"
                  label="意图标签集"
                  rules={labelIntentRule}
                >
                  <Select
                    disabled={!!copyTaskId}
                    placeholder="请选择意图标签集"
                    options={labelList.intentList}
                    getPopupContainer={getPopupContainer}
                  ></Select>
                </Form.Item>
                <Form.Item
                  name="labelSlot"
                  label="槽位标签集"
                  rules={labelSlotRule}
                >
                  <Select
                    disabled={!!copyTaskId}
                    placeholder="请选择槽位标签集"
                    options={labelList.slotList}
                    getPopupContainer={getPopupContainer}
                  ></Select>
                </Form.Item>
              </>
            )}
            {showCols.showTag && (
              <Form.Item
                name="labelCommon"
                label="标签集"
                rules={labelCommonRule}
              >
                <Select
                  mode="multiple"
                  placeholder="请选择标签集"
                  options={commonlabelList}
                  onClear={labelCommonClear}
                  getPopupContainer={getPopupContainer}
                ></Select>
              </Form.Item>
            )}
            <Form.Item
              name="mark_team_id"
              label="标注团队"
              rules={markTeamRule}
            >
              <Select
                placeholder="请选择标注团队"
                options={teamData.teamList}
                getPopupContainer={getPopupContainer}
              ></Select>
            </Form.Item>
            <Form.Item
              label={emptySpan}
              className={classNames({ hide: !fieldValues.mark_team_id })}
            >
              <Table
                rowKey="id"
                size="small"
                pagination={false}
                scroll={tableScroll}
                columns={tableColumns}
                dataSource={teamData.userList}
                className={classNames('fix-overflow', styles.table)}
              />
            </Form.Item>
            <Form.Item name="is_quality" label="是否质检" rules={requiredRule}>
              <Radio.Group options={isQualityList} />
            </Form.Item>
            {fieldValues.is_quality !== 0 && (
              <>
                <Form.Item
                  label="质检团队"
                  name="quality_team_id"
                  rules={qualityTeamRule}
                >
                  <Select
                    placeholder="请选择质检团队"
                    options={teamData.teamList}
                    getPopupContainer={getPopupContainer}
                  ></Select>
                </Form.Item>
                <Form.Item
                  label={emptySpan}
                  className={classNames({ hide: !fieldValues.quality_team_id })}
                >
                  <Table
                    rowKey="id"
                    size="small"
                    pagination={false}
                    scroll={tableScroll}
                    columns={tableColumns}
                    dataSource={teamData.qualityUserList}
                    className={classNames('fix-overflow', styles.table)}
                  />
                </Form.Item>
                <Form.Item
                  name="quality_rate"
                  label="抽检比例"
                  rules={qualityRate}
                >
                  <InputNumber
                    min={1}
                    max={100}
                    addonAfter="%"
                    className="w100"
                    placeholder="请输入抽检比例"
                  />
                </Form.Item>
              </>
            )}
            <Form.Item
              name="need_finish_time"
              label="任务截取日期"
              rules={taskFinishDate}
            >
              <DatePicker
                placeholder="请选择任务截取日期"
                className={styles.comp}
                chooseBeforeDate={false}
              />
            </Form.Item>
            <Form.Item label={emptySpan}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className={styles.submit}
              >
                创建
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Comp;
