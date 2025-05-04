import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { basePersistCfg } from '@/config/persistence';
import { defaultTheme, supportedThemes } from '@/config/theme';

type ThemeState = {
  theme: string;
  supportedThemes: typeof supportedThemes;
};

const initialState: ThemeState = {
  theme: defaultTheme,
  supportedThemes: { ...supportedThemes },
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});

export const themeReducer = persistReducer(
  {
    ...basePersistCfg,
    key: 'theme',
    whitelist: ['theme'],
  },
  themeSlice.reducer,
);

export const { setTheme } = themeSlice.actions;
