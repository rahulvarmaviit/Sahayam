import axios from 'axios';
import { Cause, Donation, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data for development with Indian-themed images
const mockCauses: Cause[] = [
  {
    _id: '1',
    title: 'Shanti Orphanage',
    description: 'Providing shelter and education to 45 children in rural Karnataka. Help us build a new dormitory.',
    category: 'Orphanage',
    targetAmount: 500000,
    raisedAmount: 245000,
    donorCount: 127,
    imageUrl: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/800x600/FF8C42/FFFCF9?text=Shanti+Orphanage',
    isVerified: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  },
  {
    _id: '2',
    title: 'Blind School Project',
    description: 'Supporting visually impaired students in Chennai with educational materials and vocational training.',
    category: 'Charity',
    targetAmount: 300000,
    raisedAmount: 180000,
    donorCount: 89,
    imageUrl: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/800x600/8B5CF6/FFFCF9?text=Blind+School',
    isVerified: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  },
  {
    _id: '3',
    title: 'Street Children Education',
    description: 'Providing basic education and meals to street children in Delhi. Help us reach more children.',
    category: 'Education',
    targetAmount: 450000,
    raisedAmount: 320000,
    donorCount: 204,
    imageUrl: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/800x600/10B981/FFFCF9?text=Education',
    isVerified: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  }
];

const mockEmergencyCauses: Cause[] = [
  {
    _id: '4',
    title: 'Immediate Surgery Needed',
    description: '12-year-old Priya needs urgent heart surgery. Her family cannot afford the ₹4,50,000 medical expenses.',
    category: 'Emergency',
    targetAmount: 450000,
    raisedAmount: 175000,
    donorCount: 156,
    imageUrl: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/800x600/EF4444/FFFCF9?text=Priya_s+Surgery',
    isVerified: true,
    isUrgent: true,
    deadline: '3 days',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  },
  {
    _id: '5',
    title: 'Accident Victim Support',
    description: 'Rahul, a daily wage worker, met with an accident. Needs ₹2,00,000 for multiple surgeries and recovery.',
    category: 'Emergency',
    targetAmount: 200000,
    raisedAmount: 85000,
    donorCount: 89,
    imageUrl: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/800x600/F97316/FFFCF9?text=Rahul_s+Accident',
    isVerified: true,
    isUrgent: false,
    deadline: '5 days',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  }
];

export const causesApi = {
  getAllCauses: async (): Promise<ApiResponse<Cause[]>> => {
    try {
      if (import.meta.env.DEV) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ success: true, data: mockCauses });
          }, 500);
        });
      }
      const response = await api.get('/causes');
      return response.data;
    } catch (error) {
      console.error('Error fetching causes:', error);
      return { success: true, data: mockCauses };
    }
  },

  getEmergencyCauses: async (): Promise<ApiResponse<Cause[]>> => {
    try {
      if (import.meta.env.DEV) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ success: true, data: mockEmergencyCauses });
          }, 500);
        });
      }
      const response = await api.get('/causes/emergency');
      return response.data;
    } catch (error) {
      console.error('Error fetching emergency causes:', error);
      return { success: true, data: mockEmergencyCauses };
    }
  },

  getCauseById: async (id: string): Promise<ApiResponse<Cause>> => {
    try {
      const response = await api.get(`/causes/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createCause: async (causeData: Partial<Cause>): Promise<ApiResponse<Cause>> => {
    try {
      const response = await api.post('/causes', causeData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const donationsApi = {
  createDonation: async (donationData: Partial<Donation>): Promise<ApiResponse<Donation>> => {
    try {
      if (import.meta.env.DEV) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ 
              success: true, 
              data: { ...donationData, _id: Date.now().toString(), createdAt: new Date().toISOString() } as Donation
            });
          }, 1000);
        });
      }
      const response = await api.post('/donations', donationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDonationsByCause: async (causeId: string): Promise<ApiResponse<Donation[]>> => {
    try {
      const response = await api.get(`/donations/cause/${causeId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const statsApi = {
  getStats: async (): Promise<ApiResponse<any>> => {
    try {
      if (import.meta.env.DEV) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ 
              success: true, 
              data: {
                totalRaised: 28000000,
                causesSupported: 1250,
                donors: 42000,
                statesReached: 18
              }
            });
          }, 300);
        });
      }
      const response = await api.get('/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      return { 
        success: true, 
        data: {
          totalRaised: 28000000,
          causesSupported: 1250,
          donors: 42000,
          statesReached: 18
        }
      };
    }
  }
};

export default api;
