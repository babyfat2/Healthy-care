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
import route from './slide/route';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};


const reducer = combineReducers({
  route,
  [authApi.reducerPath]: authApi.reducer,
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
      .concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
