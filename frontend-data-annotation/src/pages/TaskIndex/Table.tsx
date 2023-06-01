import TableList, {
  TableListColumns,
  TableListRef,
} from '@/components/TableList';
import TableSearch, { FieldsItemProps } from '@/components/TableSearch';
import useEffectCacheRoute from '@/hooks/useEffectCacheRoute';
import { markTypeList } from '@/utils/globalData';
import { ExpandableConfig } from 'antd/lib/table/interface';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// 筛选项
const fields: FieldsItemProps[] = [
  {
    label: '标注类型',
    type: 'Select',
    key: 'mark_type',
    options: markTypeList,
  },
  {
    label: '任务名称',
    key: 'name',
  },
];

const Comp: React.FC<{
  service: any;
  columns: TableListColumns;
  params?: any;
  refresh?: { [k: string]: any };
  expandable?: ExpandableConfig<any>;
  [key: string]: any;
}> = ({ columns, service, params, refresh, expandable, ...props }) => {
  const tableRef = useRef<TableListRef>();
  // 筛选值
  const [tableParams, setParams] = useState<Record<string, any>>({});
  const thisParams = useMemo(
    () => ({ ...tableParams, ...params }),
    [params, tableParams],
  );

  const onReset = useCallback(() => setParams({}), []);

  // 点击查询
  const onSearch = useCallback((data: any) => {
    setParams({ ...data });
  }, []);

  useEffect(() => {
    if (refresh) tableRef.current?.refresh();
  }, [refresh]);

  const refreshTable = useCallback(() => {
    tableRef.current?.refresh();
  }, []);

  // 缓存路由刷新界面
  useEffectCacheRoute(refreshTable);

  return (
    <div className="page-padding">
      <TableSearch fields={fields} onReset={onReset} onSearch={onSearch} />
      <TableList
        rowKey="id"
        onRef={tableRef}
        columns={columns}
        service={service}
        reqParams={thisParams}
        expandable={expandable}
        {...props}
      />
    </div>
  );
};

export default React.memo(Comp);
