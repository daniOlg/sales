import { AuthApi } from '@/api/supabase/auth.api';
import { useSession } from '@/features/auth/hooks/use-session';

export const useAuth = () => {
  const {
    setSession, setLoading, setError, clearSession,
  } = useSession();

  async function initializeAuth() {
    try {
      setLoading(true);

      const session = await AuthApi.getSession();

      if (session) {
        setSession(session);
      }

      AuthApi.onAuthStateChange((_, _session) => {
        setSession(_session);
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('');
      }
    } finally {
      setLoading(false);
    }
  }

  async function signInWithPassword({ email, password }: { email: string, password: string }) {
    try {
      setLoading(true);
      setError(null);

      const data = await AuthApi.signInWithPassword({ email, password });

      setSession(data.session);

      return data;
    } catch (error) {
      setError((error as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function signUp({ email, password }: { email: string, password: string }) {
    try {
      setLoading(true);
      setError(null);

      const data = await AuthApi.signUp({
        email,
        password,
      });

      setSession(data.session);

      return data;
    } catch (error) {
      setError((error as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      setLoading(true);

      await AuthApi.signOut();

      clearSession();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return {
    initializeAuth,
    signInWithPassword,
    signUp,
    signOut,
  };
};
