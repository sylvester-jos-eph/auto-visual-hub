import React from 'react';
import { ArrowRight, Search, ShieldCheck, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { APP_NAME } from '../../lib/constants';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-background pt-16 pb-24 lg:pt-32 lg:pb-40">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-10 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary mb-6 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Verified Elite Marketplace
            </span>
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl xl:text-7xl font-serif leading-tight">
              Your luxury drive <br />
              <span className="text-primary">
                awaits at {APP_NAME}.
              </span>
            </h1>
            <p className="mt-6 text-lg text-primary/60 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Buy, sell, and auction vehicles with global reach. Professional verification, secure payments, and worldwide logistics.
            </p>
            
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
              <button className="flex items-center justify-center px-8 py-4 bg-primary text-background font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all uppercase tracking-widest text-sm">
                Browse Cars <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="flex items-center justify-center px-8 py-4 bg-transparent text-primary font-bold rounded-2xl border border-primary/20 hover:border-primary transition-all uppercase tracking-widest text-sm">
                Sell Your Asset
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <p className="text-3xl font-bold text-white font-serif">12K+</p>
                <p className="text-xs text-primary/40 uppercase tracking-widest font-bold">Assets Listed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white font-serif">8K+</p>
                <p className="text-xs text-primary/40 uppercase tracking-widest font-bold">Elite Members</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white font-serif">24/7</p>
                <p className="text-xs text-primary/40 uppercase tracking-widest font-bold">Support</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 lg:mt-0 lg:col-span-6 relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-primary/20">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/hero-car-1-8c7f818a-1774845104161.webp" 
                alt="Luxury SUV" 
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                <div className="bg-background/90 backdrop-blur-md p-5 rounded-2xl flex-1 border border-primary/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Live Auction</span>
                  </div>
                  <p className="text-xl font-bold text-white">$85,000</p>
                  <p className="text-[10px] text-primary/40 uppercase font-black">Ends in 02:45:12</p>
                </div>
                <div className="bg-primary/90 backdrop-blur-md p-5 rounded-2xl flex-1 border border-primary/20 shadow-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="w-4 h-4 text-background" />
                    <span className="text-[10px] font-bold text-background uppercase tracking-widest">Global Reach</span>
                  </div>
                  <p className="text-xl font-bold text-background">Import Ready</p>
                  <p className="text-[10px] text-background/60 uppercase font-black">24 Days ETA</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;