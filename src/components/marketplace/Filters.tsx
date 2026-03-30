import React from 'react';
import { Search, SlidersHorizontal, ChevronDown, Filter, RotateCcw } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/Layout';

const Filters = () => {
  return (
    <div className="bg-[#0a3a25] p-8 rounded-3xl border border-primary/10 space-y-10 sticky top-24 shadow-2xl shadow-primary/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
           <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Filter className="h-4 w-4" />
           </div>
           <h3 className="text-lg font-bold text-white font-serif tracking-tight">Refinement</h3>
        </div>
        <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors">
           <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">Quick Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/30 w-4 h-4" />
          <Input 
            type="text" 
            placeholder="Make or model..." 
            className="w-full pl-10 pr-4 h-12 bg-primary/5 border-primary/10 rounded-xl text-sm focus:ring-primary text-white placeholder:text-primary/20" 
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">Condition</label>
        <div className="grid grid-cols-2 gap-2">
          {['New', 'Used', 'Imported', 'Certified'].map(c => (
            <button 
              key={c} 
              className="px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest border border-primary/10 bg-primary/5 text-primary/60 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all"
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">Price Threshold</label>
        <div className="space-y-4">
           <div className="grid grid-cols-2 gap-3">
             <div className="space-y-2">
                <p className="text-[8px] font-black text-primary/30 uppercase">Min</p>
                <Input type="number" placeholder="$0" className="bg-primary/5 border-primary/10 h-11 text-xs" />
             </div>
             <div className="space-y-2">
                <p className="text-[8px] font-black text-primary/30 uppercase">Max</p>
                <Input type="number" placeholder="$500k" className="bg-primary/5 border-primary/10 h-11 text-xs" />
             </div>
           </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">Propulsion</label>
        <div className="space-y-3">
          {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map(f => (
            <label key={f} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                 <input type="checkbox" className="peer h-5 w-5 appearance-none rounded-lg border border-primary/20 bg-primary/5 checked:bg-primary transition-all cursor-pointer" />
                 <div className="pointer-events-none absolute scale-0 peer-checked:scale-100 transition-transform">
                    <div className="h-2 w-2 rounded-full bg-background" />
                 </div>
              </div>
              <span className="text-sm font-semibold text-primary/60 group-hover:text-primary transition-colors">{f}</span>
            </label>
          ))}
        </div>
      </div>

      <Button className="w-full h-14 text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/10 hover:scale-[1.02] transition-transform">
        Apply Filters
      </Button>
    </div>
  );
};

export default Filters;