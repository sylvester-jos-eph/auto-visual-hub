import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, CreditCard, MessageSquare, 
  Settings, Users, TrendingUp, AlertCircle, CheckCircle2, 
  PlusCircle, Wallet, ShieldAlert, BarChart3, Car as CarIcon,
  ChevronRight, Menu, X, ArrowUpRight, Search, Phone, DollarSign,
  Briefcase, Heart, PieChart, Activity, Sparkles, Wand2, ArrowRight,
  ChevronDown, Image as ImageIcon, MapPin, Gauge, Fuel, Zap, Globe, LogOut,
  BrainCircuit, TrendingDown, Target, Lightbulb
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, Badge, Input } from '../components/ui/Layout';
import { MOCK_CARS } from '../lib/constants';
import { formatCurrency, formatDate, cn } from '../lib/utils';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell,
  PieChart as RePieChart, Pie
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useNavigate } from 'react-router-dom';
import { AddListingForm } from '../components/dashboard/AddListingForm';
import { SellerInsights } from '../components/dashboard/SellerInsights';

const USER_STATS_DATA = [
  { name: 'Buyers', value: 8500, color: '#d4af37' },
  { name: 'Sellers', value: 3950, color: '#0a4d33' },
];

const TRAFFIC_DATA = [
  { name: 'Direct', value: 40, color: '#d4af37' },
  { name: 'Search', value: 30, color: '#1a7a4f' },
  { name: 'Referral', value: 20, color: '#0a4d33' },
  { name: 'Social', value: 10, color: '#ffffff' },
];

export const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { whatsappNumber, updateWhatsappNumber } = useSettings();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'buyer' | 'seller' | 'admin'>(user?.role || 'buyer');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [monthlyFee, setMonthlyFee] = useState(299);
  const [newWhatsapp, setNewWhatsapp] = useState(whatsappNumber);
  const [showAddCar, setShowAddCar] = useState(false);
  const [activeSection, setActiveSection] = useState<'overview' | 'listings' | 'insights' | 'settings'>('overview');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setActiveTab(user.role);
    }
  }, [user, navigate]);

  const stats = {
    buyer: [
      { label: 'Orders', value: '2', icon: ShoppingBag, color: 'text-primary' },
      { label: 'Saved', value: '14', icon: Heart, color: 'text-primary' },
      { label: 'Spent', value: formatCurrency(125000), icon: CreditCard, color: 'text-primary' },
      { label: 'Inbox', value: '5', icon: MessageSquare, color: 'text-primary' },
    ],
    seller: [
      { label: 'Active Listings', value: '8', icon: CarIcon, color: 'text-primary' },
      { label: 'Total Revenue', value: formatCurrency(450000), icon: TrendingUp, color: 'text-primary' },
      { label: 'New Offers', value: '12', icon: AlertCircle, color: 'text-primary' },
      { label: 'Escrow Funds', value: formatCurrency(28400), icon: Wallet, color: 'text-primary' },
    ],
    admin: [
      { label: 'Total Users', value: '12,450', icon: Users, color: 'text-primary' },
      { label: 'Global Volume', value: formatCurrency(1892000), icon: TrendingUp, color: 'text-primary' },
      { label: 'Verifications', value: '45', icon: ShieldAlert, color: 'text-primary' },
      { label: 'Disputes', value: '3', icon: AlertCircle, color: 'text-destructive' },
    ]
  };

  const handleUpdateFee = () => {
    toast.success('Subscription fee updated for all sellers');
  };

  const handleUpdateWhatsapp = () => {
    updateWhatsappNumber(newWhatsapp);
    toast.success('Admin WhatsApp number updated successfully');
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const renderBuyerDash = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.buyer.map((stat, i) => (
          <Card key={i} className="flex flex-col sm:flex-row items-center gap-4 bg-primary/5 border-primary/10 p-6">
            <div className={cn("rounded-xl bg-primary/10 p-3", stat.color)}>
               <stat.icon className="h-6 w-6" />
            </div>
            <div className="text-center sm:text-left">
               <p className="text-xs text-primary/40 uppercase tracking-widest font-black">{stat.label}</p>
               <p className="text-xl sm:text-2xl font-black text-white">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card className="space-y-6 bg-primary/5 border-primary/10 p-8">
            <div className="flex items-center justify-between">
               <h3 className="text-xl font-bold font-serif text-white">Order Status Tracking</h3>
               <Button variant="ghost" size="sm" className="text-primary text-[10px] font-black uppercase tracking-widest">History</Button>
            </div>
            <div className="space-y-4">
               {[
                 { id: 'ORD-123', car: 'Tesla Model S Plaid', price: 89000, status: 'shipped', date: '2024-05-10' },
                 { id: 'ORD-122', car: 'BMW X5 M Competition', price: 62000, status: 'completed', date: '2024-04-15' },
               ].map((order, i) => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/10 group hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <CarIcon className="h-6 w-6" />
                       </div>
                       <div>
                          <p className="font-bold text-white">{order.car}</p>
                          <p className="text-[10px] text-primary/40 uppercase tracking-[0.2em] font-black">{order.id} \\u2022 {formatDate(order.date)}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="font-bold text-primary">{formatCurrency(order.price)}</p>
                       <Badge variant={order.status === 'shipped' ? 'warning' : 'success'} className="mt-1 text-[8px] uppercase tracking-widest">
                          {order.status}
                       </Badge>
                    </div>
                 </div>
               ))}
            </div>
          </Card>

          <Card className="p-8 bg-primary/5 border border-primary/10 space-y-6 overflow-hidden relative group">
             <div className="relative z-10">
                <h3 className="text-2xl font-black font-serif text-white mb-2 uppercase tracking-wider">Sell Your Vehicle</h3>
                <p className="text-[10px] text-primary/40 font-black uppercase tracking-[0.3em] mb-8">
                   Connect with serious buyers in the SiLLA network.
                </p>
                <Button 
                  className="h-14 px-10 bg-primary text-background hover:bg-primary/90 font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-primary/20"
                  onClick={() => setShowAddCar(true)}
                >
                   <PlusCircle className="mr-2 h-4 w-4" /> List New Property
                </Button>
             </div>
             <Sparkles className="absolute -right-8 -bottom-8 h-40 w-40 text-primary opacity-5 group-hover:scale-110 transition-transform duration-700" />
          </Card>
        </div>
        
        <Card className="space-y-6 bg-primary border-none p-8 text-background shadow-2xl shadow-primary/20">
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-xl font-bold font-serif">Capital Vault</h3>
             <Wallet className="h-6 w-6 opacity-40" />
          </div>
          <div className="space-y-1">
             <p className="text-[10px] uppercase tracking-[0.2em] font-black opacity-60">Available Liquidity</p>
             <p className="text-4xl font-black">{formatCurrency(4500.50)}</p>
          </div>
          <div className="mt-10 flex flex-col gap-3">
             <Button className="w-full bg-background text-primary hover:bg-background/90 h-14 rounded-xl font-black uppercase tracking-widest text-[10px]">Add Capital</Button>
             <Button variant="outline" className="w-full border-background/20 text-background hover:bg-background/10 h-14 rounded-xl font-black uppercase tracking-widest text-[10px]">Transaction Log</Button>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderSellerDash = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-wrap gap-4 border-b border-primary/10 pb-4">
        {['overview', 'listings', 'insights'].map((sec) => (
          <button 
            key={sec} 
            onClick={() => setActiveSection(sec as any)}
            className={cn(
              "px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all",
              activeSection === sec ? "text-primary border-b-2 border-primary" : "text-primary/40 hover:text-primary"
            )}
          >
            {sec}
          </button>
        ))}
      </div>

      {activeSection === 'overview' && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.seller.map((stat, i) => (
              <Card key={i} className="flex flex-col sm:flex-row items-center gap-4 bg-primary/5 border-primary/10 p-6">
                <div className={cn("rounded-xl bg-primary/10 p-3", stat.color)}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs text-primary/40 uppercase tracking-widest font-black">{stat.label}</p>
                  <p className="text-xl sm:text-2xl font-black text-white">{stat.value}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="p-8 bg-primary/5 border border-primary/10">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold font-serif text-white uppercase tracking-wider">Active Properties</h3>
                    <Button 
                      size="sm" 
                      className="bg-primary text-background hover:bg-primary/90 font-black uppercase tracking-widest text-[10px] px-4"
                      onClick={() => setShowAddCar(true)}
                    >
                       <PlusCircle className="h-4 w-4 mr-2" /> List Property
                    </Button>
                 </div>
                 <div className="space-y-4">
                    {MOCK_CARS.map((car, i) => (
                       <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/10 group hover:border-primary/40 transition-all">
                          <div className="flex items-center gap-4">
                             <div className="h-16 w-16 rounded-lg overflow-hidden border border-primary/20">
                                <img src={car.image} className="h-full w-full object-cover" />
                             </div>
                             <div>
                                <p className="font-bold text-white">{car.make} {car.model}</p>
                                <p className="text-[9px] text-primary/40 uppercase tracking-[0.2em] font-black">{car.year} \\u2022 {car.condition} \\u2022 {formatCurrency(car.price)}</p>
                             </div>
                          </div>
                          <div className="text-right flex items-center gap-6">
                             <div className="hidden md:block">
                                <Badge className="bg-primary/10 text-primary border-none text-[8px] uppercase tracking-widest">Live Now</Badge>
                             </div>
                             <Button size="icon" variant="ghost" className="text-primary/60 hover:text-primary">
                                <ChevronRight className="h-5 w-5" />
                             </Button>
                          </div>
                       </div>
                    ))}
                 </div>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="p-8 bg-primary border-none text-background shadow-2xl shadow-primary/20 group relative overflow-hidden">
                 <div className="relative z-10">
                    <h3 className="text-2xl font-black font-serif mb-2 leading-tight">Global Showroom Expansion</h3>
                    <p className="text-[10px] uppercase tracking-widest font-black opacity-60 mb-8">Reach international collectors instantly.</p>
                    <Button className="w-full h-16 bg-background text-primary hover:bg-background/90 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl" onClick={() => setShowAddCar(true)}>
                       Start Listing
                    </Button>
                 </div>
                 <CarIcon className="absolute -right-8 -bottom-8 h-32 w-32 opacity-10 group-hover:scale-110 transition-transform" />
              </Card>

              <Card className="p-8 bg-primary/5 border-primary/10 space-y-6">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                       <MessageSquare className="h-6 w-6" />
                    </div>
                    <h4 className="text-sm font-black text-white uppercase tracking-widest">Recent Inquiries</h4>
                 </div>
                 <div className="space-y-4">
                    {[ 
                      { name: 'Marcus L.', msg: 'Interested in the Tesla S Plaid...', time: '12m ago' },
                      { name: 'Sarah V.', msg: 'Shipping cost to Dubai?', time: '2h ago' }
                    ].map((inq, i) => (
                      <div key={i} className="p-4 rounded-xl bg-primary/5 border border-primary/5 space-y-1">
                         <div className="flex justify-between items-center">
                            <p className="text-xs font-bold text-white">{inq.name}</p>
                            <span className="text-[8px] text-primary/40 uppercase font-black tracking-widest">{inq.time}</span>
                         </div>
                         <p className="text-[10px] text-primary/60">{inq.msg}</p>
                      </div>
                    ))}
                 </div>
              </Card>
            </div>
          </div>
        </>
      )}

      {activeSection === 'listings' && (
        <div className="space-y-8">
           <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white font-serif">Property Catalog</h2>
              <Button onClick={() => setShowAddCar(true)} className="h-12 px-8 uppercase font-black text-[10px] tracking-widest">
                 <PlusCircle className="mr-2 h-4 w-4" /> Add Property
              </Button>
           </div>
           <Card className="p-8 bg-primary/5 border border-primary/10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {MOCK_CARS.map((car, i) => (
                    <div key={i} className="group rounded-2xl bg-primary/5 border border-primary/10 overflow-hidden hover:border-primary/40 transition-all">
                       <div className="aspect-video relative overflow-hidden">
                          <img src={car.image} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          <Badge className="absolute top-4 left-4 bg-primary text-background text-[8px] uppercase font-black tracking-widest">{car.status}</Badge>
                       </div>
                       <div className="p-6 space-y-4">
                          <div>
                             <h4 className="font-bold text-white">{car.make} {car.model}</h4>
                             <p className="text-[10px] text-primary/40 uppercase font-black tracking-widest">{car.year} \\u2022 {car.mileage} KM</p>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                             <span className="text-primary font-black">{formatCurrency(car.price)}</span>
                             <Button size="sm" variant="ghost" className="text-[10px] font-black uppercase tracking-widest h-8">Edit</Button>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </Card>
        </div>
      )}

      {activeSection === 'insights' && <SellerInsights />}
    </div>
  );

  const renderAdminDash = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.admin.map((stat, i) => (
          <Card key={i} className="flex flex-col sm:flex-row items-center gap-4 bg-primary/5 border-primary/10 p-6">
            <div className={cn("rounded-xl bg-primary/10 p-3", stat.color)}>
               <stat.icon className="h-6 w-6" />
            </div>
            <div className="text-center sm:text-left">
               <p className="text-xs text-primary/40 uppercase tracking-widest font-black">{stat.label}</p>
               <p className="text-xl sm:text-2xl font-black text-white">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
         <Card className="lg:col-span-2 space-y-8 bg-primary/5 border-primary/10 p-8">
            <div className="flex items-center justify-between">
               <h3 className="text-2xl font-bold font-serif text-white">Global Analytics Engine</h3>
               <div className="flex gap-2">
                 <Badge variant="success" className="bg-primary/20 text-primary border-none text-[8px] uppercase tracking-widest">Live Feed</Badge>
                 <Badge variant="outline" className="border-primary/20 text-primary text-[8px] uppercase tracking-widest">Global</Badge>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[300px]">
               <div className="space-y-4">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">Platform Composition</p>
                 <ResponsiveContainer width="100%" height="80%">
                   <BarChart data={USER_STATS_DATA}>
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#d4af37', fontSize: 10, fontWeight: 'bold'}} />
                     <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                       {USER_STATS_DATA.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                     </Bar>
                   </BarChart>
                 </ResponsiveContainer>
               </div>
               <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">Network Velocity</p>
                  <div className="space-y-4">
                     {[ 
                       { label: 'Asset Listings', value: '+12%', color: 'text-primary' },
                       { label: 'Bid Velocity', value: '+28%', color: 'text-primary' },
                       { label: 'Capital Flow', value: '+8%', color: 'text-primary' }
                     ].map((item, i) => (
                       <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/10">
                          <span className="text-[10px] text-white/60 font-black uppercase tracking-widest">{item.label}</span>
                          <span className={cn("text-sm font-bold", item.color)}>{item.value}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
         </Card>

         <div className="space-y-8">
           <Card className="space-y-6 bg-[#0a3a25] border-primary/20 p-8 shadow-2xl">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                 <Phone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-serif text-white uppercase tracking-wider">WhatsApp Gateway</h3>
              <p className="text-[10px] text-primary/40 uppercase tracking-[0.2em] font-black">
                 Central communication number for high-priority support.
              </p>
              <div className="space-y-3">
                 <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                    <Input 
                      value={newWhatsapp} 
                      onChange={(e) => setNewWhatsapp(e.target.value)}
                      className="bg-primary/5 border-primary/20 pl-12 h-14 text-lg font-black text-white focus:ring-primary"
                    />
                 </div>
                 <Button className="w-full h-14 shadow-xl shadow-primary/20 font-black uppercase tracking-widest text-[10px]" onClick={handleUpdateWhatsapp}>
                    Apply Global Route
                 </Button>
              </div>
           </Card>

           <Card className="space-y-6 bg-[#0a3a25] border-primary/20 p-8 shadow-2xl">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                 <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-serif text-white uppercase tracking-wider">Revenue Model</h3>
              <p className="text-[10px] text-primary/40 uppercase tracking-[0.2em] font-black">
                 Maintain platform exclusivity through recurring license fees.
              </p>
              <div className="space-y-3">
                 <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                    <Input 
                      type="number" 
                      value={monthlyFee} 
                      onChange={(e) => setMonthlyFee(Number(e.target.value))}
                      className="bg-primary/5 border-primary/20 pl-12 h-14 text-lg font-black text-white focus:ring-primary"
                    />
                 </div>
                 <Button className="w-full h-14 shadow-xl shadow-primary/20 font-black uppercase tracking-widest text-[10px]" onClick={handleUpdateFee}>
                    Update Protocol
                 </Button>
              </div>
           </Card>
         </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background text-white">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 border-r border-primary/10 bg-[#0a3a25] transition-all lg:static lg:translate-x-0",
        !isSidebarOpen && "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex h-full flex-col p-8">
          <div className="mb-12 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-background shadow-lg shadow-primary/20">
                   <CarIcon className="h-7 w-7" />
                </div>
                <span className="text-xl font-bold font-serif text-primary tracking-widest uppercase">SiLLA Hub</span>
             </div>
             <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-primary">
                <X className="h-6 w-6" />
             </Button>
          </div>

          <nav className="flex-1 space-y-3">
             {[
               { id: 'buyer', label: 'Buyer Terminal', icon: ShoppingBag, roles: ['buyer', 'admin'] },
               { id: 'seller', label: 'Seller Suite', icon: TrendingUp, roles: ['seller', 'admin'] },
               { id: 'admin', label: 'Admin Command', icon: ShieldAlert, roles: ['admin'] },
             ]
             .filter(nav => nav.roles.includes(user?.role || ''))
             .map((nav) => (
               <button
                 key={nav.id}
                 onClick={() => { setActiveTab(nav.id as any); setIsSidebarOpen(false); }}
                 className={cn(
                   "flex w-full items-center justify-between rounded-xl px-4 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all group",
                   activeTab === nav.id 
                    ? "bg-primary text-background shadow-xl shadow-primary/10" 
                    : "text-primary/60 hover:bg-primary/5 hover:text-primary"
                 )}
               >
                 <div className="flex items-center gap-4">
                    <nav.icon className="h-5 w-5" />
                    {nav.label}
                 </div>
                 {activeTab === nav.id && <ChevronRight className="h-4 w-4" />}
               </button>
             ))}
          </nav>
          
          <div className="mt-auto">
             <Button 
              variant="outline" 
              className="w-full border-primary/20 text-primary h-12 text-[10px] font-black uppercase tracking-widest"
              onClick={handleLogout}
             >
                <LogOut className="mr-2 h-4 w-4" /> System Exit
             </Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden pb-12">
        <header className="flex h-24 items-center justify-between border-b border-primary/10 bg-background/50 backdrop-blur-md px-6 sm:px-12 sticky top-0 z-30">
           <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSidebarOpen(true)} 
                className="lg:hidden text-primary hover:bg-primary/10"
              >
                <Menu className="h-6 w-6" />
              </Button>
              <h2 className="text-2xl font-bold font-serif text-white tracking-[0.2em] uppercase">
                {activeTab} <span className="text-primary">Node</span>
              </h2>
           </div>
           
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                 <div className="hidden sm:flex flex-col items-end">
                    <span className="text-sm font-bold text-white">{user?.name}</span>
                    <Badge variant="outline" className="border-primary/20 text-primary text-[8px] uppercase font-black tracking-widest bg-primary/5">
                      {user?.role}
                    </Badge>
                 </div>
                 <div 
                  className="h-14 w-14 rounded-2xl bg-primary/10 border-2 border-primary shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => navigate('/marketplace')}
                 >
                    <img src={user?.avatar} className="h-full w-full object-cover" alt="Profile" />
                 </div>
              </div>
           </div>
        </header>

        <div className="p-6 sm:p-12">
          <AnimatePresence mode="wait">
            {activeTab === 'buyer' && <motion.div key="buyer" initial={{opacity:0, y: 10}} animate={{opacity:1, y: 0}} exit={{opacity:0, y: -10}}>{renderBuyerDash()}</motion.div>}
            {activeTab === 'seller' && <motion.div key="seller" initial={{opacity:0, y: 10}} animate={{opacity:1, y: 0}} exit={{opacity:0, y: -10}}>{renderSellerDash()}</motion.div>}
            {activeTab === 'admin' && <motion.div key="admin" initial={{opacity:0, y: 10}} animate={{opacity:1, y: 0}} exit={{opacity:0, y: -10}}>{renderAdminDash()}</motion.div>}
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {showAddCar && <AddListingForm onClose={() => setShowAddCar(false)} />}
      </AnimatePresence>
    </div>
  );
};