import { request, uploadFile } from '../utils/request'

export const ConfigServiceGet = () => request({
  url: '/rpc/wechat/ConfigService.Get'
});

export const exchangeToken = (params: Record<string, any>) => request({
  params,
  showLoading: true,
  url: '/rpc/wechat/AuthService.ExchangeToken'
});

export const UserServiceGet = () => request({
  showLoading: true,
  url: '/rpc/wechat/UserService.Get'
});

// 更新用户信息
export const UserServiceUpdate = (params: Record<string, any>) => request({
  params,
  showLoading: true,
  url: '/rpc/wechat/UserService.Update'
});

// 获取手机验证码
export const AuthServicePhoneVerificationCode = (params: Record<string, any>) => request({
  params,
  showLoading: false,
  url: '/rpc/wechat/AuthService.PhoneVerificationCode'
})

// 登录 需要同步用户信息
export const AuthServiceLogin = (params: Record<string, any>) => request({
  params,
  showLoading: true,
  url: '/rpc/wechat/AuthService.Login'
})

// 声纹验证 需要同步用户信息
export const VoicePrintServiceVerify = (params: Record<string, any>) =>
  request({
    params,
    showLoading: true,
    url: '/rpc/wechat/VoicePrintService.Verify'
  })

// 声纹验证并注册 需要同步用户信息
export const VoicePrintServiceVerifyAndRegister = (params: Record<string, any>) =>
  request({
    params,
    showLoading: true,
    url: '/rpc/wechat/VoicePrintService.VerifyAndRegister'
  })

// 文本语音交互
export const ChatServiceInteract = (params: {
  source_type: 'text' | 'voice';
  source: string;
}) => request({
  params,
  url: '/rpc/wechat/ChatService.Interact'
});

export const ChatServiceSyncResult = (params: {
  interact_id: string
}) => request({
  params,
  url: '/rpc/wechat/ChatService.SyncResult'
});

export const FileServiceUpload = (filePath: string, params: Record<string, any>) => uploadFile({
  params,
  filePath,
  url: '/rpc/wechat/FileService.Upload'
});

