import React from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

const Filters = () => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-8 sticky top-24">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        <button className="text-xs font-bold text-indigo-600">Reset All</button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search make or model..." 
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 ring-indigo-500 outline-none" 
        />
      </div>

      <div className="space-y-4">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Condition</label>
        <div className="flex flex-wrap gap-2">
          {['New', 'Used', 'Imported'].map(c => (
            <button key={c} className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-100 hover:border-indigo-600 hover:text-indigo-600 transition-all">
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Price Range</label>
        <div className="grid grid-cols-2 gap-4">
          <input type="number" placeholder="Min" className="w-full p-2.5 bg-gray-50 border-none rounded-xl text-sm outline-none" />
          <input type="number" placeholder="Max" className="w-full p-2.5 bg-gray-50 border-none rounded-xl text-sm outline-none" />
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Fuel Type</label>
        <div className="space-y-2">
          {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map(f => (
            <label key={f} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{f}</span>
            </label>
          ))}
        </div>
      </div>

      <button className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all">
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;