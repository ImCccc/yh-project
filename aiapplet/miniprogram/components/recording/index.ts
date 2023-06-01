const app = getApp<IAppOption>()

export const recordConfig: WechatMiniprogram.RecorderManagerStartOption = {
  duration: 60000,
  format: 'wav',
  sampleRate: 16000,
  numberOfChannels: 1,
}

// 录音最大时长
const MAX_DURATION = 20;
const TIME_REMAINING = 10; // 10秒倒计时
let _timerRecording: number | undefined; // 录音倒计时定时器变量
let _timerRecording2: number | undefined; // 10秒倒计时定时器变量
let _timerDebounce: number | undefined; // 需要长按100毫秒才可以录音, 复制重复点击的定时器变量

Component({
  properties: {
    isChat: Boolean, // 是否在聊天
    minDuration: { type: Number, value: 0 }, // 录音最小时间, 单位秒
  },

  data: {
    timeRemaining: 0, // 10秒倒计时
    isRecording: false, // 是否在录音中
    cancelRecord: false, // 是否取消录音
    _authorize: false, // 录音授权是否成功
    componentClientRect: { left: 0, top: 0, width: 0 },
    recorderManager: wx.getRecorderManager()
  },

  observers: {
    isRecording(isRecording) {
      if (isRecording) this.initRecorderManager()
    }
  },

  methods: {
    touchstart() {
      if (!app.globalData.mikeAuthorize) return this.authorizeModal()
      _timerDebounce = setTimeout(() => {
        this.setData({ cancelRecord: false, isRecording: true })
        const recorderManager = this.data.recorderManager
        recorderManager.start(recordConfig)
        this._setTimeout() // 开始录音, 记录时间
      }, 100)
    },
      
    _setTimeout() {
      this._clearTimeout();
      _timerRecording = setTimeout(() => {
        this.setData({ timeRemaining: TIME_REMAINING })
        _timerRecording2 = setInterval(() => {
          const timeRemaining = this.data.timeRemaining - 1
          if (timeRemaining <= 0) {
            this.touchend()
          } else {
            this.setData({ timeRemaining })
          }
        }, 1000)
      }, (MAX_DURATION - TIME_REMAINING) * 1000)
    },

    _clearTimeout() {
      if (_timerRecording) clearTimeout(_timerRecording)
      if (_timerRecording2) clearTimeout(_timerRecording2)
      if (_timerDebounce) clearTimeout(_timerDebounce)
      _timerDebounce = undefined
      _timerRecording = undefined
      _timerRecording2 = undefined
    },

    touchcancel() {
      if (!app.globalData.mikeAuthorize) return
      this._clearTimeout()
      this.setData({ 
        timeRemaining: 0,
        isRecording: false, 
        cancelRecord: true 
      })
      const recorderManager = this.data.recorderManager
      recorderManager.stop()
    },

    touchend() {
      if (!app.globalData.mikeAuthorize) return
      this._clearTimeout()
      this.setData({ 
        timeRemaining: 0,
        isRecording: false,
      })
      const recorderManager = this.data.recorderManager
      recorderManager.stop()
    },

    touchmove(e: WechatMiniprogram.TouchEvent) {
      if (!app.globalData.mikeAuthorize) return
      const componentClientRect = this.data.componentClientRect
      const left = componentClientRect.left
      const top = componentClientRect.top
      const width = componentClientRect.width
      const pageX = e.touches[0].pageX
      const pageY = e.touches[0].pageY
      const includeLeft = pageX - left > 0 && pageX - left < width
      const includeTop = pageY - top > 0 && pageY - top < width
      this.setData({ cancelRecord: includeLeft && includeTop })
    },

    initRecorderManager() {
      const recorderManager = this.data.recorderManager
      recorderManager.onStop((res) => {
        if (this.data.cancelRecord) return
        const { tempFilePath } = res
        const duration = +(res.duration / 1000).toFixed(0) // 转化为秒
        const minDuration = this.data.minDuration
        if (minDuration && duration < minDuration) {
          wx.showToast({ title: `录音时长不能少于${minDuration}秒`, icon: 'none' })
          return
        }
        this.triggerEvent('recordFinish', { duration, url: tempFilePath })
      })
    },

    mounted(e: WechatMiniprogram.CustomEvent) {
      if (this.data.componentClientRect.left) return
      this.data.componentClientRect = e.detail as any;
    },

    authorizeModal() {
      wx.showModal({
        title: '提示',
        content: '语音聊天需要麦克风权限, 请授权否则无法正常使用',
        confirmText: "授权",
        success: (res) => {
          if (!res.confirm) return
          wx.openSetting({
            success: (res) => {
              app.globalData.mikeAuthorize = !!res.authSetting['scope.record']
            }
          })
        },
      })
    }
  },

  lifetimes: {
    attached() {
      this.initRecorderManager()
    },

    detached() {
      this._clearTimeout()
    }
  }
})
