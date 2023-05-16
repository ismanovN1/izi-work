import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type respond_type = {
  _id?: string;
  waiter_id?: string;
  chat_id?: string;
  vacancy_id?: string;
  resume_id?: string;
  employer_id?: string;
  respond_id?: string;
  is_called?: boolean;
  is_responded?: boolean;
};

export interface ActionsState {
  current_respond?: respond_type;
}

const initialState: ActionsState = {};

export const actionsSlice = createSlice({
  name: 'actions',
  initialState,
  reducers: {
    setCurrentRespond: (state, action: PayloadAction<any>) => {
      state.current_respond = action.payload;
    },
  },
});

export const { setCurrentRespond } = actionsSlice.actions;

export default actionsSlice.reducer;
