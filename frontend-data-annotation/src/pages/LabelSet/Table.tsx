import { useCallback, useState } from 'react';
import TableList, { TableListColumns } from '@/components/TableList';
import TableSearch, { FieldsItemProps } from '@/components/TableSearch';
import { ExpandableConfig } from 'antd/lib/table/interface';
import { labelList } from '@/utils/globalData';

// 筛选项
const fields: FieldsItemProps[] = [
  {
    label: '类型选择',
    type: 'Select',
    key: 'type',
    placeholder: '请选择标签集类型',
    options: labelList,
  },
  {
    label: '搜索',
    type: 'Input',
    key: 'name',
    placeholder: '请输入标签集名称搜索',
  },
];

const Comp: React.FC<{
  columns: TableListColumns;
  service: any;
  onRef?: any;
  tableParams?: any;
  expandable?: ExpandableConfig<any>;
}> = ({ columns, service, onRef, tableParams, expandable }) => {
  // 筛选值
  const [params, setParams] = useState<Record<string, any>>({});

  // 点击查询
  const onSearch = useCallback((data: any) => {
    setParams({ ...data });
  }, []);

  const onReset = useCallback(() => {
    setParams({});
  }, []);

  return (
    <div className="page-padding">
      <TableSearch fields={fields} onReset={onReset} onSearch={onSearch} />
      <TableList
        onRef={onRef}
        columns={columns}
        reqParams={{ ...tableParams, ...params }}
        service={service}
        expandable={expandable}
      />
    </div>
  );
};

export default Comp;
