import { useCallback, useMemo, useState } from 'react';
import TableList, { TableListColumns } from '@/components/TableList';
import TableSearch, { FieldsItemProps } from '@/components/TableSearch';
import { ExpandableConfig } from 'antd/lib/table/interface';

// 筛选项
const fields: FieldsItemProps[] = [
  {
    label: '搜索',
    type: 'Input',
    key: 'name',
    placeholder: '请输入用户名查询',
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

  const reqParams = useMemo(
    () => ({ ...tableParams, ...params }),
    [params, tableParams],
  );

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
        reqParams={reqParams}
        service={service}
        expandable={expandable}
      />
    </div>
  );
};

export default Comp;
