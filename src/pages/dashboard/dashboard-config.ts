import {
  BarChart3, Calendar, Home, MessageSquare, Package, Settings, Users,
} from 'lucide-react';

export const menuItems = [
  {
    title: 'Dashboard',
    icon: Home,
    url: '/',
    isActive: true,
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    url: '/analytics',
  },
  {
    title: 'Customers',
    icon: Users,
    url: '/customers',
  },
  {
    title: 'Products',
    icon: Package,
    url: '/products',
  },
  {
    title: 'Calendar',
    icon: Calendar,
    url: '/calendar',
  },
  {
    title: 'Messages',
    icon: MessageSquare,
    url: '/messages',
  },
  {
    title: 'Settings',
    icon: Settings,
    url: '/settings',
  },
];
