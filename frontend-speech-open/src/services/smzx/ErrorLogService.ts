/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  ErrorLogServiceAdd = '/rpc/smzx.service-robotics/ErrorLogService.Add',
  ErrorLogServicePage = '/rpc/smzx.service-robotics/ErrorLogService.Page'
}

/** 添加异常日志 POST /rpc/smzx.service-robotics/ErrorLogService.Add */
export async function ErrorLogServiceAdd(
  body: SMZX.smzxErrorLogAddReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxErrorLogAddResp>('/rpc/smzx.service-robotics/ErrorLogService.Add', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 异常日志列表 POST /rpc/smzx.service-robotics/ErrorLogService.Page */
export async function ErrorLogServicePage(
  body: SMZX.smzxErrorLogPageReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxErrorLogPageResp>('/rpc/smzx.service-robotics/ErrorLogService.Page', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

