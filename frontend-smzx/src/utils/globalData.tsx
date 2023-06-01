export type ListProps = {
  label: string;
  value: string | number;
};

export const getMapDataByList = (list: ListProps[]) => {
  return list.reduce((data: Record<string, any>, cur) => {
    data[cur.value] = cur.label;
    return data;
  }, {});
};

export const areaList = [
  { label: '无', value: 0 },
  { label: '外室', value: 1 },
  { label: '中式茶艺厅', value: 2 },
  { label: '西式茶歇亭', value: 3 },
];
export const areaMapText = getMapDataByList(areaList);

export const taskAreaList = [
  { label: '南门左侧平台', value: 1 },
  { label: '南门右侧平台', value: 2 },
  { label: '北门平台', value: 3 },
];
export const taskAreaMapText = getMapDataByList(taskAreaList);

export const taskTypeList = [
  { label: '普通任务', value: 0 },
  { label: '拼接任务', value: 1 },
  { label: '拆解任务', value: 2 },
  { label: '返回任务', value: 3 },
];
export const taskTypeMapText = getMapDataByList(taskTypeList);

export const taskStatusList = [
  { label: '已发送', value: 0 },
  { label: '执行中', value: 1 },
  { label: '失败', value: 2 },
  { label: '成功', value: 3 },
];
export const taskStatusMapText = getMapDataByList(taskStatusList);
