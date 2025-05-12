import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api/auth';

export type userData = {
  full_name: string | null,
  isLogin: boolean,
  token: string | null,
}

export const user = createSlice({
  name: 'user',
  initialState: {
    full_name: null,
    isLogin: false,
    token: null,
  } as userData,
  reducers: {
    logout: (state) => {
      state.isLogin = false,
      state.token = null,
      state.full_name = null
    }
  },
    extraReducers: (builder) => {
      builder.addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => { 
          state.token = payload.data.token.accessToken;
          state.isLogin = true;
          state.full_name = payload.data.data.full_name;
        },
      );

    }
})

// Action creators are generated for each case reducer function
export const { logout } = user.actions;

export default user.reducer;