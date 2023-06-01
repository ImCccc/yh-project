/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  TaskServiceAccept = '/rpc/data-annotation/TaskService.Accept',
  TaskServiceAdd = '/rpc/data-annotation/TaskService.Add',
  TaskServiceCopy = '/rpc/data-annotation/TaskService.Copy',
  TaskServiceDel = '/rpc/data-annotation/TaskService.Del',
  TaskServiceDetail = '/rpc/data-annotation/TaskService.Detail',
  TaskServiceDownload = '/rpc/data-annotation/TaskService.Download',
  TaskServiceGet = '/rpc/data-annotation/TaskService.Get',
  TaskServiceGetTaskMarkSample = '/rpc/data-annotation/TaskService.GetTaskMarkSample',
  TaskServiceGetTaskMarkSampleNumber = '/rpc/data-annotation/TaskService.GetTaskMarkSampleNumber',
  TaskServicePage = '/rpc/data-annotation/TaskService.Page',
  TaskServiceUpdate = '/rpc/data-annotation/TaskService.Update'
}

/** 验收任务 POST /rpc/data-annotation/TaskService.Accept */
export async function TaskServiceAccept(
  body: ANNOTATION.dataAnnotationTaskAcceptReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationTaskAcceptResp>('/rpc/data-annotation/TaskService.Accept', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 添加任务 POST /rpc/data-annotation/TaskService.Add */
export async function TaskServiceAdd(
  body: ANNOTATION.dataAnnotationTaskAddReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationTaskAddResp>('/rpc/data-annotation/TaskService.Add', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 复制任务 POST /rpc/data-annotation/TaskService.Copy */
export async function TaskServiceCopy(
  body: ANNOTATION.dataAnnotationTaskCopyReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationTaskCopyResp>('/rpc/data-annotation/TaskService.Copy', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除任务 POST /rpc/data-annotation/TaskService.Del */
export async function TaskServiceDel(
  body: ANNOTATION.dataAnnotationTaskDelReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationTaskDelResp>('/rpc/data-annotation/TaskService.Del', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询任务详情 POST /rpc/data-annotation/TaskService.Detail */
export async function TaskServiceDetail(
  body: ANNOTATION.dataAnnotationTaskDetailReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationTaskDetailResp>('/rpc/data-annotation/TaskService.Detail', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 下载任务 POST /rpc/data-annotation/TaskService.Download */
export async function TaskServiceDownload(
  body: ANNOTATION.dataAnnotationTaskDownloadReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationTaskDownloadResp>('/rpc/data-annotation/TaskService.Download', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询任务信息 POST /rpc/data-annotation/TaskService.Get */
export async function TaskServiceGet(
  body: ANNOTATION.dataAnnotationTaskGetReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationTaskGetResp>('/rpc/data-annotation/TaskService.Get', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取标注任务项详情 POST /rpc/data-annotation/TaskService.GetTaskMarkSample */
export async function TaskServiceGetTaskMarkSample(
  body: ANNOTATION.dataAnnotationGetTaskMarkSampleReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationGetTaskMarkSampleResp>('/rpc/data-annotation/TaskService.GetTaskMarkSample', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取标注任务项数量 POST /rpc/data-annotation/TaskService.GetTaskMarkSampleNumber */
export async function TaskServiceGetTaskMarkSampleNumber(
  body: ANNOTATION.dataAnnotationGetTaskMarkSampleNumberReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationGetTaskMarkSampleNumberResp>('/rpc/data-annotation/TaskService.GetTaskMarkSampleNumber', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询任务 POST /rpc/data-annotation/TaskService.Page */
export async function TaskServicePage(
  body: ANNOTATION.dataAnnotationTaskPageReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationTaskPageResp>('/rpc/data-annotation/TaskService.Page', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改任务 POST /rpc/data-annotation/TaskService.Update */
export async function TaskServiceUpdate(
  body: ANNOTATION.dataAnnotationTaskUpdateReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationTaskUpdateResp>('/rpc/data-annotation/TaskService.Update', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

