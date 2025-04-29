import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { supabase } from '@/clients/supabase';
import { BorderBeam } from '@/components/magicui/border-beam';
import { Button } from '@/components/ui/button';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { useTranslations } from '@/services/i18n/hooks/use-translations';

function Login() {
  const navigate = useNavigate();
  const { t } = useTranslations();

  const [loading, setLoading] = useState(false);

  const LOGIN_FORM_SCHEMA = z.object({
    email: z.string().email({ message: t.login.validation.email }),
    password: z.string().min(8, { message: t.login.validation.passwordMin8 }),
  });

  const form = useForm<z.infer<typeof LOGIN_FORM_SCHEMA>>({
    resolver: zodResolver(LOGIN_FORM_SCHEMA),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof LOGIN_FORM_SCHEMA>) {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t.login.success);
      navigate('/');
    }

    setLoading(false);
  }

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.login.email}</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={t.login.emailPlaceholder}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  {/* TODO: Add forgot password button/link */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.login.password}</FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder={t.login.passwordPlaceholder}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  className="w-full"
                  disabled={loading}
                  type="submit"
                >
                  {t.login.loginButton}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
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
