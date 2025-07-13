import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Cause } from '../types';
import { causesApi } from '../services/api';

const EmergencySection: React.FC = () => {
  const [emergencyCauses, setEmergencyCauses] = useState<Cause[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmergencyCauses();
  }, []);

  const fetchEmergencyCauses = async () => {
    try {
      const response = await causesApi.getEmergencyCauses();
      setEmergencyCauses(response.data);
    } catch (error) {
      console.error('Error fetching emergency causes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="emergency" className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading emergency cases...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="emergency" className="py-16 bg-orange-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-accent mb-4">Emergency Assistance</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Verified urgent cases requiring immediate financial support for medical treatments and emergencies.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {emergencyCauses.map((cause, index) => {
            const progressPercentage = (cause.raisedAmount / cause.targetAmount) * 100;
            
            return (
              <Link to={`/causes/${cause._id}`} key={cause._id} className="block">
                <motion.div 
                  className="bg-white rounded-xl shadow-lg overflow-hidden relative h-full"
                  style={{
                    animation: 'pulse 2s infinite',
                    boxShadow: '0 0 0 0 rgba(255, 107, 53, 0.4)'
                  }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, animation: 'none' }}
                >
                  <div className="relative">
                    <img 
                      src={cause.imageUrl} 
                      alt={cause.title}
                      className="w-full h-56 object-cover"
                    />
                    {cause.isVerified && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-1.5 shadow-lg">
                        <CheckCircle size={18} />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-accent">{cause.title}</h3>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                        {cause.isUrgent ? 'Critical' : 'Urgent'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {cause.description}
                    </p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Raised: ₹{cause.raisedAmount.toLocaleString()}</span>
                        <span>Goal: ₹{cause.targetAmount.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <motion.div 
                          className="bg-accent h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div
                        className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors font-medium"
                      >
                        View & Donate
                      </div>
                      <span className="text-gray-500 text-sm font-medium">
                        {cause.deadline ? `Deadline: ${new Date(cause.deadline).toLocaleDateString()}` : `${cause.donorCount} donors`}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EmergencySection;
