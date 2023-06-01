/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  LabelServiceAdd = '/rpc/data-annotation/LabelService.Add',
  LabelServiceBatchAdd = '/rpc/data-annotation/LabelService.BatchAdd',
  LabelServiceBatchDel = '/rpc/data-annotation/LabelService.BatchDel',
  LabelServiceDel = '/rpc/data-annotation/LabelService.Del',
  LabelServiceGet = '/rpc/data-annotation/LabelService.Get',
  LabelServicePage = '/rpc/data-annotation/LabelService.Page',
  LabelServiceUpdate = '/rpc/data-annotation/LabelService.Update'
}

/** 添加标签 POST /rpc/data-annotation/LabelService.Add */
export async function LabelServiceAdd(
  body: ANNOTATION.dataAnnotationLabelAddReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationLabelAddResp>('/rpc/data-annotation/LabelService.Add', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量添加 POST /rpc/data-annotation/LabelService.BatchAdd */
export async function LabelServiceBatchAdd(
  body: ANNOTATION.dataAnnotationLabelBatchAddReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationLabelBatchAddResp>('/rpc/data-annotation/LabelService.BatchAdd', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除 POST /rpc/data-annotation/LabelService.BatchDel */
export async function LabelServiceBatchDel(
  body: ANNOTATION.dataAnnotationLabelBatchDelReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationLabelBatchDelResp>('/rpc/data-annotation/LabelService.BatchDel', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除标签 POST /rpc/data-annotation/LabelService.Del */
export async function LabelServiceDel(
  body: ANNOTATION.dataAnnotationLabelDelReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationLabelDelResp>('/rpc/data-annotation/LabelService.Del', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取标签 POST /rpc/data-annotation/LabelService.Get */
export async function LabelServiceGet(
  body: ANNOTATION.dataAnnotationLabelGetReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationLabelGetResp>('/rpc/data-annotation/LabelService.Get', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 标签分页 POST /rpc/data-annotation/LabelService.Page */
export async function LabelServicePage(
  body: ANNOTATION.dataAnnotationLabelPageReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationLabelPageResp>('/rpc/data-annotation/LabelService.Page', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新标签 POST /rpc/data-annotation/LabelService.Update */
export async function LabelServiceUpdate(
  body: ANNOTATION.dataAnnotationLabelUpdateReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationLabelUpdateResp>('/rpc/data-annotation/LabelService.Update', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

