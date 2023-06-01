/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  DataServiceAdd = '/rpc/data-annotation/DataService.Add',
  DataServiceAppend = '/rpc/data-annotation/DataService.Append',
  DataServiceAppendRecord = '/rpc/data-annotation/DataService.AppendRecord',
  DataServiceDel = '/rpc/data-annotation/DataService.Del',
  DataServiceFilePage = '/rpc/data-annotation/DataService.FilePage',
  DataServiceGet = '/rpc/data-annotation/DataService.Get',
  DataServicePage = '/rpc/data-annotation/DataService.Page',
  DataServiceTaskPage = '/rpc/data-annotation/DataService.TaskPage',
  DataServiceUpdate = '/rpc/data-annotation/DataService.Update'
}

/** 创建数据集 POST /rpc/data-annotation/DataService.Add */
export async function DataServiceAdd(
  body: ANNOTATION.dataAnnotationDataAddReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationDataAddResp>('/rpc/data-annotation/DataService.Add', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 追加数据集 POST /rpc/data-annotation/DataService.Append */
export async function DataServiceAppend(
  body: ANNOTATION.dataAnnotationDataAppendReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationDataAppendResp>('/rpc/data-annotation/DataService.Append', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取追加记录 POST /rpc/data-annotation/DataService.AppendRecord */
export async function DataServiceAppendRecord(
  body: ANNOTATION.dataAnnotationDataAppendRecordReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationDataAppendRecordResp>('/rpc/data-annotation/DataService.AppendRecord', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除数据集 POST /rpc/data-annotation/DataService.Del */
export async function DataServiceDel(
  body: ANNOTATION.dataAnnotationDataDelReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationDataDelResp>('/rpc/data-annotation/DataService.Del', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取数据集关联的文件 POST /rpc/data-annotation/DataService.FilePage */
export async function DataServiceFilePage(
  body: ANNOTATION.dataAnnotationDataFilePageReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationDataFilePageResp>('/rpc/data-annotation/DataService.FilePage', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取数据集详情 POST /rpc/data-annotation/DataService.Get */
export async function DataServiceGet(
  body: ANNOTATION.dataAnnotationDataGetReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationDataGetResp>('/rpc/data-annotation/DataService.Get', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 数据集列表 POST /rpc/data-annotation/DataService.Page */
export async function DataServicePage(
  body: ANNOTATION.dataAnnotationDataPageReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationDataPageResp>('/rpc/data-annotation/DataService.Page', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取数据集关联的任务 POST /rpc/data-annotation/DataService.TaskPage */
export async function DataServiceTaskPage(
  body: ANNOTATION.dataAnnotationDataTaskPageReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationDataTaskPageResp>('/rpc/data-annotation/DataService.TaskPage', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改数据集 POST /rpc/data-annotation/DataService.Update */
export async function DataServiceUpdate(
  body: ANNOTATION.dataAnnotationDataUpdateReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationDataUpdateResp>('/rpc/data-annotation/DataService.Update', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

