import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router';

import Fallback from '@/components/fallback';
import Protected from '@/components/protected';

const HomePage = lazy(() => import('../pages/home'));

const LoginPage = lazy(() => import('../pages/auth/login'));
const RegisterPage = lazy(() => import('../pages/auth/register'));

const DashboardPage = lazy(() => import('../pages/dashboard'));
const DashboardHomePage = lazy(() => import('../pages/dashboard/home'));
const DashboardDataPage = lazy(() => import('../pages/dashboard/data'));

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
  {
    path: 'dashboard',
    element: (
      <Protected>
        <Suspense fallback={<Fallback />}>
          <DashboardPage />
        </Suspense>
      </Protected>
    ),
    children: [
      {
        index: true,
        element: (
          <Protected>
            <Suspense fallback={<Fallback />}>
              <DashboardHomePage />
            </Suspense>
          </Protected>
        ),
      },
      {
        path: 'data',
        element: (
          <Protected>
            <Suspense fallback={<Fallback />}>
              <DashboardDataPage />
            </Suspense>
          </Protected>
        ),
      },
    ],
  },
];
