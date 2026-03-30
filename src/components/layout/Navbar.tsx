import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, Bell, Menu, X, Car, LayoutDashboard, LogOut, PlusCircle, Search, User } from 'lucide-react';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface NavbarProps {
  isLoggedIn?: boolean;
}

export const Navbar = ({ isLoggedIn = false }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Auctions', path: '/marketplace?type=auction' },
    { name: 'Imports', path: '/marketplace?type=imported' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="group flex items-center gap-2 text-2xl font-bold tracking-tight text-primary">
            <motion.div
              whileHover={{ rotate: -10, scale: 1.1 }}
              className="rounded-xl bg-primary/10 p-2"
            >
              <Car className="h-7 w-7" />
            </motion.div>
            <span className="hidden sm:inline-block font-serif tracking-widest">AUTOHUB</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-sm font-semibold uppercase tracking-widest transition-all hover:text-white",
                isActive(link.path) ? "text-primary" : "text-primary/60"
              )}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div layoutId="navLine" className="h-0.5 w-full bg-primary mt-1" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden items-center gap-2 sm:flex">
            <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Button 
                variant="primary" 
                size="sm" 
                className="hidden lg:flex shadow-lg shadow-primary/20"
                onClick={() => navigate('/dashboard')}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Account
              </Button>
              <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary ring-2 ring-primary/20">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Felix`}
                  alt="Avatar"
                  className="h-full w-full object-cover bg-primary/10"
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" className="text-primary hover:text-white">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" className="shadow-lg shadow-primary/20">Join Hub</Button>
              </Link>
            </div>
          )}

          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-primary hover:bg-primary/10 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute left-0 right-0 top-20 z-50 border-b border-primary/20 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-4 px-6 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-xl font-serif tracking-wider text-primary"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-primary/10" />
              <div className="flex flex-col gap-4 pt-4">
                 {!isLoggedIn ? (
                   <>
                    <Button className="w-full" variant="outline" onClick={() => { navigate('/login'); setIsMenuOpen(false); }}>
                      Login
                    </Button>
                    <Button className="w-full" variant="primary" onClick={() => { navigate('/signup'); setIsMenuOpen(false); }}>
                      Sign Up
                    </Button>
                   </>
                 ) : (
                   <>
                    <Button className="w-full" variant="outline" onClick={() => { navigate('/dashboard'); setIsMenuOpen(false); }}>
                      Dashboard
                    </Button>
                    <Button className="w-full" variant="destructive" onClick={() => setIsMenuOpen(false)}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                   </>
                 )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};