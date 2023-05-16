import { get } from 'api/init';

// auth:  base url

export const getCategories = () =>
  get({
    url: 'categories',
  });
