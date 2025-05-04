import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { client } from '@/api/supabase/client';

type SignInWithPasswordParams = {
  email: string;
  password: string;
};

type SignUpParams = {
  email: string;
  password: string;
};

const handleError = (error: unknown) => {
  if (!error) return;

  if (error instanceof Error) throw new Error(error.message);

  if (typeof error === 'string') throw new Error(error);

  throw new Error('Authentication error');
};

export const AuthApi = {
  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    client.auth.onAuthStateChange(callback);
  },
  async getSession() {
    const {
      data: { session },
      error,
    } = await client.auth.getSession();

    handleError(error);

    return session;
  },
  async signInWithPassword({
    email, password,
  }: SignInWithPasswordParams) {
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    handleError(error);

    return data;
  },
  async signUp({
    email,
    password,
  }: SignUpParams) {
    const { data, error } = await client.auth.signUp({
      email,
      password,
    });

    handleError(error);

    return data;
  },
  async signOut() {
    const { error } = await client.auth.signOut();

    handleError(error);
  },
};
