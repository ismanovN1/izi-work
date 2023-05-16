import { setSuccess, setError, stopLoadings } from 'store/common-store/common-slice';
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { startLoadings } from 'store/common-store/common-slice';
import { AppDispatch } from 'store';
import { CREATE_COMPANY, GET_MY_COMPANY, UPDATE_COMPANY } from './constans';
import { api } from 'api';
import { getErrorMessage } from 'helpers/common';
import { setCompanyData } from './company-slice';

export const create_company_thunk = (data: any) => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(CREATE_COMPANY));

  try {
    const form_data = new FormData();

    Object.keys(data).forEach((item: string) => {
      form_data.append(item, data[item]);
    });

    const res = await api.employer.company.create_company(form_data);

    if (res.status === 201) {
      dispatch(setSuccess(CREATE_COMPANY));
    }
  } catch (error) {
    dispatch(setError({ [CREATE_COMPANY]: getErrorMessage(error) }));
  } finally {
    dispatch(stopLoadings(CREATE_COMPANY));
  }
};

export const update_company_thunk = (data: any, companyId: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(UPDATE_COMPANY));

  try {
    const form_data = new FormData();

    Object.keys(data).forEach((item: string) => {
      form_data.append(item, data[item]);
    });

    const res = await api.employer.company.update_company(form_data, companyId);

    if (res.status === 200) {
      dispatch(setSuccess(UPDATE_COMPANY));
    }
  } catch (error) {
    dispatch(setError({ [UPDATE_COMPANY]: getErrorMessage(error) }));
  } finally {
    dispatch(stopLoadings(UPDATE_COMPANY));
  }
};

export const get_my_company_thunk = () => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(GET_MY_COMPANY));

  try {
    const res = await api.employer.company.get_my_company();

    if (res.status === 200) {
      dispatch(setSuccess(GET_MY_COMPANY));
      dispatch(setCompanyData(res.data));
    }
  } catch (error) {
    dispatch(setError({ [GET_MY_COMPANY]: getErrorMessage(error) }));
  } finally {
    dispatch(stopLoadings(GET_MY_COMPANY));
  }
};
