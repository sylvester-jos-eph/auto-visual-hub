import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Heart, Share2, MapPin, Gauge, Fuel, Calendar, 
  Settings2, CheckCircle2, MessageSquare, Info, Timer, 
  TrendingUp, Download, ShieldCheck, Truck, ArrowRight, Shield
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, Badge, Input } from '../components/ui/Layout';
import { MOCK_CARS } from '../lib/constants';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = MOCK_CARS.find(c => c.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState('23:45:12');

  useEffect(() => {
    if (car && car.isAuction) {
      setBidAmount((car.currentBid || car.price) + 500);
    }
  }, [car]);

  if (!car) return (
    <div className="p-20 text-center bg-background min-h-screen">
      <p className="text-2xl font-serif text-primary">Vehicle Not Found</p>
      <Button className="mt-6" onClick={() => navigate('/marketplace')}>Back to Marketplace</Button>
    </div>
  );

  const handlePlaceBid = () => {
    if (bidAmount <= (car.currentBid || car.price)) {
      toast.error('Bid must be higher than the current bid');
      return;
    }
    toast.success('Bid placed successfully!');
  };

  const handleBuyNow = () => {
    toast.success('Proceeding to secure checkout...');
    navigate('/checkout');
  };

  const carSpecs = [
    { label: 'Year', value: car.year, icon: Calendar },
    { label: 'Mileage', value: `${car.mileage.toLocaleString()} KM`, icon: Gauge },
    { label: 'Fuel Type', value: car.fuelType, icon: Fuel },
    { label: 'Engine', value: car.specs?.engine || car.engine, icon: Settings2 },
    { label: 'Transmission', value: car.transmission, icon: Info },
    { label: 'Security', value: 'Verified', icon: ShieldCheck },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-16 lg:px-8">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => navigate(-1)} 
        className="mb-8 text-primary hover:text-white"
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Showroom
      </Button>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          <div className="space-y-6">
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-primary/20 bg-primary/5">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                src={(car.gallery && car.gallery[activeImage]) || car.image || car.images[0]}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-6 right-6 flex gap-3">
                <Button size="icon" variant="secondary" className="rounded-full bg-background/80 backdrop-blur-md border-primary/10">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full bg-background/80 backdrop-blur-md border-primary/10">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              <div className="absolute left-6 top-6">
                <Badge className="text-sm px-4 py-1.5 shadow-xl">{car.year} Model</Badge>
              </div>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4">
              {(car.gallery || car.images).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "relative h-24 w-36 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all",
                    activeImage === i ? "border-primary scale-95 shadow-lg shadow-primary/20" : "border-primary/10 opacity-50 hover:opacity-100"
                  )}
                >
                  <img src={img} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {carSpecs.map((spec, i) => (
              <Card key={i} className="flex flex-col items-center justify-center p-8 text-center bg-primary/5 border-primary/10">
                <spec.icon className="mb-3 h-8 w-8 text-primary" />
                <span className="text-[10px] text-primary/40 uppercase tracking-[0.2em] font-bold">{spec.label}</span>
                <span className="mt-1 text-lg font-bold text-white">{spec.value}</span>
              </Card>
            ))}
          </div>

          <div className="space-y-6 p-8 rounded-3xl bg-primary/5 border border-primary/10">
             <h2 className="text-3xl font-bold text-white font-serif">Provenance & <span className="text-primary">Details</span></h2>
             <div className="prose prose-invert max-w-none">
               <p className="text-primary/70 text-lg leading-relaxed font-light">
                 This exceptional {car.year} {car.make} {car.model} is presented in immaculate condition. 
                 A true testament to engineering excellence, featuring the legendary {car.specs?.engine || car.engine} powerplant. 
                 Carefully curated and verified by our specialized team for authenticity and performance standards.
               </p>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-primary/10">
                <div className="flex items-center gap-3">
                   <Shield className="h-6 w-6 text-primary" />
                   <span className="text-sm text-white font-semibold">100-Point Inspection Passed</span>
                </div>
                <div className="flex items-center gap-3">
                   <Truck className="h-6 w-6 text-primary" />
                   <span className="text-sm text-white font-semibold">Enclosed Global Delivery Available</span>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-8">
          <Card className="p-8 bg-[#0a3a25] border-primary/20 sticky top-32">
            {car.isAuction ? (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <Badge variant="warning" className="animate-pulse px-4 py-1 text-sm">
                    <Timer className="mr-2 h-4 w-4" /> LIVE AUCTION
                  </Badge>
                  <span className="font-mono text-2xl font-bold text-white">{timeLeft}</span>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-primary/40 uppercase tracking-[0.2em] font-bold">High Bid</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-black text-primary">{formatCurrency(car.currentBid || car.price)}</span>
                    <span className="text-sm text-primary/30">[ 12 Bids ]</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-semibold text-primary uppercase tracking-widest">Place Bidding</p>
                  <div className="flex gap-2">
                    <Input 
                      type="number" 
                      value={bidAmount} 
                      onChange={(e) => setBidAmount(Number(e.target.value))}
                      className="text-xl font-bold h-14 bg-white/5 border-primary/20 text-white focus:ring-primary"
                    />
                    <Button onClick={handlePlaceBid} className="px-10 h-14 text-lg shadow-xl shadow-primary/20">BID</Button>
                  </div>
                  <p className="text-[10px] text-center text-primary/40 uppercase tracking-widest">Min Increment: $500</p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-1">
                  <p className="text-xs text-primary/40 uppercase tracking-[0.2em] font-bold">Exclusive Value</p>
                  <span className="text-5xl font-black text-primary">{formatCurrency(car.price)}</span>
                </div>

                <div className="space-y-4 pt-4">
                  <Button className="w-full h-16 text-xl shadow-xl shadow-primary/20" size="lg" onClick={handleBuyNow}>
                    Acquire Now
                  </Button>
                  <Button variant="outline" className="w-full h-16 text-lg border-primary/20 text-primary hover:bg-primary/10" size="lg">
                    Inquire Private Offer
                  </Button>
                </div>
              </div>
            )}
            
            <div className="mt-8 pt-8 border-t border-primary/10">
               <div className="flex items-center gap-5">
                  <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-primary ring-4 ring-primary/10">
                     <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${car.sellerName || car.sellerId}`} className="bg-primary/10" />
                  </div>
                  <div className="flex-1">
                     <div className="flex items-center gap-1.5 font-bold text-white uppercase tracking-widest text-sm">
                        {car.sellerName || 'Private Seller'} <CheckCircle2 className="h-4 w-4 text-primary" />
                     </div>
                     <p className="text-xs text-primary/40 font-semibold">Elite Tier Seller \u2022 120+ Private Sales</p>
                  </div>
               </div>
               <div className="mt-8 flex gap-3">
                  <Button variant="outline" className="flex-1 border-primary/10 text-primary hover:bg-primary/5">
                     <MessageSquare className="mr-2 h-4 w-4" /> Message
                  </Button>
                  <Button variant="outline" className="flex-1 border-primary/10 text-primary hover:bg-primary/5">
                     <Download className="mr-2 h-4 w-4" /> dossier
                  </Button>
               </div>
            </div>
          </Card>

          <div className="p-8 rounded-3xl bg-primary border border-primary/20 text-background">
             <h3 className="text-lg font-bold uppercase tracking-widest mb-2">Secure Assurance</h3>
             <p className="text-sm text-background/80 leading-relaxed font-medium">
                All transactions are held in escrow. Delivery is monitored by our dedicated concierge team until the vehicle reaches your doorstep.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};