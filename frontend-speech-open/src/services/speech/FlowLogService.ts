/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  FlowLogServiceExportPage = '/rpc/speech.service-robotics/FlowLogService.ExportPage',
  FlowLogServicePage = '/rpc/speech.service-robotics/FlowLogService.Page'
}

/** 导出获取分页列表 POST /rpc/speech.service-robotics/FlowLogService.ExportPage */
export async function FlowLogServiceExportPage(
  body: SPEECH.speechExportPageFlowLogReq,
  options ?: {[key: string]: any}
) {
  return request<SPEECH.speechExportPageFlowLogResp>('/rpc/speech.service-robotics/FlowLogService.ExportPage', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取分页列表 POST /rpc/speech.service-robotics/FlowLogService.Page */
export async function FlowLogServicePage(
  body: SPEECH.speechPageFlowLogReq,
  options ?: {[key: string]: any}
) {
  return request<SPEECH.speechPageFlowLogResp>('/rpc/speech.service-robotics/FlowLogService.Page', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

