import { RouteObject } from 'react-router';
import Layout from '@/components/layout';
import NotFound from '@/components/not-found';
import { routesAll } from '@/routes/routes-all';

export const routesApp: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      ...routesAll,
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
