import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE,
} from 'redux-persist';
import { authReducer } from '@/services/auth/slices/auth-slice';
import { i18nListener } from '@/services/i18n/slices/i18n-listeners';
import { i18nReducer } from '@/services/i18n/slices/i18n-slice';
import { themeReducer } from '@/services/theme/slices/theme-slice';

const rootReducer = {
  i18n: i18nReducer,
  theme: themeReducer,
  auth: authReducer,
};

const middlewares = [
  i18nListener.middleware,
];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).prepend(middlewares),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
