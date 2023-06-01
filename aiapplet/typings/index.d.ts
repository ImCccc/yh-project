/// <reference path="./types/index.d.ts" />

type IGetUserLocationParams = WechatMiniprogram.GetFuzzyLocationSuccessCallbackResult | void;

type IuserInfo = {
  avatar: string; // 头像
  username: string; // 用户名
  step: number; // 0:未绑定; 1:未注册声纹; 2:完成
  phoneNumber: string; // 手机号码
  [key: string]: any
}

type IAppOption = {
  globalData: {
    /*
      当前操作环境:
      ios:	    iOS微信（包含 iPhone、iPad）
      android:	Android微信
      windows:	Windows微信
      mac:	    macOS微信
      devtools:	微信开发者工具
    */
    platform: string;
    pcPlatform: boolean; // 是否pc端
    /*
      注册状态; 
      0: 没有注册; 
      1: 手机声纹都注册成功; 
      2: 手机注册成功, 声纹注册失败; 
      3: 手机注册成功, 不录声纹; 
      4: 手机, 声纹都注册失败 / 直接返回; 员工验证失败;
    */
    registerState: 0 | 1 | 2 | 3 | 4, 
    userRole: 'WX_GUEST' | 'WX_STAFF', // 游客:WX_GUEST 员工:WX_STAFF
    mikeAuthorize: boolean; // 麦克风是否授权
    token: string,
    userInfo: IuserInfo,
    geographical?: { // 地理位置
      latitude: string;
      longitude: string;
    },
    [key: string]: any
  },
  isPc: () => boolean;
  getToken: () =>  Promise<Record<string, any>>; // 获取用户token
  getUserInfo: () => Promise<IuserInfo>; // 获取用户信息
  getMikeAuthorize: () => Promise<boolean>; // 获取麦克风权限
  getUserLocation: () => Promise<IGetUserLocationParams>; // 获取地理位置
  initialization: () => Promise<{
    avatar: string;
    result: Record<string, any>;
    [key: string]: any;
  }>;
  [key: string]: any
}


