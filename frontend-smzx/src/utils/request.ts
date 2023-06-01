import { clientSSO, IRStorage } from '@infore/utils';
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

const request: NewAxiosInstance = axios.create({
  baseURL: '',
  timeout: 10000,
});

const goLogin = () => {
  clientSSO.gotoLoginPage();
  // clearLocalStorage();
  // location.href = `/#${LOGIN_PATH}?redirect=${encodeURIComponent(
  //   location.hash.replace('#', ''),
  // )}`;
  // message.error('登录信息过期, 请重新登录!');
};

//拦截器
request.interceptors.request.use((config) => {
  try {
    if (config.headers instanceof Object) {
      const currentToken = IRStorage.getAuthToken('accessToken');
      config.headers.authtoken = `Bearer ${currentToken}`;
      config.headers.appkey = 'smart-cloud';
      config.headers['Content-Type'] = 'application/json';
      config.headers['expire-time'] = 60 * 24;
    }
  } catch (e) {}
  return config;
});

request.interceptors.response.use(
  (response) => {
    if (+response.status === 401) {
      return goLogin();
    }

    const { data } = response;
    if (data?.code === 'OK' || data?.code === 0) {
      return Promise.resolve(data);
    } else {
      message.error(`${data.code}: ${data.msg}`);
      return Promise.reject(data);
    }
  },
  (error) => {
    if (error.response.status === 401) {
      return goLogin();
    }

    message.error(`${error.code}: ${error.message}`);
    Promise.reject(error);
  },
);

export default request;
