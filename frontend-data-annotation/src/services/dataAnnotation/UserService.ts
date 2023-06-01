/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  UserServiceAdd = '/rpc/data-annotation/UserService.Add',
  UserServiceDel = '/rpc/data-annotation/UserService.Del',
  UserServiceForgetPassword = '/rpc/data-annotation/UserService.ForgetPassword',
  UserServiceGet = '/rpc/data-annotation/UserService.Get',
  UserServiceListSelect = '/rpc/data-annotation/UserService.ListSelect',
  UserServicePage = '/rpc/data-annotation/UserService.Page',
  UserServiceUpdate = '/rpc/data-annotation/UserService.Update',
  UserServiceUpdateSelf = '/rpc/data-annotation/UserService.UpdateSelf',
  UserServiceVerificationCode = '/rpc/data-annotation/UserService.VerificationCode',
  UserServiceVerifyPassword = '/rpc/data-annotation/UserService.VerifyPassword'
}

/** 添加用户 POST /rpc/data-annotation/UserService.Add */
export async function UserServiceAdd(
  body: ANNOTATION.dataAnnotationUserAddReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationUserAddResp>('/rpc/data-annotation/UserService.Add', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 POST /rpc/data-annotation/UserService.Del */
export async function UserServiceDel(
  body: ANNOTATION.dataAnnotationUserDelReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationUserDelResp>('/rpc/data-annotation/UserService.Del', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 忘记密码 POST /rpc/data-annotation/UserService.ForgetPassword */
export async function UserServiceForgetPassword(
  body: ANNOTATION.dataAnnotationForgetPasswordReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationForgetPasswordResp>('/rpc/data-annotation/UserService.ForgetPassword', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户详情 POST /rpc/data-annotation/UserService.Get */
export async function UserServiceGet(
  body: ANNOTATION.dataAnnotationUserGetReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationUserGetResp>('/rpc/data-annotation/UserService.Get', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询用户列表选择 POST /rpc/data-annotation/UserService.ListSelect */
export async function UserServiceListSelect(
  body: ANNOTATION.dataAnnotationUserListSelectReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationUserListSelectResp>('/rpc/data-annotation/UserService.ListSelect', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询用户列表 POST /rpc/data-annotation/UserService.Page */
export async function UserServicePage(
  body: ANNOTATION.dataAnnotationUserPageReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationUserPageResp>('/rpc/data-annotation/UserService.Page', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改用户 POST /rpc/data-annotation/UserService.Update */
export async function UserServiceUpdate(
  body: ANNOTATION.dataAnnotationUserUpdateReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationUserUpdateResp>('/rpc/data-annotation/UserService.Update', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改自己信息 POST /rpc/data-annotation/UserService.UpdateSelf */
export async function UserServiceUpdateSelf(
  body: ANNOTATION.dataAnnotationUserUpdateSelfReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationUserUpdateSelfResp>('/rpc/data-annotation/UserService.UpdateSelf', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取验证码 POST /rpc/data-annotation/UserService.VerificationCode */
export async function UserServiceVerificationCode(
  body: ANNOTATION.dataAnnotationVerificationCodeReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationVerificationCodeResp>('/rpc/data-annotation/UserService.VerificationCode', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 验证密码 POST /rpc/data-annotation/UserService.VerifyPassword */
export async function UserServiceVerifyPassword(
  body: ANNOTATION.dataAnnotationVerifyPasswordReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationVerifyPasswordResp>('/rpc/data-annotation/UserService.VerifyPassword', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

