import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE,
} from 'redux-persist';
import { i18nListener } from '@/store/listeners/i18n-listeners';
import { i18nReducer } from '@/store/slices/i18n-slice';
import { sessionReducer } from '@/store/slices/session-slice';
import { themeReducer } from '@/store/slices/theme-slice';

const rootReducer = {
  i18n: i18nReducer,
  theme: themeReducer,
  session: sessionReducer,
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
