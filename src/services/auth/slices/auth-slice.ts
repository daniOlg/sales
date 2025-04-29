import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session } from '@supabase/supabase-js';
import { persistReducer } from 'redux-persist';
import { basePersistCfg } from '@/config/persistence';

type AuthState = {
  session: Session | null;
};

const initialState: AuthState = {
  session: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
  },
});

export const authReducer = persistReducer(
  {
    ...basePersistCfg,
    key: 'auth',
    whitelist: ['auth'],
  },
  authSlice.reducer,
);

export const { setSession } = authSlice.actions;
