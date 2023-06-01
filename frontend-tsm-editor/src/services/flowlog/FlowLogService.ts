// @ts-ignore
/* eslint-disable */
import request from '@/utils/request'

export enum ApiUrl {
  FlowLogServiceExportPageFlowLog = '/rpc/speech/FlowLog.ExportPage',
  FlowLogServicePageFlowLog = '/rpc/speech/FlowLog.Page'
}

/** 导出获取分页列表 POST /rpc/speech/FlowLog.ExportPage */
export async function FlowLogServiceExportPageFlowLog(
  body: API.flowLogExportPageFlowLogReq,
  options ?: {[key: string]: any}
) {
  return request<API.flowLogExportPageFlowLogResp>('/rpc/speech/FlowLog.ExportPage', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取分页列表 POST /rpc/speech/FlowLog.Page */
export async function FlowLogServicePageFlowLog(
  body: API.flowLogPageFlowLogReq,
  options ?: {[key: string]: any}
) {
  return request<API.flowLogPageFlowLogResp>('/rpc/speech/FlowLog.Page', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

