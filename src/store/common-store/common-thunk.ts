import { api } from 'api';
import { getErrorMessage } from 'helpers/common';
import { AppDispatch } from 'store';
import { setCategories } from './common-slice';

export const get_categories_thunk = () => async (dispatch: AppDispatch) => {
  try {
    const res = await api.employer.common.getCategories();
    if (res.status === 200) dispatch(setCategories(res.data));
  } catch (error) {
    console.log(getErrorMessage(error));
  }
};
