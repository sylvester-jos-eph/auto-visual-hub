import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Gauge, Fuel, Zap, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Car } from '../../types';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
    >
      <Link to={`/car/${car.id}`} className="block relative aspect-[4/3] overflow-hidden">
        <img 
          src={car.images[0]} 
          alt={`${car.make} ${car.model}`} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {car.isAuction && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider">
            <Clock className="w-3 h-3" /> Auction
          </div>
        )}
        {car.isBoosted && (
          <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider">
            <Zap className="w-3 h-3 fill-current" /> Premium
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2 py-1 rounded-md">
          {car.condition}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-tight truncate">
              {car.make} {car.model}
            </h3>
            <p className="text-sm text-gray-500">{car.year} • {car.transmission}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-extrabold text-indigo-600">
              ${car.price.toLocaleString()}
            </p>
            {car.isAuction && car.currentBid && (
              <p className="text-[10px] text-gray-400">Current Bid: <span className="text-gray-600 font-bold">${car.currentBid.toLocaleString()}</span></p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-4 pt-4 border-t border-gray-50">
          <div className="flex items-center text-gray-500 text-xs">
            <Gauge className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
            {car.mileage.toLocaleString()} km
          </div>
          <div className="flex items-center text-gray-500 text-xs">
            <Fuel className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
            {car.fuelType}
          </div>
          <div className="flex items-center text-gray-500 text-xs col-span-2">
            <MapPin className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
            {car.location}
          </div>
        </div>

        <button className="w-full mt-4 py-2.5 bg-gray-50 text-gray-900 font-semibold rounded-xl hover:bg-indigo-600 hover:text-white transition-all text-sm">
          {car.isAuction ? 'Place a Bid' : 'View Details'}
        </button>
      </div>
    </motion.div>
  );
};

export default CarCard;