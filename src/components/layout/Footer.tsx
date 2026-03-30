import React from 'react';
import { Car, Share2, Globe, Send, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../../lib/constants';

export const Footer = () => {
  return (
    <footer className="border-t border-primary/10 bg-background pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-1 lg:col-span-2 space-y-8">
            <Link to="/" className="flex items-center gap-2 text-3xl font-bold tracking-tight text-primary font-serif">
              <Car className="h-10 w-10" />
              {APP_NAME}
            </Link>
            <p className="max-w-xs text-lg text-primary/60 leading-relaxed font-light">
              Redefining the standard of automotive excellence. The premier global marketplace for verified elite vehicles.
            </p>
            <div className="flex gap-6">
              <Link to="#" className="text-primary/40 hover:text-primary transition-colors" aria-label="Instagram">
                <Share2 className="h-6 w-6" />
              </Link>
              <Link to="#" className="text-primary/40 hover:text-primary transition-colors" aria-label="Twitter">
                <Globe className="h-6 w-6" />
              </Link>
              <Link to="#" className="text-primary/40 hover:text-primary transition-colors" aria-label="Linkedin">
                <MessageCircle className="h-6 w-6" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">Marketplace</h3>
            <ul className="space-y-4">
              <li><Link to="/marketplace" className="text-sm text-primary/60 hover:text-primary transition-colors">The Inventory</Link></li>
              <li><Link to="/marketplace?type=auction" className="text-sm text-primary/60 hover:text-primary transition-colors">Live Auctions</Link></li>
              <li><Link to="/marketplace?type=imported" className="text-sm text-primary/60 hover:text-primary transition-colors">Global Imports</Link></li>
              <li><Link to="#" className="text-sm text-primary/60 hover:text-primary transition-colors">Certified Selection</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">Services</h3>
            <ul className="space-y-4">
              <li><Link to="#" className="text-sm text-primary/60 hover:text-primary transition-colors">Sell Your Asset</Link></li>
              <li><Link to="#" className="text-sm text-primary/60 hover:text-primary transition-colors">Logistics & Shipping</Link></li>
              <li><Link to="#" className="text-sm text-primary/60 hover:text-primary transition-colors">Vehicle Verification</Link></li>
              <li><Link to="#" className="text-sm text-primary/60 hover:text-primary transition-colors">Private Concierge</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">Legacy</h3>
            <ul className="space-y-4">
              <li><Link to="#" className="text-sm text-primary/60 hover:text-primary transition-colors">Our Heritage</Link></li>
              <li><Link to="#" className="text-sm text-primary/60 hover:text-primary transition-colors">Private Collection</Link></li>
              <li><Link to="#" className="text-sm text-primary/60 hover:text-primary transition-colors">Global Offices</Link></li>
              <li><Link to="#" className="text-sm text-primary/60 hover:text-primary transition-colors">Legal & Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-24 border-t border-primary/10 pt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-xs text-primary/40 font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} {APP_NAME} ELITE MOTORS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
             <span className="text-[10px] text-primary/30 uppercase tracking-[0.2em] font-bold">London</span>
             <span className="text-[10px] text-primary/30 uppercase tracking-[0.2em] font-bold">Dubai</span>
             <span className="text-[10px] text-primary/30 uppercase tracking-[0.2em] font-bold">New York</span>
          </div>
        </div>
      </div>
    </footer>
  );
};