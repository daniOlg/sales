import { Outlet } from 'react-router';
import { LangSwitcher } from '@/features/lang-switcher/lang-switcher';
import { ThemeSwitcher } from '@/features/theme-switcher/theme-switcher';

function Layout() {
  return (
    <div className="min-h-screen relative">
      <div className="absolute right-4 top-4 flex gap-2">
        <LangSwitcher />
        <ThemeSwitcher />
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
