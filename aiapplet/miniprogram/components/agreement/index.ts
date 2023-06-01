Component({
  options: {
    addGlobalClass: true
  },
  data: {
    checked: false
  },
  methods: {
    onChange(event: any) {
      this.setData({ checked: event.detail });
    },
    // 退出小程序
    exit() {
      wx.exitMiniProgram()
    },
    // 同意协议
    agree() {
      if (!this.data.checked) {
        wx.showToast({
          icon: 'none',
          title: '请先阅读并同意协议'
        })
        return
      }
      this.triggerEvent('agree')
    },
    // 跳转协议
    goPage() {
      wx.navigateTo({ url: '/pages/agree/index' })
    },
    goPagePrivacy() {
      wx.navigateTo({ url: '/pages/privacy/index' })
    }
  }
})
