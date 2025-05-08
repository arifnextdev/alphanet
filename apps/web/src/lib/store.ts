import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersApi } from './services/usersApi';
import { productsApi } from './services/productsApi';
import { ordersApi } from './services/ordersApi';
import { cupponsApi } from './services/cuppons';
import { authApi } from './services/auth';

// auth slice
import { authSlice } from './slices/authSlice';




export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [cupponsApi.reducerPath]: cupponsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usersApi.middleware,
      productsApi.middleware,
      ordersApi.middleware,
      cupponsApi.middleware,
      authApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
