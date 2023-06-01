import {
  clearLocalStorage,
  getUserInfo,
  setUserInfo,
  useInfoDefaultValue,
  UserProps,
} from '@/utils/storage';
import { makeAutoObservable } from 'mobx';

class User {
  thisUserInfo = getUserInfo();

  constructor() {
    makeAutoObservable(this);
  }

  get useInfo() {
    return this.thisUserInfo;
  }

  set useInfo(useInfo: UserProps) {
    this.thisUserInfo = useInfo;
  }

  setInfoField(values: Partial<UserProps>) {
    this.thisUserInfo = {
      ...this.thisUserInfo,
      ...values,
    };
    setUserInfo(this.thisUserInfo);
  }

  clearUseInfo() {
    clearLocalStorage();
    this.thisUserInfo = { ...useInfoDefaultValue };
  }

  get role() {
    return this.thisUserInfo.role;
  }

  set role(role: string) {
    this.thisUserInfo.role = role;
  }
}

export default User;
