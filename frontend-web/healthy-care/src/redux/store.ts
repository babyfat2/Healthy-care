import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  REHYDRATE,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, persistReducer
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authApi } from './api/auth';
import { doctorApi } from './api/doctor';
import { hospitalApi } from './api/hospital';
import user from './slide/user';
import { medicineApi } from './api/medicine';
import notification from './slide/notification';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["route", "user"],
};


const reducer = combineReducers({
  user,
  notification,
  [authApi.reducerPath]: authApi.reducer,
  [doctorApi.reducerPath]: doctorApi.reducer,
  [hospitalApi.reducerPath]: hospitalApi.reducer,
  [medicineApi.reducerPath]: medicineApi.reducer,
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
    .concat(doctorApi.middleware)
    .concat(hospitalApi.middleware)
    .concat(medicineApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
