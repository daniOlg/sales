import { useState } from 'react';
import { Link } from 'react-router';
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

function Register() {
  const { t } = useTranslations();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="relative w-[350px] overflow-hidden">
        <CardHeader>
          <CardTitle>{t.register.title}</CardTitle>
          <CardDescription>
            {t.register.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">{t.register.name}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t.register.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">{t.register.email}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.register.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">{t.register.password}</Label>
                <PasswordInput
                  id="password"
                  placeholder={t.register.passwordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">{t.register.confirmPassword}</Label>
                <PasswordInput
                  id="confirmPassword"
                  placeholder={t.register.confirmPasswordPlaceholder}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full">{t.register.registerButton}</Button>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            {t.register.alreadyRegistered}
            {' '}
            <Link to="/login">
              <span className="underline underline-offset-4 hover:text-primary">
                {t.register.backToLogin}
              </span>
            </Link>
          </div>
        </CardFooter>
        <BorderBeam
          duration={6}
          delay={3}
          size={400}
          className="from-transparent via-blue-500 to-transparent"
        />
      </Card>
    </div>
  );
}

export default Register;
