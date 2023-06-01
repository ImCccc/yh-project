import Details, { FieldListProps } from '@/components/Details';
import { getPercentage } from '@/utils/util';
import React, { useMemo } from 'react';
import { DetailProps } from './useTaskData';

type CompProps = {
  detail: DetailProps;
};

const Comp: React.FC<CompProps> = ({ detail }) => {
  const progressText = useMemo(() => {
    const total = detail.task_count;
    const commitCount = detail.commit_task_count;
    return `${getPercentage(
      total,
      commitCount,
    )}% (已标注${commitCount}, 未标注${total - commitCount})`;
  }, [detail]);

  const fieldList = useMemo<FieldListProps>(() => {
    return [
      { label: '任务名称:', value: detail.name },
      { label: '数据集名称:', value: detail.data_name },
      { label: '标注人数:', value: detail.mark_member_count },
      { label: '质检人数:', value: detail.quality_member_count },
      { label: '样本总量:', value: detail.task_count },
      { label: '标注任务进度:', value: progressText },
    ];
  }, [detail, progressText]);

  return <Details fieldList={fieldList} />;
};

export default React.memo(Comp);
