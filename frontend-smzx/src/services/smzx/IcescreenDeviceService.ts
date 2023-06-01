/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  IcescreenDeviceServiceCommand = '/rpc/smzx.smzx/IcescreenDeviceService.Command',
  IcescreenDeviceServiceGet = '/rpc/smzx.smzx/IcescreenDeviceService.Get',
  IcescreenDeviceServiceList = '/rpc/smzx.smzx/IcescreenDeviceService.List',
  IcescreenDeviceServicePlay = '/rpc/smzx.smzx/IcescreenDeviceService.Play'
}

/** 通用控制指令 返回成功即冰屏响应成功 POST /rpc/smzx.smzx/IcescreenDeviceService.Command */
export async function IcescreenDeviceServiceCommand(
  body: SMZX.smzxIcescreenDeviceCommandReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxIcescreenDeviceCommandResp>('/rpc/smzx.smzx/IcescreenDeviceService.Command', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 冰屏详情 POST /rpc/smzx.smzx/IcescreenDeviceService.Get */
export async function IcescreenDeviceServiceGet(
  body: SMZX.smzxIcescreenDeviceGetReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxIcescreenDeviceGetResp>('/rpc/smzx.smzx/IcescreenDeviceService.Get', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 冰屏列表 POST /rpc/smzx.smzx/IcescreenDeviceService.List */
export async function IcescreenDeviceServiceList(
  body: SMZX.smzxIcescreenDeviceListReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxIcescreenDeviceListResp>('/rpc/smzx.smzx/IcescreenDeviceService.List', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 视频播放 POST /rpc/smzx.smzx/IcescreenDeviceService.Play */
export async function IcescreenDeviceServicePlay(
  body: SMZX.smzxIcescreenDevicePlayReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxIcescreenDevicePlayResp>('/rpc/smzx.smzx/IcescreenDeviceService.Play', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

