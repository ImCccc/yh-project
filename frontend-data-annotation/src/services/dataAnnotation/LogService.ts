/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  LogServicePage = '/rpc/data-annotation/LogService.Page'
}

/** 操作日志分页 POST /rpc/data-annotation/LogService.Page */
export async function LogServicePage(
  body: ANNOTATION.dataAnnotationLogPageReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationLogPageResp>('/rpc/data-annotation/LogService.Page', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

