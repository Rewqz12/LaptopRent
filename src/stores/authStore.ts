import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  updateVerification: (data: Partial<User['verificationData']>) => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const mockUsers: Record<string, { password: string; user: User }> = {
  'demo@example.com': {
    password: 'password123',
    user: {
      id: '1',
      email: 'demo@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      verificationStatus: 'approved',
      createdAt: '2024-01-15T10:00:00Z',
    },
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        const mockUser = mockUsers[email];
        if (mockUser && mockUser.password === password) {
          set({ user: mockUser.user, isAuthenticated: true });
          return true;
        }
        
        // Check localStorage for registered users
        const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        const storedUser = storedUsers[email];
        if (storedUser && storedUser.password === password) {
          set({ user: storedUser.user, isAuthenticated: true });
          return true;
        }
        
        return false;
      },

      register: async (data: RegisterData) => {
        const newUser: User = {
          id: Date.now().toString(),
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          verificationStatus: 'unverified',
          createdAt: new Date().toISOString(),
        };

        const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        storedUsers[data.email] = { password: data.password, user: newUser };
        localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));

        set({ user: newUser, isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData };
          set({ user: updatedUser });
          
          // Update in stored users
          const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
          if (storedUsers[currentUser.email]) {
            storedUsers[currentUser.email].user = updatedUser;
            localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
          }
        }
      },

      updateVerification: (data: Partial<User['verificationData']>) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            verificationStatus: 'pending' as const,
            verificationData: { ...currentUser.verificationData, ...data },
          };
          set({ user: updatedUser });
          
          // Update in stored users
          const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
          if (storedUsers[currentUser.email]) {
            storedUsers[currentUser.email].user = updatedUser;
            localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
          }
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
