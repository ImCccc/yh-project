import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { RangePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';

import TableList, { TableListColumns } from '@/components/TableList';
import TableSearch from '@/components/TableSearch';

import { DeviceServicePage } from '@/services/speechOpen/DeviceService';

import styles from './index.module.less';

// 不能选当天之后的日期
const disabledDate: RangePickerProps['disabledDate'] = (
  current: moment.Moment,
): boolean => {
  return current && current >= moment().endOf('day');
};

const disabledTime = () => {
  return true;
};

const fields = [
  {
    label: '接入时间',
    type: 'RangePicker',
    placeholder: ['开始时间', '结束时间'],
    key: 'rangePicker',
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

// 表格列
const columns: TableListColumns<SMZX.smzxBroadcast> = [
  {
    title: '设备SN',
    dataIndex: 'device_sn',
    key: 'device_sn',
  },
  {
    title: '设备MAC',
    dataIndex: 'mac',
    key: 'mac',
  },
  {
    title: '操作系统',
    dataIndex: 'system',
    key: 'system',
  },
  {
    title: 'SDK版本',
    dataIndex: 'sdk_version',
    key: 'sdk_version',
  },
  {
    title: '接入时间',
    dataIndex: 'connect_time',
    key: 'connect_time',
    // 时间格式
    timeFormat: 'YYYY-MM-DD HH:mm:ss',
  },
];

const Comp: React.FC = () => {
  const { id } = useParams();
  const [reqParams, setReqParams] = useState<Record<string, any>>({
    app_id: id,
  });
  // 点击查询
  const onSearch = (data: Record<string, any>) => {
    if (data.rangePicker) {
      setReqParams({
        app_id: id,
        start_time: data.rangePicker[0],
        end_time: data.rangePicker[1],
      });
    } else {
      setReqParams({ app_id: id });
    }
  };

  // 点击重置
  const onReset = () => {
    setReqParams({ app_id: id });
  };

  return (
    <div className={styles.container}>
      <TableSearch fields={fields} onReset={onReset} onSearch={onSearch} />
      <TableList
        className={styles.table}
        service={DeviceServicePage}
        reqParams={reqParams}
        columns={columns}
      />
    </div>
  );
};

export default Comp;
