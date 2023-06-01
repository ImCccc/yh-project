import { LOGIN_PATH } from '@/config/constant';
import { clearLocalStorage, getToken } from '@/utils/storage';
import { message } from 'antd';
import axios, {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

interface NewAxiosInstance extends AxiosInstance {
  <T>(url: string, config: AxiosRequestConfig): Promise<T>;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
}

const thisRequest: NewAxiosInstance = axios.create({
  baseURL: '',
  timeout: 1000000,
});

const goLogin = (msg?: string) => {
  clearLocalStorage();
  location.href = `/#${LOGIN_PATH}?redirect=${encodeURIComponent(
    location.hash.replace('#', ''),
  )}`;
  message.error(msg || '登录信息过期, 请重新登录!');
};

//拦截器
thisRequest.interceptors.request.use((config) => {
  try {
    const token = getToken();
    if (config.headers instanceof Object) {
      config.headers.authtoken = token;
      config.headers['Content-Type'] = 'application/json';
    }
  } catch (e) {}
  return config;
});

thisRequest.interceptors.response.use(
  (response) => {
    if (+response.status === 401) {
      return Promise.reject(response);
    }
    const { data } = response;
    return Promise.resolve(data);
  },
  (error) => {
    if (error.response.status === 401) {
      let msg = '';
      try {
        msg = error.response.data.msg;
      } catch (error) {}
      goLogin(msg);
      return Promise.reject(error);
    }
    message.error(`${error.code}: ${error.message}`);
    return Promise.reject(error);
  },
);

const request = <T = any>(
  url: string,
  config: AxiosRequestConfig & { showMessage?: boolean },
) => {
  const { showMessage, ...otherConfig } = config;
  return new Promise<T>((resolve, reject) => {
    thisRequest(url, otherConfig).then(
      (data: any) => {
        if (data?.code === 'OK' || data?.code === 0) return resolve(data as T);
        if (showMessage !== false) message.error(data.msg);
        reject(data);
      },
      (data) => reject(data),
    );
  });
};

export default request;
