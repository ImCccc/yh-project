/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  AppUpgradeServiceAdd = '/rpc/smzx.service-robotics/AppUpgradeService.Add',
  AppUpgradeServiceDel = '/rpc/smzx.service-robotics/AppUpgradeService.Del',
  AppUpgradeServiceGet = '/rpc/smzx.service-robotics/AppUpgradeService.Get',
  AppUpgradeServicePadVersion = '/rpc/smzx.service-robotics/AppUpgradeService.PadVersion',
  AppUpgradeServicePage = '/rpc/smzx.service-robotics/AppUpgradeService.Page',
  AppUpgradeServiceUpdate = '/rpc/smzx.service-robotics/AppUpgradeService.Update'
}

/** 添加应用版本 POST /rpc/smzx.service-robotics/AppUpgradeService.Add */
export async function AppUpgradeServiceAdd(
  body: SMZX.smzxAppUpgradeAddReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxAppUpgradeAddResp>('/rpc/smzx.service-robotics/AppUpgradeService.Add', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除应用版本 POST /rpc/smzx.service-robotics/AppUpgradeService.Del */
export async function AppUpgradeServiceDel(
  body: SMZX.smzxAppUpgradeDelReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxAppUpgradeDelResp>('/rpc/smzx.service-robotics/AppUpgradeService.Del', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取应用版本 POST /rpc/smzx.service-robotics/AppUpgradeService.Get */
export async function AppUpgradeServiceGet(
  body: SMZX.smzxAppUpgradeGetReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxAppUpgradeGetResp>('/rpc/smzx.service-robotics/AppUpgradeService.Get', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取pad的最新版本 POST /rpc/smzx.service-robotics/AppUpgradeService.PadVersion */
export async function AppUpgradeServicePadVersion(
  body: SMZX.smzxAppUpgradePadVersionReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxAppUpgradePadVersionResp>('/rpc/smzx.service-robotics/AppUpgradeService.PadVersion', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 应用版本列表 POST /rpc/smzx.service-robotics/AppUpgradeService.Page */
export async function AppUpgradeServicePage(
  body: SMZX.smzxAppUpgradePageReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxAppUpgradePageResp>('/rpc/smzx.service-robotics/AppUpgradeService.Page', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新应用版本 POST /rpc/smzx.service-robotics/AppUpgradeService.Update */
export async function AppUpgradeServiceUpdate(
  body: SMZX.smzxAppUpgradeUpdateReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxAppUpgradeUpdateResp>('/rpc/smzx.service-robotics/AppUpgradeService.Update', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

