import { makeAutoObservable } from 'mobx';

class KeepAliveRoute {
  cacheRouteList: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get cacheList() {
    return this.cacheRouteList;
  }

  addCacheRoute(pathname?: string) {
    pathname = pathname || location.hash.replace('#', '').split('?')[0];
    if (!this.cacheRouteList.includes(pathname)) {
      this.cacheRouteList.push(pathname);
    }
  }

  remove(pathname?: string) {
    if (pathname) {
      this.cacheRouteList = this.cacheRouteList.filter(
        (path) => path !== pathname,
      );
    } else {
      this.cacheRouteList = [];
    }
  }
}

export default KeepAliveRoute;
