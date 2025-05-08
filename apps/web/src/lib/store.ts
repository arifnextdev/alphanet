import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';

import { usersApi } from './services/usersApi';
import { productsApi } from './services/productsApi';
import { ordersApi } from './services/ordersApi';
import { cupponsApi } from './services/cuppons';
import { authApi } from './services/auth';
import authReducer from './slices/authSlice'; // default export!

const rootReducer = combineReducers({
  [usersApi.reducerPath]: usersApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [cupponsApi.reducerPath]: cupponsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }).concat(
      usersApi.middleware,
      productsApi.middleware,
      ordersApi.middleware,
      cupponsApi.middleware,
      authApi.middleware,
    ),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
