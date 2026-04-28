export interface Laptop {
  id: string;
  name: string;
  brand: string;
  cpu: string;
  ram: string;
  storage: string;
  gpu: string;
  category: 'Office' | 'Programming' | 'Gaming' | 'Design';
  dailyPrice: number;
  monthlyPrice: number;
  stock: number;
  images: string[];
  description: string;
  specs: {
    screen: string;
    battery: string;
    weight: string;
    ports: string[];
  };
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  avatar?: string;
  verificationStatus: 'unverified' | 'pending' | 'approved' | 'rejected';
  verificationData?: VerificationData;
  createdAt: string;
}

export interface VerificationData {
  idImage?: string;
  selfieImage?: string;
  phone?: string;
  address?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  submittedAt?: string;
}

export interface CartItem {
  laptop: Laptop;
  startDate: Date;
  endDate: Date;
  duration: number;
  totalPrice: number;
  deliveryMethod: 'delivery' | 'pickup';
}

export interface Rental {
  id: string;
  userId: string;
  laptop: Laptop;
  startDate: string;
  endDate: string;
  duration: number;
  totalPrice: number;
  deposit: number;
  status: 'active' | 'returned' | 'late' | 'cancelled';
  deliveryMethod: 'delivery' | 'pickup';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
  returnedAt?: string;
}

export interface Payment {
  id: string;
  rentalId: string;
  userId: string;
  amount: number;
  type: 'rental' | 'deposit' | 'extension' | 'refund';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'support';
  message: string;
  timestamp: string;
}

export interface FilterState {
  brand: string[];
  ram: string[];
  storage: string[];
  category: string[];
  minPrice: number;
  maxPrice: number;
  search: string;
}
