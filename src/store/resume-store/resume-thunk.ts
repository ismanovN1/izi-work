import { GET_MY_RESUME, CREATE_RESUME, UPDATE_RESUME, GET_RESUMES, GET_RESUME_BY_ID } from './constans';
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { setSuccess, setError, stopLoadings, startLoadings, removeError } from 'store/common-store/common-slice';
import { AppDispatch } from 'store';
import { api } from 'api';
import { checkObjValue, getErrorMessage } from 'helpers/common';
import { addResumes, setResume, setResumes } from './resume-slice';

const parse_resume = (resume: any) => {
  return checkObjValue({
    _id: resume._id,
    owner_id: resume.owner_id,
    photo: resume.picture,
    category: {
      _id: resume.category_id,
      childId: resume.sub_category_id,
      name: resume.category_name,
    },
    about: resume.about_me,
    experience: resume.experience,
    status: resume.status,
    salary: {
      from: resume.salary_from,
      to: resume.salary_to,
      period: resume.salary_period,
    },
    address: {
      name: resume.address,
      coords: (resume.location?.coordinates || []).reverse(),
    },
  });
};

export const create_resume_thunk = (data: any) => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(CREATE_RESUME));

  try {
    const form_data = new FormData();

    Object.keys(data).forEach((item: string) => {
      form_data.append(item, data[item]);
    });

    const res = await api.employer.resume.create_resume(form_data);

    if (res.status === 201) {
      dispatch(setSuccess(CREATE_RESUME));
    }
  } catch (error) {
    dispatch(setError({ [CREATE_RESUME]: getErrorMessage(error) }));
  } finally {
    dispatch(stopLoadings(CREATE_RESUME));
  }
};

export const update_resume_thunk = (data: any, resumeId: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(CREATE_RESUME));

  try {
    const form_data = new FormData();

    Object.keys(data).forEach((item: string) => {
      form_data.append(item, data[item]);
    });

    const res = await api.employer.resume.update_resume(form_data, resumeId);

    if (res.status === 200) {
      dispatch(setSuccess(CREATE_RESUME));
    }
  } catch (error) {
    dispatch(setError({ [CREATE_RESUME]: getErrorMessage(error) }));
  } finally {
    dispatch(stopLoadings(CREATE_RESUME));
  }
};

export const get_my_resume_thunk = () => async (dispatch: AppDispatch) => {
  dispatch(removeError(GET_MY_RESUME));
  dispatch(startLoadings(GET_MY_RESUME));

  try {
    const res = await api.employer.resume.get_my_resume();

    if (res.status === 200) {
      dispatch(setResume(parse_resume(res.data)));
    }
  } catch (error) {
    dispatch(setError({ [GET_MY_RESUME]: getErrorMessage(error) }));
  } finally {
    dispatch(stopLoadings(GET_MY_RESUME));
  }
};

export const get_resumes_thunk = (params: any) => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(GET_RESUMES));

  try {
    const res = await api.employer.resume.get_resumes(params);
    if (res.status === 200) {
      if (res.data.page === 1) dispatch(setResumes(res.data.data));
      else dispatch(addResumes(res.data.data));
    }
  } catch (error) {
    console.log(getErrorMessage(error));
  } finally {
    dispatch(stopLoadings(GET_RESUMES));
  }
};

export const get_resume_by_id_thunk = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoadings(GET_RESUME_BY_ID));
  dispatch(removeError(GET_RESUME_BY_ID));

  try {
    const res = await api.employer.resume.get_resume_by_id(id);
    if (res.status === 200) {
      dispatch(setSuccess({ [GET_RESUME_BY_ID]: res.data }));
    }
  } catch (error) {
    dispatch(setError({ [GET_RESUME_BY_ID]: getErrorMessage(error) }));
  } finally {
    dispatch(stopLoadings(GET_RESUME_BY_ID));
  }
};
