import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, PlusCircle, ChevronDown, UserCircle, LogOut, Settings, Bell } from 'lucide-react';

interface TopHeaderProps {
  pageTitle?: string;
  className?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ pageTitle = 'Dashboard', className }) => {
  return (
    <header
      className={cn(
        'fixed top-0 left-0 md:left-64 right-0 z-30 h-16 bg-card border-b border-border',
        'flex items-center justify-between px-4 sm:px-6',
        className
      )}
    >
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-card-foreground hidden sm:block">
          {pageTitle}
        </h1>
        {/* Search bar - as per component hierarchy, not visually prominent in the specific page screenshot */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-9 pr-4 h-9 w-full sm:w-64 rounded-md bg-background focus:bg-card"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <PlusCircle className="h-4 w-4 mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Create</span>
              <ChevronDown className="h-4 w-4 ml-0 sm:ml-1 opacity-75" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>New Lead</DropdownMenuItem>
            <DropdownMenuItem>New Contact</DropdownMenuItem>
            <DropdownMenuItem>New Company</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log Activity</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://github.com/shadcn.png" alt="@username" /> {/* Placeholder image */}
                <AvatarFallback className="bg-muted text-muted-foreground">
                  <UserCircle className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-card-foreground">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">
                  john.doe@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
