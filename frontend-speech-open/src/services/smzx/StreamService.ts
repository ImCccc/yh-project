/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  StreamServiceBigScreen = '/rpc/smzx.service-robotics/StreamService.BigScreen',
  StreamServiceIceScreen = '/rpc/smzx.service-robotics/StreamService.IceScreen',
  StreamServicePad = '/rpc/smzx.service-robotics/StreamService.Pad'
}

/** 大屏双向流 POST /rpc/smzx.service-robotics/StreamService.BigScreen */
export async function StreamServiceBigScreen(
  body: SMZX.smzxStreamReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxStreamResp>('/rpc/smzx.service-robotics/StreamService.BigScreen', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 冰屏双向流 POST /rpc/smzx.service-robotics/StreamService.IceScreen */
export async function StreamServiceIceScreen(
  body: SMZX.smzxStreamReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxStreamResp>('/rpc/smzx.service-robotics/StreamService.IceScreen', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** pad端双向流 POST /rpc/smzx.service-robotics/StreamService.Pad */
export async function StreamServicePad(
  body: SMZX.smzxStreamReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxStreamResp>('/rpc/smzx.service-robotics/StreamService.Pad', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

