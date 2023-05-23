import { waiter } from './../../api/entities/waiter/index';
import {
  GET_VACANCY_BY_ID,
  CREATE_VACANCY,
  GET_MY_VACANCIES,
  UPDATE_VACANCY,
  GET_MY_VACANCY_BY_ID,
  GET_VACANCIES,
  GET_VACANCIES_NEARBY,
  GET_MY_RESPONDS,
  GET_MY_FAVORITE_VACANCIES,
  GET_MY_FAVORITE_VACANCIES_IDS,
} from './constans';
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { setSuccess, setError, stopLoadings, startLoadings, removeError } from 'store/common-store/common-slice';
import { AppDispatch } from 'store';
import { api } from 'api';
import { getErrorMessage } from 'helpers/common';
import {
  addVacancies,
  setFavoriteVacancies,
  setFavoriteVacanciesIds,
  setMyResponds,
  setMyVacancies,
  setTotalVcacncies,
  setVacancies,
  setVacanciesNearby,
} from './vacancies-slice';

export const create_vacancy_thunk = (data: any, onSuccess?: () => void) => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(CREATE_VACANCY));

  try {
    const form_data = new FormData();

    Object.keys(data).forEach((item: string) => {
      form_data.append(item, data[item]);
    });

    const res = await api.employer.vacancy.create_vacancy(form_data);

    if (res.status === 201) {
      onSuccess?.();
    }
  } catch (error) {
    dispatch(setError({ [CREATE_VACANCY]: getErrorMessage(error) }));
  } finally {
    dispatch(stopLoadings(CREATE_VACANCY));
  }
};

export const update_vacancy_thunk = (data: any, vacancyId: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(UPDATE_VACANCY));

  try {
    const form_data = new FormData();

    Object.keys(data).forEach((item: string) => {
      form_data.append(item, data[item]);
    });

    const res = await api.employer.vacancy.update_vacancy(form_data, vacancyId);

    if (res.status === 200) {
      dispatch(setSuccess(UPDATE_VACANCY));
    }
  } catch (error) {
    dispatch(setError({ [UPDATE_VACANCY]: getErrorMessage(error) }));
  } finally {
    dispatch(stopLoadings(UPDATE_VACANCY));
  }
};

export const get_my_vacancies_thunk = () => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(GET_MY_VACANCIES));

  try {
    const res = await api.employer.vacancy.get_my_vacancies();

    if (res.status === 200) {
      dispatch(setSuccess(GET_MY_VACANCIES));
      dispatch(setMyVacancies(res.data));
    }
  } catch (error) {
    dispatch(setError({ [GET_MY_VACANCIES]: getErrorMessage(error) }));
  } finally {
    dispatch(stopLoadings(GET_MY_VACANCIES));
  }
};

export const get_vacancies_thunk = (params: any) => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(GET_VACANCIES));

  try {
    const res = await api.employer.vacancy.get_vacancies(params);

    if (res.status === 200) {
      dispatch(setTotalVcacncies(res.data.total));
      if (Number(res.data.page) < 2) dispatch(setVacancies(res.data.data));
      else dispatch(addVacancies(res.data.data));
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(stopLoadings(GET_VACANCIES));
  }
};

export const get_vacancies_nearby_thunk = (params: any) => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(GET_VACANCIES_NEARBY));

  try {
    const res = await api.employer.vacancy.get_vacancies(params);

    if (res.status === 200) {
      dispatch(setVacanciesNearby(res.data.data));
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(stopLoadings(GET_VACANCIES_NEARBY));
  }
};

export const get_my_vacancy_by_id_thunk =
  (id: string, setVacancy: (val: any) => void) => async (dispatch: AppDispatch) => {
    dispatch(startLoadings(GET_MY_VACANCY_BY_ID));

    try {
      if (!id) throw new Error('Id is required');

      const res = await api.employer.vacancy.get_my_vacancy(id);

      if (res.status === 200) {
        setVacancy?.(res.data);
      }
    } catch (error) {
      dispatch(setError({ [GET_MY_VACANCY_BY_ID]: getErrorMessage(error) }));
    } finally {
      dispatch(stopLoadings(GET_MY_VACANCY_BY_ID));
    }
  };

export const get_vacancy_by_id_thunk = (id: string, onSuccess) => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(GET_VACANCY_BY_ID));
  dispatch(removeError(GET_VACANCY_BY_ID));

  try {
    const res = await api.employer.vacancy.get_vacancy_by_id(id);

    if (res.status === 200) {
      onSuccess?.(res.data);
    }
  } catch (error) {
    dispatch(setError({ [GET_VACANCY_BY_ID]: getErrorMessage(error) }));
  } finally {
    dispatch(stopLoadings(GET_VACANCY_BY_ID));
  }
};

export const get_my_responds_thunk = () => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(GET_MY_RESPONDS));
  dispatch(removeError(GET_MY_RESPONDS));

  try {
    const res = await api.employer.vacancy.get_my_responded_vacancies();

    if (res.status === 200) {
      dispatch(setMyResponds(res.data));
    }
  } catch (error) {
    dispatch(setError({ [GET_MY_RESPONDS]: getErrorMessage(error) }));
  } finally {
    dispatch(stopLoadings(GET_MY_RESPONDS));
  }
};

export const get_my_favorite_vacancies_thunk = () => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(GET_MY_FAVORITE_VACANCIES));

  try {
    const res = await api.waiter.action.get_my_favorite_vacancies();

    if (res.status === 200) {
      dispatch(setFavoriteVacancies(res.data));
    }
  } catch (error) {
    console.log(getErrorMessage(error));
  } finally {
    dispatch(stopLoadings(GET_MY_FAVORITE_VACANCIES));
  }
};

export const get_my_favorite_vacancies_ids_thunk = () => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(GET_MY_FAVORITE_VACANCIES_IDS));

  try {
    const res = await api.waiter.action.get_my_favorite_vacancies_ids();

    if (res.status === 200) {
      dispatch(setFavoriteVacanciesIds(res.data));
    }
  } catch (error) {
    console.log(getErrorMessage(error));
  } finally {
    dispatch(stopLoadings(GET_MY_FAVORITE_VACANCIES_IDS));
  }
};
