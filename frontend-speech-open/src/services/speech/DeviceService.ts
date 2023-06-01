/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  DeviceServiceRegister = '/rpc/speech.service-robotics/DeviceService.Register'
}

/** 此处后端没有提供注释 POST /rpc/speech.service-robotics/DeviceService.Register */
export async function DeviceServiceRegister(
  body: SPEECH.speechDeviceRegisterReq,
  options ?: {[key: string]: any}
) {
  return request<SPEECH.speechDeviceRegisterResp>('/rpc/speech.service-robotics/DeviceService.Register', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

