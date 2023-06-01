import {useState, useEffect} from 'react';
import {TaskGroupServiceListTaskGroup} from '@/service/task-group/TaskGroupService';

export type TaskClassifyListProps = TaskClassifyProps[];
export type TaskClassifyProps = {
  id: string;
  name: string;
  code: string;
};

// 任务分类
export default function useTaskGroup() {
  const [taskClassifyList, setTaskClassifyList] =
    useState<TaskClassifyListProps>([]);
  useEffect(() => {
    TaskGroupServiceListTaskGroup({}).then((data) => {
      const list = data.task_groups || [];
      setTaskClassifyList(list);
    });
  }, []);
  return {taskClassifyList, setTaskClassifyList};
}
