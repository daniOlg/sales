import { Session, User } from '@supabase/supabase-js';
import {
  clearSession, setError, setLoading, setSession, setUser,
} from '@/store/slices/session-slice';
import { useAppDispatch, useAppSelector } from '@/store/store';

export const useSession = () => {
  const dispatch = useAppDispatch();

  const {
    user,
    session,
    isAuthenticated,
    loading,
    error,
  } = useAppSelector((state) => state.session);

  return {
    user,
    session,
    isAuthenticated,
    loading,
    error,
    setSession: (_session: Session | null) => dispatch(setSession(_session)),
    setUser: (_user: User | null) => dispatch(setUser(_user)),
    setLoading: (_loading: boolean) => dispatch(setLoading(_loading)),
    setError: (_error: string | null) => dispatch(setError(_error)),
    clearSession: () => dispatch(clearSession()),
  };
};
