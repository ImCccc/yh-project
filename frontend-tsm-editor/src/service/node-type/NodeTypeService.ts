// @ts-ignore

/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  NodeTypeServiceListNodeType = '/rpc/tsm/NodeTypeService.ListNodeType',
}

/** 节点模板列表 POST /rpc/tsm/NodeTypeService.ListNodeType */
export async function NodeTypeServiceListNodeType(
  body: API.nodeTypeListNodeTypeRequest,
  options?: { [key: string]: any },
) {
  return request<API.nodeTypeListNodeTypeResponse>('/rpc/tsm/NodeTypeService.ListNodeType', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
