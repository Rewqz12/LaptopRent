import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Laptop, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (laptop: Laptop, startDate: Date, endDate: Date, deliveryMethod: 'delivery' | 'pickup') => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  updateItem: (index: number, updates: Partial<CartItem>) => void;
  getTotalPrice: () => number;
  getDepositTotal: () => number;
}

const calculateDuration = (startDate: Date, endDate: Date): number => {
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays);
};

const calculatePrice = (laptop: Laptop, duration: number): number => {
  if (duration >= 30) {
    const months = Math.floor(duration / 30);
    const remainingDays = duration % 30;
    return months * laptop.monthlyPrice + remainingDays * laptop.dailyPrice;
  }
  return duration * laptop.dailyPrice;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (laptop: Laptop, startDate: Date, endDate: Date, deliveryMethod: 'delivery' | 'pickup') => {
        const duration = calculateDuration(startDate, endDate);
        const totalPrice = calculatePrice(laptop, duration);
        
        const newItem: CartItem = {
          laptop,
          startDate,
          endDate,
          duration,
          totalPrice,
          deliveryMethod,
        };

        set((state) => ({
          items: [...state.items, newItem],
        }));
      },

      removeItem: (index: number) => {
        set((state) => ({
          items: state.items.filter((_, i) => i !== index),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      updateItem: (index: number, updates: Partial<CartItem>) => {
        set((state) => {
          const newItems = [...state.items];
          const item = newItems[index];
          
          if (item) {
            newItems[index] = { ...item, ...updates };
            
            // Recalculate price if dates changed
            if (updates.startDate || updates.endDate) {
              const startDate = updates.startDate || item.startDate;
              const endDate = updates.endDate || item.endDate;
              const duration = calculateDuration(startDate, endDate);
              newItems[index].duration = duration;
              newItems[index].totalPrice = calculatePrice(item.laptop, duration);
            }
          }
          
          return { items: newItems };
        });
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.totalPrice, 0);
      },

      getDepositTotal: () => {
        return get().items.reduce((total, item) => total + item.laptop.monthlyPrice * 0.5, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
