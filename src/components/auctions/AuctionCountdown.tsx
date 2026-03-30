import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AuctionCountdownProps {
  endTime: string;
  onEnd?: () => void;
  className?: string;
  compact?: boolean;
}

export const AuctionCountdown: React.FC<AuctionCountdownProps> = ({ 
  endTime, 
  onEnd, 
  className,
  compact = false 
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
    isValid: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
    isValid: true
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!endTime) return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, isValid: false };
      
      const end = new Date(endTime);
      if (isNaN(end.getTime())) return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, isValid: false };

      const difference = +end - +new Date();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, isValid: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
        isValid: true
      };
    };

    const timer = setInterval(() => {
      const calculated = calculateTimeLeft();
      setTimeLeft(calculated);
      if (calculated.isExpired && calculated.isValid && onEnd) {
        onEnd();
        clearInterval(timer);
      }
    }, 1000);

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [endTime, onEnd]);

  if (!timeLeft.isValid) return null;

  if (timeLeft.isExpired) {
    return (
      <div className={cn("inline-flex items-center text-red-500 font-bold", className)}>
        <Timer className="mr-1.5 h-4 w-4" />
        <span>Auction Ended</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={cn("inline-flex items-center text-primary font-mono font-bold", className)}>
        <Timer className="mr-1.5 h-3.5 w-3.5" />
        <span className="tabular-nums">
          {timeLeft.days > 0 && `${timeLeft.days}d `}
          {String(timeLeft.hours).padStart(2, '0')}:
          {String(timeLeft.minutes).padStart(2, '0')}:
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="flex flex-col items-center">
        <div className="bg-primary/10 rounded-lg p-2 min-w-[3.5rem] text-center border border-primary/20 backdrop-blur-sm">
          <span className="text-2xl font-black text-white tabular-nums">{String(timeLeft.days).padStart(2, '0')}</span>
        </div>
        <span className="text-[10px] uppercase font-bold text-primary/40 mt-1 tracking-widest">Days</span>
      </div>
      <div className="text-primary/40 font-bold text-xl mb-6 self-center">:</div>
      <div className="flex flex-col items-center">
        <div className="bg-primary/10 rounded-lg p-2 min-w-[3.5rem] text-center border border-primary/20 backdrop-blur-sm">
          <span className="text-2xl font-black text-white tabular-nums">{String(timeLeft.hours).padStart(2, '0')}</span>
        </div>
        <span className="text-[10px] uppercase font-bold text-primary/40 mt-1 tracking-widest">Hrs</span>
      </div>
      <div className="text-primary/40 font-bold text-xl mb-6 self-center">:</div>
      <div className="flex flex-col items-center">
        <div className="bg-primary/10 rounded-lg p-2 min-w-[3.5rem] text-center border border-primary/20 backdrop-blur-sm">
          <span className="text-2xl font-black text-white tabular-nums">{String(timeLeft.minutes).padStart(2, '0')}</span>
        </div>
        <span className="text-[10px] uppercase font-bold text-primary/40 mt-1 tracking-widest">Min</span>
      </div>
      <div className="text-primary/40 font-bold text-xl mb-6 self-center">:</div>
      <div className="flex flex-col items-center">
        <div className="bg-primary/10 rounded-lg p-2 min-w-[3.5rem] text-center border border-primary/20 backdrop-blur-sm">
          <span className="text-2xl font-black text-white tabular-nums">{String(timeLeft.seconds).padStart(2, '0')}</span>
        </div>
        <span className="text-[10px] uppercase font-bold text-primary/40 mt-1 tracking-widest">Sec</span>
      </div>
    </div>
  );
};