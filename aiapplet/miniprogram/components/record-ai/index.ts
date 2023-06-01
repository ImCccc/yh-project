type IRecordData =  {
  showBorder: boolean;
}

Component<IRecordData, any, any>({
  options: {
    addGlobalClass: true
  },
  
  properties: {
    info: {
      type: Object
    },
  },

  data: {
    showBorder: false
  },

  lifetimes: {
    attached() {
      if (this.data.info.links || this.data.info.subContent) {
        this.setData({ showBorder: true })
      }
    }
  },

  methods: {
    linkTap(e: WechatMiniprogram.BaseEvent) {
      this.triggerEvent('link', e.target.dataset.item)
    }
  }
})
