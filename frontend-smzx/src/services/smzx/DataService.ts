/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  DataServiceAdapter = '/rpc/smzx.smzx/DataService.Adapter'
}

/** 此处后端没有提供注释 POST /rpc/smzx.smzx/DataService.Adapter */
export async function DataServiceAdapter(
  body: SMZX.smzxDataAdapterReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxDataAdapterResp>('/rpc/smzx.smzx/DataService.Adapter', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

