
Component({
  options: {
    addGlobalClass: true
  },

  properties: {
    info: Object,
    playRecordUrl: String, // 当前播放录音的 url
    avatar: String, // 用户头像
  },

  observers: {
    'playRecordUrl, info.url'(playRecordUrl, url) {
      this.setData({ isPlay: playRecordUrl === url })
    }
  },

  data: {
    isPlay: false,
  },
  
  methods: {
    playRecord(e: WechatMiniprogram.BaseEvent) {
      this.triggerEvent('playRecord', e)
    }
  }
})
