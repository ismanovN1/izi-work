import axios, { AxiosRequestConfig } from 'axios';
import { getErrorMessage } from 'helpers/common';
import https from 'https';

export const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'https://api.iziwork.kz:3003/' : 'https://api.iziwork.kz:3003/';

export const API_URL =
  process.env.NODE_ENV === 'development' ? 'https://api.iziwork.kz:3003/api/' : 'https://api.iziwork.kz:3003/api/';

export const instance = axios.create({
  baseURL: API_URL,
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

let tid: any;

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      clearTimeout(tid);
      tid = setTimeout(() => {
        window.alert(`401 ${getErrorMessage(error)}`);
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
