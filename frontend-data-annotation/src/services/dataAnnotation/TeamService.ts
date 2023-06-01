/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  TeamServiceAdd = '/rpc/data-annotation/TeamService.Add',
  TeamServiceDel = '/rpc/data-annotation/TeamService.Del',
  TeamServiceGet = '/rpc/data-annotation/TeamService.Get',
  TeamServicePage = '/rpc/data-annotation/TeamService.Page',
  TeamServiceUpdate = '/rpc/data-annotation/TeamService.Update'
}

/** 添加团队 POST /rpc/data-annotation/TeamService.Add */
export async function TeamServiceAdd(
  body: ANNOTATION.dataAnnotationTeamAddReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationTeamAddResp>('/rpc/data-annotation/TeamService.Add', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除团队 POST /rpc/data-annotation/TeamService.Del */
export async function TeamServiceDel(
  body: ANNOTATION.dataAnnotationTeamDelReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationTeamDelResp>('/rpc/data-annotation/TeamService.Del', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询团队详情 POST /rpc/data-annotation/TeamService.Get */
export async function TeamServiceGet(
  body: ANNOTATION.dataAnnotationTeamGetReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationTeamGetResp>('/rpc/data-annotation/TeamService.Get', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 团队列表 POST /rpc/data-annotation/TeamService.Page */
export async function TeamServicePage(
  body: ANNOTATION.dataAnnotationTeamPageReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationTeamPageResp>('/rpc/data-annotation/TeamService.Page', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改团队 POST /rpc/data-annotation/TeamService.Update */
export async function TeamServiceUpdate(
  body: ANNOTATION.dataAnnotationTeamUpdateReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationTeamUpdateResp>('/rpc/data-annotation/TeamService.Update', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

