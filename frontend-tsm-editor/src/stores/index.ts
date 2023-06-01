import TaskClassifyList from './TaskClassifyList';

export type StoreType = typeof stores;
export type TaskClassifyListExampleProps = typeof stores.TaskClassifyList;
type KeysType = keyof StoreType;

const stores = {
  TaskClassifyList: new TaskClassifyList(),
};

function useMobx<T extends keyof StoreType>(storeName: T) {
  return stores[storeName];
}

function useInitData() {
  Object.keys(stores).forEach((key) => {
    const _k = key as KeysType;
    stores[_k].initData && stores[_k].initData();
  });
}

export {useMobx, useInitData};
