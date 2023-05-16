import { del, get, post, put } from 'api/init';

// auth:  base url
const getUrl = (path = ''): string => 'resumes/' + path;

export const get_my_resume = () =>
  get({
    url: getUrl('my-resume/'),
  });

export const get_resumes = (params: any) =>
  get({
    url: getUrl(),
    params,
  });

export const update_resume = (data: any, resumeId: string) =>
  put({
    url: getUrl(resumeId),
    data,
  });

export const create_resume = (data: any) =>
  post({
    url: getUrl(),
    data,
  });

export const get_resume_by_id = (id: string) =>
  get({
    url: getUrl(id),
  });

export const delete_resume = (id: string) =>
  del({
    url: getUrl(id),
  });
