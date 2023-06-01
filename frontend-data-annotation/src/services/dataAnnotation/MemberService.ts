/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  MemberServiceAdd = '/rpc/data-annotation/MemberService.Add',
  MemberServicePage = '/rpc/data-annotation/MemberService.Page',
  MemberServiceRemove = '/rpc/data-annotation/MemberService.Remove',
  MemberServiceTaskNumber = '/rpc/data-annotation/MemberService.TaskNumber'
}

/** 添加成员 POST /rpc/data-annotation/MemberService.Add */
export async function MemberServiceAdd(
  body: ANNOTATION.dataAnnotationMemberAddReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationMemberAddResp>('/rpc/data-annotation/MemberService.Add', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 成员列表 POST /rpc/data-annotation/MemberService.Page */
export async function MemberServicePage(
  body: ANNOTATION.dataAnnotationMemberPageReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationMemberPageResp>('/rpc/data-annotation/MemberService.Page', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 移出成员 POST /rpc/data-annotation/MemberService.Remove */
export async function MemberServiceRemove(
  body: ANNOTATION.dataAnnotationMemberRemoveReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationMemberRemoveResp>('/rpc/data-annotation/MemberService.Remove', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询成员任务数 POST /rpc/data-annotation/MemberService.TaskNumber */
export async function MemberServiceTaskNumber(
  body: ANNOTATION.dataAnnotationMemberTaskNumberReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationMemberTaskNumberResp>('/rpc/data-annotation/MemberService.TaskNumber', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

