import { del, get, post, put } from 'api/init';

// auth:  base url
const getUrl = (path = ''): string => 'companies/' + path;

export const get_my_company = () =>
  get({
    url: getUrl(),
  });

export const update_company = (data: any, companyId: string) =>
  put({
    url: getUrl('update/' + companyId),
    data,
  });

export const create_company = (data: any) =>
  post({
    url: getUrl('create'),
    data,
  });

export const get_company_by_id = (id: string) =>
  get({
    url: getUrl(id),
  });

export const delete_company = (id: string) =>
  del({
    url: getUrl('delete/' + id),
  });
