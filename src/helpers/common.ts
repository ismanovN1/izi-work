import { BASE_URL } from 'api/init';
import moment from 'moment';
import { isMobile } from 'react-device-detect';

const u = (window.innerWidth * (isMobile ? 0.2325 : 0.0520833)) / 100;

export const screen_height = window.innerHeight;
export const screen_width = window.innerWidth;

export const uw = (val: number): number => val * u;

export const checkObjValue = (obj: object): object => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null));
};

export const formatSalary = (from?: number, to?: number, unit = 'тг') => {
  if (from !== undefined && to !== undefined) {
    return `${from.toLocaleString('ru')} - ${to.toLocaleString('ru')} ${unit}`;
  } else if (from !== undefined) {
    return `c ${from.toLocaleString('ru')} ${unit}`;
  } else if (to !== undefined) {
    return `до ${to.toLocaleString('ru')} ${unit}`;
  } else return 'Не указан';
};

export const parseSalaryPeriod = (period?: string) => {
  switch (period) {
    case 'PER_MONTH':
      return 'в месяц';
    case 'PER_DAY':
      return 'в день';
    case 'PER_HOUR':
      return 'в час';
    default:
      return '';
  }
};

export const formatCreatedAt = (created_at: string) => {
  const now = moment(new Date());

  const years = now.diff(created_at, 'years');

  if (years) return `${years} y ago`;

  const weeks = now.diff(created_at, 'weeks');

  if (weeks) return `${weeks} w ago`;

  const days = now.diff(created_at, 'days');
  if (days) return `${days} d ago`;

  const hours = now.diff(created_at, 'hours');
  if (hours) return `${hours} h ago`;
};

export const getErrorMessage = (error: any) => {
  return (
    (typeof error?.response?.data === 'object' ? error?.response?.data?.message : error?.response?.data) ||
    error?.message ||
    'Неизвестная ошибка'
  );
};

export const get_def_images = (categoryId) => {
  return `${BASE_URL}default_images/${categoryId}`;
};
