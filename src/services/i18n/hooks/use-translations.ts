import { UnknownAction } from '@reduxjs/toolkit';
import { fetchTranslations } from '@/services/i18n/slices/i18n-promises';
import { setLang } from '@/services/i18n/slices/i18n-slice';
import { useAppDispatch, useAppSelector } from '@/store/store';

export function useTranslations() {
  const dispatch = useAppDispatch();

  const {
    status, supportedLangs, lang, translations,
  } = useAppSelector((state) => state.i18n);

  return {
    t: translations,
    lang,
    init: () => dispatch(fetchTranslations() as unknown as UnknownAction),
    setLang: (language: string) => dispatch(setLang(language)),
    status,
    supportedLangs,
  };
}
