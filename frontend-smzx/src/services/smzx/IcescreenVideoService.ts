/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  IcescreenVideoServiceAdd = '/rpc/smzx.smzx/IcescreenVideoService.Add',
  IcescreenVideoServiceDel = '/rpc/smzx.smzx/IcescreenVideoService.Del',
  IcescreenVideoServiceGet = '/rpc/smzx.smzx/IcescreenVideoService.Get',
  IcescreenVideoServiceList = '/rpc/smzx.smzx/IcescreenVideoService.List',
  IcescreenVideoServicePage = '/rpc/smzx.smzx/IcescreenVideoService.Page',
  IcescreenVideoServiceUpdate = '/rpc/smzx.smzx/IcescreenVideoService.Update'
}

/** 添加冰屏视频 POST /rpc/smzx.smzx/IcescreenVideoService.Add */
export async function IcescreenVideoServiceAdd(
  body: SMZX.smzxIcescreenVideoAddReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxIcescreenVideoAddResp>('/rpc/smzx.smzx/IcescreenVideoService.Add', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除冰屏视频 POST /rpc/smzx.smzx/IcescreenVideoService.Del */
export async function IcescreenVideoServiceDel(
  body: SMZX.smzxIcescreenVideoDelReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxIcescreenVideoDelResp>('/rpc/smzx.smzx/IcescreenVideoService.Del', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取冰屏视频 POST /rpc/smzx.smzx/IcescreenVideoService.Get */
export async function IcescreenVideoServiceGet(
  body: SMZX.smzxIcescreenVideoGetReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxIcescreenVideoGetResp>('/rpc/smzx.smzx/IcescreenVideoService.Get', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 冰屏视频列表 POST /rpc/smzx.smzx/IcescreenVideoService.List */
export async function IcescreenVideoServiceList(
  body: SMZX.smzxIcescreenVideoListReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxIcescreenVideoListResp>('/rpc/smzx.smzx/IcescreenVideoService.List', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 冰屏视频分页 POST /rpc/smzx.smzx/IcescreenVideoService.Page */
export async function IcescreenVideoServicePage(
  body: SMZX.smzxIcescreenVideoPageReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxIcescreenVideoPageResp>('/rpc/smzx.smzx/IcescreenVideoService.Page', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新冰屏视频 POST /rpc/smzx.smzx/IcescreenVideoService.Update */
export async function IcescreenVideoServiceUpdate(
  body: SMZX.smzxIcescreenVideoUpdateReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxIcescreenVideoUpdateResp>('/rpc/smzx.smzx/IcescreenVideoService.Update', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

