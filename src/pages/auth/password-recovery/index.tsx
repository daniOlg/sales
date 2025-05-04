'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
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
import { Input } from '@/components/ui/input';
import { useTranslations } from '@/features/lang/hooks/use-translations';

function PasswordRecovery() {
  const { t } = useTranslations();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const RECOVERY_FORM_SCHEMA = z.object({
    email: z.string().email({ message: t.login.validation.email }),
  });

  const form = useForm<z.infer<typeof RECOVERY_FORM_SCHEMA>>({
    resolver: zodResolver(RECOVERY_FORM_SCHEMA),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof RECOVERY_FORM_SCHEMA>) {
    setLoading(true);

    try {
      const { error } = await client.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setEmailSent(true);
        toast.success(t.passwordRecovery.successMessage);
      }
    } catch (error) {
      toast.error(t.passwordRecovery.errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="relative w-[350px] overflow-hidden">
        <CardHeader>
          <CardTitle>
            {emailSent ? t.passwordRecovery.checkEmailTitle : t.passwordRecovery.title}
          </CardTitle>
          <CardDescription>
            {emailSent ? t.passwordRecovery.checkEmailDescription : t.passwordRecovery.description}
          </CardDescription>
        </CardHeader>
        {!emailSent ? (
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
                            <Input type="email" placeholder={t.passwordRecovery.emailPlaceholder} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button className="w-full" disabled={loading} type="submit">
                    {loading ? t.passwordRecovery.loadingText : t.passwordRecovery.sendButton}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        ) : (
          <CardContent className="text-center">
            <p className="mb-4 text-sm text-muted-foreground">{t.passwordRecovery.checkSpamNote}</p>
            <Button variant="outline" className="w-full" onClick={() => setEmailSent(false)}>
              {t.passwordRecovery.tryAgainButton}
            </Button>
          </CardContent>
        )}
        <CardFooter className="flex flex-col space-y-4">
          <div className="mt-4 text-center text-sm text-muted-foreground">
            {t.passwordRecovery.rememberPasswordText}
            {' '}
            <Link to="/login">
              <span className="underline underline-offset-4 hover:text-primary">
                {t.passwordRecovery.backToLoginText}
              </span>
            </Link>
          </div>
        </CardFooter>
        <BorderBeam duration={6} delay={3} size={400} className="from-transparent via-teal-500 to-transparent" />
      </Card>
    </div>
  );
}

export default PasswordRecovery;
