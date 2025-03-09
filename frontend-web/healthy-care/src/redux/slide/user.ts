import { createSlice } from '@reduxjs/toolkit';

export type userData = {
  data: StaticRangeInit | null,
  isLogin: boolean,
  token: string | null,
}

export const user = createSlice({
  name: 'user',
  initialState: {
    data: null,
    isLogin: false,
  } as userData,
  reducers: {
  },
//   extraReducers: (builder) => {
//     builder.addMatcher(
//     //   authApi.endpoints.login.matchFulfilled,
//     //   (state, { payload }) => {
//     //     state.data = payload.data;
//     //     state.isLogin = true;
//     //   },
//     );
//     builder.addMatcher(
//       actionApi.endpoints.getDataUserByCookie.matchFulfilled,
//       (state, { payload }) => {
//         state.data = payload.data;
//         state.isLogin = true;
//       }
//     );
//     builder.addMatcher(
//       actionApi.endpoints.logout.matchFulfilled,
//       (state, { payload }) => {
//         state.data = null;
//         state.isLogin = false;
//       }
//     )
//   }
})

// Action creators are generated for each case reducer function
export const { } = user.actions;

export default user.reducer;