import { config } from '../config'

const _show_error = (message: string) => {
  const title = message || '未知错误'
  wx.showToast({
    title,
    icon: 'none',
    duration: 3000
  })
}

type IRequest = WechatMiniprogram.RequestOption & {
  showLoading?: boolean,
  showErrorTip?: boolean,
  params?: Record<string, any>
}

type Request<T = any> = (config: IRequest) => Promise<T>

export const request: Request = ({
  url,
  showErrorTip,
  params = {},
  method = 'POST',
}) => {
  const app = getApp()
  const globalData = (app && app.globalData) || {}
  return new Promise((resolve, reject) => {
    wx.request({
      data: params,
      method: method,
      timeout: 30000,
      url: config.apiBaseUrl + url,
      header: {
        'AuthToken': globalData.token || '',
        'content-type': 'application/json'
      },
      success: res => {
        let { statusCode } = res
        let data: any = res.data || {}
        showErrorTip = showErrorTip !== false
        if (statusCode !== 200) {
          const errMsg = data.msg
          showErrorTip && _show_error(errMsg)
          return reject(res)
        }
        if (data.code !== 0) {
          showErrorTip && _show_error(data.msg)
          return reject(res)
        }
        resolve(data)
      },
      fail: (error: any) => {
        console.log('error:', error)
        reject(error)
       }
    })
  })
}

export const uploadFile = (options: {
  url: string;
  filePath: string;
  params: Record<string, string | number| boolean>
}) => {
  const app = getApp()
  return new Promise<any>((resolve, reject) => {
    wx.uploadFile({
      name: 'file',
      formData: options.params,
      filePath: options.filePath,
      url: config.apiBaseUrl + options.url,
      header: { AuthToken: app.globalData.token },
      success: (res) => {
        console.log('文件上传回调数据: ', res)
        let data;
        try {
          data = JSON.parse(res.data)
        } catch (error) {
          data = { msg: '音频上传, 出现未知错误' }
        }
        
        if (res.statusCode === 200) {
          if (data.code !== 0) {
            _show_error(data.msg)
            return reject(res)
          }
          return resolve(data)
        }

        reject(res.data)
        _show_error(data.msg)
      },
      fail: (error: any) => {
       console.log('error:', error)
       reject(error)
      }
    })
  })
}