import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/services/auth/hooks/use-auth';

function Protected({ children }: PropsWithChildren) {
  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, []);

  return children;
}

export default Protected;
