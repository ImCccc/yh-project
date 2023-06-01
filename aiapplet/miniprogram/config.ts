const urlConfig = {
  // 开发版地址配置
  develop: {
    apiBaseUrl: 'https://wechat.dev.inrobot.cloud',
    // apiBaseUrl: 'http://10.55.132.187:10001', 
    // apiBaseUrl: 'https://wechat-proxy.sit.inrobot.cloud'
  },
  
  // 体验版地址配置
  trial: {
    apiBaseUrl: 'https://wechat.dev.inrobot.cloud',
  },

  // 正式版地址配置
  release: {
    apiBaseUrl: 'https://wechat-proxy.sit.inrobot.cloud'
  },

  other: {
    apiBaseUrl: 'https://wechat.dev.inrobot.cloud',
  }
}

const getUrlConfig = () => {
  const accountInfo = wx.getAccountInfoSync()
  const envVersion = accountInfo.miniProgram.envVersion
  return urlConfig[envVersion] || urlConfig.other
}

const config = getUrlConfig()

export { config }