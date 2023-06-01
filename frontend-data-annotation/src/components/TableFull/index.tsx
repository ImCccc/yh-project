import { useCallback, useRef, useState } from 'react';
import TableList, {
  TableListRef,
  TableListProps,
} from '@/components/TableList';
import TableSearch, { CompProps } from '@/components/TableSearch';

const TableFull: React.FC<TableListProps & CompProps> = ({
  fields,
  renderButtons,
  columns,
  service,
  ...props
}) => {
  // 筛选值
  const [filterValue, setFilterValue] = useState<Record<string, any>>({});
  // 子组件的ref，可以调用子组件的方法
  const tableRef = useRef<TableListRef>();

  // 点击查询
  const onSearch = useCallback((data: any) => {
    setFilterValue(data);
    console.log('data', data);
    
  }, []);

  // 点击重置
  const onReset = () => {
    setFilterValue({});
  };

  return (
    <>
      <TableSearch
        fields={fields}
        onReset={onReset}
        onSearch={onSearch}
        renderButtons={renderButtons}
      />
      <TableList
        onRef={tableRef}
        columns={columns}
        reqParams={filterValue}
        service={service}
        {...props}
      />
    </>
  );
};

export default TableFull;
