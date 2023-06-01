// @ts-ignore
/* eslint-disable */

declare namespace API {
  type taskGroupAddTaskGroupRequest = {
    task_group: taskGroupTaskGroup;
  };

  type taskGroupAddTaskGroupResponse = {
    code: number;
    msg: string;
    task_group: taskGroupTaskGroup;
  };

  type taskGroupDelTaskGroupRequest = {
    id: string;
  };

  type taskGroupDelTaskGroupResponse = {
    code: number;
    id: string;
    msg: string;
  };

  type taskGroupGetTaskGroupRequest = {
    id: string;
  };

  type taskGroupGetTaskGroupResponse = {
    code: number;
    msg: string;
    task_group: taskGroupTaskGroup;
  };

  type taskGroupListTaskGroupRequest = Record<string, any>;

  type taskGroupListTaskGroupResponse = {
    code: number;
    msg: string;
    /** 分类任务列表 */
    task_groups: taskGroupTaskGroup[];
    /** 列表数量 */
    total: number;
  };

  type taskGroupTaskGroup = {
    /** 分类任务分类 */
    code: string;
    /** 分类任务id */
    id: string;
    /** 分类任务名称 */
    name: string;
  };

  type taskGroupUpdateTaskGroupRequest = {
    task_group: taskGroupTaskGroup;
  };

  type taskGroupUpdateTaskGroupResponse = {
    code: number;
    msg: string;
    task_group: taskGroupTaskGroup;
  };
}
