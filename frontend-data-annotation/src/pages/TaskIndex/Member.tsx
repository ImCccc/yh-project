import CacheLink from '@/components/CacheRouteLink';
import { TableListColumns } from '@/components/TableList';
import {
  PackageServiceCommitMark,
  PackageServicePage,
} from '@/services/dataAnnotation/PackageService';
import { TaskServiceGet } from '@/services/dataAnnotation/TaskService';
import {
  MARK_STATUS_UNDONE,
  QUALITY_STATUS_NOPASS,
  QUALITY_STATUS_UNDONE,
  taskTypeMapText,
  TASK_TYPE_MARK,
} from '@/utils/globalData';
import { modalConfirm, splitButtons } from '@/utils/util';
import { Button } from 'antd';
import React, { useMemo, useState } from 'react';
import {
  columnCreateTime,
  columnMarkType,
  columnNeedFinishTime,
  columnProgress,
  columnSampleCount,
  columnUsername,
} from '.';
import ModalQualityResult from './ModalQualityResult';
import Table from './Table';
import useExpandable from './useExpandable';

type Obj = { [k: string]: any };
type ColumnsProps = TableListColumns<ANNOTATION.dataAnnotationPackage>;

const Comp: React.FC = () => {
  const [refresh, setRefresh] = useState<Obj>();
  const [open, setOpen] = useState<Obj>();
  // 展开配置
  const expandable = useExpandable(TaskServiceGet);

  const columns: ColumnsProps = useMemo(() => {
    return [
      {
        width: 120,
        title: '任务名称',
        dataIndex: 'name',
      },
      columnMarkType,
      columnSampleCount,
      {
        width: 90,
        title: '任务类型',
        dataIndex: 'job_type',
        render: (job_type) => taskTypeMapText[job_type],
      },
      columnProgress,
      columnUsername,
      columnCreateTime,
      columnNeedFinishTime,
      {
        width: 180,
        title: '操作',
        render: (_, row) => {
          /* 
            作业类型(job_type): 1->标注  2->质检 
            标注状态(mark_status):  1->标注中 2->标注已提交 3->验收通过 4->验收不通过
            质检状态(quality_status):  1->质检中 2->质检通过 3->质检不通过 4->验收通过 5->验收不通过
          */
          const { job_type, quality_status, mark_status, mark_type, id, name } =
            row;

          const markLink = (
            <CacheLink to={`/task/index/mark/${mark_type}/${id}`}>
              去标注
            </CacheLink>
          );

          const qualityLink = (
            <CacheLink to={`/task/index/quality/${mark_type}/${id}`}>
              去质检
            </CacheLink>
          );

          const resultLink = (
            <Button type="link" onClick={() => setOpen({ id })}>
              质检结果
            </Button>
          );

          const submitLink = (
            <Button
              type="link"
              onClick={async () => {
                await modalConfirm(
                  <>
                    是否提交 <span className="del">{name}</span> 这个任务？
                  </>,
                  { title: '提交任务' },
                );
                await PackageServiceCommitMark({ id });
                setRefresh({});
              }}
            >
              提交
            </Button>
          );

          if (job_type === TASK_TYPE_MARK) {
            // 状态不是标注中, 没有操作按钮
            if (mark_status !== MARK_STATUS_UNDONE) return '';

            // 状态是标注中,看看是否质检不通过, 如果是需要显示质检结果
            return quality_status === QUALITY_STATUS_NOPASS
              ? splitButtons(markLink, submitLink, resultLink)
              : splitButtons(markLink, submitLink);
          }

          // 质检任务, 状态是质检中, 显示去质检
          return quality_status === QUALITY_STATUS_UNDONE ? qualityLink : '';
        },
      },
    ];
  }, []);

  return (
    <>
      <Table
        columns={columns}
        refresh={refresh}
        expandable={expandable}
        service={PackageServicePage}
      />
      <ModalQualityResult open={open} />
    </>
  );
};

export default Comp;
