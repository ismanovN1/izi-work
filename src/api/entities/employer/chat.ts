import { get, post } from 'api/init';

// auth:  base url
const getUrl = (path = ''): string => 'chat/' + path;

export const get_chat = (params: any) =>
  get({
    url: getUrl('get-chat'),
    params,
  });

export const create_message = (data: any) =>
  post({
    url: getUrl('create-message'),
    data,
  });

export const get_messages = (params: any) =>
  get({
    url: getUrl('get-messages'),
    params,
  });

export const get_my_chats = () =>
  get({
    url: getUrl('get-my-chats'),
  });
