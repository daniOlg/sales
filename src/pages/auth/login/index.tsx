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
import { useTranslations } from '@/services/i18n/hooks/use-translations';

function Login() {
  const { t } = useTranslations();

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
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">{t.login.password}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t.login.passwordPlaceholder}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link to="/register">
            <Button variant="outline">{t.login.registerButton}</Button>
          </Link>
          <Button>{t.login.loginButton}</Button>
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
