import {
  dataTypeMapText,
  importStatusMapText,
  ListProps,
} from '@/utils/globalData';
import { formatDate } from '@/utils/util';
import { ExpandableConfig } from 'antd/lib/table/interface';
import { useCallback, useMemo, useState } from 'react';
import Expanded from './Expanded';

type TableRowProps = ANNOTATION.dataAnnotationData;

export const getExpandableList = (item: TableRowProps) => {
  return [
    { label: '名称:', value: item.name },
    { label: '数据集类型:', value: dataTypeMapText[item.type] },
    { label: '样本数量:', value: item.sample_count },
    { label: '创建人:', value: item.create_username },
    { label: '创建时间:', value: formatDate(item.create_time) },
    {
      label: '更新时间:',
      value: formatDate(item.update_time),
    },
    {
      label: '导入状态:',
      value: importStatusMapText[item.import_status],
    },
    { label: '描述:', value: item.describe },
  ];
};

function useExpandable(service: any) {
  // 缓存列表展开的数据
  const [listData, setListData] = useState<{ [key: string]: ListProps[] }>({});

  // 调取接口
  const getData = useCallback(
    async (_rowId: string) => {
      const { item }: { item: TableRowProps } = await service({ id: _rowId });
      setListData({
        ...listData,
        [_rowId]: getExpandableList(item),
      });
    },
    [listData, service],
  );

  // 展开配置
  const expandable = useMemo<ExpandableConfig<TableRowProps>>(() => {
    return {
      onExpand: async (expanded, row) => {
        if (!expanded) return;
        getData(row.id);
      },
      expandedRowRender: (row) => <Expanded list={listData[row.id]} />,
    };
  }, [getData, listData]);

  const update = (id: string, data: TableRowProps) => {
    setListData({
      ...listData,
      [id]: getExpandableList(data),
    });
    console.log(id, listData);
  };

  return { expandable, update };
}

export default useExpandable;
