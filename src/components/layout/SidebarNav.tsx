import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutGrid,
  Users,
  User,
  FileText,
  Receipt,
  ShoppingCart,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  Menu as MenuIcon,
  ChevronDown
} from 'lucide-react';

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ElementType;
  isActive?: boolean;
  onClick?: () => void;
  isCategory?: boolean;
  children?: NavItemProps[];
}

const NavLink: React.FC<NavItemProps & { baseHref?: string }> = ({ href, label, icon: Icon, isActive, onClick, baseHref }) => {
  const effectiveHref = baseHref ? `${baseHref}${href}` : href;
  return (
    <a
      href={effectiveHref} // In a real app, use Link from react-router-dom
      onClick={(e) => {
        e.preventDefault(); // Prevent page reload for demo
        if (onClick) onClick();
      }}
      className={cn(
        'flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-ring',
        isActive
          ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
          : 'text-sidebar-foreground'
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span>{label}</span>
    </a>
  );
};

const mainNavItems: NavItemProps[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/leads', label: 'Leads', icon: Users },
  { href: '/customers', label: 'Customers', icon: User },
  { href: '/proposals', label: 'Proposals', icon: FileText },
  { href: '/invoices', label: 'Invoices', icon: Receipt },
  { href: '/items', label: 'Items', icon: ShoppingCart },
  { href: '/mail', label: 'Mail', icon: Mail },
  { href: '/shoebox', label: 'Shoebox', icon: Archive },
  { href: '/calendar', label: 'Calendar', icon: CalendarDays },
];

const bottomNavItems: NavItemProps[] = [
  { href: '/help', label: 'Help', icon: HelpCircle },
  { href: '/settings', label: 'Settings', icon: Settings },
];

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const [activeLink, setActiveLink] = useState<string>('/dashboard'); // Default active link
  // In a real app, activeLink would be derived from router's current path

  return (
    <aside className={cn('fixed top-0 left-0 z-40 w-64 h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border', className)}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          <a href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
              BO
            </div>
            <span className="font-semibold text-lg text-sidebar-foreground">Sales Inc.</span>
          </a>
          {/* Placeholder for mobile menu toggle if needed, not shown in image */}
          {/* <Button variant="ghost" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
          </Button> */}
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.label}
              {...item}
              isActive={activeLink === item.href}
              onClick={() => setActiveLink(item.href)}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-1.5">
          {bottomNavItems.map((item) => (
            <NavLink
              key={item.label}
              {...item}
              isActive={activeLink === item.href}
              onClick={() => setActiveLink(item.href)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SidebarNav;
