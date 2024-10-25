export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  image: string;
  description: string;
  availability: string;
}

export interface BookingSlot {
  id: string;
  time: string;
  available: boolean;
}