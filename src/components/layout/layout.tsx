import { Outlet } from 'react-router';
import { LangSwitcher } from '@/features/lang-switcher/lang-switcher';
import { ThemeSwitcher } from '@/features/theme-switcher/theme-switcher';
import { useAuth } from '@/services/auth/hooks/use-auth';

function Layout() {
  const { session } = useAuth();

  return (
    <div className="min-h-screen relative">
      <div className="absolute right-4 top-4 flex gap-2 items-center">
        {session?.user?.email && (
          <div className="text-sm text-gray-500">
            {session.user.email}
          </div>
        )}
        <LangSwitcher />
        <ThemeSwitcher />
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
