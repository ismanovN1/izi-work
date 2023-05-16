import { setError, startLoadings, stopLoadings, removeError, setSuccess } from 'store/common-store/common-slice';
import { api } from 'api';
import { getErrorMessage } from 'helpers/common';
import { AppDispatch } from 'store';
import { setCurrentRespond } from './action-slice';
import {
  ADD_REMOVE_MY_FAVORITE_RESUME,
  ADD_REMOVE_MY_FAVORITE_VACANCY,
  GET_RESPOND,
  GET_RESPONDS_BY_VACANCY_ID,
  RESPOND,
} from './constants';
import { setFavoriteVacanciesIds } from 'store/vacancies-store/vacancies-slice';
import { setFavoriteResume } from 'store/resume-store/resume-slice';

export const get_respond_thunk = (params: any) => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(GET_RESPOND));
  try {
    const res = await api.waiter.action.get_respond(params);
    if (res.status === 200) dispatch(setCurrentRespond(res.data));
  } catch (error) {
    console.log(getErrorMessage(error));
  } finally {
    dispatch(stopLoadings(GET_RESPOND));
  }
};

export const get_responds_by_vacancy_id_thunk = (params: any) => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(GET_RESPONDS_BY_VACANCY_ID));
  try {
    const res = await api.waiter.action.get_responds_by_vacancy_id(params);
    if (res.status === 200) {
      dispatch(setSuccess({ [GET_RESPONDS_BY_VACANCY_ID]: res.data }));
    }
  } catch (error) {
    dispatch(setError({ [GET_RESPONDS_BY_VACANCY_ID]: getErrorMessage(error) }));
  } finally {
    dispatch(stopLoadings(GET_RESPONDS_BY_VACANCY_ID));
  }
};

export const respond_thunk = (data) => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(RESPOND));
  dispatch(removeError(RESPOND));
  try {
    const res = await api.waiter.action.respond(data);
    if (res.status === 200) {
      dispatch(setSuccess(RESPOND));
      dispatch(setCurrentRespond(res.data));
    }
  } catch (error) {
    dispatch(setError({ [RESPOND]: getErrorMessage(error) }));
  } finally {
    dispatch(stopLoadings(RESPOND));
  }
};

export const add_remove_my_favorite_vacancy_thunk = (data: any) => async (dispatch: AppDispatch) => {
  dispatch(removeError(ADD_REMOVE_MY_FAVORITE_VACANCY));
  try {
    const res = await api.waiter.action.add_remove_my_favorite_vacancy(data);
    if (res.status === 200) {
      dispatch(setFavoriteVacanciesIds(res.data));
    }
  } catch (error) {
    dispatch(setError({ [ADD_REMOVE_MY_FAVORITE_VACANCY]: getErrorMessage(error) }));
  }
};

export const get_my_favorite_resumes_ids_thunk = () => async (dispatch: AppDispatch) => {
  dispatch(removeError(ADD_REMOVE_MY_FAVORITE_RESUME));
  try {
    const res = await api.waiter.action.get_my_favorite_resumes_ids();
    if (res.status === 200) {
      dispatch(setFavoriteResume(res.data));
    }
  } catch (error) {
    dispatch(setError({ [ADD_REMOVE_MY_FAVORITE_RESUME]: getErrorMessage(error) }));
  }
};

export const add_remove_my_favorite_resume_thunk = (data: any) => async (dispatch: AppDispatch) => {
  dispatch(removeError(ADD_REMOVE_MY_FAVORITE_RESUME));
  try {
    const res = await api.waiter.action.add_remove_my_favorite_resume(data);
    if (res.status === 200) {
      dispatch(setFavoriteResume(res.data));
    }
  } catch (error) {
    dispatch(setError({ [ADD_REMOVE_MY_FAVORITE_RESUME]: getErrorMessage(error) }));
  }
};
