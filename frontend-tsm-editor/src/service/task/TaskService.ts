// @ts-ignore

/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  TaskServiceAddTask = '/rpc/tsm/TaskService.AddTask',
  TaskServiceDelTask = '/rpc/tsm/TaskService.DelTask',
  TaskServiceGetTask = '/rpc/tsm/TaskService.GetTask',
  TaskServiceListTask = '/rpc/tsm/TaskService.ListTask',
  TaskServicePushTask = '/rpc/tsm/TaskService.PushTask',
  TaskServiceUpdateTask = '/rpc/tsm/TaskService.UpdateTask',
}

/** 添加任务 POST /rpc/tsm/TaskService.AddTask */
export async function TaskServiceAddTask(body: API.taskAddTaskRequest, options?: { [key: string]: any }) {
  return request<API.taskAddTaskResponse>('/rpc/tsm/TaskService.AddTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除任务 POST /rpc/tsm/TaskService.DelTask */
export async function TaskServiceDelTask(body: API.taskDelTaskRequest, options?: { [key: string]: any }) {
  return request<API.taskDelTaskResponse>('/rpc/tsm/TaskService.DelTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取任务 POST /rpc/tsm/TaskService.GetTask */
export async function TaskServiceGetTask(body: API.taskGetTaskRequest, options?: { [key: string]: any }) {
  return request<API.taskGetTaskResponse>('/rpc/tsm/TaskService.GetTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 任务列表 POST /rpc/tsm/TaskService.ListTask */
export async function TaskServiceListTask(body: API.taskListTaskRequest, options?: { [key: string]: any }) {
  return request<API.taskListTaskResponse>('/rpc/tsm/TaskService.ListTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 任务发送 POST /rpc/tsm/TaskService.PushTask */
export async function TaskServicePushTask(body: API.taskPushTaskRequest, options?: { [key: string]: any }) {
  return request<API.taskPushTaskResponse>('/rpc/tsm/TaskService.PushTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新任务 POST /rpc/tsm/TaskService.UpdateTask */
export async function TaskServiceUpdateTask(body: API.taskUpdateTaskRequest, options?: { [key: string]: any }) {
  return request<API.taskUpdateTaskResponse>('/rpc/tsm/TaskService.UpdateTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
