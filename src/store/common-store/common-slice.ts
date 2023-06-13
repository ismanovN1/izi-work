import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CategoryI {
  _id: string;
  name: string;
  icon: string;
  default_image: string;
  children: Array<{ _id: string; name: string }>;
}

export interface CommonState {
  categories: Array<CategoryI>;
  loadings: { [key: string]: any };
  errors: { [key: string]: any };
  successes: { [key: string]: any };
}

const initialState: CommonState = {
  categories: [],
  loadings: {},
  successes: {},
  errors: {},
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Array<CategoryI>>) => {
      state.categories = action.payload;
    },
    startLoadings: (state, action: PayloadAction<string>) => {
      state.loadings = { ...state.loadings, [action.payload]: true };
    },
    stopLoadings: (state, action: PayloadAction<string>) => {
      state.loadings = { ...state.loadings, [action.payload]: undefined };
    },
    setSuccess: (state, { payload }: PayloadAction<string | object>) => {
      if (typeof payload === 'string') state.successes = { ...state.successes, [payload]: true };
      else state.successes = { ...state.successes, ...payload };
    },
    setError: (state, { payload }: PayloadAction<string | object>) => {
      if (typeof payload === 'string') state.errors = { ...state.errors, [payload]: true };
      else state.errors = { ...state.errors, ...payload };
    },
    removeSuccess: (state, action: PayloadAction<string>) => {
      state.successes = { ...state.successes, [action.payload]: undefined };
    },
    removeError: (state, action: PayloadAction<string>) => {
      state.errors = { ...state.errors, [action.payload]: undefined };
    },
  },
});

export const { startLoadings, setCategories, stopLoadings, setSuccess, setError, removeSuccess, removeError } =
  commonSlice.actions;

export default commonSlice.reducer;
