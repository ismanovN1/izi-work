import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type VacancyLookUpI = {
  category_name: string;
  created_at?: string;
  favorite: number;
  picture: string;
  status: string;
  descriptions: string;
  responses: number;
  salary_from?: number;
  salary_to?: number;
  views: 0;
  location?: {
    coordinates: number[];
  };
  _id: string;
};

export type filter_type = {
  page?: number;
  size?: number;
  category_id?: string;
  salary_from?: number;
  salary_to?: number;
  salary_period?: string;
  part_time?: boolean;
};

interface VacanciesStateI {
  total_vacancies?: number;
  current_vacancies?: any;
  vacancies: Array<Partial<VacancyLookUpI>>;
  filter_params: filter_type;
  my_vacancies: Array<Partial<VacancyLookUpI>>;
  favorite_vacancies: Array<Partial<VacancyLookUpI>>;
  favorite_vacancies_ids: Array<string>;
  my_responds: Array<Partial<VacancyLookUpI>>;
  vacancies_nearby: Array<Partial<VacancyLookUpI>>;
  my_active_vacancies: Array<Partial<VacancyLookUpI>>;
  my_closed_vacancies: Array<Partial<VacancyLookUpI>>;
  my_archived_vacancies: Array<Partial<VacancyLookUpI>>;
}

const initialState: VacanciesStateI = {
  filter_params: {
    page: 1,
    size: 10,
  },
  favorite_vacancies: [],
  favorite_vacancies_ids: [],
  total_vacancies: 0,
  vacancies: [],
  my_responds: [],
  vacancies_nearby: [],
  my_vacancies: [],
  my_active_vacancies: [],
  my_closed_vacancies: [],
  my_archived_vacancies: [],
};

export const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setFilter: (state, { payload }: PayloadAction<((prev: filter_type) => filter_type) | filter_type>) => {
      if (typeof payload === 'function') state.filter_params = payload(state.filter_params);
      else state.filter_params = { ...payload };
    },
    setVacancies: (state, { payload }: PayloadAction<any>) => {
      state.vacancies = payload;
    },
    setFavoriteVacancies: (state, { payload }: PayloadAction<any>) => {
      state.favorite_vacancies = payload;
    },
    setFavoriteVacanciesIds: (state, { payload }: PayloadAction<any>) => {
      state.favorite_vacancies_ids = payload;
    },
    setMyResponds: (state, { payload }: PayloadAction<any>) => {
      state.my_responds = payload;
    },
    setCurrentCacancies: (state, { payload }: PayloadAction<any>) => {
      state.current_vacancies = payload;
    },
    setVacanciesNearby: (state, { payload }: PayloadAction<any>) => {
      state.vacancies_nearby = payload;
    },
    addVacancies: (state, { payload }: PayloadAction<any>) => {
      state.vacancies = [...state.vacancies, ...payload];
    },
    setTotalVcacncies: (state, { payload }: PayloadAction<number>) => {
      state.total_vacancies = payload;
    },
    setMyVacancies: (state, { payload }: PayloadAction<Array<Partial<VacancyLookUpI>>>) => {
      state.my_vacancies = payload;
      state.my_active_vacancies = payload.filter((item) => item.status === 'ACTIVE');
      state.my_closed_vacancies = payload.filter((item) => item.status === 'CLOSED');
      state.my_archived_vacancies = payload.filter((item) => item.status === 'ARCHIVED');
    },
    addVacancy: (state, action: PayloadAction<Partial<VacancyLookUpI>>) => {
      state.vacancies = [...state.vacancies, action.payload];
    },
    deleteVacancy: (state, action: PayloadAction<string>) => {
      state.vacancies = state.vacancies.filter((item) => item._id !== action.payload);
    },
  },
});

export const {
  addVacancy,
  setVacanciesNearby,
  setFavoriteVacancies,
  setFavoriteVacanciesIds,
  addVacancies,
  deleteVacancy,
  setVacancies,
  setMyVacancies,
  setCurrentCacancies,
  setMyResponds,
  setFilter,
  setTotalVcacncies,
} = vacanciesSlice.actions;

export default vacanciesSlice.reducer;
