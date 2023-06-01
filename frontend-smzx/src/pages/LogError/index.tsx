import TableList, {
  TableListColumns,
  TableListRef,
} from '@/components/TableList';
import TableSearch from '@/components/TableSearch';
import { ErrorLogServicePage } from '@/services/smzx/ErrorLogService';
import type { RangePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';
import React, { useRef, useState } from 'react';

// 不能选当天之后的日期
const disabledDate: RangePickerProps['disabledDate'] = (
  current: moment.Moment,
): boolean => {
  return current && current >= moment().endOf('day');
};

const disabledTime = () => {
  return true;
};

// 筛选项
const fields = [
  {
    label: '上报时间',
    type: 'RangePicker',
    placeholder: ['开始日期', '结束日期'],
    key: 'rangeTime',
    compProps: {
      disabledDate: disabledDate,
      disabledTime: disabledTime,
      showTime: {
        defaultValue: [
          moment('00:00:00', 'HH:mm:ss'),
          moment('23:59:59', 'HH:mm:ss'),
        ],
        hideDisabledOptions: true,
      },
    },
  },
];

const Comp: React.FC = () => {
  // 筛选值
  const [filterValue, setFilterValue] = useState<Record<string, any>>({});
  // 子组件的ref，可以调用子组件的方法
  const tableRef = useRef<TableListRef>();

  // 点击查询
  const onSearch = (data: any) => {
    if (data.rangeTime) {
      setFilterValue({
        start_time: data.rangeTime[0],
        end_time: data.rangeTime[1],
      });
    } else {
      setFilterValue({});
    }
  };

  // 点击重置
  const onReset = () => {
    setFilterValue({});
  };

  // 表格列
  const columns: TableListColumns<SMZX.smzxTaskRecordPageResp> = [
    {
      title: '异常ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '上报时间',
      dataIndex: 'date_created',
      key: 'date_created',
      timeFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    {
      title: '异常类型',
      dataIndex: 'error_type',
      key: 'error_type',
    },
    {
      title: '异常详情',
      dataIndex: 'detail',
      key: 'detail',
    },
  ];

  return (
    <div className="common-page">
      <TableSearch
        className="margin-space"
        fields={fields}
        onSearch={onSearch}
        onReset={onReset}
      />
      <TableList
        service={ErrorLogServicePage}
        columns={columns}
        reqParams={filterValue}
        pagination={{ showQuickJumper: true }}
        onRef={tableRef}
      />
    </div>
  );
};

export default Comp;
