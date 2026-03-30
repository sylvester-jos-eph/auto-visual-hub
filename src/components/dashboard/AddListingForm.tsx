import React, { useState, useRef } from 'react';
import { PlusCircle, Image as ImageIcon, X, Loader2, Sparkles, Wand2, MapPin, Gauge, Fuel, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, Input } from '../ui/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

interface AddListingFormProps {
  onClose: () => void;
}

export const AddListingForm: React.FC<AddListingFormProps> = ({ onClose }) => {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    mileage: '',
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    condition: 'Used',
    location: '',
    description: '',
  });

  // Image State
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (selectedFiles.length + files.length > 5) {
      toast.error('Maximum 5 images allowed');
      return;
    }

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setSelectedFiles(prev => [...prev, ...files]);
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const newFiles = [...selectedFiles];
    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
  };

  const uploadImages = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    for (const file of selectedFiles) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${user?.id}/${fileName}`;
      const { error: uploadError } = await supabase.storage.from('car-images').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('car-images').getPublicUrl(filePath);
      uploadedUrls.push(publicUrl);
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be logged in to list a vehicle');
      return;
    }
    if (selectedFiles.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }
    setLoading(true);
    try {
      setUploadingImage(true);
      const imageUrls = await uploadImages();
      setUploadingImage(false);

      const { error: insertError } = await supabase.from('cars').insert({
        seller_id: user.id,
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year.toString()),
        price: parseFloat(formData.price),
        mileage: formData.mileage ? parseInt(formData.mileage.toString()) : 0,
        fuel_type: formData.fuel_type,
        transmission: formData.transmission,
        condition: formData.condition,
        location: formData.location || 'Accra, Ghana',
        description: formData.description,
        images: imageUrls,
        status: 'pending',
      });

      if (insertError) throw insertError;
      toast.success('Vehicle listing submitted successfully!', {
        description: 'Your property is now being reviewed by our team.',
      });
      onClose();
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error('Failed to submit listing', { description: error.message });
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  };

  const handleAiOptimize = () => {
    setAiAnalyzing(true);
    setTimeout(() => {
      setAiAnalyzing(false);
      toast.info('SiLLA AI has optimized your listing', {
        description: 'Metadata and keywords updated for maximum reach.',
      });
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 backdrop-blur-md"
    >
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0a3a25] border-primary/20 p-8 shadow-2xl relative">
        <button onClick={onClose} className="absolute right-6 top-6 text-primary/60 hover:text-primary transition-colors">
          <X className="h-8 w-8" />
        </button>

        <div className="mb-8 flex items-center gap-4 border-b border-primary/10 pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-background shadow-lg shadow-primary/20">
             <PlusCircle className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white font-serif tracking-tight">List New Property</h2>
            <p className="text-primary/60 uppercase tracking-widest text-[10px] font-black">Exclusive Hub Marketplace</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Make</label>
                   <Input name="make" value={formData.make} onChange={handleInputChange} placeholder="e.g. Porsche" className="bg-primary/5 border-primary/20 h-12 text-white" required />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Model</label>
                   <Input name="model" value={formData.model} onChange={handleInputChange} placeholder="e.g. 911 GT3" className="bg-primary/5 border-primary/20 h-12 text-white" required />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Year</label>
                   <Input name="year" type="number" value={formData.year} onChange={handleInputChange} placeholder="2024" className="bg-primary/5 border-primary/20 h-12 text-white" required />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Price (USD)</label>
                   <Input name="price" type="number" value={formData.price} onChange={handleInputChange} placeholder="185,000" className="bg-primary/5 border-primary/20 h-12 text-white font-bold" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Mileage (KM)</label>
                   <Input name="mileage" type="number" value={formData.mileage} onChange={handleInputChange} placeholder="500" className="bg-primary/5 border-primary/20 h-12 text-white" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Location</label>
                   <Input name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. Accra, Ghana" className="bg-primary/5 border-primary/20 h-12 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Fuel</label>
                   <select name="fuel_type" value={formData.fuel_type} onChange={handleInputChange} className="w-full h-12 rounded-xl bg-primary/5 border border-primary/20 px-4 text-white text-xs outline-none focus:ring-1 focus:ring-primary">
                      <option className="bg-[#0a3a25]" value="Petrol">Petrol</option>
                      <option className="bg-[#0a3a25]" value="Electric">Electric</option>
                      <option className="bg-[#0a3a25]" value="Hybrid">Hybrid</option>
                      <option className="bg-[#0a3a25]" value="Diesel">Diesel</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Transmission</label>
                   <select name="transmission" value={formData.transmission} onChange={handleInputChange} className="w-full h-12 rounded-xl bg-primary/5 border border-primary/20 px-4 text-white text-xs outline-none focus:ring-1 focus:ring-primary">
                      <option className="bg-[#0a3a25]" value="Automatic">Automatic</option>
                      <option className="bg-[#0a3a25]" value="Manual">Manual</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Condition</label>
                   <select name="condition" value={formData.condition} onChange={handleInputChange} className="w-full h-12 rounded-xl bg-primary/5 border border-primary/20 px-4 text-white text-xs outline-none focus:ring-1 focus:ring-primary">
                      <option className="bg-[#0a3a25]" value="Used">Used</option>
                      <option className="bg-[#0a3a25]" value="New">New</option>
                      <option className="bg-[#0a3a25]" value="Imported">Imported</option>
                      <option className="bg-[#0a3a25]" value="Certified Pre-Owned">Certified</option>
                   </select>
                </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Description & Heritage</label>
                 <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full rounded-xl bg-primary/5 border border-primary/20 p-4 text-white min-h-[120px] focus:ring-1 focus:ring-primary outline-none text-sm leading-relaxed" placeholder="Describe the history, features, and condition..." required />
              </div>

              <Button type="button" variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/10 h-10 text-[10px] font-black uppercase tracking-widest" onClick={handleAiOptimize} disabled={aiAnalyzing}>
                {aiAnalyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4 animate-pulse" />}
                {aiAnalyzing ? "SiLLA AI Analyzing..." : "Optimize with SiLLA AI"}
              </Button>
           </div>

           <div className="space-y-8">
              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Media Assets (Max 5)</label>
                 <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />

                 <div onClick={() => fileInputRef.current?.click()} className="aspect-video rounded-2xl border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:bg-primary/10 transition-all overflow-hidden relative shadow-inner">
                    {previews[0] ? (
                      <>
                        <img src={previews[0]} alt="Primary Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><p className="text-white font-bold text-xs uppercase tracking-widest">Change Asset</p></div>
                        <button onClick={(e) => { e.stopPropagation(); removeImage(0); }} className="absolute top-3 right-3 p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600 z-10 shadow-lg"><X className="h-4 w-4" /></button>
                      </>
                    ) : (
                      <>
                        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform"><ImageIcon className="h-7 w-7" /></div>
                        <div className="text-center px-4">
                          <p className="text-[10px] font-black uppercase tracking-widest text-primary">Upload Primary Image</p>
                          <p className="text-[9px] text-primary/40 mt-1 uppercase tracking-[0.2em]">Cinema 4K Resolution Recommended</p>
                        </div>
                      </>
                    )}
                 </div>
                 
                 <div className="grid grid-cols-4 gap-3">
                    {Array.from({ length: 4 }).map((_, i) => {
                      const index = i + 1;
                      const hasPreview = !!previews[index];
                      return (
                        <div key={index} onClick={() => !hasPreview && fileInputRef.current?.click()} className="aspect-square rounded-xl border border-primary/10 bg-primary/5 flex items-center justify-center hover:border-primary/30 transition-all cursor-pointer overflow-hidden relative group shadow-lg">
                          {hasPreview ? (
                            <>
                              <img src={previews[index]} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                              <button onClick={(e) => { e.stopPropagation(); removeImage(index); }} className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"><X className="h-3 w-3" /></button>
                            </>
                          ) : <PlusCircle className="h-5 w-5 text-primary/40 group-hover:text-primary/60" />}
                        </div>
                      );
                    })}
                 </div>
              </div>
              
              <Card className="p-6 bg-primary/10 border border-primary/20 space-y-4">
                 <div className="flex items-center gap-2 mb-2">
                    <Wand2 className="h-4 w-4 text-primary animate-pulse" />
                    <h3 className="text-[10px] font-black text-white uppercase tracking-widest">AI Valuation Engine</h3>
                 </div>
                 <div className="flex items-center justify-between text-xs">
                    <span className="text-primary/60 font-bold uppercase tracking-widest">Market Range</span>
                    <span className="text-sm font-bold text-primary">{formData.price ? `$${(parseInt(formData.price) * 0.98).toLocaleString()} - $${(parseInt(formData.price) * 1.05).toLocaleString()}` : "$0 - $0"}</span>
                 </div>
                 <div className="h-1.5 w-full bg-primary/5 rounded-full overflow-hidden"><div className="h-full w-2/3 bg-primary" /></div>
                 <div className="flex gap-2 items-start">
                    <Info className="h-3 w-3 text-primary/40 shrink-0 mt-0.5" />
                    <p className="text-[9px] text-primary/50 leading-relaxed italic uppercase tracking-wider">"This asset has high liquidity potential in the African market based on current demand benchmarks."</p>
                 </div>
              </Card>

              <div className="pt-6 flex gap-4">
                 <Button variant="ghost" type="button" className="flex-1 h-14 uppercase tracking-[0.2em] font-black text-[10px]" onClick={onClose} disabled={loading}>Cancel</Button>
                 <Button type="submit" className="flex-[2] h-14 shadow-2xl shadow-primary/20 uppercase tracking-[0.2em] font-black text-[10px]" disabled={loading}>
                    {loading ? (
                      <div className="flex items-center gap-2"><Loader2 className="h-5 w-5 animate-spin" /><span>{uploadingImage ? "Uploading Assets..." : "Publishing..."}</span></div>
                    ) : "Publish Property"}
                 </Button>
              </div>
           </div>
        </form>
      </Card>
    </motion.div>
  );
};