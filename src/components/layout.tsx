import { Outlet } from 'react-router';
import { LangSwitcher } from '@/features/lang-switcher/lang-switcher';
import { ThemeSwitcher } from '@/features/theme-switcher/theme-switcher';
import { useSession } from '@/services/auth/hooks/use-session';

function Layout() {
  const { user } = useSession();

  return (
    <div className="min-h-screen relative">
      <div className="absolute right-4 top-4 flex gap-2 items-center">
        {user?.email && (
        <div className="text-sm text-gray-500">
          {user.email}
          {/* TODO: Add logout button */}
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
