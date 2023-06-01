// @ts-ignore

/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  MatrixServiceAddMatrix = '/rpc/tsm/MatrixService.AddMatrix',
  MatrixServiceDelMatrix = '/rpc/tsm/MatrixService.DelMatrix',
  MatrixServiceGetMatrix = '/rpc/tsm/MatrixService.GetMatrix',
  MatrixServiceListMatrix = '/rpc/tsm/MatrixService.ListMatrix',
  MatrixServicePushMatrix = '/rpc/tsm/MatrixService.PushMatrix',
  MatrixServiceUpdateMatrix = '/rpc/tsm/MatrixService.UpdateMatrix',
}

/** 添加矩阵 POST /rpc/tsm/MatrixService.AddMatrix */
export async function MatrixServiceAddMatrix(body: API.matrixAddMatrixRequest, options?: { [key: string]: any }) {
  return request<API.matrixAddMatrixResponse>('/rpc/tsm/MatrixService.AddMatrix', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除矩阵 POST /rpc/tsm/MatrixService.DelMatrix */
export async function MatrixServiceDelMatrix(body: API.matrixDelMatrixRequest, options?: { [key: string]: any }) {
  return request<API.matrixDelMatrixResponse>('/rpc/tsm/MatrixService.DelMatrix', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取矩阵 POST /rpc/tsm/MatrixService.GetMatrix */
export async function MatrixServiceGetMatrix(body: API.matrixGetMatrixRequest, options?: { [key: string]: any }) {
  return request<API.matrixGetMatrixResponse>('/rpc/tsm/MatrixService.GetMatrix', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 矩阵列表 POST /rpc/tsm/MatrixService.ListMatrix */
export async function MatrixServiceListMatrix(body: API.matrixListMatrixRequest, options?: { [key: string]: any }) {
  return request<API.matrixListMatrixResponse>('/rpc/tsm/MatrixService.ListMatrix', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 矩阵推送 POST /rpc/tsm/MatrixService.PushMatrix */
export async function MatrixServicePushMatrix(body: API.matrixPushMatrixRequest, options?: { [key: string]: any }) {
  return request<API.matrixPushMatrixResponse>('/rpc/tsm/MatrixService.PushMatrix', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新矩阵 POST /rpc/tsm/MatrixService.UpdateMatrix */
export async function MatrixServiceUpdateMatrix(body: API.matrixUpdateMatrixRequest, options?: { [key: string]: any }) {
  return request<API.matrixUpdateMatrixResponse>('/rpc/tsm/MatrixService.UpdateMatrix', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
