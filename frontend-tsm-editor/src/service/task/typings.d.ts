// @ts-ignore
/* eslint-disable */

declare namespace API {
  type taskAddTaskRequest = {
    task: taskTask;
  };

  type taskAddTaskResponse = {
    code: number;
    msg: string;
    task: taskTask;
  };

  type taskDelTaskRequest = {
    id: string;
  };

  type taskDelTaskResponse = {
    code: number;
    id: string;
    msg: string;
  };

  type taskGetTaskRequest = {
    id: string;
  };

  type taskGetTaskResponse = {
    code: number;
    msg: string;
    task: taskTask;
  };

  type taskListTaskRequest = {
    /** 第几页，从1开始 */
    page: number;
    /** 每页多少条 */
    size: number;
  };

  type taskListTaskResponse = {
    code: number;
    msg: string;
    /** 任务列表 */
    tasks: taskTaskBase[];
    /** 列表数量 */
    total: number;
  };

  type taskPushTaskItem = {
    device_sn: string;
    device_type_id: string;
  };

  type taskPushTaskRequest = {
    devices: taskPushTaskItem[];
    id: string;
  };

  type taskPushTaskResponse = {
    code: number;
    devices: taskPushTaskItem[];
    msg: string;
  };

  type taskTask = {
    /** 任务分类 */
    group_code: string;
    /** 任务id */
    id: string;
    /** 任务节点数据 */
    list: string;
    /** 任务名称 */
    name: string;
  };

  type taskTaskBase = {
    /** 任务分类 */
    group_code: string;
    /** 任务id */
    id: string;
    /** 任务名称 */
    name: string;
  };

  type taskUpdateTaskRequest = {
    task: taskTask;
  };

  type taskUpdateTaskResponse = {
    code: number;
    msg: string;
    task: taskTask;
  };
}
