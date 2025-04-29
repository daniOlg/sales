import { useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { supabase } from '@/clients/supabase';
import { BorderBeam } from '@/components/magicui/border-beam';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import { useTranslations } from '@/services/i18n/hooks/use-translations';

function Login() {
  const { t } = useTranslations();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // TODO: Add zod validations

  const handleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t.login.success);
      // TODO: Redirect to dashboard
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="relative w-[350px] overflow-hidden">
        <CardHeader>
          <CardTitle>{t.login.title}</CardTitle>
          <CardDescription>
            {t.login.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">{t.login.email}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.login.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                {/* TODO: Add forgot password button/link */}
                <Label htmlFor="password">{t.login.password}</Label>
                <PasswordInput
                  id="password"
                  placeholder={t.login.passwordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            className="w-full"
            disabled={loading}
            onClick={handleLogin}
          >
            {t.login.loginButton}
          </Button>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            {t.login.notRegistered}
            {' '}
            <Link to="/register">
              <span className="underline underline-offset-4 hover:text-primary">
                {t.login.registerButton}
              </span>
            </Link>
          </div>
        </CardFooter>
        <BorderBeam
          duration={6}
          delay={3}
          size={400}
          className="from-transparent via-purple-500 to-transparent"
        />
      </Card>
    </div>
  );
}

export default Login;
