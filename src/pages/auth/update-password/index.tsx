'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { client } from '@/api/supabase/client';
import { BorderBeam } from '@/components/magicui/border-beam';
import { Button } from '@/components/ui/button';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { useSession } from '@/features/auth/hooks/use-session';
import { useTranslations } from '@/features/lang/hooks/use-translations';

function UpdatePassword() {
  const { t } = useTranslations();
  const navigate = useNavigate();
  const { loading: sessionLoading, isAuthenticated } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated && !sessionLoading) {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        if (!hashParams.get('access_token')) {
          toast.error(t.updatePassword.authRequiredMessage);
          navigate('/login', { replace: true });
        }
      }
    };

    checkAuth();
  }, [isAuthenticated, sessionLoading, navigate, t.updatePassword.authRequiredMessage]);

  const UPDATE_PASSWORD_SCHEMA = z
    .object({
      password: z.string().min(8, { message: t.register.validation.passwordMin8 }),
      confirmPassword: z.string().min(8, { message: t.register.validation.passwordMin8 }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t.register.passwordsDoNotMatch,
      path: ['confirmPassword'],
    });

  const form = useForm<z.infer<typeof UPDATE_PASSWORD_SCHEMA>>({
    resolver: zodResolver(UPDATE_PASSWORD_SCHEMA),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof UPDATE_PASSWORD_SCHEMA>) {
    setLoading(true);

    try {
      const { error } = await client.auth.updateUser({
        password: values.password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success(t.updatePassword.successMessage);
        navigate('/login');
      }
    } catch (error) {
      toast.error(t.updatePassword.errorMessage);
    } finally {
      setLoading(false);
    }
  }

  if (sessionLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>{t.updatePassword.loadingText}</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="relative w-[350px] overflow-hidden">
        <CardHeader>
          <CardTitle>{t.updatePassword.title}</CardTitle>
          <CardDescription>{t.updatePassword.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.updatePassword.newPasswordLabel}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={t.updatePassword.newPasswordPlaceholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.register.confirmPassword}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={t.register.confirmPasswordPlaceholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" disabled={loading} type="submit">
                {loading ? t.updatePassword.loadingText : t.updatePassword.updateButton}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="mt-4 text-center text-sm text-muted-foreground">
            {t.updatePassword.rememberPasswordText}
            {' '}
            <Link to="/login">
              <span className="underline underline-offset-4 hover:text-primary">
                {t.updatePassword.backToLoginText}
              </span>
            </Link>
          </div>
        </CardFooter>
        <BorderBeam duration={6} delay={3} size={400} className="from-transparent via-purple-500 to-transparent" />
      </Card>
    </div>
  );
}

export default UpdatePassword;
