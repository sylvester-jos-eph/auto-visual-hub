import React, { useState } from 'react';
import { 
  ShoppingBag, CreditCard, MessageSquare, 
  Settings, Users, TrendingUp, AlertCircle, CheckCircle2, 
  PlusCircle, Wallet, ShieldAlert, BarChart3, Car as CarIcon,
  ChevronRight, Menu, X, ArrowUpRight, Search
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, Badge, Input } from '../components/ui/Layout';
import { MOCK_CARS } from '../lib/constants';
import { formatCurrency, formatDate, cn } from '../lib/utils';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const CHART_DATA = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
];

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'buyer' | 'seller' | 'admin'>('buyer');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const stats = {
    buyer: [
      { label: 'Orders', value: '2', icon: ShoppingBag, color: 'text-primary' },
      { label: 'Saved', value: '14', icon: CarIcon, color: 'text-primary' },
      { label: 'Spent', value: formatCurrency(125000), icon: CreditCard, color: 'text-primary' },
      { label: 'Inbox', value: '5', icon: MessageSquare, color: 'text-primary' },
    ],
    seller: [
      { label: 'Listings', value: '8', icon: CarIcon, color: 'text-primary' },
      { label: 'Revenue', value: formatCurrency(450000), icon: TrendingUp, color: 'text-primary' },
      { label: 'Offers', value: '12', icon: AlertCircle, color: 'text-primary' },
      { label: 'Escrow', value: formatCurrency(28400), icon: Wallet, color: 'text-primary' },
    ],
    admin: [
      { label: 'Users', value: '12,450', icon: Users, color: 'text-primary' },
      { label: 'Volume', value: formatCurrency(89200), icon: TrendingUp, color: 'text-primary' },
      { label: 'KYC', value: '45', icon: ShieldAlert, color: 'text-primary' },
      { label: 'Disputes', value: '3', icon: AlertCircle, color: 'text-destructive' },
    ]
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
               <p className="text-xs text-primary/40 uppercase tracking-widest font-bold">{stat.label}</p>
               <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2 space-y-6 bg-primary/5 border-primary/10 p-8">
          <div className="flex items-center justify-between">
             <h3 className="text-xl font-bold font-serif text-white">Recent Order History</h3>
             <Button variant="ghost" size="sm" className="text-primary">View All</Button>
          </div>
          <div className="space-y-4">
             {[
               { id: 'ORD-123', car: 'Tesla Model S Plaid', price: 89000, status: 'shipped', date: '2024-05-10' },
               { id: 'ORD-122', car: 'BMW X5 M Competition', price: 62000, status: 'completed', date: '2024-04-15' },
             ].map((order, i) => (
               <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/5">
                  <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CarIcon className="h-6 w-6 text-primary" />
                     </div>
                     <div>
                        <p className="font-bold text-white">{order.car}</p>
                        <p className="text-xs text-primary/40 uppercase tracking-widest">ID: {order.id} \u2022 {formatDate(order.date)}</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="font-bold text-primary">{formatCurrency(order.price)}</p>
                     <Badge variant={order.status === 'shipped' ? 'warning' : 'success'} className="mt-1 text-[8px]">
                        {order.status}
                     </Badge>
                  </div>
               </div>
             ))}
          </div>
        </Card>
        
        <Card className="space-y-6 bg-primary border-none p-8 text-background shadow-2xl shadow-primary/20">
          <div className="flex items-center justify-between">
             <h3 className="text-xl font-bold font-serif">Vault Balance</h3>
             <Wallet className="h-6 w-6 opacity-40" />
          </div>
          <div className="space-y-1">
             <p className="text-xs uppercase tracking-widest font-bold opacity-60">Available Funds</p>
             <p className="text-4xl font-black">{formatCurrency(4500.50)}</p>
          </div>
          <div className="mt-8 flex flex-col gap-3">
             <Button className="w-full bg-background text-primary hover:bg-background/90 h-12 rounded-xl">Instant Deposit</Button>
             <Button variant="outline" className="w-full border-background/20 text-background hover:bg-background/10 h-12 rounded-xl">Withdrawal</Button>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderSellerDash = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.seller.map((stat, i) => (
          <Card key={i} className="flex flex-col sm:flex-row items-center gap-4 bg-primary/5 border-primary/10 p-6">
            <div className={cn("rounded-xl bg-primary/10 p-3", stat.color)}>
               <stat.icon className="h-6 w-6" />
            </div>
            <div className="text-center sm:text-left">
               <p className="text-xs text-primary/40 uppercase tracking-widest font-bold">{stat.label}</p>
               <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2 space-y-6 bg-primary/5 border-primary/10 p-8">
          <div className="flex items-center justify-between">
             <h3 className="text-xl font-bold font-serif text-white">Revenue Analytics</h3>
             <Button variant="outline" size="sm" className="border-primary/20 text-primary">Last 6 Months</Button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(212, 175, 55, 0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#d4af37', opacity: 0.4, fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#d4af37', opacity: 0.4, fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a3a25', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '12px' }}
                  itemStyle={{ color: '#d4af37' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#d4af37" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="space-y-6 bg-primary/5 border-primary/10 p-8">
          <div className="flex items-center justify-between">
             <h3 className="text-xl font-bold font-serif text-white">Listing Hub</h3>
             <Button variant="ghost" size="icon" className="text-primary"><BarChart3 className="h-5 w-5" /></Button>
          </div>
          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 text-center space-y-4">
             <p className="text-sm text-primary/60">Ready to list your next masterpiece?</p>
             <Button className="w-full h-14 text-lg" onClick={() => {}}>
                <PlusCircle className="mr-2 h-5 w-5" /> Create Listing
             </Button>
          </div>
          <div className="space-y-4 pt-4">
             <p className="text-xs uppercase tracking-widest font-bold text-primary/40">Top Listings</p>
             {[ 
               { name: 'Ferrari 488', views: '2.4k', price: '$245k' },
               { name: 'Lamborghini Urus', views: '1.8k', price: '$210k' }
             ].map((item, i) => (
               <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-white font-semibold">{item.name}</span>
                  <span className="text-sm text-primary font-bold">{item.price}</span>
               </div>
             ))}
          </div>
        </Card>
      </div>
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
               <p className="text-xs text-primary/40 uppercase tracking-widest font-bold">{stat.label}</p>
               <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
         <Card className="lg:col-span-2 space-y-6 bg-primary/5 border-primary/10 p-8">
            <div className="flex items-center justify-between">
               <h3 className="text-xl font-bold font-serif text-white">High Priority Alerts</h3>
               <Badge variant="error" className="animate-pulse">12 URGENT</Badge>
            </div>
            <div className="space-y-3">
               {[
                 { user: 'Sarah Jenkins', type: 'Seller Verification', status: 'pending', id: 'VER-901' },
                 { user: 'Michael Ross', type: 'Dispute Case', status: 'open', id: 'DIS-102' },
               ].map((alert, i) => (
                 <div key={i} className="flex flex-col sm:flex-row items-center justify-between rounded-xl bg-primary/5 p-5 border border-primary/5 gap-4">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                       <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">
                          {alert.user[0]}
                       </div>
                       <div>
                          <p className="font-bold text-white">{alert.user}</p>
                          <p className="text-xs text-primary/40 uppercase tracking-widest">{alert.type} \u2022 ID: {alert.id}</p>
                       </div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                       <Button size="sm" variant="ghost" className="flex-1 sm:flex-none text-primary/60">Reject</Button>
                       <Button size="sm" className="flex-1 sm:flex-none h-10 px-6">Review Case</Button>
                    </div>
                 </div>
               ))}
            </div>
         </Card>

         <Card className="space-y-6 bg-primary/5 border-primary/10 p-8">
            <h3 className="text-xl font-bold font-serif text-white">Platform Integrity</h3>
            <div className="space-y-6">
               <div className="space-y-3">
                  <label className="text-xs uppercase tracking-widest font-bold text-primary/40">Service Fee (Standard)</label>
                  <div className="flex gap-2">
                    <Input type="number" defaultValue={7.5} className="bg-primary/5 border-primary/20" />
                    <Button variant="outline" className="border-primary/20 text-primary">Update</Button>
                  </div>
               </div>
            </div>
            <hr className="border-primary/10" />
            <div className="flex items-center justify-between text-sm">
               <span className="text-primary/60 font-medium uppercase tracking-widest">Yearly Forecast</span>
               <span className="font-black text-primary text-xl">{formatCurrency(1240500)}</span>
            </div>
         </Card>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Backdrop */}
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

      {/* Sidebar */}
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
                <span className="text-2xl font-bold font-serif text-primary tracking-widest">HUB</span>
             </div>
             <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-primary">
                <X className="h-6 w-6" />
             </Button>
          </div>

          <nav className="flex-1 space-y-3">
             {[
               { id: 'buyer', label: 'Buyer Portal', icon: ShoppingBag },
               { id: 'seller', label: 'Seller Suite', icon: TrendingUp },
               { id: 'admin', label: 'Admin Terminal', icon: ShieldAlert },
             ].map((nav) => (
               <button
                 key={nav.id}
                 onClick={() => { setActiveTab(nav.id as any); setIsSidebarOpen(false); }}
                 className={cn(
                   "flex w-full items-center justify-between rounded-xl px-4 py-4 text-sm font-bold uppercase tracking-widest transition-all group",
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
             
             <div className="pt-12">
               <p className="px-4 mb-4 text-[10px] uppercase tracking-[0.3em] font-black text-primary/30">Personal Space</p>
               <button className="flex w-full items-center gap-4 rounded-xl px-4 py-4 text-sm font-bold uppercase tracking-widest text-primary/60 hover:bg-primary/5 hover:text-primary transition-all">
                  <Settings className="h-5 w-5" />
                  Security
               </button>
               <button className="flex w-full items-center gap-4 rounded-xl px-4 py-4 text-sm font-bold uppercase tracking-widest text-primary/60 hover:bg-primary/5 hover:text-primary transition-all">
                  <MessageSquare className="h-5 w-5" />
                  Notifications
               </button>
             </div>
          </nav>
          
          <div className="mt-auto">
             <Button variant="outline" className="w-full border-primary/20 text-primary" onClick={() => {}}>
                Sign Out
             </Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden pb-12">
        <header className="flex h-20 items-center justify-between border-b border-primary/10 bg-background/50 backdrop-blur-md px-6 sm:px-12 sticky top-0 z-30">
           <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSidebarOpen(true)} 
                className="lg:hidden text-primary"
              >
                <Menu className="h-6 w-6" />
              </Button>
              <h2 className="text-xl font-bold font-serif text-white tracking-widest uppercase">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} <span className="text-primary">Terminal</span>
              </h2>
           </div>
           
           <div className="flex items-center gap-6">
              <div className="hidden md:flex relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                 <Input placeholder="Find asset..." className="w-48 h-10 pl-9 bg-primary/5 border-primary/10 text-xs" />
              </div>
              <div className="flex items-center gap-4">
                 <div className="hidden sm:flex flex-col items-end">
                    <span className="text-sm font-bold text-white">Alex Sterling</span>
                    <span className="text-[10px] text-primary/40 font-bold uppercase tracking-widest">Elite Member</span>
                 </div>
                 <div className="h-12 w-12 rounded-xl bg-primary/10 border-2 border-primary shadow-lg overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Felix`} className="bg-primary/10" />
                 </div>
              </div>
           </div>
        </header>

        <div className="p-6 sm:p-12">
          {activeTab === 'buyer' && renderBuyerDash()}
          {activeTab === 'seller' && renderSellerDash()}
          {activeTab === 'admin' && renderAdminDash()}
        </div>
      </main>
    </div>
  );
};