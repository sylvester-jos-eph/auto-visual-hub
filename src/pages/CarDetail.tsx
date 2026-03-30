import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { MOCK_CARS } from '../lib/constants';
import { MapPin, Calendar, Gauge, Fuel, ShieldCheck, ChevronRight, Share2, Heart, Clock, DollarSign, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';

const CarDetail = () => {
  const { id } = useParams();
  const car = MOCK_CARS.find(c => c.id === id) || MOCK_CARS[0];
  const [bidAmount, setBidAmount] = React.useState(car.currentBid ? car.currentBid + 500 : car.price);

  const handlePlaceBid = () => {
    toast.success(`Bid of $${bidAmount.toLocaleString()} placed successfully!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/marketplace" className="hover:text-indigo-600 transition-colors">Marketplace</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">{car.make} {car.model}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
              <div className="relative aspect-video">
                <img src={car.image || car.images[0]} alt="" className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2.5 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all">
                    <Heart className="w-5 h-5 text-gray-900" />
                  </button>
                  <button className="p-2.5 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all">
                    <Share2 className="w-5 h-5 text-gray-900" />
                  </button>
                </div>
              </div>
              <div className="p-2 grid grid-cols-4 gap-2">
                 {(car.gallery || [car.image || car.images[0]]).slice(0, 4).map((img, i) => (
                   <div key={i} className="aspect-video bg-gray-100 rounded-xl overflow-hidden cursor-pointer hover:ring-2 ring-indigo-500 transition-all">
                      <img src={img} alt="" className="w-full h-full object-cover opacity-80" />
                   </div>
                 ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-4xl font-extrabold text-gray-900">{car.make} {car.model}</h1>
                  <p className="flex items-center text-gray-500 mt-2">
                    <MapPin className="w-4 h-4 mr-1.5 text-indigo-500" /> {car.location} \u2022 <Calendar className="w-4 h-4 mx-1.5 text-indigo-500" /> {car.year}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-50 px-4 py-2 rounded-2xl">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">Asking Price</span>
                    <span className="text-2xl font-black text-indigo-700">${car.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <Gauge className="w-5 h-5 text-indigo-600 mb-2" />
                  <p className="text-xs text-gray-500 font-medium">Mileage</p>
                  <p className="text-sm font-bold text-gray-900">{car.mileage.toLocaleString()} km</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <Fuel className="w-5 h-5 text-indigo-600 mb-2" />
                  <p className="text-xs text-gray-500 font-medium">Fuel Type</p>
                  <p className="text-sm font-bold text-gray-900">{car.fuelType}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <ShieldCheck className="w-5 h-5 text-indigo-600 mb-2" />
                  <p className="text-xs text-gray-500 font-medium">Condition</p>
                  <p className="text-sm font-bold text-gray-900">{car.condition}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <ArrowUpRight className="w-5 h-5 text-indigo-600 mb-2" />
                  <p className="text-xs text-gray-500 font-medium">Transmission</p>
                  <p className="text-sm font-bold text-gray-900">{car.transmission}</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {car.description}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {car.isAuction ? (
              <div className="bg-indigo-900 text-white rounded-3xl p-6 shadow-xl shadow-indigo-200 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center gap-2">
                     <Clock className="w-5 h-5 text-amber-400" />
                     <span className="font-bold">Time Left</span>
                   </div>
                   <div className="text-xl font-mono font-bold tracking-widest text-amber-400">
                     02 : 45 : 12
                   </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-indigo-200">Current Bid</span>
                    <span className="bg-indigo-500 text-[10px] font-bold px-1.5 py-0.5 rounded">12 Bids</span>
                  </div>
                  <div className="text-3xl font-black text-white">${car.currentBid?.toLocaleString()}</div>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="number" 
                      value={bidAmount}
                      onChange={(e) => setBidAmount(Number(e.target.value))}
                      className="w-full bg-white text-gray-900 rounded-xl py-3 pl-10 pr-4 font-bold focus:ring-2 ring-indigo-400 outline-none" 
                    />
                  </div>
                  <button 
                    onClick={handlePlaceBid}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-indigo-950 font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    PLACE YOUR BID
                  </button>
                  <p className="text-[10px] text-center text-indigo-300">
                    By bidding, you agree to our terms of auction. Minimum increment is $500.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Interested in this car?</h3>
                <div className="space-y-4">
                  <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                    Buy Now
                  </button>
                  <button className="w-full py-4 bg-white border border-gray-200 text-gray-900 font-bold rounded-xl hover:bg-gray-50 transition-all">
                    Chat with Seller
                  </button>
                  <button className="w-full py-4 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
                    Pay via M-Pesa
                  </button>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=40&q=80" alt="Seller" className="w-12 h-12 rounded-full" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Johnstone Motors</p>
                      <p className="text-xs text-emerald-600 font-semibold flex items-center">
                        <ShieldCheck className="w-3 h-3 mr-1" /> Verified Dealer
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Member since 2021 \u2022 142 successful sales</p>
                </div>
              </div>
            )}

            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-emerald-900">Purchase Protection</p>
                <p className="text-xs text-emerald-700">Money is held in escrow until you confirm inspection. Risk-free buying.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarDetail;