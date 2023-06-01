import { TaskServiceDetail } from '@/services/dataAnnotation/TaskService';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export type TableDataProps = ANNOTATION.dataAnnotationTaskPackage;
export type DetailProps = ANNOTATION.dataAnnotationTaskDetail;

const defaultValue = {
  id: '', // id
  name: '', // 任务名称
  data_name: '', // 数据集名称
  task_count: 0, // 任务总数
  team_member_count: 0, // 团队人数
  commit_task_count: 0, // 已提交的任务数
  quality_member_count: 0, // 质检参与人数
  mark_member_count: 0, // 标注参与人数
};

function useTaskData() {
  const params = useParams();
  const [dataSource, setDataSource] = useState<TableDataProps[]>([]);
  const [detail, setDetail] = useState<DetailProps>({ ...defaultValue });

  useEffect(() => {
    if (!params.id) return;
    TaskServiceDetail({ id: params.id }).then((data) => {
      setDataSource(data.list);
      setDetail(data.item || { ...defaultValue });
    });
  }, [params.id]);

  return { detail, dataSource };
}
export default useTaskData;
