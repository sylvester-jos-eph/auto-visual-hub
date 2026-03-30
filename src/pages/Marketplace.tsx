import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, X, RotateCcw, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/Layout';
import { MOCK_CARS } from '../lib/constants';
import { formatCurrency, cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CarCard } from '../components/cars/CarCard';
import { supabase } from '../lib/supabase';
import { Car } from '../types';

export const Marketplace = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const typeFilter = searchParams.get('type');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(500000);
  const [showFilters, setShowFilters] = useState(false);
  const [dbCars, setDbCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          const mappedCars: Car[] = data.map((car: any) => ({
            id: car.id,
            make: car.make,
            model: car.model,
            year: car.year,
            price: parseFloat(car.price),
            condition: car.condition as any,
            mileage: car.mileage || 0,
            engine: car.engine || 'V8 Heritage',
            transmission: car.transmission as any,
            fuelType: car.fuel_type as any,
            images: car.images || [],
            image: car.images?.[0] || '',
            location: car.location || 'Unknown',
            sellerId: car.seller_id,
            isAuction: car.is_auction || false,
            auctionEnds: car.auction_ends,
            currentBid: car.current_bid ? parseFloat(car.current_bid) : undefined,
            description: car.description || '',
            isBoosted: car.is_featured || car.is_boosted || false,
            isImported: car.is_imported || false,
            status: car.status,
          }));
          setDbCars(mappedCars);
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Merge mock cars with database cars
  const allCars = [...dbCars, ...MOCK_CARS];

  const filteredCars = allCars.filter(car => {
    const matchesSearch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          car.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || 
                        (typeFilter === 'auction' && car.isAuction) || 
                        (typeFilter === 'imported' && car.isImported);
    const matchesPrice = car.price <= priceRange;
    return matchesSearch && matchesType && matchesPrice;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange(500000);
    navigate('/marketplace');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-16 lg:px-8">
      <header className="mb-16 space-y-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
           <div className="space-y-3">
              <h1 className="text-5xl font-extrabold font-serif text-white tracking-tight leading-none">The <span className="text-primary">Showroom</span></h1>
              <p className="text-primary/40 uppercase tracking-[0.3em] text-[10px] font-black">Discovery Terminal // {loading ? 'Scanning...' : `${filteredCars.length} Assets Identified`}</p>
           </div>
           <div className="flex flex-wrap items-center gap-2 p-1 bg-primary/5 rounded-2xl border border-primary/10">
              {[ 
                { label: 'All Assets', value: null },
                { label: 'Auctions', value: 'auction' },
                { label: 'Imports', value: 'imported' }
              ].map((filter) => (
                <Button 
                  key={filter.label}
                  variant={typeFilter === filter.value ? 'primary' : 'ghost'} 
                  className={cn("rounded-xl px-6 h-10 text-[10px] font-black uppercase tracking-widest transition-all", typeFilter === filter.value ? "shadow-lg shadow-primary/20" : "text-primary/60 hover:text-primary")} 
                  onClick={() => navigate(filter.value ? `/marketplace?type=${filter.value}` : '/marketplace')}
                >
                  {filter.label}
                </Button>
              ))}
           </div>
        </div>

        <div className="relative flex flex-col gap-4 sm:flex-row">
          <div className="flex-1 relative group">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Filter by Heritage, Brand or Model..." 
              className="pl-14 h-16 bg-[#0a3a25] border-primary/20 text-white placeholder:text-primary/20 rounded-2xl text-lg font-medium focus:ring-primary shadow-2xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            className="h-16 px-10 border-primary/20 lg:hidden rounded-2xl font-black uppercase tracking-widest text-[10px]"
            onClick={() => setShowFilters(true)}
          >
            <SlidersHorizontal className="mr-2 h-5 w-5" /> Configuration
          </Button>
        </div>
      </header>

      <div className="flex flex-col gap-12 lg:flex-row">
        {/* Desktop Controls */}
        <aside className="hidden lg:block w-80 shrink-0">
          <div className="sticky top-32 space-y-8">
            <div className="p-8 rounded-[2rem] bg-[#0a3a25] border border-primary/10 space-y-10 shadow-2xl">
               <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Threshold</h3>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-[8px] font-black uppercase" onClick={clearFilters}>
                     <RotateCcw className="h-3 w-3 mr-1" /> Reset
                  </Button>
               </div>
               
               <div className="space-y-6">
                  <input 
                    type="range" 
                    min="0" 
                    max="500000" 
                    step="10000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-primary h-1.5 bg-primary/10 rounded-full cursor-pointer"
                  />
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] font-black text-primary/30 uppercase">$0</span>
                    <span className="text-2xl font-black text-white">{formatCurrency(priceRange)}</span>
                  </div>
               </div>

               <div className="space-y-6 pt-4 border-t border-primary/5">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Heritage Status</h3>
                  <div className="space-y-4">
                    {['New Showroom', 'Elite Pre-Owned', 'Certified Heritage', 'Vault Stock'].map((cond) => (
                      <label key={cond} className="flex items-center gap-4 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                           <input type="checkbox" className="peer h-5 w-5 appearance-none rounded-lg border border-primary/20 bg-primary/5 checked:bg-primary transition-all cursor-pointer" />
                           <div className="pointer-events-none absolute scale-0 peer-checked:scale-100 transition-transform">
                              <div className="h-2 w-2 rounded-full bg-background" />
                           </div>
                        </div>
                        <span className="text-xs font-bold text-primary/60 group-hover:text-primary transition-colors uppercase tracking-widest">{cond}</span>
                      </label>
                    ))}
                  </div>
               </div>

               <div className="space-y-6 pt-4 border-t border-primary/5">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Drive Protocol</h3>
                  <div className="space-y-4">
                    {['Petrol', 'Electric', 'Hybrid', 'Manual Heritage'].map((f) => (
                      <label key={f} className="flex items-center gap-4 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                           <input type="checkbox" className="peer h-5 w-5 appearance-none rounded-lg border border-primary/20 bg-primary/5 checked:bg-primary transition-all cursor-pointer" />
                           <div className="pointer-events-none absolute scale-0 peer-checked:scale-100 transition-transform">
                              <div className="h-2 w-2 rounded-full bg-background" />
                           </div>
                        </div>
                        <span className="text-xs font-bold text-primary/60 group-hover:text-primary transition-colors uppercase tracking-widest">{f}</span>
                      </label>
                    ))}
                  </div>
               </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-primary border-none text-background shadow-2xl shadow-primary/20 group relative overflow-hidden">
               <h4 className="text-xl font-black font-serif leading-tight mb-4 relative z-10">Expert Assistance</h4>
               <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-8 relative z-10">Can't find your specific model? Our acquisition team is ready.</p>
               <Button className="w-full bg-background text-primary hover:bg-background/90 font-black uppercase tracking-widest text-[10px] h-12 relative z-10 shadow-xl">
                  Contact Concierge
               </Button>
            </div>
          </div>
        </aside>

        {/* Mobile Filter Drawer */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md lg:hidden"
            >
               <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="absolute right-0 top-0 h-full w-full max-w-sm bg-[#0a3a25] p-8 shadow-2xl border-l border-primary/20 overflow-y-auto"
               >
                 <div className="flex items-center justify-between mb-12">
                   <h2 className="text-3xl font-serif font-bold text-white uppercase tracking-wider">Configuration</h2>
                   <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)} className="text-primary hover:bg-primary/10">
                     <X className="h-8 w-8" />
                   </Button>
                 </div>
                 
                 <div className="space-y-12">
                    <div className="space-y-6">
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Price Range</h3>
                      <input type="range" min="0" max="500000" className="w-full accent-primary h-1.5 bg-primary/10 rounded-full" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} />
                      <p className="text-2xl font-black text-white">{formatCurrency(priceRange)}</p>
                    </div>
                    <Button className="w-full h-16 shadow-xl shadow-primary/20 font-black uppercase tracking-widest text-[10px]" onClick={() => setShowFilters(false)}>Identify Assets</Button>
                 </div>
               </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 animate-pulse">Initializing Data Streams...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {filteredCars.map((car) => (
                    <motion.div
                      key={car.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                    >
                      <CarCard car={car} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              {filteredCars.length === 0 && (
                <div className="py-40 text-center">
                  <p className="text-3xl font-serif text-primary/40 italic uppercase tracking-widest">Zero Assets Matching Criteria</p>
                  <Button variant="outline" className="mt-8 border-primary/20 h-14 px-10 font-black uppercase tracking-widest text-[10px]" onClick={clearFilters}>
                      Reset Parameters
                  </Button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};