import {
  FolderClosed, Home, Settings,
} from 'lucide-react';

export const menuItems = [
  {
    title: 'Home',
    icon: Home,
    url: '',
    isActive: true,
  },
  {
    title: 'Data',
    icon: FolderClosed,
    url: 'data',
  },
  {
    title: 'Configuration',
    icon: Settings,
    url: 'configuration',
    items: [
      {
        title: 'General',
        url: '/general',
      },
      {
        title: 'Advanced',
        url: '/advanced',
      },
      {
        title: 'Security',
        url: '/security',
      },
    ],
  },
  // {
  //   title: 'Customers',
  //   icon: Users,
  //   url: '/customers',
  // },
  // {
  //   title: 'Products',
  //   icon: Package,
  //   url: '/products',
  // },
  // {
  //   title: 'Calendar',
  //   icon: Calendar,
  //   url: '/calendar',
  // },
  // {
  //   title: 'Messages',
  //   icon: MessageSquare,
  //   url: '/messages',
  // },
  // {
  //   title: 'Settings',
  //   icon: Settings,
  //   url: '/settings',
  // },
];
