import { createListenerMiddleware } from '@reduxjs/toolkit';
import { fetchTranslations } from '@/services/i18n/slices/i18n-promises';
import { setLang } from '@/services/i18n/slices/i18n-slice';

const i18nListener = createListenerMiddleware();

i18nListener.startListening({
  actionCreator: setLang,
  effect: async (_, listener) => {
    await listener.dispatch(fetchTranslations());
  },
});

export { i18nListener };
