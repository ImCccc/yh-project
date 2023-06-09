
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    info: {
      type: Object,
    },
    mikeAuthorize: Boolean
  },
  
  methods: {
    recordFinish(e: WechatMiniprogram.CustomEvent) {
      const { duration, url } = e.detail
      this.triggerEvent('recordFinish', {
        url,
        duration,
      })
    },
  }
})