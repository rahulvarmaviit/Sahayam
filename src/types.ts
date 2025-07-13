export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Cause {
  _id: string;
  title: string;
  description: string;
  category: string;
  targetAmount: number;
  raisedAmount: number;
  imageUrl: string;
  isVerified: boolean;
  isUrgent: boolean;
  deadline?: string;
  location?: string;
}