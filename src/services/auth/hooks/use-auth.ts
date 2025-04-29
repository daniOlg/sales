import { supabase } from '@/clients/supabase';
import { useSession } from '@/services/auth/hooks/use-session';

export const useAuth = () => {
  const {
    setSession, setLoading, setError, clearSession,
  } = useSession();

  async function initializeAuth() {
    try {
      setLoading(true);

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        throw error;
      }

      if (session) {
        setSession(session);
      }

      supabase.auth.onAuthStateChange((_event, _session) => {
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

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setSession(data.session);

      return data;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('SIGN IN ERROR');
      }
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function signUp({ email, password }: { email: string, password: string }) {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setSession(data.session);

      return data;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('SIGN UP ERROR');
      }
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      clearSession();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('SIGN OUT ERROR');
      }
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
