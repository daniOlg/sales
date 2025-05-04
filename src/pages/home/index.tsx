import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { useSession } from '@/features/auth/hooks/use-session';
import { useTranslations } from '@/features/lang/hooks/use-translations';

function Home() {
  const { t } = useTranslations();
  const navigate = useNavigate();
  const { isAuthenticated } = useSession();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          {t.home.welcome}
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
          {t.home.subtitle}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link to="/login">
            <Button variant="default" size="lg">
              {t.home.loginButton}
            </Button>
          </Link>

          <Link to="/register">
            <Button variant="outline" size="lg">
              {t.home.registerButton}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Home;
