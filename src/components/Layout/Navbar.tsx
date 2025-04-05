
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Film, User, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import UserMenu from './UserMenu';

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Film className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl gradient-text">CineSync</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/movies" className="text-foreground/80 hover:text-primary transition-colors">
            Movies
          </Link>
          <Link to="/rooms" className="text-foreground/80 hover:text-primary transition-colors">
            Watch Rooms
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <UserMenu user={user} />
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
