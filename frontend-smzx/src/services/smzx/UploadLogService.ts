/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  UploadLogServiceDownload = '/rpc/smzx.smzx/UploadLogService.Download',
  UploadLogServiceUpload = '/rpc/smzx.smzx/UploadLogService.Upload'
}

/** 此处后端没有提供注释 POST /rpc/smzx.smzx/UploadLogService.Download */
export async function UploadLogServiceDownload(
  body: SMZX.smzxUploadLogDownloadReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxUploadLogDownloadResp>('/rpc/smzx.smzx/UploadLogService.Download', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/smzx.smzx/UploadLogService.Upload */
export async function UploadLogServiceUpload(
  body: SMZX.smzxUploadLogUploadReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxUploadLogUploadResp>('/rpc/smzx.smzx/UploadLogService.Upload', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

