import { post } from 'api/init';

// auth:  base url
const getUrl = (path = ''): string => 'auth/' + path;

export const auth = (data: any) =>
  post({
    url: getUrl('sign-in'),
    data,
  });

export const registration = (data: any) =>
  post({
    url: getUrl('registration'),
    data,
  });
