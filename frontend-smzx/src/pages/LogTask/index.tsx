import TableList, {
  TableListColumns,
  TableListRef,
} from '@/components/TableList';
import TableSearch from '@/components/TableSearch';
import {
  TaskRecordServiceExport,
  TaskRecordServicePage,
} from '@/services/smzx/TaskRecordService';
import { taskStatusMapText, taskTypeMapText } from '@/utils/globalData';
import { linkExport } from '@/utils/util';
import type { RangePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';
import { useCallback, useRef, useState } from 'react';

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
    label: '下发时间',
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
  {
    label: '任务名称',
    placeholder: '请输入任务名称',
    key: 'name',
  },
  {
    label: '是否仿真',
    key: 'simulate',
    type: 'Select',
    placeholder: '请选择是否仿真',
    options: [
      { value: 1, label: '是' },
      { value: 2, label: '否' },
    ],
  },
];

// 表格列
const columns: TableListColumns<SMZX.smzxTaskRecord> = [
  {
    title: '任务名称',
    dataIndex: 'name',
    ellipsis: false,
  },
  {
    title: '编号',
    dataIndex: 'serial_number',
    ellipsis: false,
  },
  {
    title: '任务类型',
    dataIndex: 'task_type',
    ellipsis: false,
    render: (task_type) => taskTypeMapText[task_type],
  },
  {
    title: '是否仿真',
    dataIndex: 'is_simulate',
    render: (is_simulate) => (is_simulate ? '是' : '否'),
  },
  {
    title: '下发时间',
    dataIndex: 'start_time',
    timeFormat: 'YYYY-MM-DD HH:mm:ss',
    ellipsis: false,
  },
  {
    title: '结束时间',
    dataIndex: 'finish_time',
    timeFormat: 'YYYY-MM-DD HH:mm:ss',
    ellipsis: false,
  },
  {
    title: '执行结果',
    dataIndex: 'task_status',
    ellipsis: false,
    render: (text) => taskStatusMapText[text],
  },
  {
    title: '错误原因',
    dataIndex: 'err',
    ellipsis: false,
  },
  {
    operList: [
      {
        label: '导出',
        callback: ({ id }) =>
          TaskRecordServiceExport({ running_id: id }).then((v) =>
            linkExport(v.file_url),
          ),
      },
    ],
  },
];

const Comp: React.FC = () => {
  // 筛选值
  const [filterValue, setFilterValue] = useState<Record<string, any>>({});
  // 子组件的ref，可以调用子组件的方法
  const tableRef = useRef<TableListRef>();

  // 点击查询
  const onSearch = useCallback((data: any) => {
    const _filterValue = { simulate: data.simulate || 0 };
    if (data.rangeTime) {
      _filterValue['start_time'] = data.rangeTime[0];
      _filterValue['end_time'] = data.rangeTime[1];
    }
    if (data.name) {
      _filterValue['name'] = data.name;
    }
    setFilterValue(_filterValue);
  }, []);

  // 点击重置
  const onReset = () => {
    setFilterValue({});
  };

  return (
    <div className="common-page">
      <TableSearch
        fields={fields}
        onReset={onReset}
        onSearch={onSearch}
        className="margin-space"
      />
      <TableList
        onRef={tableRef}
        columns={columns}
        reqParams={filterValue}
        service={TaskRecordServicePage}
        pagination={{ showQuickJumper: true }}
      />
    </div>
  );
};

export default Comp;
