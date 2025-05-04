import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { client } from '@/api/supabase/client';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { useTranslations } from '@/features/lang/hooks/use-translations';

function Register() {
  const navigate = useNavigate();
  const { t } = useTranslations();

  const [loading, setLoading] = useState(false);

  const REGISTER_FORM_SCHEMA = z.object({
    email: z.string().email({ message: t.register.validation.email }),
    password: z.string().min(8, { message: t.register.validation.passwordMin8 }),
    confirmPassword: z.string().min(8, { message: t.register.validation.passwordMin8 }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t.register.passwordsDoNotMatch,
    path: ['confirmPassword'],
  });

  const form = useForm<z.infer<typeof REGISTER_FORM_SCHEMA>>({
    resolver: zodResolver(REGISTER_FORM_SCHEMA),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof REGISTER_FORM_SCHEMA>) {
    setLoading(true);

    const { error } = await client.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t.register.success);
      navigate('/login');
    }

    setLoading(false);
  }

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.register.email}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t.register.emailPlaceholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.register.password}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={t.register.passwordPlaceholder}
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
              <Button
                className="w-full"
                disabled={loading}
                type="submit"
              >
                {t.register.registerButton}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
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
