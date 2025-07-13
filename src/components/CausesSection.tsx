import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CauseCard from './CauseCard';
import { Cause } from '../types';
import { causesApi } from '../services/api';
import { Link } from 'react-router-dom';

const CausesSection: React.FC = () => {
  const [causes, setCauses] = useState<Cause[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCauses();
  }, []);

  const fetchCauses = async () => {
    try {
      const response = await causesApi.getAllCauses();
      setCauses(response.data);
    } catch (error) {
      console.error('Error fetching causes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading causes...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="causes" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-primary mb-4">Support Verified Causes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every donation makes a difference. Support orphanages, children's education, and charities across India.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {causes.map((cause, index) => (
            <motion.div
              key={cause._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <CauseCard cause={cause} />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/causes" className="bg-white border-2 border-primary text-primary px-8 py-3 rounded-full font-semibold hover:bg-primary hover:text-white transition-colors">
            View All Causes
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CausesSection;
