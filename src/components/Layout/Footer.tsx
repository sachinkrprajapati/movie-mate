
import React from 'react';
import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card mt-auto border-t border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Film className="h-5 w-5 text-primary" />
            <span className="font-bold text-lg gradient-text">CineSync</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Use
            </Link>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CineSync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
