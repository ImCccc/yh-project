import { TableListColumns } from '@/components/TableList';
import { JOB_TYPE_ANNOTATION } from '@/utils/globalData';
import { formatDate } from '@/utils/util';
import { Button, Table } from 'antd';
import React, { useMemo, useState } from 'react';
import TaskInfo from './TaskInfo';
import TaskTransfer, { RowProps } from './TaskTransfer';
import useTaskData, { TableDataProps } from './useTaskData';

const Comp: React.FC = () => {
  // 任务移交需要的参数
  const [thisRow, setThisRow] = useState<RowProps>();

  // 初始化数据的hooks
  const { detail, dataSource, refresh } = useTaskData();

  const columns = useMemo<TableListColumns<TableDataProps>>(() => {
    const isAnnotation = detail.type === JOB_TYPE_ANNOTATION;
    const passedRate = isAnnotation
      ? []
      : [{ title: '质检通过率', dataIndex: 'quality_pass_rate' }];
    return [
      {
        title: isAnnotation ? '标注人员' : '质检人员',
        dataIndex: 'user_name',
      },
      {
        type: 'date',
        title: isAnnotation ? '标注状态' : '质检状态',
        dataIndex: 'job_status',
      },
      {
        title: isAnnotation ? '标注进度' : '质检进度',
        dataIndex: 'job_progress',
      },
      ...passedRate,
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (create_time) => formatDate(create_time),
      },
      {
        title: '操作',
        render: (_, { package_id, user_id, can_transfer }) =>
          can_transfer && (
            <Button
              type="link"
              onClick={() =>
                setThisRow({ packageId: package_id, userId: user_id })
              }
            >
              任务移交
            </Button>
          ),
      },
    ];
  }, [detail]);

  return (
    <>
      <TaskInfo detail={detail} />
      <div className="page-padding">
        <Table
          rowKey="package_id"
          columns={columns}
          pagination={false}
          dataSource={dataSource}
        />
      </div>
      <TaskTransfer detail={detail} row={thisRow} success={refresh} />
    </>
  );
};

export default Comp;
