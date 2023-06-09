/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  BroadcastServiceAdd = '/rpc/smzx.service-robotics/BroadcastService.Add',
  BroadcastServiceDel = '/rpc/smzx.service-robotics/BroadcastService.Del',
  BroadcastServiceGet = '/rpc/smzx.service-robotics/BroadcastService.Get',
  BroadcastServicePage = '/rpc/smzx.service-robotics/BroadcastService.Page',
  BroadcastServiceUpdate = '/rpc/smzx.service-robotics/BroadcastService.Update'
}

/** 添加播报 POST /rpc/smzx.service-robotics/BroadcastService.Add */
export async function BroadcastServiceAdd(
  body: SMZX.smzxBroadcastAddReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxBroadcastAddResp>('/rpc/smzx.service-robotics/BroadcastService.Add', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除播报 POST /rpc/smzx.service-robotics/BroadcastService.Del */
export async function BroadcastServiceDel(
  body: SMZX.smzxBroadcastDelReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxBroadcastDelResp>('/rpc/smzx.service-robotics/BroadcastService.Del', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取播报 POST /rpc/smzx.service-robotics/BroadcastService.Get */
export async function BroadcastServiceGet(
  body: SMZX.smzxBroadcastGetReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxBroadcastGetResp>('/rpc/smzx.service-robotics/BroadcastService.Get', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 播报列表 POST /rpc/smzx.service-robotics/BroadcastService.Page */
export async function BroadcastServicePage(
  body: SMZX.smzxBroadcastPageReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxBroadcastPageResp>('/rpc/smzx.service-robotics/BroadcastService.Page', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新播报 POST /rpc/smzx.service-robotics/BroadcastService.Update */
export async function BroadcastServiceUpdate(
  body: SMZX.smzxBroadcastUpdateReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxBroadcastUpdateResp>('/rpc/smzx.service-robotics/BroadcastService.Update', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

