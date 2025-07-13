import axios from 'axios';
import { Cause, Donation, ApiResponse } from '../types/index';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const mockCauses: Cause[] = [
  {
    _id: '1',
    title: 'Shanti Orphanage Dormitory',
    description: 'Shanti Orphanage is a home for 45 wonderful children in a remote village in Karnataka. We provide them with not just shelter, but also quality education, nutritious meals, and a loving environment to thrive. Your contribution will help us build a safe and comfortable new dormitory.',
    category: 'Orphanage',
    targetAmount: 500000,
    raisedAmount: 245000,
    donorCount: 127,
    imageUrl: 'https://images.unsplash.com/photo-1593015379258-6a5665a44599?q=80&w=800&auto=format&fit=crop',
    isVerified: true,
    location: 'Karnataka, India',
    deadline: '2025-08-30T00:00:00.000Z',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  },
  {
    _id: '2',
    title: 'Project Roshni for Blind School',
    description: 'Project Roshni aims to empower visually impaired students at the Seva School for the Blind in Chennai. We are raising funds to provide essential educational materials like Braille books, audio equipment, and specialized software. Your support can light up their future.',
    category: 'Charity',
    targetAmount: 300000,
    raisedAmount: 180000,
    donorCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?q=80&w=800&auto=format&fit=crop',
    isVerified: true,
    location: 'Chennai, India',
    deadline: '2025-09-15T00:00:00.000Z',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  },
  {
    _id: '3',
    title: 'Mobile School for Street Children',
    description: 'In the bustling streets of Delhi, countless children are deprived of education. Our Mobile School project brings the classroom to them. We operate a fully equipped bus that travels to different areas, providing basic literacy, numeracy, and life skills education. Help us keep this bus running.',
    category: 'Education',
    targetAmount: 450000,
    raisedAmount: 320000,
    donorCount: 204,
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    isVerified: true,
    location: 'Delhi, India',
    deadline: '2025-07-20T00:00:00.000Z',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  },
  {
    _id: '6',
    title: 'Aashirwad Elderly Care Home',
    description: 'Aashirwad is a sanctuary for destitute elderly individuals in Kolkata. We provide them with shelter, medical care, and companionship. We are seeking funds to upgrade our medical facilities and hire a full-time nurse to ensure our residents receive the best possible care in their golden years.',
    category: 'Charity',
    targetAmount: 250000,
    raisedAmount: 95000,
    donorCount: 78,
    imageUrl: 'https://images.unsplash.com/photo-1608682578139-1143a54a234f?q=80&w=800&auto=format&fit=crop',
    isVerified: true,
    location: 'Kolkata, India',
    deadline: '2025-10-01T00:00:00.000Z',
    createdAt: '2025-02-15',
    updatedAt: '2025-02-15'
  },
  {
    _id: '7',
    title: 'Paws & Claws Animal Shelter',
    description: 'Our shelter in Hyderabad is home to over 100 rescued dogs and cats. We are running out of space and need to build a new kennel section to house more animals in need. Your donation will help us provide a safe haven for abandoned and injured animals.',
    category: 'Charity',
    targetAmount: 350000,
    raisedAmount: 110000,
    donorCount: 152,
    imageUrl: 'https://images.unsplash.com/photo-1597926713747-ceb92ee895b3?q=80&w=800&auto=format&fit=crop',
    isVerified: true,
    location: 'Hyderabad, India',
    deadline: '2025-11-05T00:00:00.000Z',
    createdAt: '2025-03-10',
    updatedAt: '2025-03-10'
  }
];

const mockEmergencyCauses: Cause[] = [
  {
    _id: '4',
    title: 'Urgent Heart Surgery for Priya',
    description: '12-year-old Priya from Mumbai is suffering from a critical heart condition that requires immediate surgery. Her father is a daily wage laborer and the family is unable to afford the high cost of the operation. Your timely contribution can save her life.',
    category: 'Emergency',
    targetAmount: 450000,
    raisedAmount: 175000,
    donorCount: 156,
    imageUrl: 'https://images.unsplash.com/photo-1519993358394-27ccc7032429?q=80&w=800&auto=format&fit=crop',
    isVerified: true,
    isUrgent: true,
    deadline: '2025-07-10T00:00:00.000Z',
    location: 'Mumbai, India',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  },
  {
    _id: '5',
    title: 'Support for Accident Victim Rahul',
    description: 'Rahul, a 35-year-old construction worker from Pune and the sole earner for his family of four, met with a severe road accident. He has sustained multiple fractures and requires a series of surgeries to recover. Let us come together to support Rahul and his family.',
    category: 'Medical',
    targetAmount: 200000,
    raisedAmount: 85000,
    donorCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1584983191193-3b618b76a16e?q=80&w=800&auto=format&fit=crop',
    isVerified: true,
    isUrgent: true,
    deadline: '2025-07-25T00:00:00.000Z',
    location: 'Pune, India',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01'
  },
  {
    _id: '8',
    title: 'Kerala Flood Relief Fund',
    description: 'Recent floods have devastated several districts in Kerala, leaving thousands homeless and without basic necessities. We are raising funds to provide emergency relief kits containing food, clean water, and medical supplies to the affected families. Your support is crucial.',
    category: 'Emergency',
    targetAmount: 1000000,
    raisedAmount: 450000,
    donorCount: 530,
    imageUrl: 'https://images.unsplash.com/photo-1601833010794-9a83897a0664?q=80&w=800&auto=format&fit=crop',
    isVerified: true,
    isUrgent: true,
    deadline: '2025-08-15T00:00:00.000Z',
    location: 'Kerala, India',
    createdAt: '2025-04-01',
    updatedAt: '2025-04-01'
  }
];

const allMockCauses = [...mockCauses, ...mockEmergencyCauses];

const mockDonations: Donation[] = [
    { _id: 'd1', causeId: '1', donorName: 'Ravi Sharma', amount: 5000, message: 'For the children. God bless.', isAnonymous: false, createdAt: '2025-06-15T10:00:00Z', donorEmail: '', donorPhone: '', paymentMethod: 'card' },
    { _id: 'd2', causeId: '1', donorName: 'Anonymous', amount: 10000, message: '', isAnonymous: true, createdAt: '2025-06-14T12:30:00Z', donorEmail: '', donorPhone: '', paymentMethod: 'card' },
    { _id: 'd3', causeId: '4', donorName: 'Priya Singh', amount: 25000, message: 'Wishing a speedy recovery for little Priya.', isAnonymous: false, createdAt: '2025-06-18T09:00:00Z', donorEmail: '', donorPhone: '', paymentMethod: 'card' },
    { _id: 'd4', causeId: '4', donorName: 'Amit Patel', amount: 1000, message: 'My best wishes.', isAnonymous: false, createdAt: '2025-06-17T18:45:00Z', donorEmail: '', donorPhone: '', paymentMethod: 'card' },
    { _id: 'd5', causeId: '3', donorName: 'Sunita Rao', amount: 2000, message: 'Education is the best gift.', isAnonymous: false, createdAt: '2025-06-16T11:20:00Z', donorEmail: '', donorPhone: '', paymentMethod: 'card' },
    { _id: 'd6', causeId: '8', donorName: 'Anonymous', amount: 50000, message: 'For the people of Kerala.', isAnonymous: true, createdAt: '2025-06-19T14:00:00Z', donorEmail: '', donorPhone: '', paymentMethod: 'card' },
    { _id: 'd7', causeId: '6', donorName: 'Meera Iyer', amount: 1500, message: 'Respect for our elders.', isAnonymous: false, createdAt: '2025-06-20T10:00:00Z', donorEmail: '', donorPhone: '', paymentMethod: 'card' },
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
      if (import.meta.env.DEV) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const cause = allMockCauses.find(c => c._id === id);
            if (cause) {
              resolve({ success: true, data: cause });
            } else {
              resolve({ success: false, message: 'Cause not found.' });
            }
          }, 500);
        });
      }
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
       if (import.meta.env.DEV) {
        return new Promise((resolve) => {
          setTimeout(() => {
            const causeDonations = mockDonations.filter(d => d.causeId === causeId);
            resolve({ success: true, data: causeDonations });
          }, 500);
        });
      }
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
