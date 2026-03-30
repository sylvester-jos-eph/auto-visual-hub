import React from 'react';
import { cn } from '../../lib/utils';

export const Card = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className={cn(
      'rounded-2xl border border-primary/10 bg-[#0a3a25] p-4 shadow-xl transition-all duration-300', 
      onClick && 'cursor-pointer hover:border-primary/40 hover:shadow-primary/5',
      className
    )}
  >
    {children}
  </div>
);

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex h-12 w-full rounded-xl border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all',
        className
      )}
      {...props}
    />
  )
);

export const Badge = ({ children, className, variant = 'default' }: { children: React.ReactNode; className?: string; variant?: 'default' | 'success' | 'warning' | 'error' | 'outline' }) => {
  const variants = {
    default: 'bg-primary text-background font-bold shadow-lg shadow-primary/20',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold',
    error: 'bg-red-500/10 text-red-400 border border-red-500/20 font-bold',
    outline: 'border border-primary text-primary font-bold',
  };
  return (
    <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-widest', variants[variant], className)}>
      {children}
    </span>
  );
};