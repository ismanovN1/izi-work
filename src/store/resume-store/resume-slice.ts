import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ResumeI } from 'types/common';

type resume_filter_params = Partial<{
  page: number;
  size: number;
  search?: string;
  salary_from: number;
  salary_to: number;
  salary_period: string;
  category_id: string;
  sub_category_id: string;
  address: string;
  lat: number;
  lon: number;
  distance: number;
}>;

interface ResumeStateI {
  resume?: Partial<ResumeI>;
  current_resume?: any;
  favorite_resumes: string[];
  resumes: any[];
  total_resumes: number;
  filter_params: resume_filter_params;
}

const initialState: ResumeStateI = {
  favorite_resumes: [],
  resumes: [],
  total_resumes: 0,
  filter_params: {
    page: 1,
    size: 20,
  },
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setFilterParams: (
      state,
      { payload }: PayloadAction<((prev: resume_filter_params) => resume_filter_params) | resume_filter_params>,
    ) => {
      if (typeof payload === 'function') state.filter_params = payload(state.filter_params);
      else state.filter_params = { ...payload };
    },
    setResume: (state, action: PayloadAction<Partial<ResumeI> | undefined>) => {
      state.resume = action.payload;
    },
    setCurrentResume: (state, action: PayloadAction<Partial<ResumeI> | undefined>) => {
      state.current_resume = action.payload;
    },
    setFavoriteResume: (state, action: PayloadAction<string[]>) => {
      state.favorite_resumes = action.payload;
    },
    setResumes: (state, action: PayloadAction<any[]>) => {
      state.resumes = action.payload;
    },
    addResumes: (state, action: PayloadAction<any[]>) => {
      state.resumes = [...state.resumes, ...action.payload];
    },
  },
});

export const { setResume, setResumes, setFavoriteResume, setFilterParams, addResumes, setCurrentResume } =
  resumeSlice.actions;

export default resumeSlice.reducer;
