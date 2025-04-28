import { PropsWithChildren } from 'react';
import { Spinner } from '@/components/ui/spinner';

function Fallback({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner />
      {children}
    </div>
  );
}

export default Fallback;
