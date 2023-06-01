/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Table, TableProps } from 'antd';
import type { ColumnType } from 'antd/lib/table';
import dayjs from 'dayjs';

import { remToNumber } from '@/utils/util';

export type TableListColumns<T> = (ColumnType<T> & {
  /** 填时间格式，例如"yyyy-mm-dd" */
  timeFormat?:
    | 'YYYY/MM/DD'
    | 'YYYY-MM-DD'
    | 'YYYY/MM/DD HH:mm'
    | 'YYYY-MM-DD HH:mm'
    | 'YYYY/MM/DD HH:mm:ss'
    | 'YYYY-MM-DD HH:mm:ss';
})[];

export type TableListProps<T> = {
  // 表格列
  columns: TableListColumns<T>;
  // api
  service: (...args: any) => Promise<any>;
  // 筛选值
  reqParams?: Record<string, any>;
  // 用于暴露方法
  onRef?: React.MutableRefObject<TableListRef | undefined>;
  // 数据处理
  formatData?: (data: Record<string, any>) => Record<string, any>;
} & TableProps<any>;

// 暴露给父组件的方法
export type TableListRef = {
  refresh: () => void;
};

// 表格组件
const TableList: React.FC<TableListProps<any>> = ({
  columns,
  service,
  reqParams,
  onRef,
  formatData,
  ...props
}) => {
  // 表格数据
  const [data, setData] = useState<any[]>([]);
  // 数据总数
  const [total, setTotal] = useState<number>(0);
  // 当前页
  const [current, setCurrent] = useState<number>(1);
  // 每页条数
  const [pageSize, setPageSize] = useState<number>(20);
  // table的ref
  const tableRef = useRef<HTMLDivElement>(null);
  // table的scroll
  const [scroll, setScroll] = useState<{ y?: number }>({});
  // loading
  const [loading, setLoading] = useState<boolean>(false);

  // 设置表格滚动条
  const setTableScroll = useCallback(() => {
    const table = tableRef.current;
    const clientHeight = document.body.clientHeight;
    const tableHeaderHeight = remToNumber(6);
    const tablePaginationHeight = remToNumber(8);

    if (table) {
      const tableBodyHeight =
        clientHeight -
        table.offsetTop -
        tableHeaderHeight -
        tablePaginationHeight;
      if (tableBodyHeight < remToNumber(24)) {
        setScroll({ y: remToNumber(24) });
      } else {
        setScroll({ y: tableBodyHeight - 10 });
      }
    }
  }, []);

  // 根据页面变化修改 table 的 scroll
  useEffect(() => {
    let timer: NodeJS.Timer | null = null;
    // 设置表格滚动条（防抖）
    const setTableScrollDebounce = () => {
      if (timer != null) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(setTableScroll, 500);
    };

    addEventListener('resize', setTableScrollDebounce);

    return () => {
      removeEventListener('resize', setTableScrollDebounce);
    };
  }, [setTableScroll]);

  // table 的 offsetTop 改变，修改表格高度
  useEffect(() => {
    setTableScroll();
  }, [setTableScroll, tableRef.current?.offsetTop]);

  // 获取表格数据API
  const getData = useCallback(
    async (page: number, _pageSize: number) => {
      setLoading(true);
      let result = await service({
        page_index: page,
        page_size: _pageSize,
        ...reqParams,
      });

      if (result) {
        // 如果用户用了数据处理
        if (formatData) {
          result = formatData(result);
        }
        setLoading(false);
        setData(result.list);
        setTotal(result.total);
        setCurrent(page);
        console.log(result);
        return result;
      }
    },
    [reqParams, formatData, service],
  );

  // 获取列表数据（初始化时 和 筛选值改变后触发）
  useEffect(() => {
    getData(1, pageSize);
  }, [getData, pageSize]);

  // 暴露刷新表格数据的方法
  useImperativeHandle(onRef, () => {
    return {
      refresh: () => getData(current, pageSize),
    };
  });

  // 接收分页的 props
  let paginationProps = {};
  if (props.pagination) {
    paginationProps = props.pagination;
  }

  // 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
  const onChange = async (_page: number, _pageSize: number) => {
    // 如果 pageSize 变了
    if (pageSize !== _pageSize) {
      // 返回第一页
      await getData(1, _pageSize);
      setCurrent(1);
      setPageSize(_pageSize);
      return;
    }
    await getData(_page, _pageSize);
    setCurrent(_page);
  };

  // 计算column
  const _column = useMemo(() => {
    for (const column of columns) {
      const { ellipsis, timeFormat, render } = column;
      column.ellipsis = ellipsis !== false;
      // 格式化时间
      if (timeFormat && !render) {
        column.render = (date) =>
          +date > 10000 ? dayjs(+date).format(timeFormat) : '';
      }
    }
    return columns;
  }, [columns]);

  return (
    <Table
      rowKey="id"
      scroll={scroll}
      pagination={{
        pageSize,
        ...paginationProps,
        current,
        total,
        onChange,
      }}
      {...props}
      ref={tableRef}
      dataSource={data}
      columns={_column}
      loading={loading}
    />
  );
};

export default TableList;
