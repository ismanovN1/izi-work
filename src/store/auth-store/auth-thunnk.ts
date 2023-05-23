import { getErrorMessage } from './../../helpers/common';
import { REGISTRATION, AUTHORIZATION, EDIT_USER, CHANGE_PASSWORD } from './constants';
import { AppDispatch } from 'store';
import { setError, setSuccess, startLoadings, stopLoadings } from 'store/common-store/common-slice';
import { api } from 'api';
import { instance } from 'api/init';
import { setUser } from './auth-slice';

export const registration_thunk = (data: any, onSuccess?: () => void) => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(REGISTRATION));
  console.log('loppi');

  try {
    const res = await api.employer.auth.registration(data);
    if (res.status === 200) {
      const token = `Bearer ${res.data.token}`;
      instance.defaults.headers.common.Authorization = token;
      localStorage.setItem('@token', token);
      localStorage.setItem('@user_data', JSON.stringify(res.data));
      dispatch(setUser(res.data));
      onSuccess?.();
    }
  } catch (error) {
    dispatch(setError({ [REGISTRATION]: getErrorMessage(error) }));
  } finally {
    dispatch(stopLoadings(REGISTRATION));
  }
};

export const authorization_thunk = (data: any, onSuccess: () => void) => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(AUTHORIZATION));

  try {
    const res = await api.employer.auth.auth(data);
    if (res.status === 200) {
      const token = `Bearer ${res.data.token}`;
      instance.defaults.headers.common.Authorization = token;
      localStorage.setItem('@token', token);
      localStorage.setItem('@user_data', JSON.stringify(res.data));
      dispatch(setUser(res.data));
      onSuccess?.();
    }
  } catch (error) {
    dispatch(setError({ [AUTHORIZATION]: getErrorMessage(error) }));
  } finally {
    dispatch(stopLoadings(AUTHORIZATION));
  }
};

export const edit_user_data_thunk = (data: any) => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(EDIT_USER));

  try {
    const res = await api.waiter.auth.edit_user(data);
    if (res.status === 200) {
      localStorage.setItem('@user_data', JSON.stringify(res.data));
      dispatch(setUser(res.data));
      dispatch(setSuccess(EDIT_USER));
    }
  } catch (error) {
    dispatch(setError({ [EDIT_USER]: getErrorMessage(error) }));
  } finally {
    dispatch(stopLoadings(EDIT_USER));
  }
};

export const change_password_thunk = (data: any) => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(CHANGE_PASSWORD));

  try {
    const res = await api.waiter.auth.change_password(data);
    if (res.status === 200) {
      const token = `Bearer ${res.data.token}`;
      instance.defaults.headers.common.Authorization = token;
      localStorage.setItem('@token', token);
      dispatch(setSuccess(CHANGE_PASSWORD));
    }
  } catch (error) {
    dispatch(setError({ [CHANGE_PASSWORD]: getErrorMessage(error) }));
  } finally {
    dispatch(stopLoadings(CHANGE_PASSWORD));
  }
};
