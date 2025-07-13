import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <motion.div 
          className="md:w-1/2 mb-10 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Help Transform Lives Across India
          </h1>
          <p className="text-white text-lg mb-8">
            Join thousands of donors supporting verified orphanages, charities, and emergency medical cases across India.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="/#donate" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors text-center">
              Donate Now
            </a>
            <a href="/about" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors text-center">
              Learn More
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <div className="bg-white rounded-2xl p-6 shadow-xl max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-primary">Emergency Fund Needed</h3>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                  Urgent
                </span>
              </div>
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1519993358394-27ccc7032429?q=80&w=200&auto=format&fit=crop" 
                  alt="Child in need of help" 
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-bold">Priya's Heart Surgery</h4>
                  <p className="text-gray-600 text-sm">12 years old, Mumbai</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Raised: ₹1,75,000</span>
                  <span>Goal: ₹4,50,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div 
                    className="bg-primary h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '39%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
              <a href="/causes/4" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-accent transition-colors text-center block">
                Donate Now
              </a>
            </div>
            <motion.div 
              className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg flex items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold">Verified</p>
                <p className="text-xs text-gray-500">By Sahayam</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
