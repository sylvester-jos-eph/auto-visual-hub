import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Car, Check, Loader2, Phone, Briefcase, ShoppingCart, CreditCard, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, Input, Badge } from '@/components/ui/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { APP_NAME } from '@/lib/constants';
import { useAuth } from '@/contexts/AuthContext';

type Step = 'info' | 'payment' | 'success';
type Role = 'buyer' | 'seller';

export const SignUp = () => {
  const [step, setStep] = useState<Step>('info');
  const [role, setRole] = useState<Role>('buyer');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    whatsapp: '',
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUpInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate initial account creation
    setTimeout(() => {
      setLoading(false);
      if (role === 'seller') {
        setStep('payment');
      } else {
        login(formData.email, 'buyer', `${formData.firstName} ${formData.lastName}`);
        toast.success(`Welcome to ${APP_NAME}!`, { description: 'Account created successfully.' });
        navigate('/marketplace');
      }
    }, 1200);
  };

  const handlePayment = () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      toast.success('Payment verified successfully!');
    }, 2000);
  };

  const handleProceedToDashboard = () => {
    login(formData.email, 'seller', `${formData.firstName} ${formData.lastName}`);
    navigate('/dashboard');
  };

  const benefits = {
    buyer: [
      "Access to exclusive auctions",
      "Direct messaging with sellers",
      "Save favorite listings",
      "Personalized car alerts"
    ],
    seller: [
      "List unlimited vehicles",
      "Featured showroom presence",
      "Analytics dashboard access",
      "Verified Seller badge",
      "Automatic escrow protection"
    ]
  };

  const renderInfoStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="mx-auto w-full max-w-sm"
    >
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-primary font-serif">Join {APP_NAME}</h2>
        <p className="mt-2 text-primary/60">Start your luxury automotive journey today</p>
      </div>

      <div className="mt-8 flex rounded-xl bg-primary/5 p-1 border border-primary/10">
        <button
          onClick={() => setRole('buyer')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${role === 'buyer' ? 'bg-primary text-background shadow-lg' : 'text-primary/40 hover:text-primary'}`}
        >
          <ShoppingCart className="h-4 w-4" /> Buyer
        </button>
        <button
          onClick={() => setRole('seller')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${role === 'seller' ? 'bg-primary text-background shadow-lg' : 'text-primary/40 hover:text-primary'}`}
        >
          <Briefcase className="h-4 w-4" /> Seller
        </button>
      </div>

      <form onSubmit={handleSignUpInfo} className="mt-8 space-y-4">
        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-2">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-primary/80">First Name</label>
              <Input 
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="John" 
                className="h-12 bg-white/5 border-primary/20 text-white placeholder:text-primary/20 focus:ring-primary"
                required 
              />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-primary/80">Last Name</label>
              <Input 
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Doe" 
                className="h-12 bg-white/5 border-primary/20 text-white placeholder:text-primary/20 focus:ring-primary"
                required 
              />
           </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-semibold uppercase tracking-widest text-primary/80">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/40" />
            <Input 
              name="email"
              type="email" 
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@doe.com" 
              className="pl-11 h-12 bg-white/5 border-primary/20 text-white placeholder:text-primary/20 focus:ring-primary"
              required 
            />
          </div>
        </div>

        {role === 'seller' && (
          <div className="space-y-2">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-primary/80">WhatsApp Contact</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/40" />
              <Input 
                name="whatsapp"
                type="tel" 
                value={formData.whatsapp}
                onChange={handleInputChange}
                placeholder="+234..." 
                className="pl-11 h-12 bg-white/5 border-primary/20 text-white placeholder:text-primary/20 focus:ring-primary"
                required 
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-[10px] font-semibold uppercase tracking-widest text-primary/80">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/40" />
            <Input 
              name="password"
              type={showPassword ? "text" : "password"} 
              value={formData.password}
              onChange={handleInputChange}
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
          {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : role === 'seller' ? "Continue to Verification" : "Create My Account"}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-primary/60">
        Already have an account? 
        <Link to="/login" className="ml-1 font-bold text-primary hover:text-white">
          Sign In
        </Link>
      </div>
    </motion.div>
  );

  const renderPaymentStep = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto w-full max-w-sm space-y-8"
    >
      <div className="text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
           <CreditCard className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-bold text-primary font-serif">Seller Verification</h2>
        <p className="mt-2 text-primary/60 text-sm">Automated approval after standard platform fee</p>
      </div>

      <Card className="p-8 bg-primary text-background border-none">
         <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest opacity-60">Seller License Fee</span>
            <Badge className="bg-background/20 text-background border-none">Annual</Badge>
         </div>
         <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black">$199</span>
            <span className="text-sm font-bold opacity-60 uppercase tracking-widest">/ year</span>
         </div>
         <ul className="mt-8 space-y-3">
            {benefits.seller.slice(0, 3).map((b, i) => (
              <li key={i} className="flex items-center gap-3 text-xs font-bold">
                <Check className="h-4 w-4" /> {b}
              </li>
            ))}
         </ul>
      </Card>

      <div className="space-y-4">
         <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-primary" />
               </div>
               <div>
                  <p className="text-sm font-bold text-white">Instant Activation</p>
                  <p className="text-[10px] text-primary/40 uppercase tracking-widest font-bold">Pay now, start listing today</p>
               </div>
            </div>
         </div>
         
         <Button className="w-full h-14" size="lg" onClick={handlePayment} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Complete Secure Payment"}
         </Button>
         
         <Button variant="ghost" className="w-full" onClick={() => setStep('info')}>Go Back</Button>
      </div>
    </motion.div>
  );

  const renderSuccessStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-md text-center space-y-8"
    >
      <div className="relative mx-auto h-64 w-full overflow-hidden rounded-3xl border border-primary/20 shadow-2xl">
         <img 
           src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/payment-success-98f2718f-1774850794392.webp" 
           className="h-full w-full object-cover"
           alt="Success"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center shadow-2xl">
               <Check className="h-10 w-10 text-background stroke-[3px]" />
            </div>
         </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-primary font-serif">Approval Granted!</h2>
        <p className="text-primary/70 text-lg">
          Your seller account is now active. Welcome to the elite {APP_NAME} network.
        </p>
      </div>

      <Button className="w-full h-14" size="lg" onClick={handleProceedToDashboard}>
         Proceed to Dashboard
      </Button>
    </motion.div>
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 lg:flex-row lg:px-0">
      <div className="hidden h-screen w-1/2 flex-col justify-center bg-[#0a3a25] p-12 lg:flex lg:border-r lg:border-primary/10">
        <div className="max-w-md space-y-12 mx-auto">
          <Link to="/" className="flex items-center gap-2 text-3xl font-bold tracking-tight text-primary font-serif">
            <Car className="h-10 w-10" />
            {APP_NAME}
          </Link>
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold tracking-tight text-white leading-tight font-serif">
              Experience the <span className="text-primary italic">Elite</span> Standard.
            </h1>
            <ul className="space-y-4">
              {benefits[role].map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-lg text-primary/80">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-4 w-4" />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 backdrop-blur-sm">
            <p className="text-primary italic font-serif text-lg leading-relaxed">
              "The best platform for high-end vehicle trade. Security and quality are unmatched."
            </p>
            <p className="mt-4 font-bold text-white uppercase tracking-widest">— James R., Collector</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md space-y-8 lg:w-1/2 lg:p-12">
        <AnimatePresence mode="wait">
          {step === 'info' && renderInfoStep()}
          {step === 'payment' && renderPaymentStep()}
          {step === 'success' && renderSuccessStep()}
        </AnimatePresence>
      </div>
    </div>
  );
};