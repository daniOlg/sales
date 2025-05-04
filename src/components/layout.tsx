import { Outlet } from 'react-router';
import { useSession } from '@/features/auth/hooks/use-session';
import { LangSwitcher } from '@/features/lang/components/lang-switcher';
import { ThemeSwitcher } from '@/features/theme/components/theme-switcher';

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
