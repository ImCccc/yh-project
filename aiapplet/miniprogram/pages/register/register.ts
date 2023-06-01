import { AuthServiceLogin, AuthServicePhoneVerificationCode, FileServiceUpload, VoicePrintServiceVerifyAndRegister, UserServiceUpdate } from "../../services/index"
import Dialog from '@vant/weapp/dialog/dialog';

const app = getApp<IAppOption>()

// register.ts

Page({
  data: {
    phoneNumber: '',
    captcha: '',
    phoneNumberError: '',
    captchaError: '',
    step: app.globalData.userInfo.step,
    voice: false,
    voiceStep: 1,
    timing: -1,
    _timer: 0,
    mikeAuthorize: false,
    minDuration: 5,
    pcPlatform: false,
    username: '张三',
    // 声音录取ai对话
    chat1: {
      content: '你好，张三。请保持当前环境安静，语速适中说出下面这段话。',
      subContent: [
        {
          color: '#0371FD',
          text: '盈合机器人的愿景是秉承“科技让生活更美好”的理念，做中国领先的平台型、数字化、智能化综合解决方案提供商。'
        },
      ]
    },
    // 声音验证ai对话
    chat2: {
      content: '声音录入成功，和我说句话吧，我能认出你哟。',
      subContent: [
        '你可以这样说：',
        '盈宝盈宝，你知道我是谁吗？',
        '小盈小盈，我很喜欢和你聊天呀。',
      ]
    },
    // 声音录取的url
    url: '',
    // 头像
    avatarUrl: '',
    recorderManager: wx.getRecorderManager(),
  },

  // 页面销毁
  onUnload() {
    if (this.data._timer) clearInterval(this.data._timer);
  },

  // 初始化
  async onLoad() {
    await app.getUserInfo();

    if (app.globalData.userRole === 'WX_GUEST' && app.globalData.userInfo.step === 1) {
      // 如果是游客，就跳到第一步
      app.globalData.userInfo.step = 0;
    }
    if (app.globalData.userRole === 'WX_STAFF' && app.globalData.userInfo.step === 1 && app.globalData.pcPlatform === true) {
      // 如果是员工，而且是PC端，就跳到第三步
      app.globalData.userInfo.step = 2;
    }
    this.setData({ step: app.globalData.userInfo.step, avatarUrl: app.globalData.userInfo.avatar, mikeAuthorize: app.globalData.mikeAuthorize, username: app.globalData.userInfo.username, pcPlatform: app.globalData.pcPlatform });
    // this.setData({ step: 0, avatarUrl: app.globalData.userInfo.avatar, mikeAuthorize: app.globalData.mikeAuthorize, username: app.globalData.userInfo.username })

    this.changeChat1()

    if (app.globalData.userInfo.step === 2) {
      app.globalData.registerState = 1;
    } else if (app.globalData.userInfo.step === 1) {
      app.globalData.registerState = 3;
    }
  },

  changeChat1() {
    const _chat1 = {
      content: `你好，${this.data.username}。请保持当前环境安静，语速适中说出下面这段话。`,
      subContent: [
        {
          color: '#0371FD',
          text: '盈合机器人的愿景是秉承“科技让生活更美好”的理念，做中国领先的平台型、数字化、智能化综合解决方案提供商。'
        },
      ]
    }
    this.setData({ chat1: _chat1 })
  },

  // 输入框值改变
  inputChange() {
    if (this.data.phoneNumber) {
      this.setData({ phoneNumberError: '' })
    }
    if (this.data.captcha) {
      this.setData({ captchaError: '' })
    }
  },

  // 非空校验
  formValidation(obj: 'defult' | 'phone' = 'defult') {
    let _success = true
    if (!this.data.phoneNumber) {
      this.setData({ phoneNumberError: 'OA手机号码不能为空' })
      _success = false
    }
    if (!this.data.captcha && obj === 'defult') {
      this.setData({ captchaError: '验证码不能为空' })
      _success = false
    }
    return _success
  },

  // 点击验证码
  async clickCaptcha() {
    if (this.data._timer) return

    // 非空验证
    const _formValidation = this.formValidation('phone')
    if (!_formValidation) {
      console.log('xxx');
      return
    }

    await AuthServicePhoneVerificationCode({ phone: this.data.phoneNumber })

    // 倒计时
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
  },

  // 点击下一步
  async clickNextButton() {
    // 表单非空验证
    const _formValidation = this.formValidation()
    if (!_formValidation) return;

    const res = await AuthServiceLogin({ phone: this.data.phoneNumber, verification_code: this.data.captcha });
    app.globalData.userRole = res.role_codes[0];
    app.globalData.token = res.token;
    // 获取用户名，第三步要用
    await app.getUserInfo();
    if (this.data.pcPlatform) {
      // 如果是pc端，就跳过声纹录入
      app.globalData.userInfo.step = 2;
    }
    app.globalData.registerState = 3;
    this.setData({ step: app.globalData.userInfo.step, voiceStep: 1, username: app.globalData.userInfo.username });
    this.changeChat1()
  },

  // 录音完成回调
  async recordFinish(e: WechatMiniprogram.CustomEvent) {
    if (this.data.step !== 1) {
      return
    }
    if (this.data.voiceStep === 1) {
      // 上传文件1
      const res = await FileServiceUpload(
        e.detail.url,
        { bucket: 'wechat', file_path: 'voice_print' }
      )
      this.setData({ voiceStep: 2, url: res.url, minDuration: 3 })
    } else {
      // 上传文件2
      const res = await FileServiceUpload(
        e.detail.url,
        { bucket: 'wechat', file_path: 'voice_print_log' }
      )

      try {
        // 声纹注册
        const res1 = await VoicePrintServiceVerifyAndRegister({
          voice_print_url: this.data.url,
          voice_url: res.url,
        })

        if (!res1.passed) {
          // 验证不通过
          wx.showToast({
            title: '声音验证失败，请重新录入',
            icon: 'none',
            duration: 3000
          })
          app.globalData.registerState = 2
        } else {
          app.globalData.userRole = res1.role_codes[0];
          app.globalData.token = res1.token;
          app.globalData.userInfo.step = 2;
          this.setData({ step: 2 })
          this.data.recorderManager.stop()
          app.globalData.registerState = 1
        }
        this.setData({ voiceStep: 1, minDuration: 5 });
      } catch (error) {
        // 验证不通过
        wx.showToast({
          title: '声音验证失败，请重新录入',
          icon: 'none',
          duration: 3000
        })
        this.setData({ voiceStep: 1, minDuration: 5 });
        app.globalData.registerState = 2
      }
    }
  },

  // 选择头像
  async onChooseAvatar(e: any) {

    const { avatarUrl } = e.detail
    // 上传文件
    const res = await FileServiceUpload(
      avatarUrl,
      { bucket: 'wechat', file_path: 'head' }
    )
    // 修改头像
    await UserServiceUpdate({ wx_nick_name: app.globalData.userInfo.username, wx_pic: res.url })
    // 修改头像成功后，更换头像
    this.setData({
      avatarUrl: res.url,
    })
    app.globalData.userInfo.avatar = res.url;
  },

  // 点击完成
  async clickFinish() {
    wx.navigateBack();
  },
})
