/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  AgvDeviceServiceBatchLockSwitch = '/rpc/smzx.smzx/AgvDeviceService.BatchLockSwitch',
  AgvDeviceServiceDel = '/rpc/smzx.smzx/AgvDeviceService.Del',
  AgvDeviceServiceGet = '/rpc/smzx.smzx/AgvDeviceService.Get',
  AgvDeviceServiceIceScreenList = '/rpc/smzx.smzx/AgvDeviceService.IceScreenList',
  AgvDeviceServiceImport = '/rpc/smzx.smzx/AgvDeviceService.Import',
  AgvDeviceServiceList = '/rpc/smzx.smzx/AgvDeviceService.List',
  AgvDeviceServiceLockSwitch = '/rpc/smzx.smzx/AgvDeviceService.LockSwitch',
  AgvDeviceServicePage = '/rpc/smzx.smzx/AgvDeviceService.Page',
  AgvDeviceServiceProductList = '/rpc/smzx.smzx/AgvDeviceService.ProductList',
  AgvDeviceServiceUpdate = '/rpc/smzx.smzx/AgvDeviceService.Update'
}

/** Android设备批量锁状态切换 POST /rpc/smzx.smzx/AgvDeviceService.BatchLockSwitch */
export async function AgvDeviceServiceBatchLockSwitch(
  body: SMZX.smzxAgvDeviceBatchLockSwitchReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxAgvDeviceBatchLockSwitchResp>('/rpc/smzx.smzx/AgvDeviceService.BatchLockSwitch', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除设备 POST /rpc/smzx.smzx/AgvDeviceService.Del */
export async function AgvDeviceServiceDel(
  body: SMZX.smzxAgvDeviceDelReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxAgvDeviceDelResp>('/rpc/smzx.smzx/AgvDeviceService.Del', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** AGV设备详细 包括属性列表 pad POST /rpc/smzx.smzx/AgvDeviceService.Get */
export async function AgvDeviceServiceGet(
  body: SMZX.smzxAgvDeviceGetReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxAgvDeviceGetResp>('/rpc/smzx.smzx/AgvDeviceService.Get', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 冰屏设备列表 POST /rpc/smzx.smzx/AgvDeviceService.IceScreenList */
export async function AgvDeviceServiceIceScreenList(
  body: SMZX.smzxAgvDeviceIceScreenListReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxAgvDeviceIceScreenListResp>('/rpc/smzx.smzx/AgvDeviceService.IceScreenList', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** AGV设备导入 POST /rpc/smzx.smzx/AgvDeviceService.Import */
export async function AgvDeviceServiceImport(
  body: SMZX.smzxAgvDeviceImportReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxAgvDeviceImportResp>('/rpc/smzx.smzx/AgvDeviceService.Import', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** AGV设备列表 POST /rpc/smzx.smzx/AgvDeviceService.List */
export async function AgvDeviceServiceList(
  body: SMZX.smzxAgvDeviceListReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxAgvDeviceListResp>('/rpc/smzx.smzx/AgvDeviceService.List', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Android设备锁状态切换 POST /rpc/smzx.smzx/AgvDeviceService.LockSwitch */
export async function AgvDeviceServiceLockSwitch(
  body: SMZX.smzxAgvDeviceLockSwitchReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxAgvDeviceLockSwitchResp>('/rpc/smzx.smzx/AgvDeviceService.LockSwitch', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** AGV设备分页 POST /rpc/smzx.smzx/AgvDeviceService.Page */
export async function AgvDeviceServicePage(
  body: SMZX.smzxAgvDevicePageReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxAgvDevicePageResp>('/rpc/smzx.smzx/AgvDeviceService.Page', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** AGV产品 POST /rpc/smzx.smzx/AgvDeviceService.ProductList */
export async function AgvDeviceServiceProductList(
  body: SMZX.smzxAgvDeviceProductListReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxAgvDeviceProductListResp>('/rpc/smzx.smzx/AgvDeviceService.ProductList', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新AGV设备 POST /rpc/smzx.smzx/AgvDeviceService.Update */
export async function AgvDeviceServiceUpdate(
  body: SMZX.smzxAgvDeviceUpdateReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxAgvDeviceUpdateResp>('/rpc/smzx.smzx/AgvDeviceService.Update', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

