import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Gauge, Fuel, Zap, Clock, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Car } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { Badge } from '../ui/Layout';
import { AuctionCountdown } from '../auctions/AuctionCountdown';

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-primary/10 bg-[#0a3a25] transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
    >
      <Link to={`/car/${car.id}`} className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={car.image || car.images[0]} 
          alt={`${car.make} ${car.model}`} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a3a25] via-transparent to-transparent opacity-60" />
        
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {car.isAuction && (
            <Badge className="bg-red-600/90 text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
              <Clock className="mr-1 h-3 w-3" /> Live Auction
            </Badge>
          )}
          {car.isBoosted && (
            <Badge className="bg-primary/90 text-background text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
              <Zap className="mr-1 h-3 w-3 fill-current" /> Featured
            </Badge>
          )}
        </div>

        <div className="absolute bottom-4 right-4">
          <Badge variant="outline" className="border-primary/40 bg-background/60 text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
            {car.condition}
          </Badge>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold font-serif text-white tracking-tight group-hover:text-primary transition-colors truncate">
              {car.make} {car.model}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">
              <span>{car.year}</span>
              <span className="h-1 w-1 rounded-full bg-primary/20" />
              <span>{car.transmission}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-black text-primary">
              {formatCurrency(car.price)}
            </p>
            {car.isAuction && car.currentBid && (
              <p className="text-[9px] font-black uppercase tracking-widest text-primary/30">High Bid: {formatCurrency(car.currentBid)}</p>
            )}
          </div>
        </div>

        {car.isAuction && (car.auctionEnds || car.auctionEndTime) && (
          <div className="mb-4 rounded-xl bg-primary/5 p-3 border border-primary/10">
            <AuctionCountdown 
              endTime={car.auctionEnds || car.auctionEndTime || ''} 
              compact={true} 
              className="text-xs w-full justify-center"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 border-t border-primary/5 pt-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/5 text-primary/60">
               <Gauge className="h-3.5 w-3.5" />
            </div>
            <span className="text-xs font-semibold text-primary/60">{car.mileage.toLocaleString()} KM</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/5 text-primary/60">
               <Fuel className="h-3.5 w-3.5" />
            </div>
            <span className="text-xs font-semibold text-primary/60">{car.fuelType}</span>
          </div>
          <div className="col-span-2 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/5 text-primary/60">
               <MapPin className="h-3.5 w-3.5" />
            </div>
            <span className="text-xs font-semibold text-primary/60 truncate">{car.location}</span>
          </div>
        </div>

        <Link 
          to={`/car/${car.id}`} 
          className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-primary/10 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary transition-all hover:bg-primary hover:text-background"
        >
          {car.isAuction ? 'Enter Auction' : 'View Property'} <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  );
};