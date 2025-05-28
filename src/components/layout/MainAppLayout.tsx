import React from 'react';
import { cn } from '@/lib/utils';
import SidebarNav from './SidebarNav';
import TopHeader from './TopHeader';

interface MainAppLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({
  children,
  pageTitle,
  className,
}) => {
  return (
    <div className={cn('min-h-screen bg-background', className)}>
      <SidebarNav />
      <div className="md:pl-64 flex flex-col flex-1">
        <TopHeader pageTitle={pageTitle} />
        <main className="flex-1 p-4 sm:p-6 pt-20 md:pt-[calc(4rem+1.5rem)] pb-6 overflow-y-auto">
          {/* pt-20 for header height (4rem) + some padding, md:pt for consistent padding after header height */}
          {/* For smaller screens, md:pl-64 means sidebar might overlay or be hidden, actual logic would be more complex */}
          <div className="container mx-auto max-w-full">
             {/* The layout requirements suggest mainContent container has "grid gap-6", which is page specific content grid */}
             {/* So children will typically be a div with "grid gap-6" or similar */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
