import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserI {
  _id: string;
  name: string;
  email: string;
  phone: string;
  is_employer?: boolean;
  photo?: any;
}
export interface AuthState {
  isAuth: boolean;
  user?: UserI;
}

const initialState: AuthState = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action: PayloadAction<UserI>) => {
      state.user = action.payload;
    },
  },
});

export const { setIsAuth, setUser } = authSlice.actions;

export default authSlice.reducer;
