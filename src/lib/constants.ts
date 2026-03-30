import { Car } from '../types';

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
    make: 'BMW',
    model: 'X5 xDrive40i',
    year: 2022,
    price: 62500,
    images: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/hero-car-1eb4515b-1774844776085.webp'],
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/hero-car-1eb4515b-1774844776085.webp',
    gallery: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/hero-car-1eb4515b-1774844776085.webp'],
    mileage: 24000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'Used',
    engine: '3.0L I6',
    location: 'Texas, USA',
    sellerId: 's3',
    sellerName: 'John Doe',
    isAuction: false,
    status: 'available',
    specs: {
      engine: '3.0L I6',
      horsepower: '335 hp',
      color: 'Alpine White'
    },
    description: 'The BMW X5 is a versatile and luxury SUV that offers a great balance of comfort and performance.'
  },
  {
    id: '4',
    make: 'Toyota',
    model: 'Land Cruiser 300',
    year: 2024,
    price: 95000,
    images: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/showroom-cars-f269de2c-1774844778686.webp'],
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/showroom-cars-f269de2c-1774844778686.webp',
    gallery: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/deb913b9-2ff6-42c1-8b8e-1fa1eb9cef03/showroom-cars-f269de2c-1774844778686.webp'],
    mileage: 0,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    condition: 'New',
    engine: '3.3L V6 Turbo',
    location: 'Yokohama, Japan',
    sellerId: 's4',
    sellerName: 'Global Exports',
    isAuction: false,
    isImported: true,
    status: 'shipped',
    eta: '2024-06-15',
    specs: {
      engine: '3.3L V6 Turbo',
      horsepower: '304 hp',
      color: 'Pearl White'
    },
    description: 'The ultimate off-roader, now more powerful and refined than ever before.'
  }
];