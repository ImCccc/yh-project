import { TableListColumns } from '@/components/TableList';
import { formatDate } from '@/utils/util';
import { Table } from 'antd';
import React from 'react';
import TaskInfo from './TaskInfo';
import useTaskData, { TableDataProps } from './useTaskData';

const Comp: React.FC = () => {
  const { detail, dataSource } = useTaskData();

  const columns: TableListColumns<TableDataProps> = [
    {
      title: '标注人员',
      dataIndex: 'mark_user',
    },
    {
      type: 'date',
      title: '标注状态',
      dataIndex: 'mark_status_text',
    },
    {
      title: '标注进度',
      dataIndex: 'mark_progress',
    },
    {
      title: '质检用户',
      dataIndex: 'quality_user',
    },
    {
      title: '质检状态',
      dataIndex: 'quality_status_text',
    },
    {
      title: '质检进度',
      dataIndex: 'quality_progress',
    },
    {
      title: '质检通过率',
      dataIndex: 'passed_quality_rate',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render: (time) => formatDate(time),
    },
  ];

  return (
    <>
      <TaskInfo detail={detail} />
      <div className="page-padding">
        <Table
          rowKey="id"
          columns={columns}
          pagination={false}
          dataSource={dataSource}
        />
      </div>
    </>
  );
};

export default Comp;
