import { action, makeAutoObservable } from 'mobx';

import { AppServiceGet } from '@/services/speechOpen/AppService';

type InfoProps = SPEECHOPEN.speechopenAppDetailInfo | null;

class AppInfo {
  info: InfoProps = null;
  sdkList: SPEECHOPEN.speechopenSdk[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // 计算属性
  get appInfo() {
    if (!this.info) return null;
    return this.info;
  }

  updateAppInfo = (appInfo: Partial<SPEECHOPEN.speechopenAppDetailInfo>) => {
    if (this.info) {
      this.info = { ...this.info, ...appInfo };
    } else {
      this.info = appInfo as InfoProps;
    }
  };

  clearAppInfo = () => {
    this.info = null;
    this.sdkList = [];
  };

  initData(params: SPEECHOPEN.speechopenAppGetReq) {
    AppServiceGet(params)
      .then(action('fetchSuccess', (data) => (this.info = data.app_info)))
      .catch(() => action('fetchError', () => (this.info = {} as InfoProps)));
  }
}

export default AppInfo;
