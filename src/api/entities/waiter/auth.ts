import { post, put } from 'api/init';

// auth:  base url
const getUrl = (path = ''): string => 'auth/' + path;

export const edit_user = (data: any) =>
  put({
    url: getUrl('/edit-user'),
    data,
  });

export const change_password = (data: any) =>
  put({
    url: getUrl('/change-password'),
    data,
  });
