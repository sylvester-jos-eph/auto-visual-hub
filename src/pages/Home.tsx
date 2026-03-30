import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Shield, Globe, TrendingUp, Car as CarIcon, Sparkles, Phone, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, Badge } from '../components/ui/Layout';
import { MOCK_CARS, APP_NAME } from '../lib/constants';
import { motion } from 'framer-motion';
import { CarCard } from '../components/cars/CarCard';
import { useSettings } from '../contexts/SettingsContext';

export const Home = () => {
  const navigate = useNavigate();
  const { whatsappNumber } = useSettings();

  const handleContactAdmin = () => {
    const message = `Hello ${APP_NAME} Support, I have an inquiry.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="flex flex-col gap-12 sm:gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/hero-car-luxury-8def5939-1774846289928.webp"
            alt="Hero Background"
            className="h-full w-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent lg:block hidden" />
          <div className="absolute inset-0 bg-background/60 lg:hidden block" />
        </div>
        
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl space-y-8"
          >
            <Badge variant="outline" className="border-primary/50 text-primary py-1 px-4 text-sm tracking-[0.2em] uppercase">
               <Sparkles className="mr-2 h-4 w-4" /> The Gold Standard of Motoring
            </Badge>
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl font-serif leading-[1.1]">
              Luxury <span className="text-primary italic">Defined</span>.<br />
              <span className="text-primary">{APP_NAME}</span>
            </h1>
            <p className="max-w-xl text-lg sm:text-2xl text-primary/80 leading-relaxed">
              Curated collection of the world's most exceptional vehicles. Buy, sell, and auction with unparalleled confidence.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row pt-4">
              <Button size="lg" className="h-14 px-8 text-lg shadow-2xl shadow-primary/20" onClick={() => navigate('/marketplace')}>
                Explore Inventory
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/20 text-white hover:bg-white/10" onClick={() => navigate('/signup')}>
                Become a Member
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-primary/20">
               {[ 
                 { label: "Premium Inventory", value: "5k+" },
                 { label: "Verified Sellers", value: "100%" },
                 { label: "Countries", value: "24" }
               ].map((item, i) => (
                 <div key={i}>
                    <div className="text-2xl sm:text-3xl font-bold text-white">{item.value}</div>
                    <div className="text-xs sm:text-sm text-primary uppercase tracking-widest font-semibold">{item.label}</div>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-serif">Selected <span className="text-primary">Classics</span></h2>
            <p className="text-primary/60 text-lg uppercase tracking-[0.2em]">Featured masterpiece vehicles</p>
          </div>
          <Button variant="ghost" className="text-primary hover:text-white group" onClick={() => navigate('/marketplace')}>
            View Collections <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_CARS.slice(0, 4).map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* Stats Section with luxury feel */}
      <section className="bg-[#0a3a25]/50 border-y border-primary/10 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Exotic Sales', value: '1,200+', icon: TrendingUp },
              { label: 'Global Network', value: '150+', icon: Globe },
              { label: 'Secured Trades', value: '$250M+', icon: Shield },
              { label: 'Concierge Team', value: '24/7', icon: CarIcon },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-4xl font-bold text-white mb-2 font-serif">{stat.value}</div>
                <div className="text-sm text-primary/60 font-semibold uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Support Section */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
         <Card className="relative overflow-hidden bg-primary/5 border-primary/10 p-12 text-center space-y-8">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <MessageCircle className="h-48 w-48 text-primary" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
               <Badge className="bg-green-500/10 text-green-500 border-none px-6 py-2">Always Available</Badge>
               <h2 className="text-4xl font-bold text-white font-serif tracking-tight">Direct Support from SiLLA</h2>
               <p className="text-lg text-primary/60">
                 Need assistance or have questions for our administration? Reach out directly through WhatsApp for immediate support and guidance.
               </p>
               <Button 
                size="lg" 
                className="h-16 px-12 bg-green-600 hover:bg-green-700 text-white shadow-xl shadow-green-600/20"
                onClick={handleContactAdmin}
               >
                 <Phone className="mr-3 h-6 w-6" /> Chat with Admin
               </Button>
            </div>
         </Card>
      </section>

      {/* CTA Section */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-primary/90 to-[#b8860b] px-8 py-20 shadow-2xl text-center">
          <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tight text-background sm:text-6xl font-serif leading-tight">
              List Your Masterpiece With <span className="italic">{APP_NAME}</span>
            </h2>
            <p className="text-lg sm:text-2xl text-background/80">
              Connect with serious collectors worldwide. Professional photography, secure transactions, and global logistics handled by our elite team.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row justify-center pt-4">
              <Button size="lg" variant="secondary" className="h-14 px-10 text-lg bg-background text-primary hover:bg-background/90" onClick={() => navigate('/signup')}>
                Apply as Seller
              </Button>
              <Button size="lg" className="h-14 px-10 text-lg border-2 border-background/20 bg-transparent text-background hover:bg-background/10" onClick={() => navigate('/marketplace')}>
                View Showcase
              </Button>
            </div>
          </div>
          {/* Decorative accents */}
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        </div>
      </section>
    </div>
  );
};