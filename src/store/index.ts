import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-store/auth-slice';
import companySlice from './company-store/company-slice';
import ResumeSlice from './resume-store/resume-slice';
import CommonSlice from './common-store/common-slice';
import VacanciesSlice from './vacancies-store/vacancies-slice';
import ActionSlice from './action-store/action-slice';
import ChatSlice from './chat-store/chat-slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    company: companySlice,
    resume: ResumeSlice,
    common: CommonSlice,
    vacancies: VacanciesSlice,
    actions: ActionSlice,
    chat: ChatSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
