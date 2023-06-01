import { AUTHORITY_ADMIN } from '@/config/constant';

const LOCALSTORAGE_KEY = {
  login: 'DATA_ANNOTATION_LOGIN',
  userInfo: 'DATA_ANNOTATION_USER_INFO',
  token: 'DATA_ANNOTATION_USER_TOKEN',
};

export type UserProps = {
  email: string;
  name: string;
  user_id: string;
  role: string;
  [key: string]: any;
};

export const useInfoDefaultValue: UserProps = {
  email: '',
  name: '',
  user_id: '',
  role: '',
};

let _token = localStorage.getItem(LOCALSTORAGE_KEY.token) || '';
export const getToken = () => {
  _token = _token || localStorage.getItem(LOCALSTORAGE_KEY.token) || '';
  return _token;
};

export const setToken = (token: string) => {
  _token = token || '';
  localStorage[LOCALSTORAGE_KEY.token] = _token;
};

export const clearToken = () => {
  _token = '';
  localStorage.removeItem(LOCALSTORAGE_KEY.token);
};

export const getUserInfo: () => UserProps = () => {
  try {
    return (
      JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY.userInfo) || '') || {
        ...useInfoDefaultValue,
      }
    );
  } catch (error) {
    return { ...useInfoDefaultValue };
  }
};

export const setUserInfo = (userInfo: UserProps) => {
  localStorage[LOCALSTORAGE_KEY.userInfo] = JSON.stringify(userInfo);
};

export const clearUserInfo = () => {
  localStorage.removeItem(LOCALSTORAGE_KEY.userInfo);
};

type LoginInfoProps = {
  remember: boolean;
  username: string;
  password: string;
  roleCode: string;
};

const loginInfoDefVal: LoginInfoProps = {
  remember: true,
  username: '',
  password: '',
  roleCode: AUTHORITY_ADMIN,
};

export const getLoginInfo: () => LoginInfoProps = () => {
  try {
    return (
      JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY.login) || '') || {
        ...loginInfoDefVal,
      }
    );
  } catch (error) {
    return { ...loginInfoDefVal };
  }
};

export const setLoginInfo = (loginInfo: LoginInfoProps) => {
  localStorage[LOCALSTORAGE_KEY.login] = JSON.stringify(loginInfo);
};

export const clearLoginInfo = () => {
  localStorage.removeItem(LOCALSTORAGE_KEY.login);
};

export const clearLocalStorage = () => {
  clearToken();
  clearUserInfo();
};
