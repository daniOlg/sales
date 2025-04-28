import { useTranslations } from '@/services/i18n/hooks/use-translations';

function HomePage() {
  const { t } = useTranslations();

  return (
    <h2>{t.home}</h2>
  );
}

export default HomePage;
