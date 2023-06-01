import Details, { FieldListProps } from '@/components/Details';
import { JOB_TYPE_ANNOTATION } from '@/utils/globalData';
import { getPercentage } from '@/utils/util';
import React, { useMemo } from 'react';
import { DetailProps } from './useTaskData';

type CompProps = {
  detail: DetailProps;
};

const Comp: React.FC<CompProps> = ({ detail }) => {
  const progressText = useMemo(() => {
    const total = detail.task_count || 0;
    const commitCount = detail.commited_task_count || 0;
    const msg =
      detail.type === JOB_TYPE_ANNOTATION
        ? `(已标注${commitCount}, 未标注${total - commitCount})`
        : `(已质检${commitCount}, 未质检${total - commitCount})`;
    return `${getPercentage(total, commitCount)}% ${msg}`;
  }, [detail]);

  const memberLabel = useMemo(
    () => (detail.type === JOB_TYPE_ANNOTATION ? '标注人数:' : '质检人数:'),
    [detail.type],
  );

  const fieldList = useMemo<FieldListProps>(() => {
    return [
      { label: '任务名称:', value: detail.name },
      { label: '数据集名称:', value: detail.data_name },
      { label: memberLabel, value: detail.team_member_count },
      { label: '样本总量:', value: detail.task_count },
      { label: '整体任务进度:', value: progressText },
    ];
  }, [detail, memberLabel, progressText]);

  return <Details fieldList={fieldList} />;
};

export default React.memo(Comp);
