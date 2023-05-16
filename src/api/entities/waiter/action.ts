import { get, post } from 'api/init';

const getUrl = (path = ''): string => 'action/' + path;

export const get_respond = (params: any) =>
  get({
    url: getUrl('respond'),
    params,
  });

export const get_responds_by_vacancy_id = (params: any) =>
  get({
    url: getUrl('responds-by-vacancy-id'),
    params,
  });

export const respond = (data: any) =>
  post({
    url: getUrl('respond'),
    data,
  });

export const add_remove_my_favorite_resume = (data: any) =>
  post({
    url: getUrl('add-remove-my-favorite-resume'),
    data,
  });

export const add_remove_my_favorite_vacancy = (data: any) =>
  post({
    url: getUrl('add-remove-my-favorite-vacancy'),
    data,
  });

export const get_my_favorite_resumes = () =>
  get({
    url: getUrl('my-favorite-resumes'),
  });

export const get_my_favorite_resumes_ids = () =>
  get({
    url: getUrl('my-favorite-resumes-ids'),
  });

export const get_my_favorite_vacancies = () =>
  get({
    url: getUrl('my-favorite-vacancies'),
  });

export const get_my_favorite_vacancies_ids = () =>
  get({
    url: getUrl('my-favorite-vacancies-ids'),
  });
