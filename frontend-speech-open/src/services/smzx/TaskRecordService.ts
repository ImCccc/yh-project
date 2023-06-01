/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  TaskRecordServicePage = '/rpc/smzx.service-robotics/TaskRecordService.Page'
}

/** 任务记录分页 POST /rpc/smzx.service-robotics/TaskRecordService.Page */
export async function TaskRecordServicePage(
  body: SMZX.smzxTaskRecordPageReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskRecordPageResp>('/rpc/smzx.service-robotics/TaskRecordService.Page', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

