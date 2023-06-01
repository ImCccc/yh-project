/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  FileServiceFileSignedUrl = '/rpc/data-annotation/FileService.FileSignedUrl',
  FileServiceTemplate = '/rpc/data-annotation/FileService.Template'
}

/** 获取签名地址 POST /rpc/data-annotation/FileService.FileSignedUrl */
export async function FileServiceFileSignedUrl(
  body: ANNOTATION.dataAnnotationFileSignedUrlReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationFileSignedUrlResp>('/rpc/data-annotation/FileService.FileSignedUrl', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 下载模板 POST /rpc/data-annotation/FileService.Template */
export async function FileServiceTemplate(
  body: ANNOTATION.dataAnnotationFileTemplateReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationFileTemplateResp>('/rpc/data-annotation/FileService.Template', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

