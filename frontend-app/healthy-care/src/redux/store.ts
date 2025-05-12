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
import { medicineApi } from "./api/medicine";
import { prescriptionApi } from "./api/prescription";
import prescription from "./slice/prescription_data";
import { medicalApi } from "./api/medical";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: [  "user", "theme", "prescription_data"],
};

const reducer = combineReducers({
    theme,
    route,
    user,
    prescription,
    [authApi.reducerPath] : authApi.reducer,
    [hospitalApi.reducerPath] : hospitalApi.reducer,
    [medicineApi.reducerPath] : medicineApi.reducer,
    [prescriptionApi.reducerPath] : prescriptionApi.reducer,
    [medicalApi.reducerPath] : medicalApi.reducer,
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
        .concat(hospitalApi.middleware)
        .concat(medicineApi.middleware)
        .concat(prescriptionApi.middleware)
        .concat(medicalApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
