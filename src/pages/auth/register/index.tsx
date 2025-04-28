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

function Register() {
  const { t } = useTranslations();

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
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">{t.register.email}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.register.emailPlaceholder}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">{t.register.password}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t.register.passwordPlaceholder}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">{t.register.confirmPassword}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder={t.register.confirmPasswordPlaceholder}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link to="/login">
            <Button variant="outline">{t.register.backToLogin}</Button>
          </Link>
          <Button>{t.register.registerButton}</Button>
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
