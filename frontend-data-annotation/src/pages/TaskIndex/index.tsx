import CompAuth from '@/components/CompAuth';
import { TableListColumnProps } from '@/components/TableList';
import { dimensionTypeMapText, taskTypeMapText } from '@/utils/globalData';
import { splitJsx } from '@/utils/util';
import { Link } from 'react-router-dom';
import Admin from './Admin';
import Leader from './Leader';
import Member from './Member';

export const columnName = {
  title: '任务名称',
  dataIndex: 'name',
  render: (name: string) => <Link to="/task/index/details">{name}</Link>,
};

export const columnMarkType = {
  width: 100,
  title: '标注类型',
  dataIndex: 'mark_type',
  render: (markType: number) => dimensionTypeMapText[markType],
};

export const columnProgress = {
  width: 100,
  title: '任务进度',
  dataIndex: 'progress',
  render: (_: string, row: any) =>
    splitJsx(<br />, ...(row.task_progress || row.progress || '').split('|')),
};

export const columnTaskType = {
  width: 100,
  title: '任务类型',
  dataIndex: 'type',
  render: (type: number) => taskTypeMapText[type],
};

export const columnUsername = {
  title: '创建人',
  dataIndex: 'create_username',
};

export const columnCreateTime: TableListColumnProps<any> = {
  width: 120,
  type: 'dateTime',
  title: '创建时间',
  dataIndex: 'create_time',
};

export const columnNeedFinishTime = {
  width: 120,
  type: 'dateTime',
  title: '截止时间',
  dataIndex: 'need_finish_time',
};

export const columnSampleCount = {
  title: '样本数量',
  dataIndex: 'sample_count',
};

const Comp: React.FC = () => (
  <CompAuth admin={Admin} mumber={Member} team={Leader} />
);

export default Comp;
