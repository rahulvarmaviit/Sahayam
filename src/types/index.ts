export interface Cause {
  _id: string;
  title: string;
  description: string;
  category: 'Orphanage' | 'Charity' | 'Education' | 'Medical' | 'Emergency';
  targetAmount: number;
  raisedAmount: number;
  donorCount: number;
  imageUrl: string;
  isVerified: boolean;
  isUrgent?: boolean;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Donation {
  _id: string;
  causeId: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  amount: number;
  message?: string;
  isAnonymous: boolean;
  paymentMethod: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
