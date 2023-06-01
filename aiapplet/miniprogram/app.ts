import { exchangeToken, UserServiceGet } from './services/index'

App<IAppOption>({
  globalData: {
    platform: '',
    pcPlatform: false,
    registerState: 0,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im9wZW5fb25rSF81SHFWTEYzZ0Eta1pUM2ZWWGdGVTM4ayIsInJvbGVzIjpbIldYX0dVRVNUIl0sImFwcF9jb2RlIjoid2VjaGF0IiwibWV0YWRhdGEiOiIiLCJleHAiOjE2Nzg0MzQ5ODIsImlhdCI6MTY3NzgzMDE4MiwiaXNzIjoiaW5mb3JlIiwic3ViIjoib3Blbl9vbmtIXzVIcVZMRjNnQS1rWlQzZlZYZ0ZVMzhrIn0.MO6e_vvGRvstob11n79HMmSvIsQGPMzXPp_ohtYV7Y4',
    userInfo: {
      step: 0,
      avatar: '',
      username: '',
      phoneNumber: '',
    },
    mikeAuthorize: false,
    userRole: 'WX_GUEST'
  },

  isPc() {
    const platform = this.globalData.platform || wx.getSystemInfoSync().platform
    return  platform !== "ios" 
            && platform !== "android" 
            && platform !== 'devtools'
  },

  // 获取用户信息
  getUserInfo() {
    return UserServiceGet().then(({ user_info }) => {
      user_info.avatar = user_info.wx_pic || '../../svg/icon_deforuser.svg'
      this.globalData.userInfo = user_info
      return user_info
    })
  },

  // 获取 token
  getToken() {
    return new Promise<any>((resolve, reject) => {
      wx.login({
        success: async res => {
          const geographical = this.globalData.geographical
          const params: Record<string, any> = { code: res.code }
          if (geographical) {
            params.lat = geographical.latitude
            params.lng = geographical.longitude
          }
          try {
            const data = await exchangeToken(params)
            this.globalData.token = data.token || ''
            resolve(data.result)
          } catch (error) {
            reject(error)
          }
        }
      })
    })
  },

  // 麦克风授权
  getMikeAuthorize() {
    return new Promise<boolean>(resolve => {
      wx.authorize({
        scope: 'scope.record',
        success: () => resolve(true),
        fail: () => resolve(false)
      })
    })
  },

  // 获取用户的地理位置
  getUserLocation() {
    return new Promise<IGetUserLocationParams>(resolve => {
      wx.authorize({
        scope: 'scope.userFuzzyLocation',
        success: () => {
          // 低版本的PC端可能不支持 getFuzzyLocation
          if (wx.getFuzzyLocation) {
            return wx.getFuzzyLocation({
              success: resolve,
              fail: () => resolve()
            })
          }
          resolve()
        },
        fail: () => resolve()
      })
    })
  },

  async requestData() {
    try {
      wx.showLoading({ title: '加载中' })
      // 获取token
      const result = await this.getToken()
      // 获取用户信息
      const userInfo = await this.getUserInfo()
      wx.hideLoading()
      return { result, avatar: userInfo.avatar }
    } catch (error) {
      wx.hideLoading()
      return error
    }
  },

  async initialization() {
    // 获取地理位置
    const res = await this.getUserLocation()
    if (res) this.globalData.geographical = {
      latitude: res.latitude + '',
      longitude: res.longitude + ''
    }
    // 获取麦克风权限
    const mikeAuthorize = await this.getMikeAuthorize()

    // 初始化数据
    this.globalData.mikeAuthorize = mikeAuthorize
    const data = await this.requestData()
    return data
  }
})