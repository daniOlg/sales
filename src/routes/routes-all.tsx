import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router';
import Fallback from '@/components/fallback';

const HomePage = lazy(() => import('../pages/home'));

const LoginPage = lazy(() => import('../pages/auth/login'));
const RegisterPage = lazy(() => import('../pages/auth/register'));

export const routesAll: RouteObject[] = [
  {
    index: true,
    element: (
      <Suspense fallback={<Fallback />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: 'login',
    element: (
      <Suspense fallback={<Fallback />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: 'register',
    element: (
      <Suspense fallback={<Fallback />}>
        <RegisterPage />
      </Suspense>
    ),
  },
];
