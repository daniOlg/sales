import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { defaultLang, supportedLangs } from '@/config/i18n';
import { basePersistCfg } from '@/config/persistence';
import { I18nState } from '@/services/i18n/types';
import { fetchTranslations } from '@/store/promises/i18n-promises';

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
