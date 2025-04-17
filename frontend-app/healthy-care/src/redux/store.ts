import { combineReducers, configureStore, } from "@reduxjs/toolkit";
import {
    REHYDRATE,
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistReducer,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import theme from "./slice/theme";
import route from "./slice/route";
import { authApi } from "./api/auth";
import user from "./slice/user";
import { hospitalApi } from "./api/hospital";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: [ "route", "user", "theme"],
};

const reducer = combineReducers({
    theme,
    route,
    user,
    [authApi.reducerPath] : authApi.reducer,
    [hospitalApi.reducerPath] : hospitalApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                immutableCheck: false,
                serializableCheck: false,
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
        .concat(authApi.middleware)
        .concat(hospitalApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
