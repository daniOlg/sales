import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router';

const HomePage = lazy(() => import('../pages/home'));

export const routesAll: RouteObject[] = [
  {
    index: true,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <HomePage />
      </Suspense>
    ),
  },
];
