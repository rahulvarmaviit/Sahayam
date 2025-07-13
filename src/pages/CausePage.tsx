import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Calendar, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { causesApi } from '../services/api';
import { Cause } from '../types/index';

const CausePage: React.FC = () => {
  const [causes, setCauses] = useState<Cause[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCauses = async () => {
      try {
        const response = await causesApi.getAllCauses();
        if (response.success) {
          setCauses(response.data);
        } else {
          setError(response.message || 'Failed to fetch causes. Please try again later.');
        }
      } catch (err) {
        setError('Failed to fetch causes. Please try again later.');
        console.error('Error fetching causes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCauses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">All Causes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {causes.map((cause) => (
          <div key={cause._id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
            <img src={cause.imageUrl || 'https://via.placeholder.com/400x250?text=No+Image'} alt={cause.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{cause.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{cause.description}</p>
              <div className="flex items-center text-gray-700 mb-2">
                <DollarSign size={18} className="mr-2 text-green-500" />
                <span>₹{cause.raisedAmount.toLocaleString('en-IN')} raised of ₹{cause.targetAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ width: `${Math.min((cause.raisedAmount / cause.targetAmount) * 100, 100).toFixed(2)}%` }}
                ></div>
              </div>
              <div className="flex items-center text-gray-700 mb-2">
                <Calendar size={18} className="mr-2 text-blue-500" />
                <span>Deadline: {cause.deadline ? new Date(cause.deadline).toLocaleDateString('en-IN') : 'N/A'}</span>
              </div>
              <div className="flex items-center text-gray-700 mb-2">
                <MapPin size={18} className="mr-2 text-purple-500" />
                <span>{cause.location || 'N/A'}</span>
              </div>
              <div className="flex items-center text-gray-700 mb-2">
                {cause.isVerified ? (
                  <CheckCircle size={18} className="mr-2 text-green-500" />
                ) : (
                  <AlertCircle size={18} className="mr-2 text-yellow-500" />
                )}
                <span>{cause.isVerified ? 'Verified' : 'Not Verified'}</span>
              </div>
              {cause.isUrgent && (
                <div className="flex items-center text-red-600 font-semibold mb-2">
                  <AlertCircle size={18} className="mr-2 text-red-600" />
                  <span>Urgent!</span>
                </div>
              )}
              <Link to={`/causes/${cause._id}`} className="block mt-4 bg-primary text-white text-center py-2 px-4 rounded-full hover:bg-accent transition-colors">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      {causes.length === 0 && !loading && !error && (
        <p className="text-center text-gray-600 text-xl mt-8">No causes found at the moment.</p>
      )}
    </div>
  );
};

export default CausePage;
