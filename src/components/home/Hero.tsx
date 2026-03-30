import React from 'react';
import { ArrowRight, Search, ShieldCheck, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-slate-50 pt-16 pb-24 lg:pt-32 lg:pb-40">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-10 right-0 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-700 mb-6">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Verified & Secure Car Marketplace
            </span>
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl xl:text-7xl">
              Find your dream car <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                anywhere, anytime.
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Buy, sell, and auction vehicles with confidence. Transparent pricing, verified sellers, and seamless M-Pesa payments for Kenyan drivers.
            </p>
            
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
              <button className="flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 transition-all">
                Browse Cars <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl border border-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-all">
                Sell Your Vehicle
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <p className="text-3xl font-bold text-gray-900">12K+</p>
                <p className="text-sm text-gray-500">Cars Listed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">8K+</p>
                <p className="text-sm text-gray-500">Happy Buyers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">1.2M</p>
                <p className="text-sm text-gray-500">Monthly Visitors</p>
              </div>
            </div>
          </motion.div>

          {/* Hero Image / Widget */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 lg:mt-0 lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/hero-car-1-8c7f818a-1774845104161.webp" 
                alt="Luxury SUV" 
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* Floating Cards */}
              <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl flex-1 border border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-gray-900 uppercase">Live Auction</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">$85,000</p>
                  <p className="text-[10px] text-gray-500">Ends in 02:45:12</p>
                </div>
                <div className="bg-indigo-600/90 backdrop-blur-md p-4 rounded-2xl flex-1 border border-indigo-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold text-white uppercase">Import Ready</span>
                  </div>
                  <p className="text-lg font-bold text-white">Direct Ship</p>
                  <p className="text-[10px] text-indigo-100">ETA: 24 Days</p>
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