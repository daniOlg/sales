import { useEffect } from 'react';
import { supabase } from '@/clients/supabase';
import { useAuth } from '@/services/auth/hooks/use-auth';

function SessionManager() {
  const { setSession } = useAuth();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.debug('SessionManager session', session);
      if (session) setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      console.debug('SessionManager onAuthStateChange', session);
      if (session) {
        setSession(session);
      } else {
        setSession(null);
      }
    });
  }, [setSession]);
}

export default SessionManager;
