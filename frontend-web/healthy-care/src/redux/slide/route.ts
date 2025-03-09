import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api/auth';
import { EROLE } from '../../global/globalEum';

export type routeData = {
    isLogin: boolean;
    role: EROLE | undefined;
}

export const route = createSlice({
    name: 'route',
    initialState: {
        isLogin: false,
        role: undefined,
    } as routeData,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.role = payload.data.role;
                state.isLogin = true;
            }
        );
    }
})

// Action creators are generated for each case reducer function
export const { } = route.actions;

export default route.reducer;