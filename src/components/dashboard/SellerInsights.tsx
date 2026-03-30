import React from 'react';
import { Card, Badge } from '../ui/Layout';
import { 
  BrainCircuit, Activity, Lightbulb, Target, TrendingUp, 
  ArrowUpRight, Sparkles, MessageSquare, ShieldCheck
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const REVENUE_DATA = [
  { name: 'Mon', views: 400, bids: 24 },
  { name: 'Tue', views: 300, bids: 13 },
  { name: 'Wed', views: 500, bids: 48 },
  { name: 'Thu', views: 278, bids: 39 },
  { name: 'Fri', views: 489, bids: 48 },
  { name: 'Sat', views: 639, bids: 58 },
  { name: 'Sun', views: 800, bids: 92 },
];

export const SellerInsights: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
         <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-background shadow-lg shadow-primary/20">
               <BrainCircuit className="h-7 w-7" />
            </div>
            <div>
               <h2 className="text-2xl font-bold text-white font-serif tracking-tight">Intelligence Hub</h2>
               <p className="text-primary/60 uppercase tracking-widest text-[10px] font-black">AI-Powered Market Dynamics</p>
            </div>
         </div>
         <Badge variant="outline" className="border-primary/20 text-primary py-1.5 px-4 bg-primary/5">
            <Sparkles className="h-3 w-3 mr-2 animate-pulse" /> AI Live Analysis
         </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-8 bg-primary/5 border-primary/10">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="text-lg font-bold text-white">Market Penetration</h3>
                 <p className="text-xs text-primary/40 uppercase tracking-widest">Listing Visibility & Engagement</p>
              </div>
              <div className="text-right">
                 <span className="text-3xl font-black text-primary">+24.5%</span>
                 <p className="text-[10px] text-white/40 uppercase font-black">vs last week</p>
              </div>
           </div>

           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={REVENUE_DATA}>
                   <defs>
                     <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(212, 175, 55, 0.05)" />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#d4af37', opacity: 0.4, fontSize: 10}} />
                   <YAxis axisLine={false} tickLine={false} tick={{fill: '#d4af37', opacity: 0.4, fontSize: 10}} />
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#0a3a25', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '12px' }}
                     itemStyle={{ color: '#d4af37' }}
                   />
                   <Area type="monotone" dataKey="views" stroke="#d4af37" fillOpacity={1} fill="url(#colorViews)" strokeWidth={3} />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </Card>

        <div className="space-y-6">
           <Card className="p-6 bg-[#0a3a25] border-primary/20 space-y-4">
              <div className="flex items-center gap-3">
                 <Target className="h-5 w-5 text-primary" />
                 <h4 className="text-xs font-black text-white uppercase tracking-widest">Target Audience</h4>
              </div>
              <div className="space-y-4">
                 {[ 
                   { label: 'Collectors', value: '45%', icon: ShieldCheck },
                   { label: 'Enthusiasts', value: '30%', icon: Sparkles },
                   { label: 'Dealers', value: '25%', icon: ArrowUpRight }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <item.icon className="h-3 w-3 text-primary/40" />
                         <span className="text-xs text-white/80">{item.label}</span>
                      </div>
                      <span className="text-xs font-bold text-primary">{item.value}</span>
                   </div>
                 ))}
              </div>
           </Card>

           <Card className="p-6 bg-primary border-none text-background space-y-4">
              <div className="flex items-center gap-3">
                 <Lightbulb className="h-5 w-5" />
                 <h4 className="text-xs font-black uppercase tracking-widest">AI Optimization</h4>
              </div>
              <p className="text-sm font-bold leading-relaxed italic">
                "Increase your listing price by 5% - demand for mid-range vintage sports cars is peaking this weekend."
              </p>
           </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {[ 
           { label: 'Avg Viewer Time', value: '4.2m', icon: Activity, trend: '+12%' },
           { label: 'Message Rate', value: '8.4%', icon: MessageSquare, trend: '+5%' },
           { label: 'Price Relevance', value: '9.8/10', icon: Target, trend: 'Optimal' },
           { label: 'Market Reach', value: '12K', icon: TrendingUp, trend: '+18%' }
         ].map((stat, i) => (
           <Card key={i} className="p-6 bg-primary/5 border-primary/10 space-y-2">
              <div className="flex items-center justify-between mb-2">
                 <stat.icon className="h-4 w-4 text-primary/60" />
                 <Badge variant="outline" className="border-primary/10 text-primary text-[8px] px-1 py-0">{stat.trend}</Badge>
              </div>
              <p className="text-xl font-black text-white">{stat.value}</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-primary/40">{stat.label}</p>
           </Card>
         ))}
      </div>
    </div>
  );
};