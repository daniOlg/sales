import { langUrl } from '@/config/i18n';
import { Translations } from '@/services/i18n/types';

export function fetchI18nTranslations(lang: string): Promise<Translations> {
  return new Promise((resolve, reject) => {
    fetch(langUrl.replace('{lang}', lang))
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: Translations) => resolve(data))
      .catch((error) => {
        reject(error);
      });
  });
}
