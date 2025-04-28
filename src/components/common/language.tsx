import { useEffect } from 'react';
import { useTranslations } from '@/services/i18n/hooks/use-translations';

function Language() {
  const { init } = useTranslations();

  useEffect(() => {
    init();
  }, []);

  return null;
}

export default Language;
