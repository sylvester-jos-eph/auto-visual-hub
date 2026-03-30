import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Car, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, Input } from '@/components/ui/Layout';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { APP_NAME } from '@/lib/constants';
import { useAuth } from '@/contexts/AuthContext';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Role detection logic
      let role: 'buyer' | 'seller' | 'admin' = 'buyer';
      if (email.toLowerCase().includes('admin')) role = 'admin';
      else if (email.toLowerCase().includes('seller')) role = 'seller';

      const userName = email.split('@')[0];
      
      // Wait for login to complete
      await login(email, role, userName);
      
      toast.success(`Access Granted`, {
        description: `Welcome back to the Hub Terminal, ${userName}.`,
        duration: 3000,
      });
      
      // Use a small timeout to ensure context has updated before navigation triggers re-renders
      setTimeout(() => {
        navigate('/marketplace', { replace: true });
      }, 200);
    } catch (error) {
      toast.error('Authentication Failed', {
        description: 'Please check your credentials and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 lg:flex-row lg:gap-0 lg:px-0">
      <div className="hidden h-screen w-1/2 flex-col justify-center bg-[#0a3a25] p-12 lg:flex lg:border-r lg:border-primary/10">
        <div className="max-w-md space-y-8 mx-auto">
          <Link to="/" className="flex items-center gap-2 text-3xl font-bold tracking-tight text-primary font-serif">
            <Car className="h-10 w-10" />
            {APP_NAME}
          </Link>
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold tracking-tight text-white leading-tight font-serif">
              Unlock the <span className="text-primary italic">Ultimate</span> Driving Experience.
            </h1>
            <p className="text-lg text-primary/70 leading-relaxed">
              The world's most prestigious vehicle marketplace. Sign in to continue your journey with us.
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-3xl border border-primary/20 shadow-2xl">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/auth-background-car-0f237ab0-1774846289636.webp"
              className="h-full w-full object-cover"
              alt="Luxury background"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a3a25]/80 to-transparent" />
          </div>
        </div>
      </div>

      <div className="w-full max-w-md space-y-8 lg:w-1/2 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-sm"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-primary font-serif">Sign In</h2>
            <p className="mt-2 text-primary/60">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleLogin} className="mt-10 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/40" />
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  className="pl-11 h-12 bg-white/5 border-primary/20 text-white placeholder:text-primary/20 focus:ring-primary"
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80">Password</label>
                <Link to="#" className="text-[10px] text-primary hover:text-white font-black uppercase tracking-widest">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/40" />
                <Input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" 
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

            <Button type="submit" size="lg" className="w-full shadow-xl shadow-primary/20" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Continue to Marketplace"}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-primary/60 font-medium">
            Don't have an account? 
            <Link to="/signup" className="ml-1 font-black text-primary hover:text-white uppercase tracking-widest text-[10px]">
              Join the Hub
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};