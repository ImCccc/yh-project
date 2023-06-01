import {
  AuthServiceLogin,
  FileServiceUpload,
  VoicePrintServiceVerify,
  AuthServicePhoneVerificationCode
} from "../../services/index"

const minDuration = 3
const app = getApp<IAppOption>()

let requestTimer: number; // 防止接口请求多次

Component({
  options: {
    addGlobalClass: true
  },

  properties: {
    show: Boolean,
  },

  data: {
    minDuration,
    _timer: 0,
    code: '',
    timing: -1,
    focus: false,
    codeLength: 4,
    _phoneNumber: '',
    phoneNumberFormat: '',
    isSoundUnlock: true, // 是否声纹解锁
    info: {
      content: '请说一句话进行解锁',
      subContent: [
        '你可以这样说：',
        '盈宝盈宝，你知道我是谁吗？',
        '小盈小盈，我很喜欢和你聊天呀。',
      ]
    }
  },

  observers: {
    show(show) {
      const phoneNumber = app.globalData.userInfo.phone
      if (!phoneNumber || !show) return
      this.setData({
        code: '',
        _phoneNumber: phoneNumber,
        phoneNumberFormat: `${phoneNumber.slice(0, 3)} **** ${phoneNumber.slice(-4)}`,
      })
    },

    isSoundUnlock(isSoundUnlock) {
      if (isSoundUnlock) this.setData({ code: '' })
    }
  },

  methods: {
    codeClick() {
      this.setData({ focus: true })
    },
    codeInputBlur() {
      this.setData({ focus: false })
    },
    
    // 录音完成触发
    async recordFinish(e: WechatMiniprogram.CustomEvent) {
      const { url } = e.detail
      // 上传录音
      const rs = await FileServiceUpload(url, {
        bucket: 'wechat',
        file_path: 'voice_print_log'
      })
      const data = await VoicePrintServiceVerify({ voice_url: rs.url })
      if (!data.passed) {
        wx.showToast({ title: '解锁失败，请重新进行声音解锁', icon: 'none' })
        return
      }
      data.type = 1
      this.triggerEvent('close', data)
    },

    toggle() {
      this.setData({ isSoundUnlock: !this.data.isSoundUnlock })
    },

    sendCode() {
      if (this.data._timer) return
      this.data.timing = 60
      this.setData({ timing: 60 })
      this.data._timer = setInterval(() => {
        const timing = this.data.timing - 1
        this.data.timing = timing
        this.setData({ timing })
        if (timing === -1) {
          clearInterval(this.data._timer)
          this.data._timer = 0
        }
      }, 1000)
      AuthServicePhoneVerificationCode({ phone: this.data._phoneNumber })
    },

    login(params: any) {
      if (requestTimer) return;
      requestTimer = setTimeout(() => (requestTimer = 0), 200)
      AuthServiceLogin(params).then(data => {
        this.setData({ focus: false })
        this.triggerEvent('close', data)
      })
    },

    codeInputChange(e: WechatMiniprogram.Input) {
      const code = e.detail.value.trim()
      this.setData({ code })
      if (code.length === this.data.codeLength) {
        this.login({
          verification_code: code,
          phone: this.data._phoneNumber
        })
      }
    },

    onClose() {
      this.triggerEvent('close')
    }
  },

  lifetimes: {
    attached() {
      const pcPlatform = app.isPc()
      // pc 只有手机解锁
      this.setData({ pcPlatform, isSoundUnlock: !pcPlatform })
    },
    detached() {
      if (this.data._timer) clearInterval(this.data._timer)
    }
  }
})
