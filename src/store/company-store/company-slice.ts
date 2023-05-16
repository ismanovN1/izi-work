import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CompanyState {
  company_data?: {
    _id: string;
    logo?: any;
    name: string;
    description?: string;
  };
}

const initialState: CompanyState = {};

export const companySlice = createSlice({
  name: 'Company',
  initialState,
  reducers: {
    setCompanyData: (state, action: PayloadAction<CompanyState['company_data']>) => {
      state.company_data = action.payload;
    },
  },
});

export const { setCompanyData } = companySlice.actions;

export default companySlice.reducer;
