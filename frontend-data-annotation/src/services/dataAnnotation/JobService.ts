/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  JobServiceAssign = '/rpc/data-annotation/JobService.Assign',
  JobServiceDetail = '/rpc/data-annotation/JobService.Detail',
  JobServiceGet = '/rpc/data-annotation/JobService.Get',
  JobServicePage = '/rpc/data-annotation/JobService.Page',
  JobServiceTransfer = '/rpc/data-annotation/JobService.Transfer'
}

/** 队长分配任务 POST /rpc/data-annotation/JobService.Assign */
export async function JobServiceAssign(
  body: ANNOTATION.dataAnnotationJobAssignReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationJobAssignResp>('/rpc/data-annotation/JobService.Assign', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 队长任务详情 POST /rpc/data-annotation/JobService.Detail */
export async function JobServiceDetail(
  body: ANNOTATION.dataAnnotationJobDetailReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationJobDetailResp>('/rpc/data-annotation/JobService.Detail', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 队长任务获取 POST /rpc/data-annotation/JobService.Get */
export async function JobServiceGet(
  body: ANNOTATION.dataAnnotationJobGetReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationJobGetResp>('/rpc/data-annotation/JobService.Get', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 队长分页任务 POST /rpc/data-annotation/JobService.Page */
export async function JobServicePage(
  body: ANNOTATION.dataAnnotationJobPageReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationJobPageResp>('/rpc/data-annotation/JobService.Page', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 队长任务包移交 POST /rpc/data-annotation/JobService.Transfer */
export async function JobServiceTransfer(
  body: ANNOTATION.dataAnnotationJobTransferReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationJobTransferResp>('/rpc/data-annotation/JobService.Transfer', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

