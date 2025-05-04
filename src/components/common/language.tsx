import { useEffect } from 'react';
import { useTranslations } from '@/features/lang/hooks/use-translations';

function Language() {
  const { init } = useTranslations();

  useEffect(() => {
    init();
  }, []);

  return null;
}

export default Language;
