import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, Heart } from 'lucide-react';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Form Section */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center mb-6">
              <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <Heart className="text-white" size={20} />
              </div>
              <h1 className="text-2xl font-bold text-primary">
                Welcome Back
              </h1>
            </div>
            <p className="text-gray-600 mb-8">
              Login to continue your journey of giving.
            </p>
            
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="email" 
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-primary focus:border-primary transition"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-primary focus:border-primary transition"
                  />
                </div>
                <a href="#" className="text-sm text-primary hover:underline mt-2 block text-right">
                  Forgot Password?
                </a>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-accent transition-colors text-lg"
              >
                Login
              </button>
            </form>
            
            <p className="text-center text-gray-600 mt-8">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-primary hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
          
          {/* Image Section */}
          <div className="hidden md:block">
            <img 
              src="https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/987x1200/FF8C42/FFFCF9?text=Welcome" 
              alt="Children smiling"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
