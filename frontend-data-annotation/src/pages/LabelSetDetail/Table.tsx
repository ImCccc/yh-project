import { useCallback, useMemo, useState } from 'react';
import TableList, { TableListColumns } from '@/components/TableList';
import TableSearch, { FieldsItemProps } from '@/components/TableSearch';
import { ExpandableConfig, TableRowSelection } from 'antd/lib/table/interface';

// 筛选项
const fields: FieldsItemProps[] = [
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
  renderButtons?: JSX.Element;
  rowSelection?: TableRowSelection<any>;
}> = ({
  columns,
  service,
  onRef,
  tableParams,
  expandable,
  renderButtons,
  rowSelection,
}) => {
  // 筛选值
  const [params, setParams] = useState<Record<string, any>>({});

  const reqParams = useMemo(
    () => ({ ...tableParams, ...params }),
    [params, tableParams],
  );

  // 输入框变化时
  const onChange = useCallback((_key: string, _value: string | number) => {
    setParams({ name: _value });
  }, []);

  return (
    <div className="page-padding">
      <TableSearch
        fields={fields}
        onChange={onChange}
        renderButtons={renderButtons}
      />
      <TableList
        onRef={onRef}
        columns={columns}
        reqParams={reqParams}
        service={service}
        expandable={expandable}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default Comp;
