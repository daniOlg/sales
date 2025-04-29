'use client';

import { useEffect } from 'react';
import { useAuth } from '@/services/auth/hooks/use-auth';

function App() {
  const { initializeAuth } = useAuth();

  useEffect(() => {
    initializeAuth();
  }, []);

  return null;
}

export default App;
