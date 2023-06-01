import CacheLink from '@/components/CacheRouteLink';
import { TableListColumns } from '@/components/TableList';
import { AUTHORITY_LEADER } from '@/config/constant';
import {
  JobServiceGet,
  JobServicePage,
} from '@/services/dataAnnotation/JobService';
import {
  TASK_TYPE_MARK,
  TEAM_TASK_STATUS_UNDONE,
  TEAM_TASK_STATUS_UNPASS,
} from '@/utils/globalData';
import { Button } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import {
  columnCreateTime,
  columnMarkType,
  columnNeedFinishTime,
  columnProgress,
  columnSampleCount,
  columnTaskType,
  columnUsername,
} from '.';
import LeaderAssignTask from './LeaderAssignTask';
import Table from './Table';
import useExpandable from './useExpandable';

type ColumnsProps = TableListColumns<ANNOTATION.dataAnnotationJob>;

const Comp: React.FC = () => {
  // 展开配置
  const expandable = useExpandable(JobServiceGet);
  // 分配任务弹窗需要的参数
  const [ids, setIds] = useState({ teamId: '', jobId: '' });

  const [refresh, setRefresh] = useState<Record<string, any>>();
  const refreshTable = useCallback(() => setRefresh({}), []);

  const columns: ColumnsProps = useMemo(() => {
    return [
      {
        title: '任务名称',
        dataIndex: 'name',
        render: (name: string, row) => {
          if (row.status === TEAM_TASK_STATUS_UNPASS) {
            // 验收不通过 -> 不能查看详情
            return name;
          }
          return (
            <CacheLink to={`/task/index/detalis/${AUTHORITY_LEADER}/${row.id}`}>
              {name}
            </CacheLink>
          );
        },
      },
      columnMarkType,
      columnSampleCount,
      columnTaskType,
      columnProgress,
      columnUsername,
      columnCreateTime,
      columnNeedFinishTime,
      {
        title: '操作',
        dataIndex: 'id',
        render: (_, { type, mark_team, quality_team, id, status }) => {
          // 验收不通过, 不能查看详情
          if (status === TEAM_TASK_STATUS_UNPASS) return '';
          if (status === TEAM_TASK_STATUS_UNDONE) {
            const teamId =
              type === TASK_TYPE_MARK ? mark_team.id : quality_team.id;
            return (
              <Button type="link" onClick={() => setIds({ jobId: id, teamId })}>
                分配任务
              </Button>
            );
          }

          return (
            <CacheLink to={`/task/index/detalis/${AUTHORITY_LEADER}/${id}`}>
              任务详情
            </CacheLink>
          );
        },
      },
    ];
  }, []);

  return (
    <>
      <Table
        refresh={refresh}
        columns={columns}
        expandable={expandable}
        service={JobServicePage}
      />
      <LeaderAssignTask ids={ids} success={refreshTable} />
    </>
  );
};

export default Comp;
