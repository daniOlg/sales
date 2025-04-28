import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { defaultLang, supportedLangs } from '@/config/i18n';
import { basePersistCfg } from '@/config/persistence';
import { fetchTranslations } from '@/services/i18n/slices/i18n-promises';
import { I18nState } from '@/services/i18n/types';

const initialState: I18nState = {
  status: 'loading',
  lang: defaultLang,
  supportedLangs: {
    ...supportedLangs,
  },
  translations: {},
};

export const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTranslations.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchTranslations.fulfilled, (state, action) => {
      state.translations = action.payload;
      state.status = 'idle';
    });
    builder.addCase(fetchTranslations.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const { setLang } = i18nSlice.actions;

export const i18nReducer = persistReducer(
  {
    ...basePersistCfg,
    key: 'i18n',
    whitelist: ['lang'],
  },
  i18nSlice.reducer,
);
