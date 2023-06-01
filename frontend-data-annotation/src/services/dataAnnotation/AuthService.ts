/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  AuthServiceLogin = '/rpc/data-annotation/AuthService.Login',
  AuthServiceLogout = '/rpc/data-annotation/AuthService.Logout',
  AuthServiceMenuList = '/rpc/data-annotation/AuthService.MenuList'
}

/** 登录 POST /rpc/data-annotation/AuthService.Login */
export async function AuthServiceLogin(
  body: ANNOTATION.dataAnnotationLoginReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationLoginResp>('/rpc/data-annotation/AuthService.Login', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 登出 POST /rpc/data-annotation/AuthService.Logout */
export async function AuthServiceLogout(
  body: ANNOTATION.dataAnnotationLogoutReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationLogoutResp>('/rpc/data-annotation/AuthService.Logout', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取菜单 POST /rpc/data-annotation/AuthService.MenuList */
export async function AuthServiceMenuList(
  body: ANNOTATION.dataAnnotationMenuListReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationMenuListResp>('/rpc/data-annotation/AuthService.MenuList', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

