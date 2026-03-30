import { Car } from '../types';

export const APP_NAME = "SiLLA AUTOHUB";
export const DEFAULT_WHATSAPP = "0741958421"; // Explicitly defined default

export const MOCK_CARS: Car[] = [
  {
    id: '1',
    make: 'Tesla',
    model: 'Model S Plaid',
    year: 2024,
    price: 89900,
    images: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/car-interior-f7975db5-1774844772975.webp'],
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/car-interior-f7975db5-1774844772975.webp',
    gallery: [
      'https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/car-interior-f7975db5-1774844772975.webp',
      'https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/hero-car-1eb4515b-1774844776085.webp'
    ],
    mileage: 1200,
    fuelType: 'Electric',
    transmission: 'Automatic',
    condition: 'New',
    engine: 'Tri-Motor',
    location: 'California, USA',
    sellerId: 's1',
    sellerName: 'Elite Motors',
    sellerWhatsapp: DEFAULT_WHATSAPP,
    isAuction: false,
    status: 'available',
    specs: {
      engine: 'Tri-Motor',
      horsepower: '1,020 hp',
      color: 'Midnight Silver',
      vin: '5YJSA1E21LFXXXXXX'
    },
    description: 'The Tesla Model S Plaid is the fastest accelerating production car in the world.'
  },
  {
    id: '2',
    make: 'Porsche',
    model: '911 Carrera',
    year: 2023,
    price: 114000,
    images: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/sports-car-sunset-cd0578ee-1774844773505.webp'],
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/sports-car-sunset-cd0578ee-1774844773505.webp',
    gallery: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/sports-car-sunset-cd0578ee-1774844773505.webp'],
    mileage: 5600,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'Certified Pre-Owned',
    engine: '3.0L Flat-6',
    location: 'Miami, FL',
    sellerId: 's2',
    sellerName: 'Sunset Exotic Cars',
    sellerWhatsapp: DEFAULT_WHATSAPP,
    isAuction: true,
    auctionEndTime: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), // 48 hours from now
    currentBid: 95000,
    reservePrice: 105000,
    status: 'available',
    specs: {
      engine: '3.0L Flat-6',
      horsepower: '379 hp',
      color: 'Guards Red'
    },
    description: 'A masterpiece of engineering and design, the Porsche 911 is the quintessential sports car.'
  },
  {
    id: '3',
    make: 'Lamborghini',
    model: 'Aventador SVJ',
    year: 2022,
    price: 450000,
    images: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/featured-car-2-411a0833-1774845104618.webp'],
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/featured-car-2-411a0833-1774845104618.webp',
    gallery: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/featured-car-2-411a0833-1774845104618.webp'],
    mileage: 800,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'New',
    engine: '6.5L V12',
    location: 'Dubai, UAE',
    sellerId: 's3',
    sellerName: 'V12 Showroom',
    sellerWhatsapp: DEFAULT_WHATSAPP,
    isAuction: true,
    auctionEndTime: new Date(Date.now() + 1000 * 60 * 15).toISOString(), // 15 minutes from now
    currentBid: 420000,
    status: 'available',
    specs: {
      engine: '6.5L V12',
      horsepower: '770 hp',
      color: 'Giallo Orion'
    },
    description: 'The pinnacle of performance. SVJ stands for Superveloce Jota, signifying its track-focused nature.'
  },
  {
    id: '4',
    make: 'Ferrari',
    model: 'F8 Tributo',
    year: 2021,
    price: 320000,
    images: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/hero-car-1-8c7f818a-1774845104161.webp'],
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/hero-car-1-8c7f818a-1774845104161.webp',
    gallery: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/hero-car-1-8c7f818a-1774845104161.webp'],
    mileage: 2500,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'Used',
    engine: '3.9L V8 Twin-Turbo',
    location: 'London, UK',
    sellerId: 's4',
    sellerName: 'Classic Collection',
    sellerWhatsapp: DEFAULT_WHATSAPP,
    isAuction: false,
    status: 'available',
    specs: {
      engine: '3.9L V8 Twin-Turbo',
      horsepower: '710 hp',
      color: 'Rosso Corsa'
    },
    description: 'The F8 Tributo is a celebration of excellence, the ultimate expression of the Prancing Horse’s classic two-seater berlinetta.'
  }
];