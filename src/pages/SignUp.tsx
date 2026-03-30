import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Car, ShieldCheck, Check, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, Input } from '../components/ui/Layout';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth
    setTimeout(() => {
      setLoading(false);
      toast.success('Account created successfully!');
      navigate('/login');
    }, 1500);
  };

  const benefits = [
    "Access to exclusive auctions",
    "Direct messaging with sellers",
    "Save favorite listings",
    "Personalized car alerts"
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 lg:flex-row lg:px-0">
      <div className="hidden h-screen w-1/2 flex-col justify-center bg-[#0a3a25] p-12 lg:flex lg:border-r lg:border-primary/10">
        <div className="max-w-md space-y-12 mx-auto">
          <Link to="/" className="flex items-center gap-2 text-3xl font-bold tracking-tight text-primary font-serif">
            <Car className="h-10 w-10" />
            AUTOHUB
          </Link>
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold tracking-tight text-white leading-tight font-serif">
              Experience the <span className="text-primary italic">Elite</span> Standard.
            </h1>
            <ul className="space-y-4">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-lg text-primary/80">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-4 w-4" />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 backdrop-blur-sm">
            <p className="text-primary italic font-serif text-lg leading-relaxed">
              "The best platform for high-end vehicle trade. Security and quality are unmatched."
            </p>
            <p className="mt-4 font-bold text-white uppercase tracking-widest">— James R., Collector</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md space-y-8 lg:w-1/2 lg:p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-sm"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-primary font-serif">Join AutoHub</h2>
            <p className="mt-2 text-primary/60">Start your luxury automotive journey today</p>
          </div>

          <form onSubmit={handleSignUp} className="mt-10 space-y-5">
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-primary/80">First Name</label>
                  <Input 
                    placeholder="John" 
                    className="h-12 bg-white/5 border-primary/20 text-white placeholder:text-primary/20 focus:ring-primary"
                    required 
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-primary/80">Last Name</label>
                  <Input 
                    placeholder="Doe" 
                    className="h-12 bg-white/5 border-primary/20 text-white placeholder:text-primary/20 focus:ring-primary"
                    required 
                  />
               </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-primary/80">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/40" />
                <Input 
                  type="email" 
                  placeholder="john@doe.com" 
                  className="pl-11 h-12 bg-white/5 border-primary/20 text-white placeholder:text-primary/20 focus:ring-primary"
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-primary/80">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/40" />
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="pl-11 pr-10 h-12 bg-white/5 border-primary/20 text-white placeholder:text-primary/20 focus:ring-primary"
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2">
               <input type="checkbox" className="mt-1 rounded border-primary/20 bg-transparent text-primary focus:ring-primary" required />
               <span className="text-xs text-primary/60">
                 I agree to the <Link to="#" className="text-primary hover:underline">Terms of Service</Link> and <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>.
               </span>
            </div>

            <Button type="submit" size="lg" className="w-full mt-4 shadow-xl shadow-primary/20" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Create My Account"}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-primary/60">
            Already have an account? 
            <Link to="/login" className="ml-1 font-bold text-primary hover:text-white">
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};