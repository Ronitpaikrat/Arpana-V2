import { create } from 'zustand';
import { Cause, Donation } from '../types';

interface CausesState {
  causes: Cause[];
  emergencyCauses: Cause[];
  userDonations: Donation[];
  isLoading: boolean;
  error: string | null;
  fetchCauses: () => Promise<void>;
  fetchEmergencyCauses: () => Promise<void>;
  fetchUserDonations: (userId: string) => Promise<void>;
  donate: (causeId: string, amount: number) => Promise<void>;
}

// Mock data and functions for now
export const useCausesStore = create<CausesState>((set) => ({
  causes: [],
  emergencyCauses: [],
  userDonations: [],
  isLoading: false,
  error: null,
  
  fetchCauses: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock causes data
      const mockCauses: Cause[] = [
        {
          id: '1',
          title: 'Education for Rural Children',
          description: 'Providing quality education to children in remote villages of India.',
          category: 'Education',
          imageUrl: 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg',
          goal: 500000,
          raised: 320000,
          daysLeft: 15,
          isEmergency: false,
        },
        {
          id: '2',
          title: 'Clean Water Initiative',
          description: 'Building water purification systems in areas affected by water pollution.',
          category: 'Health',
          imageUrl: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg',
          goal: 300000,
          raised: 210000,
          daysLeft: 8,
          isEmergency: false,
        },
        {
          id: '3',
          title: 'Animal Shelter Expansion',
          description: 'Expanding our animal shelter to accommodate more rescued animals.',
          category: 'Animals',
          imageUrl: 'https://images.pexels.com/photos/1634840/pexels-photo-1634840.jpeg',
          goal: 250000,
          raised: 175000,
          daysLeft: 20,
          isEmergency: false,
        }
      ];
      
      set({ causes: mockCauses, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred', 
        isLoading: false 
      });
    }
  },
  
  fetchEmergencyCauses: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock emergency causes data
      const mockEmergencyCauses: Cause[] = [
        {
          id: '4',
          title: 'Flood Relief in Assam',
          description: 'Urgent aid needed for families affected by severe flooding in Assam.',
          category: 'Disaster Relief',
          imageUrl: 'https://images.pexels.com/photos/1446076/pexels-photo-1446076.jpeg',
          goal: 1000000,
          raised: 450000,
          daysLeft: 3,
          isEmergency: true,
        },
        {
          id: '5',
          title: 'COVID-19 Relief for Rural Areas',
          description: 'Providing oxygen concentrators and medical supplies to rural healthcare centers.',
          category: 'Health',
          imageUrl: 'https://images.pexels.com/photos/3993212/pexels-photo-3993212.jpeg',
          goal: 800000,
          raised: 610000,
          daysLeft: 2,
          isEmergency: true,
        }
      ];
      
      set({ emergencyCauses: mockEmergencyCauses, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred', 
        isLoading: false 
      });
    }
  },
  
  fetchUserDonations: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user donations data
      const mockDonations: Donation[] = [
        {
          id: 'd1',
          causeId: '1',
          userId,
          amount: 5000,
          createdAt: '2023-04-10T14:30:00Z',
        },
        {
          id: 'd2',
          causeId: '3',
          userId,
          amount: 2500,
          createdAt: '2023-03-25T09:15:00Z',
        }
      ];
      
      set({ userDonations: mockDonations, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred', 
        isLoading: false 
      });
    }
  },
  
  donate: async (causeId, amount) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call and payment integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful donation
      const newDonation: Donation = {
        id: Date.now().toString(),
        causeId,
        userId: 'currentUser', // This would come from the auth store in production
        amount,
        createdAt: new Date().toISOString(),
      };
      
      // Update causes list with new raised amount
      set(state => ({
        causes: state.causes.map(cause => {
          if (cause.id === causeId) {
            return {
              ...cause,
              raised: cause.raised + amount
            };
          }
          return cause;
        }),
        emergencyCauses: state.emergencyCauses.map(cause => {
          if (cause.id === causeId) {
            return {
              ...cause,
              raised: cause.raised + amount
            };
          }
          return cause;
        }),
        userDonations: [...state.userDonations, newDonation],
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to process donation', 
        isLoading: false 
      });
    }
  }
}));