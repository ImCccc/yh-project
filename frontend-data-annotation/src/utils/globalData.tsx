import {
  AUTHORITY_ADMIN,
  AUTHORITY_LEADER,
  AUTHORITY_MEMBER,
} from '@/config/constant';

export const TRUE_VALUE = 1;
export const FALST_VALUE = 0;

export type ListProps = {
  label: any;
  value: string | number;
};

export const PAGE_PARAMS = {
  page_index: 0,
  page_size: 10000,
};

export const getMapDataByList = (list: ListProps[]) => {
  return list.reduce((data: Record<string, any>, cur) => {
    data[cur.value] = cur.label;
    return data;
  }, {});
};

// 意图
export const INTENT_VALUE = 2;
// 槽位
export const SLOT_VALUE = 3;

// 队员-任务状态
export const MEMBER_TASK_STATUS_QA_UNPASS = 5; // 质检 - 验收不通过
export const MEMBER_TASK_STATUS_MK_UNPASS = 4; // 标注 - 验收不通过

// 队长-任务状态
export const TEAM_TASK_STATUS_UNDONE = 1;
export const TEAM_TASK_STATUS_DONE = 2;
export const TEAM_TASK_STATUS_UNPASS = 4; // 验收不通过
export const teamTaskStatusList = [
  { label: '待分配', value: TEAM_TASK_STATUS_UNDONE },
  { label: '进行中', value: TEAM_TASK_STATUS_DONE },
];
export const teamTaskStatusMapText = getMapDataByList(teamTaskStatusList);

// 管理员-任务状态
export const TASK_STATUS_UNDONE = 1;
export const TASK_STATUS_DONE = 2;
export const TASK_STATUS_PASS = 3;
export const taskStatusList = [
  { label: '进行中', value: TASK_STATUS_UNDONE },
  { label: '质检完成', value: TASK_STATUS_DONE },
  { label: '验收通过', value: TASK_STATUS_PASS },
];
export const taskStatusMapText = getMapDataByList(taskStatusList);

// 标注类型 - 音频
export const AUDIO_CLASS = 11;
export const AUDIO_TRANSCRIPTION = 12;
export const AUDIO_DIVISION = 13;
export const audioMarkTypeList = [
  { label: '音频分类', value: AUDIO_CLASS },
  { label: '音频转写', value: AUDIO_TRANSCRIPTION },
  { label: '音频分割', value: AUDIO_DIVISION },
];

// 标注类型 - 文本
export const TEXT_CLASS = 21;
export const TEXT_GENERALIZATION = 22;
export const INTENT_SLOT = 23;
export const textMarkTypeList = [
  { label: '文本分类', value: TEXT_CLASS },
  { label: '文本泛化', value: TEXT_GENERALIZATION },
  { label: '意图/槽位', value: INTENT_SLOT },
];

export const markTypeMapText = getMapDataByList([
  ...audioMarkTypeList,
  ...textMarkTypeList,
]);

// 数据集类型
export const DATATYPE_AUDIO = 1;
export const DATATYPE_TEXT = 2;
export const DATATYPE_GENERICS = 3;
export const dataTypeList = [
  { label: '音频', value: DATATYPE_AUDIO },
  { label: '分类文本', value: DATATYPE_TEXT },
  { label: '泛化文本', value: DATATYPE_GENERICS },
];
export const dataTypeMapText = getMapDataByList(dataTypeList);

// 所有标注类型
export const markTypeList = [...audioMarkTypeList, ...textMarkTypeList];
export const dimensionTypeMapText = getMapDataByList(markTypeList);

// 任务类型
export const TASK_TYPE_MARK = 1;
export const TASK_TYPE_QUALITY = 2;
export const taskTypeList = [
  { label: '标注', value: TASK_TYPE_MARK },
  { label: '质检', value: TASK_TYPE_QUALITY },
];
export const taskTypeMapText = getMapDataByList(taskTypeList);

// 标注状态  1 标注中 2 标注已提交 3 验收通过 4 验收不通过
export const MARK_STATUS_UNDONE = 1;
export const MARK_STATUS_DONE = 2;
export const markStatusList = [
  { label: '标注中', value: MARK_STATUS_UNDONE },
  { label: '标注已提交', value: MARK_STATUS_DONE },
  { label: '验收通过', value: 3 },
  { label: '验收不通过', value: 4 },
];
export const markStatusMapText = getMapDataByList(markStatusList);

// 质检状态 1 质检中 2 质检通过 3 质检不通过 4 验收通过 5 验收不通过
export const QUALITY_STATUS_UNDONE = 1;
export const QUALITY_STATUS_PASS = 2;
export const QUALITY_STATUS_NOPASS = 3;
export const qualityStatusList = [
  { label: '质检中', value: QUALITY_STATUS_UNDONE },
  { label: '质检通过', value: QUALITY_STATUS_PASS },
  { label: '质检不通过', value: QUALITY_STATUS_NOPASS },
  { label: '验收通过', value: 4 },
  { label: '验收不通过', value: 5 },
];
export const qualityStatusMapText = getMapDataByList(qualityStatusList);

// 角色列表
export const roleList = [
  { label: '管理员', value: AUTHORITY_ADMIN },
  { label: '队长', value: AUTHORITY_LEADER },
  { label: '队员', value: AUTHORITY_MEMBER },
];
export const roleMapText = getMapDataByList(roleList);

// 标签类型
export const LABEL_COMMON = 1;
export const LABEL_INTENT = 2;
export const LABEL_SLOT = 3;
export const labelList = [
  { label: '普通', value: LABEL_COMMON },
  { label: '意图', value: LABEL_INTENT },
  { label: '槽位', value: LABEL_SLOT },
];
export const labelMapText = getMapDataByList(labelList);

// 是否质检下拉列表
export const isQualityList = [
  { label: '是', value: TRUE_VALUE },
  { label: '否', value: FALST_VALUE },
];
export const isQualityText = getMapDataByList(isQualityList);

// 作业类型
export const JOB_TYPE_ANNOTATION = 1;
export const JOB_TYPE_QUALITY = 2;
export const jobTypeList = [
  { label: '标注', value: JOB_TYPE_ANNOTATION },
  { label: '质检', value: JOB_TYPE_QUALITY },
];

// 导入状态
export const IMPORT_STATUS_FINISH = 0;
export const IMPORT_STATUS_FAILED = 1;
export const importStatusList = [
  { label: '导入完成', value: IMPORT_STATUS_FINISH },
  { label: '导入失败', value: IMPORT_STATUS_FAILED },
];
export const importStatusMapText = getMapDataByList(importStatusList);

// 是否多选
export const IS_MULTIPLE_SELECT_FALSE = 0;
export const IS_MULTIPLE_SELECT_TRUE = 1;
export const isMultipleSelectList = [
  { label: '单选', value: IS_MULTIPLE_SELECT_FALSE },
  { label: '多选', value: IS_MULTIPLE_SELECT_TRUE },
];
export const isMultipleSelectMapText = getMapDataByList(isMultipleSelectList);

// 导入方式
export const IMPORT_MODE_APPENDS = 0;
export const IMPORT_MODE_OVERWRITE = 1;
export const importModeList = [
  { label: '追加', value: IMPORT_MODE_APPENDS },
  { label: '覆盖', value: IMPORT_MODE_OVERWRITE },
];
