import axios, { AxiosRequestConfig } from 'axios';

export const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8001/' : 'https://izi-work.jcloud.kz/';

export const API_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8001/api/' : 'https://izi-work.jcloud.kz/api/';

export const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  },
});

export const makeQueryParams = (params: object = {}) => {
  return Object.keys(params).reduce((acc, param) => {
    if (!params[param as keyof typeof params] && params[param as keyof typeof params] !== 0) {
      return acc;
    }
    const currentQueryParams = acc;
    if (!currentQueryParams) {
      return `?${param}=${params[param as keyof typeof params]}`;
    }
    return `${currentQueryParams}&${param}=${params[param as keyof typeof params]}`;
  }, '');
};

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      setTimeout(() => {
        location.pathname = '/account/auth';
      }, 1000);
    }
    return Promise.reject(error);
  },
);

export const get = ({ url, params, config }: { url: string; params?: object; config?: AxiosRequestConfig }) =>
  instance.get(url + makeQueryParams(params), config);

export const post = ({ url, data, config }: { url: string; data?: object; config?: AxiosRequestConfig }) =>
  instance.post(url, data, config);

export const put = ({ url, data, config }: { url: string; data?: object; config?: AxiosRequestConfig }) =>
  instance.put(url, data, config);

export const del = ({ url, params, config }: { url: string; params?: object; config?: AxiosRequestConfig }) =>
  instance.delete(url + makeQueryParams(params), config);
