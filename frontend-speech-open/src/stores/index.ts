import appInfo from './appInfo';

export type StoreType = typeof stores;

type KeysType = keyof StoreType;

const stores = {
  appInfo: new appInfo(),
};

function useMobx<T extends keyof StoreType>(storeName: T) {
  return stores[storeName];
}

function useInitData(params?: any) {
  Object.keys(stores).forEach((key) => {
    const _k = key as KeysType;
    stores[_k].initData && stores[_k].initData(params);
  });
}

export { useMobx, useInitData };
