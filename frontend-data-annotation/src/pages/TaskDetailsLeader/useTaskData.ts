import { JobServiceDetail } from '@/services/dataAnnotation/JobService';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export type TableDataProps = ANNOTATION.dataAnnotationJobPackage;
export type DetailProps = Partial<ANNOTATION.dataAnnotationJob>;

const defaultValue = {
  id: '', // id
  name: '', // 任务名称
  data_name: '', // 数据集名称
  team_member_count: 0, // 团队人数
  type: 1, // 作业类型(1 标注 2 质检)
  task_count: 0, // 样本总量
  commited_task_count: 0, // 已提交的任务数
};

function useTaskData() {
  const params = useParams();
  const [dataSource, setDataSource] = useState<TableDataProps[]>([]);
  const [detail, setDetail] = useState<DetailProps>({ ...defaultValue });

  const refresh = useCallback(() => {
    if (!params.id) return;
    JobServiceDetail({ id: params.id }).then((data) => {
      setDetail(data.job || { ...defaultValue });
      setDataSource(data.list);
    });
  }, [params.id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { detail, dataSource, refresh };
}
export default useTaskData;
