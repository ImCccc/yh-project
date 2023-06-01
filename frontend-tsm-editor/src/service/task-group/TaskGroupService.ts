// @ts-ignore

/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  TaskGroupServiceAddTaskGroup = '/rpc/tsm/TaskGroupService.AddTaskGroup',
  TaskGroupServiceDelTaskGroup = '/rpc/tsm/TaskGroupService.DelTaskGroup',
  TaskGroupServiceGetTaskGroup = '/rpc/tsm/TaskGroupService.GetTaskGroup',
  TaskGroupServiceListTaskGroup = '/rpc/tsm/TaskGroupService.ListTaskGroup',
  TaskGroupServiceUpdateTaskGroup = '/rpc/tsm/TaskGroupService.UpdateTaskGroup',
}

/** 添加分类任务 POST /rpc/tsm/TaskGroupService.AddTaskGroup */
export async function TaskGroupServiceAddTaskGroup(
  body: API.taskGroupAddTaskGroupRequest,
  options?: { [key: string]: any },
) {
  return request<API.taskGroupAddTaskGroupResponse>('/rpc/tsm/TaskGroupService.AddTaskGroup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除分类任务 POST /rpc/tsm/TaskGroupService.DelTaskGroup */
export async function TaskGroupServiceDelTaskGroup(
  body: API.taskGroupDelTaskGroupRequest,
  options?: { [key: string]: any },
) {
  return request<API.taskGroupDelTaskGroupResponse>('/rpc/tsm/TaskGroupService.DelTaskGroup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取分类任务 POST /rpc/tsm/TaskGroupService.GetTaskGroup */
export async function TaskGroupServiceGetTaskGroup(
  body: API.taskGroupGetTaskGroupRequest,
  options?: { [key: string]: any },
) {
  return request<API.taskGroupGetTaskGroupResponse>('/rpc/tsm/TaskGroupService.GetTaskGroup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分类任务列表 POST /rpc/tsm/TaskGroupService.ListTaskGroup */
export async function TaskGroupServiceListTaskGroup(
  body: API.taskGroupListTaskGroupRequest,
  options?: { [key: string]: any },
) {
  return request<API.taskGroupListTaskGroupResponse>('/rpc/tsm/TaskGroupService.ListTaskGroup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新分类任务 POST /rpc/tsm/TaskGroupService.UpdateTaskGroup */
export async function TaskGroupServiceUpdateTaskGroup(
  body: API.taskGroupUpdateTaskGroupRequest,
  options?: { [key: string]: any },
) {
  return request<API.taskGroupUpdateTaskGroupResponse>('/rpc/tsm/TaskGroupService.UpdateTaskGroup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
