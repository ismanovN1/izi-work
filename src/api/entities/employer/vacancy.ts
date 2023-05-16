import { del, get, post, put } from 'api/init';

// auth:  base url
const getUrl = (path = ''): string => 'vacancies/' + path;

export const get_my_vacancies = (params?: any) =>
  get({
    url: getUrl('my-vacancies'),
    params,
  });

export const get_vacancies = (params?: any) =>
  get({
    url: getUrl(),
    params,
  });

export const get_my_responded_vacancies = (params?: any) =>
  get({
    url: 'action/my-responded-vacancies',
    params,
  });

export const get_my_vacancy = (id: string) =>
  get({
    url: getUrl('my-vacancies/' + id),
  });

export const update_vacancy = (data: any, vacancyId: string) =>
  put({
    url: getUrl(vacancyId),
    data,
  });

export const create_vacancy = (data: any) =>
  post({
    url: getUrl(),
    data,
  });

export const get_vacancy_by_id = (id: string) =>
  get({
    url: getUrl(id),
  });

export const delete_vacancy = (id: string) =>
  del({
    url: getUrl(id),
  });
