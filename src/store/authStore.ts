import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id' | 'createdAt'> & { password: string }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Mock authentication for now - will connect to backend later
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      if (email === 'demo@example.com' && password === 'password') {
        const user: User = {
          id: '1',
          fullName: 'Demo User',
          email: 'demo@example.com',
          phone: '9876543210',
          profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
          bio: 'I am passionate about helping others.',
          credentialType: 'aadhar',
          credentialNumber: '123456789012',
          createdAt: new Date().toISOString(),
        };
        set({ user, isAuthenticated: true, isLoading: false });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred', 
        isLoading: false 
      });
    }
  },
  
  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        profilePicture: userData.profilePicture,
        bio: userData.bio,
        credentialType: userData.credentialType,
        credentialNumber: userData.credentialNumber,
        createdAt: new Date().toISOString(),
      };
      
      set({ user: newUser, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred', 
        isLoading: false 
      });
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
  clearError: () => {
    set({ error: null });
  }
}));