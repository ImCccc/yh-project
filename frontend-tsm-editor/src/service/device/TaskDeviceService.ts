// @ts-ignore

/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  TaskDeviceServiceListTaskDevice = '/rpc/tsm/TaskDeviceService.ListTaskDevice',
}

/** 设备列表 POST /rpc/tsm/TaskDeviceService.ListTaskDevice */
export async function TaskDeviceServiceListTaskDevice(
  body: API.taskDeviceListTaskDeviceRequest,
  options?: { [key: string]: any },
) {
  return request<API.taskDeviceListTaskDeviceResponse>('/rpc/tsm/TaskDeviceService.ListTaskDevice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
