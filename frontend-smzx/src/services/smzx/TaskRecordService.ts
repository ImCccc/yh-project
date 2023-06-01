/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  TaskRecordServiceDetailV2 = '/rpc/smzx.smzx/TaskRecordService.DetailV2',
  TaskRecordServiceExport = '/rpc/smzx.smzx/TaskRecordService.Export',
  TaskRecordServiceGet = '/rpc/smzx.smzx/TaskRecordService.Get',
  TaskRecordServiceInnerPage = '/rpc/smzx.smzx/TaskRecordService.InnerPage',
  TaskRecordServiceListByCode = '/rpc/smzx.smzx/TaskRecordService.ListByCode',
  TaskRecordServicePage = '/rpc/smzx.smzx/TaskRecordService.Page',
  TaskRecordServiceSyncRunning = '/rpc/smzx.smzx/TaskRecordService.SyncRunning'
}

/** Android 获取记录详情版本2 POST /rpc/smzx.smzx/TaskRecordService.DetailV2 */
export async function TaskRecordServiceDetailV2(
  body: SMZX.smzxTaskRecordDetailV2Req,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskRecordDetailV2Resp>('/rpc/smzx.smzx/TaskRecordService.DetailV2', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出任务记录 POST /rpc/smzx.smzx/TaskRecordService.Export */
export async function TaskRecordServiceExport(
  body: SMZX.smzxTaskRecordExportReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskRecordExportResp>('/rpc/smzx.smzx/TaskRecordService.Export', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** rms获取记录详情 POST /rpc/smzx.smzx/TaskRecordService.Get */
export async function TaskRecordServiceGet(
  body: SMZX.smzxTaskRecordGetReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskRecordGetResp>('/rpc/smzx.smzx/TaskRecordService.Get', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** rms获取分页记录 POST /rpc/smzx.smzx/TaskRecordService.InnerPage */
export async function TaskRecordServiceInnerPage(
  body: SMZX.smzxTaskRecordInnerPageReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskRecordInnerPageResp>('/rpc/smzx.smzx/TaskRecordService.InnerPage', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Android 获取记录列表 POST /rpc/smzx.smzx/TaskRecordService.ListByCode */
export async function TaskRecordServiceListByCode(
  body: SMZX.smzxTaskRecordListByCodeReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskRecordListByCodeResp>('/rpc/smzx.smzx/TaskRecordService.ListByCode', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 任务记录分页 POST /rpc/smzx.smzx/TaskRecordService.Page */
export async function TaskRecordServicePage(
  body: SMZX.smzxTaskRecordPageReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskRecordPageResp>('/rpc/smzx.smzx/TaskRecordService.Page', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Android 同步执行中任务详情 POST /rpc/smzx.smzx/TaskRecordService.SyncRunning */
export async function TaskRecordServiceSyncRunning(
  body: SMZX.smzxTaskRecordSyncRunningReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskRecordSyncRunningResp>('/rpc/smzx.smzx/TaskRecordService.SyncRunning', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

