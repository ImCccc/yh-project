/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  LabelSetServiceAdd = '/rpc/data-annotation/LabelSetService.Add',
  LabelSetServiceCopy = '/rpc/data-annotation/LabelSetService.Copy',
  LabelSetServiceDel = '/rpc/data-annotation/LabelSetService.Del',
  LabelSetServiceGet = '/rpc/data-annotation/LabelSetService.Get',
  LabelSetServicePage = '/rpc/data-annotation/LabelSetService.Page',
  LabelSetServiceUpdate = '/rpc/data-annotation/LabelSetService.Update'
}

/** 添加标签集 POST /rpc/data-annotation/LabelSetService.Add */
export async function LabelSetServiceAdd(
  body: ANNOTATION.dataAnnotationLabelSetAddReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationLabelSetAddResp>('/rpc/data-annotation/LabelSetService.Add', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 复制标签集 POST /rpc/data-annotation/LabelSetService.Copy */
export async function LabelSetServiceCopy(
  body: ANNOTATION.dataAnnotationLabelSetCopyReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationLabelSetCopyResp>('/rpc/data-annotation/LabelSetService.Copy', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除标签集 POST /rpc/data-annotation/LabelSetService.Del */
export async function LabelSetServiceDel(
  body: ANNOTATION.dataAnnotationLabelSetDelReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationLabelSetDelResp>('/rpc/data-annotation/LabelSetService.Del', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取标签集 POST /rpc/data-annotation/LabelSetService.Get */
export async function LabelSetServiceGet(
  body: ANNOTATION.dataAnnotationLabelSetGetReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationLabelSetGetResp>('/rpc/data-annotation/LabelSetService.Get', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 标签集分页 POST /rpc/data-annotation/LabelSetService.Page */
export async function LabelSetServicePage(
  body: ANNOTATION.dataAnnotationLabelSetPageReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationLabelSetPageResp>('/rpc/data-annotation/LabelSetService.Page', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新标签集 POST /rpc/data-annotation/LabelSetService.Update */
export async function LabelSetServiceUpdate(
  body: ANNOTATION.dataAnnotationLabelSetUpdateReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationLabelSetUpdateResp>('/rpc/data-annotation/LabelSetService.Update', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

