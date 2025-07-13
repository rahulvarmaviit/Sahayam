import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Heart } from 'lucide-react';
import { Cause } from '../types';
import { causesApi, donationsApi } from '../services/api';

const DonationSection: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedCause, setSelectedCause] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    isAnonymous: false
  });
  const [causes, setCauses] = useState<Cause[]>([]);
  const [loading, setLoading] = useState(false);

  const donationAmounts = [500, 1000, 2000, 5000, 10000];

  useEffect(() => {
    fetchCauses();
  }, []);

  const fetchCauses = async () => {
    try {
      const response = await causesApi.getAllCauses();
      setCauses(response.data);
    } catch (error) {
      console.error('Error fetching causes:', error);
    }
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleSubmitDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const amount = selectedAmount || parseInt(customAmount);
      
      const donationData = {
        causeId: selectedCause || causes[0]?._id,
        amount,
        donorName: donorInfo.isAnonymous ? 'Anonymous' : donorInfo.name,
        donorEmail: donorInfo.email,
        donorPhone: donorInfo.phone,
        message: donorInfo.message,
        isAnonymous: donorInfo.isAnonymous,
        paymentMethod: 'card'
      };

      await donationsApi.createDonation(donationData);
      
      // Reset form
      setSelectedAmount(null);
      setCustomAmount('');
      setDonorInfo({
        name: '',
        email: '',
        phone: '',
        message: '',
        isAnonymous: false
      });
      
      alert('Thank you for your donation! Your contribution will make a difference.');
      
    } catch (error) {
      console.error('Error creating donation:', error);
      alert('There was an error processing your donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="donate" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-primary mb-4">Make a Difference</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your contribution can transform lives. Choose an amount to donate or select a specific cause.
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmitDonation}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-primary mb-4">Quick Donation</h3>
                
                {/* Amount Selection */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {donationAmounts.map((amount) => (
                    <motion.button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={`py-4 rounded-lg font-semibold transition-all ${
                        selectedAmount === amount
                          ? 'bg-primary text-white'
                          : 'bg-orange-50 border border-primary text-primary hover:bg-primary hover:text-white'
                      }`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      ₹{amount.toLocaleString()}
                    </motion.button>
                  ))}
                  <input
                    type="number"
                    placeholder="Other"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="py-4 rounded-lg border border-primary text-center font-semibold focus:ring-primary focus:border-primary"
                  />
                </div>
                
                {/* Cause Selection */}
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Select a Cause</label>
                  <select 
                    value={selectedCause}
                    onChange={(e) => setSelectedCause(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Any Cause (We'll allocate where most needed)</option>
                    {causes.map((cause) => (
                      <option key={cause._id} value={cause._id}>
                        {cause.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Message */}
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Personal Message (Optional)</label>
                  <textarea 
                    value={donorInfo.message}
                    onChange={(e) => setDonorInfo({...donorInfo, message: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-primary focus:border-primary" 
                    rows={3} 
                    placeholder="Add a message of hope..."
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-primary mb-4">Donor Information</h3>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={donorInfo.name}
                    onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-primary focus:border-primary" 
                    placeholder="Enter your name"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={donorInfo.email}
                    onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-primary focus:border-primary" 
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={donorInfo.phone}
                    onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-primary focus:border-primary" 
                    placeholder="Enter your phone"
                  />
                </div>
                
                {/* Payment Methods */}
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Payment Method</label>
                  <div className="flex space-x-4">
                    <button type="button" className="flex-1 border border-gray-300 rounded-lg p-3 text-center hover:border-primary transition-colors">
                      <CreditCard className="mx-auto mb-1 text-blue-600" size={24} />
                      <span className="text-sm">Card</span>
                    </button>
                    <button type="button" className="flex-1 border border-gray-300 rounded-lg p-3 text-center hover:border-primary transition-colors">
                      <Smartphone className="mx-auto mb-1 text-green-600" size={24} />
                      <span className="text-sm">UPI</span>
                    </button>
                    <button type="button" className="flex-1 border border-gray-300 rounded-lg p-3 text-center hover:border-primary transition-colors">
                      <Heart className="mx-auto mb-1 text-red-600" size={24} />
                      <span className="text-sm">Wallet</span>
                    </button>
                  </div>
                </div>
                
                {/* Anonymous Checkbox */}
                <div className="flex items-center mb-4">
                  <input 
                    type="checkbox" 
                    id="anonymous" 
                    checked={donorInfo.isAnonymous}
                    onChange={(e) => setDonorInfo({...donorInfo, isAnonymous: e.target.checked})}
                    className="mr-2 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="anonymous" className="text-gray-700">Donate anonymously</label>
                </div>
                
                {/* Submit Button */}
                <motion.button 
                  type="submit"
                  disabled={loading || (!selectedAmount && !customAmount)}
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  {loading ? 'Processing...' : 'Donate Now'}
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default DonationSection;
