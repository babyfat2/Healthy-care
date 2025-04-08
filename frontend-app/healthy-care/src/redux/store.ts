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

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["theme"],
};

const reducer = combineReducers({
    theme,
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

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
