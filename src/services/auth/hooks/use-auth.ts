import { Session } from '@supabase/supabase-js';
import { setSession } from '@/services/auth/slices/auth-slice';
import { useAppDispatch, useAppSelector } from '@/store/store';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const {
    session,
  } = useAppSelector((state) => state.auth);

  return {
    session,
    setSession: (_session: Session | null) => dispatch(setSession(_session)),
  };
};
