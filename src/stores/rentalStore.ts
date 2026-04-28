import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Rental, Payment, CartItem } from '@/types';

interface RentalState {
  rentals: Rental[];
  payments: Payment[];
  createRental: (userId: string, items: CartItem[]) => Rental[];
  extendRental: (rentalId: string, additionalDays: number) => void;
  returnRental: (rentalId: string) => void;
  getUserRentals: (userId: string) => Rental[];
  getUserPayments: (userId: string) => Payment[];
  getActiveRentals: (userId: string) => Rental[];
}

export const useRentalStore = create<RentalState>()(
  persist(
    (set, get) => ({
      rentals: [],
      payments: [],

      createRental: (userId: string, items: CartItem[]) => {
        const newRentals: Rental[] = [];
        const newPayments: Payment[] = [];

        items.forEach((item) => {
          const rental: Rental = {
            id: `rental_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            userId,
            laptop: item.laptop,
            startDate: item.startDate.toISOString(),
            endDate: item.endDate.toISOString(),
            duration: item.duration,
            totalPrice: item.totalPrice,
            deposit: item.laptop.monthlyPrice * 0.5,
            status: 'active',
            deliveryMethod: item.deliveryMethod,
            paymentStatus: 'paid',
            createdAt: new Date().toISOString(),
          };

          const rentalPayment: Payment = {
            id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            rentalId: rental.id,
            userId,
            amount: item.totalPrice,
            type: 'rental',
            status: 'completed',
            method: 'Credit Card',
            createdAt: new Date().toISOString(),
          };

          const depositPayment: Payment = {
            id: `pay_${Date.now() + 1}_${Math.random().toString(36).substr(2, 9)}`,
            rentalId: rental.id,
            userId,
            amount: rental.deposit,
            type: 'deposit',
            status: 'completed',
            method: 'Credit Card',
            createdAt: new Date().toISOString(),
          };

          newRentals.push(rental);
          newPayments.push(rentalPayment, depositPayment);
        });

        set((state) => ({
          rentals: [...state.rentals, ...newRentals],
          payments: [...state.payments, ...newPayments],
        }));

        return newRentals;
      },

      extendRental: (rentalId: string, additionalDays: number) => {
        set((state) => {
          const rentals = [...state.rentals];
          const rental = rentals.find((r) => r.id === rentalId);
          
          if (rental) {
            const endDate = new Date(rental.endDate);
            endDate.setDate(endDate.getDate() + additionalDays);
            rental.endDate = endDate.toISOString();
            rental.duration += additionalDays;
            
            const extensionPrice = additionalDays * rental.laptop.dailyPrice;
            rental.totalPrice += extensionPrice;

            // Create extension payment
            const extensionPayment: Payment = {
              id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              rentalId: rental.id,
              userId: rental.userId,
              amount: extensionPrice,
              type: 'extension',
              status: 'completed',
              method: 'Credit Card',
              createdAt: new Date().toISOString(),
            };

            return {
              rentals,
              payments: [...state.payments, extensionPayment],
            };
          }

          return state;
        });
      },

      returnRental: (rentalId: string) => {
        set((state) => {
          const rentals = [...state.rentals];
          const rental = rentals.find((r) => r.id === rentalId);
          
          if (rental) {
            rental.status = 'returned';
            rental.returnedAt = new Date().toISOString();

            // Create deposit refund
            const refundPayment: Payment = {
              id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              rentalId: rental.id,
              userId: rental.userId,
              amount: rental.deposit,
              type: 'refund',
              status: 'completed',
              method: 'Bank Transfer',
              createdAt: new Date().toISOString(),
            };

            return {
              rentals,
              payments: [...state.payments, refundPayment],
            };
          }

          return state;
        });
      },

      getUserRentals: (userId: string) => {
        return get().rentals.filter((r) => r.userId === userId);
      },

      getUserPayments: (userId: string) => {
        return get().payments.filter((p) => p.userId === userId);
      },

      getActiveRentals: (userId: string) => {
        return get().rentals.filter((r) => r.userId === userId && r.status === 'active');
      },
    }),
    {
      name: 'rental-storage',
    }
  )
);
