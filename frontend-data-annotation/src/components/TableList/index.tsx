import { deleteConfirm, remToNumber } from '@/utils/util';
import { Button, ButtonProps, message, Table, TableProps } from 'antd';
import type { ColumnType } from 'antd/lib/table';
import moment from 'moment';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './index.module.less';

type TimeFormatProps =
  | 'YYYY-MM-DD'
  | 'YYYY-MM-DD HH:mm'
  | 'YYYY-MM-DD HH:mm:ss'
  | 'YYYY/MM/DD'
  | 'YYYY/MM/DD HH:mm';

type ColumnTypeProps = 'date' | 'button' | 'text' | 'dateTime';

type ButtonType<T> = {
  label: string;
  callback: (row: T) => any;
  confirmKey?: string;
  buttonProps?: ButtonProps;
  labelRender?: (row: T) => React.ReactNode;
};

export type TableListColumnProps<T> = ColumnType<T> & {
  type?: ColumnTypeProps;
  buttons?: ButtonType<T>[];
  timeFormat?: TimeFormatProps;
};

export type TableListColumns<T = any> = TableListColumnProps<T>[];

export type TableListProps = {
  // 表格列
  columns: TableListColumns;
  // api
  service: (...args: any) => Promise<any>;
  // 表头固定
  fixedHead?: boolean;
  // 筛选值
  reqParams?: Record<string, any>;
  // 用于暴露方法
  onRef?: React.MutableRefObject<TableListRef | undefined>;
  // 数据处理
  formatData?: (data: Record<string, any>) => { list: any[]; total: number };
} & TableProps<any>;

// 暴露给父组件的方法
export type TableListRef = { refresh: () => void };

const formatDate = (date: number | string, timeFormat?: TimeFormatProps) => {
  return +date > 10000
    ? moment(+date).format(timeFormat || 'YYYY/MM/DD HH:mm')
    : '';
};

// 表格组件
const TableList: React.FC<TableListProps> = ({
  onRef,
  columns,
  service,
  reqParams,
  formatData,
  pagination,
  fixedHead,
  ...props
}) => {
  // 表格数据
  const [data, setData] = useState<any[]>([]);
  // 数据总数
  const [total, setTotal] = useState<number>(0);
  // 当前页
  const [current, setCurrent] = useState<number>(1);
  // 每页条数
  const [pageSize, setPageSize] = useState<number>(10);
  // table的ref
  const tableRef = useRef<HTMLDivElement>(null);
  // table的scroll
  const [scroll, setScroll] = useState<{ y?: number } | undefined>();
  // loading
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!fixedHead) return;
    const table = tableRef.current;
    if (table) {
      const clientHeight = document.body.clientHeight;
      const tableHeaderHeight = remToNumber(6);
      const tablePaginationHeight = remToNumber(8);
      const tableBodyHeight =
        clientHeight -
        table.offsetTop -
        tableHeaderHeight -
        tablePaginationHeight;
      setScroll({ y: tableBodyHeight - 10 });
    }
  }, [fixedHead]);

  // 获取表格数据API
  const getData = useCallback(
    async (page_index: number, page_size: number) => {
      setLoading(true);
      try {
        let result = await service({ page_index, page_size, ...reqParams });
        // 如果是当前页是空，返回上一页
        if (result.list.length === 0 && page_index > 1) {
          getData(page_index - 1, page_size);
          return;
        }
        if (formatData) result = formatData(result); // 如果用户用了数据处理
        setData(result.list);
        setTotal(result.total);
        setCurrent(page_index);
      } catch (error) {}
      setLoading(false);
    },
    [service, reqParams, formatData],
  );

  // 获取列表数据（初始化时 和 筛选值改变后触发）
  useEffect(() => {
    getData(1, pageSize);
  }, [getData, pageSize]);

  // 暴露刷新表格数据的方法
  useImperativeHandle(
    onRef,
    (): TableListRef => ({ refresh: () => getData(current, pageSize) }),
  );

  // 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
  const onChange = async (updatePage: number, updatePageSize: number) => {
    if (pageSize !== updatePageSize) {
      // 如果 pageSize 变了, 返回第一页
      await getData(1, updatePageSize);
      setCurrent(1);
      return setPageSize(updatePageSize);
    }
    await getData(updatePage, updatePageSize);
    setCurrent(updatePage);
  };

  const _column = useMemo(() => {
    return columns.map((column) => {
      const cloneColumn = { width: 80, ...column };
      const { ellipsis, buttons, type, align, title } = column;
      cloneColumn.ellipsis = ellipsis !== false;

      if (type === 'date') {
        cloneColumn.render = (date) => formatDate(date, 'YYYY/MM/DD');
      } else if (type === 'dateTime') {
        cloneColumn.render = (date) => formatDate(date, 'YYYY/MM/DD HH:mm');
      }

      if (type === 'button' && buttons) {
        cloneColumn.align = align || 'center';
        cloneColumn.title = title || '操作';
        cloneColumn.render = (_, row) =>
          buttons.map(
            ({ label, callback, confirmKey, buttonProps, labelRender }) => {
              const isDelete = label.includes('删除');
              const _onClick = async () => {
                if (!isDelete) return callback(row);
                await deleteConfirm(
                  `确定要删除${confirmKey ? `"${row[confirmKey]}"` : ''}?`,
                );
                await callback(row);
                message.success('删除成功!');
                getData(current, pageSize);
              };
              return (
                <Button
                  className={styles.buttons}
                  type="link"
                  key={label}
                  danger={isDelete}
                  {...buttonProps}
                  onClick={_onClick}
                >
                  {labelRender ? labelRender(row) : label}
                </Button>
              );
            },
          );
      }

      return cloneColumn;
    });
  }, [columns, current, getData, pageSize]);

  const thisPagination = {
    showTotal: useCallback((total: number) => `共 ${total} 条`, []),
    showSizeChanger: true,
    ...pagination,
    total,
    current,
    onChange,
    pageSize,
  };

  return (
    <Table
      rowKey="id"
      scroll={scroll}
      {...props}
      ref={tableRef}
      dataSource={data}
      columns={_column}
      loading={loading}
      pagination={thisPagination}
    />
  );
};

export default TableList;
