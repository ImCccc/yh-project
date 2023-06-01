import { JobServiceAssign } from '@/services/dataAnnotation/JobService';
import { MemberServiceTaskNumber } from '@/services/dataAnnotation/MemberService';
import { Input, message, Modal, Table } from 'antd';
import type { ColumnType } from 'antd/lib/table';
import { TableRowSelection } from 'antd/lib/table/interface';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './LeaderAssignTask.module.less';

type CompProps = {
  ids: { teamId: string; jobId: string };
  success: () => void;
};

type ColumnProps = ANNOTATION.dataAnnotationMemberTaskNumber;

const columns: ColumnType<ColumnProps>[] = [
  {
    ellipsis: true,
    title: '成员姓名',
    dataIndex: 'user_name',
    render: (name, row) => `${name}(${row.email})`,
  },
  {
    width: 120,
    title: '标注量',
    dataIndex: 'mark_task_count',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.mark_task_count - b.mark_task_count,
  },
  {
    width: 120,
    title: '质检量',
    dataIndex: 'quality_task_count',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.quality_task_count - b.quality_task_count,
  },
];

const tableScroll = { y: 250 };

const Comp: React.FC<CompProps> = ({ ids, success }) => {
  const { teamId, jobId } = ids;
  const [secrch, setSecrch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [dataSource, setDataSource] = useState<ColumnProps[]>();

  const list = useMemo(() => {
    if (!dataSource) return [];
    return dataSource.filter((item) => item.user_name.includes(secrch));
  }, [dataSource, secrch]);

  const handleOk = useCallback(() => {
    if (!teamId || !userIds.length) {
      message.error('请选择成员');
      return;
    }

    JobServiceAssign({
      id: jobId,
      user_ids: userIds,
    }).then(() => {
      message.success('任务分配成功');
      setIsModalOpen(false);
      success();
    });
  }, [jobId, success, teamId, userIds]);

  const handleCancel = useCallback(() => setIsModalOpen(false), []);

  const searchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSecrch(e.target.value),
    [],
  );

  const rowSelection = useMemo<TableRowSelection<ColumnProps>>(
    () => ({
      type: 'checkbox',
      selectedRowKeys: userIds,
      onChange: (ids) => setUserIds(ids as string[]),
    }),
    [userIds],
  );

  useEffect(() => {
    if (!ids.teamId) return;
    setIsModalOpen(true);
    setSecrch('');
    MemberServiceTaskNumber({ team_id: ids.teamId, name: '' }).then(
      ({ list }) => setDataSource(list || []),
    );
  }, [ids]);

  useEffect(() => {
    if (!isModalOpen) {
      setDataSource([]);
      setUserIds([]);
    }
  }, [isModalOpen]);

  return (
    <Modal
      title="分配任务"
      onOk={handleOk}
      open={isModalOpen}
      onCancel={handleCancel}
      wrapClassName={styles.wrap}
    >
      <Input
        value={secrch}
        onChange={searchChange}
        className={styles.search}
        placeholder="输入成员名称进行搜索"
        suffix={<span className="iconfont icon-Shape"></span>}
      />
      <Table
        size="small"
        rowKey="user_id"
        columns={columns}
        dataSource={list}
        pagination={false}
        scroll={tableScroll}
        rowSelection={rowSelection}
      />
    </Modal>
  );
};

export default Comp;
