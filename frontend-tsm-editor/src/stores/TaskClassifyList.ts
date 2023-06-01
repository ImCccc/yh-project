import {makeAutoObservable, action} from 'mobx';
import {TaskGroupServiceListTaskGroup} from '@/service/task-group/TaskGroupService';

export type TaskClassifyProps = {
  id: string;
  name: string;
  code: string;
};

export type TaskClassifyListProp = TaskClassifyProps[];

class TaskClassifyList {
  state = 'pending';
  list: TaskClassifyListProp = [];

  constructor() {
    makeAutoObservable(this);
  }

  get selectOptions() {
    return this.list.map((v) => ({
      value: v.code,
      label: v.name,
      id: v.id,
    }));
  }

  addTaskClassify = (item: TaskClassifyProps) => {
    this.list.push(item);
  };

  updateTaskClassify = (item: TaskClassifyProps) => {
    this.list = this.list.map((v) => {
      if (v.id === item.id) return item;
      return v;
    });
  };

  deleteTaskClassify = (id: string) => {
    this.list = this.list.filter((v) => v.id !== id);
  };

  initData() {
    if (this.state === 'done') return;
    this.state = 'done';
    TaskGroupServiceListTaskGroup({}).then(
      action('fetchSuccess', (data) => {
        const list = data.task_groups || [];
        this.list = list;
        this.state = 'done';
      }),
      action('fetchError', (error) => {
        this.state = 'error';
      })
    );
  }
}

export default TaskClassifyList;
