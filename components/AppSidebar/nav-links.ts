import { Folder, Users } from 'lucide-react';

type SidebarLink = {
  url: string | null;
  title: string;
  icon?: any;
  subLinks?: SidebarLink[];
};

const dashboardUrl = '/protected';

export const navLinks: SidebarLink[] = [
  {
    title: 'projects',
    url: `${dashboardUrl}/projects`,
    icon: Folder,
  },
  {
    title: 'sales + marketing',
    url: `${dashboardUrl}/sales`,
    subLinks: [
      {
        url: `${dashboardUrl}/sales/contacts`,
        title: 'contacts',
        icon: Users,
      },
    ],
  },
];
