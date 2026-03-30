import React, { useState } from 'react';
import { Search, Filter, MapPin, Gauge, Heart, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, Badge, Input } from '../components/ui/Layout';
import { MOCK_CARS } from '../lib/constants';
import { formatCurrency, cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const Marketplace = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const typeFilter = searchParams.get('type');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(200000);
  const [showFilters, setShowFilters] = useState(false);

  const filteredCars = MOCK_CARS.filter(car => {
    const matchesSearch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          car.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || 
                        (typeFilter === 'auction' && car.isAuction) || 
                        (typeFilter === 'imported' && car.isImported);
    return matchesSearch && matchesType;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-16 lg:px-8">
      <header className="mb-12 space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
           <div className="space-y-2">
              <h1 className="text-4xl font-bold font-serif text-white tracking-tight">Showroom</h1>
              <p className="text-primary/60 uppercase tracking-widest text-sm">Discovery {filteredCars.length} extraordinary vehicles</p>
           </div>
           <div className="flex items-center gap-2">
              <Button 
                variant={!typeFilter ? 'primary' : 'outline'} 
                className={cn("rounded-full px-6", !typeFilter && "shadow-lg shadow-primary/20")} 
                onClick={() => navigate('/marketplace')}
              >
                All
              </Button>
              <Button 
                variant={typeFilter === 'auction' ? 'primary' : 'outline'} 
                className={cn("rounded-full px-6", typeFilter === 'auction' && "shadow-lg shadow-primary/20")} 
                onClick={() => navigate('/marketplace?type=auction')}
              >
                Auctions
              </Button>
              <Button 
                variant={typeFilter === 'imported' ? 'primary' : 'outline'} 
                className={cn("rounded-full px-6", typeFilter === 'imported' && "shadow-lg shadow-primary/20")} 
                onClick={() => navigate('/marketplace?type=imported')}
              >
                Imports
              </Button>
           </div>
        </div>

        <div className="relative flex flex-col gap-4 sm:flex-row">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/40" />
            <Input 
              placeholder="Search by brand, model, or year..." 
              className="pl-12 h-14 bg-primary/5 border-primary/20 text-white placeholder:text-primary/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            className="h-14 px-8 border-primary/20 lg:hidden"
            onClick={() => setShowFilters(true)}
          >
            <SlidersHorizontal className="mr-2 h-5 w-5" /> Filters
          </Button>
        </div>
      </header>

      <div className="flex flex-col gap-12 lg:flex-row">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0 space-y-10">
          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-primary">Price Threshold</h3>
            <input 
              type="range" 
              min="0" 
              max="200000" 
              step="5000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-primary h-1.5 bg-primary/20 rounded-lg cursor-pointer"
            />
            <div className="mt-4 flex justify-between text-sm font-bold">
              <span className="text-primary/40">$0</span>
              <span className="text-primary">{formatCurrency(priceRange)}</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-primary">Vehicle Status</h3>
            <div className="space-y-4">
              {['New Arrival', 'Pre-Owned', 'Certified'].map((cond) => (
                <label key={cond} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="h-4 w-4 rounded border-primary/30 bg-transparent text-primary focus:ring-primary" />
                  <span className="text-sm text-primary/70 group-hover:text-primary transition-colors">{cond}</span>
                </label>
              ))}
            </div>
          </div>

          <Button variant="outline" className="w-full border-primary/20 text-primary" onClick={() => { setSearchTerm(''); setPriceRange(200000); }}>
            Reset All Filters
          </Button>
        </aside>

        {/* Mobile Filter Drawer */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm lg:hidden"
            >
               <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="absolute right-0 top-0 h-full w-full max-w-xs bg-background p-6 shadow-2xl border-l border-primary/20"
               >
                 <div className="flex items-center justify-between mb-8">
                   <h2 className="text-2xl font-serif text-white">Filters</h2>
                   <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                     <X className="h-6 w-6 text-primary" />
                   </Button>
                 </div>
                 {/* Same filters as sidebar but vertical for mobile */}
                 <div className="space-y-10">
                    <div>
                      <h3 className="mb-4 text-xs font-bold uppercase text-primary">Price</h3>
                      <input type="range" className="w-full accent-primary" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} />
                    </div>
                    <Button className="w-full" onClick={() => setShowFilters(false)}>Show Results</Button>
                 </div>
               </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredCars.map((car) => (
                <motion.div
                  key={car.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="group relative overflow-hidden p-0 border-primary/10 bg-[#0a3a25]" onClick={() => navigate(`/car/${car.id}`)}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={car.image}
                        alt={`${car.make} ${car.model}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                      <div className="absolute left-4 top-4 flex flex-col gap-2">
                        {car.isAuction && <Badge variant="warning">Auction</Badge>}
                        {car.isImported && <Badge variant="success">Import</Badge>}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                         <div className="flex items-center gap-4 text-[10px] text-primary/80 uppercase font-bold tracking-widest">
                            <span className="flex items-center gap-1"><Gauge className="h-3 w-3" /> {car.mileage.toLocaleString()} KM</span>
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {car.location.split(',')[0]}</span>
                         </div>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                            {car.make} {car.model}
                          </h3>
                          <p className="text-xs text-primary/40 mt-1 uppercase tracking-widest font-semibold">{car.year} • {car.transmission}</p>
                        </div>
                        <button className="h-10 w-10 flex items-center justify-center rounded-full border border-primary/10 text-primary/40 hover:text-red-500 transition-colors">
                          <Heart className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="mt-4 flex items-end justify-between pt-4 border-t border-primary/5">
                        <div>
                          <p className="text-[10px] text-primary/40 uppercase tracking-[0.2em] font-bold">{car.isAuction ? 'Current Bid' : 'Valuation'}</p>
                          <p className="text-2xl font-bold text-primary">
                            {formatCurrency(car.isAuction ? (car.currentBid || car.price) : car.price)}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary group/btn">
                          VIEW <ChevronDown className="ml-1 h-4 w-4 -rotate-90 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {filteredCars.length === 0 && (
            <div className="py-20 text-center">
               <p className="text-2xl font-serif text-primary/40">No vehicles matching your criteria</p>
               <Button variant="outline" className="mt-6 border-primary/20" onClick={() => { setSearchTerm(''); navigate('/marketplace'); }}>Clear Search</Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};