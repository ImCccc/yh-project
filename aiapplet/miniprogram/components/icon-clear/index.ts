Component({
  properties: {
    cancelRecord: Boolean
  },
  
  lifetimes: {
    attached() {
      const query = this.createSelectorQuery()
      query.select('#iconClear').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec((res) => this.triggerEvent('mounted', res[0]))
    }
  }
})
