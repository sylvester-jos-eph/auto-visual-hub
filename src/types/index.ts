export type CarCondition = 'New' | 'Used' | 'Imported' | 'Certified Pre-Owned';
export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
export type Transmission = 'Automatic' | 'Manual';

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  condition: CarCondition;
  mileage: number;
  engine: string;
  transmission: Transmission;
  fuelType: FuelType;
  images: string[];
  image?: string;
  gallery?: string[];
  location: string;
  sellerId: string;
  sellerName?: string;
  sellerWhatsapp?: string;
  isAuction: boolean;
  auctionEnds?: string;
  auctionEndTime?: string;
  currentBid?: number;
  reservePrice?: number;
  description: string;
  isBoosted?: boolean;
  isImported?: boolean;
  status?: string;
  eta?: string;
  specs?: {
    engine: string;
    horsepower: string;
    color: string;
    vin?: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'admin';
  avatar?: string;
  isVerified: boolean;
  whatsappNumber?: string;
  isApproved?: boolean;
  subscriptionActive?: boolean;
}

export interface Bid {
  id: string;
  carId: string;
  userId: string;
  userName: string;
  amount: number;
  timestamp: string;
}

export interface AnalyticsData {
  name: string;
  sales: number;
  revenue: number;
  users: number;
}