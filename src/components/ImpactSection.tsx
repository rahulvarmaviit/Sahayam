import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { statsApi } from '../services/api';

interface Stats {
  totalRaised: number;
  causesSupported: number;
  donors: number;
  statesReached: number;
}

const ImpactSection: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalRaised: 0,
    causesSupported: 0,
    donors: 0,
    statesReached: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await statsApi.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Fallback to static values
      setStats({
        totalRaised: 28000000,
        causesSupported: 1250,
        donors: 42000,
        statesReached: 18
      });
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr+`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L+`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const statItems = [
    { value: formatCurrency(stats.totalRaised), label: 'Raised' },
    { value: `${stats.causesSupported.toLocaleString()}+`, label: 'Causes Supported' },
    { value: `${(stats.donors / 1000).toFixed(0)}K+`, label: 'Donors' },
    { value: stats.statesReached.toString(), label: 'States Reached' }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Our Impact Across India</h2>
          <p className="text-white max-w-2xl mx-auto">
            Together, we've made a difference in thousands of lives through your generous support.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {statItems.map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="text-4xl font-bold text-white mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-white">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
