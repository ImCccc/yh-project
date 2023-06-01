import User from './User';
import KeepAliveRoute from './KeepAliveRoute';

export type StoreType = typeof stores;
export type UserExampleProps = typeof stores.User;

const stores = {
  User: new User(),
  KeepAliveRoute: new KeepAliveRoute(),
};

function useMobx<T extends keyof StoreType>(storeName: T) {
  return stores[storeName];
}

export { useMobx };
