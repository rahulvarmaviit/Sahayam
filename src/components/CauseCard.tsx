import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Cause } from '../types';

interface CauseCardProps {
  cause: Cause;
  onDonate: (causeId: string) => void;
}

const CauseCard: React.FC<CauseCardProps> = ({ cause, onDonate }) => {
  const progressPercentage = (cause.raisedAmount / cause.targetAmount) * 100;
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Orphanage': return 'bg-orange-100 text-orange-800';
      case 'Charity': return 'bg-purple-100 text-purple-800';
      case 'Education': return 'bg-green-100 text-green-800';
      case 'Medical': return 'bg-blue-100 text-blue-800';
      case 'Emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl flex flex-col h-full"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img 
          src={cause.imageUrl} 
          alt={cause.title} 
          className="w-full h-48 object-cover" 
        />
        {cause.isVerified && (
          <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-1.5 shadow-lg">
            <CheckCircle size={18} />
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-primary flex-1 pr-2">{cause.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getCategoryColor(cause.category)}`}>
            {cause.category}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">
          {cause.description}
        </p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Raised: ₹{cause.raisedAmount.toLocaleString()}</span>
            <span>Goal: ₹{cause.targetAmount.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div 
              className="bg-primary h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-auto pt-2">
          <button 
            onClick={() => onDonate(cause._id)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent transition-colors font-medium"
          >
            Donate
          </button>
          <span className="text-gray-500 text-sm">{cause.donorCount} donors</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CauseCard;
