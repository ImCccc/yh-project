import axios from 'axios';
import type {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosInterceptorManager,
} from 'axios';
import {message} from 'antd';

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

//拦截器
request.interceptors.request.use((config) => {
  config = config || {};
  try {
    config.headers!['AuthToken'] = 'Testing';
    config.headers!['appkey'] = 'smart-cloud';
    config.headers!['Content-Type'] = 'application/json';
  } catch (e) {}
  return config;
});

request.interceptors.response.use(
  (response) => {
    const {data} = response;
    if (data?.code === 'OK' || data?.code === 0) {
      return Promise.resolve(data);
    } else {
      message.error(`${data.code}: ${data.msg}`);
      return Promise.reject(data);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
