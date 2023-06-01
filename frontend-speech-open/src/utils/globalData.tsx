type ListProps = {
  label: string;
  value: string | number;
};

const _getMapDataByList = (list: ListProps[]) => {
  return list.reduce((data: Record<string, any>, cur) => {
    data[cur.value] = cur.label;
    return data;
  }, {});
};

export const statusList = [
  { label: '未上线', value: 0 },
  { label: '发布中', value: 1 },
  { label: '上线', value: 2 },
  { label: '发布失败', value: 3 },
  { label: '', value: '' },
];
export const statusMapText = _getMapDataByList(statusList);
