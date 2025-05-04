import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Session, User } from '@supabase/supabase-js';
import { persistReducer } from 'redux-persist';
import { basePersistCfg } from '@/config/persistence';

type SessionState = {
  user: User | null
  session: Session | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
};

const initialState: SessionState = {
  user: null,
  session: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
      state.user = action.payload?.user || null;
      state.isAuthenticated = !!action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearSession: (state) => {
      state.user = null;
      state.session = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const sessionReducer = persistReducer(
  {
    ...basePersistCfg,
    key: 'session',
    whitelist: ['user', 'session', 'isAuthenticated'],
  },
  sessionSlice.reducer,
);

export const {
  setSession, setUser, setLoading, setError, clearSession,
} = sessionSlice.actions;
