import { createAsyncThunk } from '@reduxjs/toolkit';
import { defaultLang } from '@/config/i18n';
import { fetchI18nTranslations } from '@/services/i18n/api/i18n-api';
import { Translations } from '@/services/i18n/types';
import { RootState } from '@/store/store';

export const fetchTranslations = createAsyncThunk(
  'i18n/fetchTranslations',
  async (_, { getState }): Promise<Translations> => {
    const state = getState() as RootState;
    const resolvedLang = state.i18n.lang || defaultLang;

    try {
      return await fetchI18nTranslations(resolvedLang);
    } catch (error) {
      throw new Error('Failed to fetch translations');
    }
  },
);
