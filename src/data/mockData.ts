import { Car, User } from '../types';

export const MOCK_CARS: Car[] = [
  {
    id: '1',
    make: 'BMW',
    model: 'X5 M-Sport',
    year: 2023,
    price: 85000,
    condition: 'New',
    mileage: 0,
    engine: '3.0L Turbo',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    images: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/hero-car-1-8c7f818a-1774845104161.webp'],
    location: 'Nairobi, KE',
    sellerId: 's1',
    isAuction: false,
    description: 'The BMW X5 delivers an outstanding driving experience with its powerful engine and luxury interior.',
    isBoosted: true
  },
  {
    id: '2',
    make: 'Tesla',
    model: 'Model S Plaid',
    year: 2022,
    price: 95000,
    condition: 'Used',
    mileage: 12000,
    engine: 'Electric Tri-Motor',
    transmission: 'Automatic',
    fuelType: 'Electric',
    images: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/hero-car-2-30828ba2-1774845104705.webp'],
    location: 'Mombasa, KE',
    sellerId: 's2',
    isAuction: true,
    auctionEnds: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
    currentBid: 78000,
    description: 'Fastest accelerating production car. Mint condition, autopilot enabled.'
  },
  {
    id: '3',
    make: 'Toyota',
    model: 'Land Cruiser V8',
    year: 2021,
    price: 110000,
    condition: 'Imported',
    mileage: 45000,
    engine: '4.5L V8',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    images: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/hero-car-3-8e8b42e8-1774845104399.webp'],
    location: 'Kisumu, KE',
    sellerId: 's1',
    isAuction: false,
    description: 'Robust and reliable off-roader. Ready for any terrain.'
  },
  {
    id: '4',
    make: 'Porsche',
    model: '911 Carrera',
    year: 1989,
    price: 150000,
    condition: 'Used',
    mileage: 89000,
    engine: '3.2L Flat-6',
    transmission: 'Manual',
    fuelType: 'Petrol',
    images: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/featured-car-1-2bf9b691-1774845104860.webp'],
    location: 'Nairobi, KE',
    sellerId: 's3',
    isAuction: true,
    auctionEnds: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    currentBid: 125000,
    description: 'A timeless classic. Pristine condition with original parts.'
  }
];

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Rivera',
  email: 'alex@example.com',
  role: 'buyer',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
  isVerified: true
};