/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  TaskDispatchServiceCommon = '/rpc/smzx/TaskDispatchService.Common'
}

/** 此处后端没有提供注释 POST /rpc/smzx/TaskDispatchService.Common */
export async function TaskDispatchServiceCommon(
  body: SMZX.smzxCommonReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxCommonResp>('/rpc/smzx/TaskDispatchService.Common', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

