import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Target, Clock, Gift, User, Share2 } from 'lucide-react';
import { causesApi, donationsApi } from '../services/api';
import { Cause, Donation } from '../types/index';

const CauseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cause, setCause] = useState<Cause | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'story' | 'donors'>('story');

  useEffect(() => {
    if (!id) {
      setError('Cause ID is missing.');
      setLoading(false);
      return;
    }

    const fetchCauseDetails = async () => {
      try {
        setLoading(true);
        const causeResponse = await causesApi.getCauseById(id);
        if (causeResponse.success) {
          setCause(causeResponse.data);
          const donationsResponse = await donationsApi.getDonationsByCause(id);
          if (donationsResponse.success) {
            setDonations(donationsResponse.data);
          }
        } else {
          setError(causeResponse.message || 'Cause not found.');
        }
      } catch (err) {
        setError('Failed to fetch cause details. Please try again later.');
        console.error('Error fetching cause details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCauseDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">An Error Occurred</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <Link to="/" className="bg-primary text-white px-6 py-2 rounded-full hover:bg-accent transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!cause) {
    return null;
  }

  const progressPercentage = (cause.raisedAmount / cause.targetAmount) * 100;
  const daysLeft = cause.deadline ? Math.max(0, Math.ceil((new Date(cause.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))) : null;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Orphanage': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Charity': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Education': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medical': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Emergency': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-light py-8 md:py-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <div className="md:flex justify-between items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2 md:mb-0">{cause.title}</h1>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold border ${getCategoryColor(cause.category)}`}>
              {cause.category}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Column (Image) */}
            <div className="lg:col-span-3">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img src={cause.imageUrl} alt={cause.title} className="w-full h-auto object-cover aspect-video" />
                {cause.isVerified && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center text-sm shadow-md">
                    <CheckCircle size={16} className="mr-1.5" /> Verified
                  </div>
                )}
              </div>
            </div>

            {/* Right Column (Donation Info) */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col">
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <motion.div
                      className={`h-2.5 rounded-full ${cause.isUrgent ? 'bg-accent' : 'bg-primary'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="font-bold text-dark">₹{cause.raisedAmount.toLocaleString('en-IN')}</span>
                    <span className="text-gray-500">raised of ₹{cause.targetAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center my-4">
                  <div>
                    <Users className="mx-auto text-primary mb-1" />
                    <div className="font-bold text-lg">{cause.donorCount}</div>
                    <div className="text-sm text-gray-500">Donors</div>
                  </div>
                  <div>
                    <Target className="mx-auto text-primary mb-1" />
                    <div className="font-bold text-lg">{Math.round(progressPercentage)}%</div>
                    <div className="text-sm text-gray-500">Funded</div>
                  </div>
                  <div>
                    <Clock className="mx-auto text-primary mb-1" />
                    <div className="font-bold text-lg">{daysLeft !== null ? daysLeft : 'N/A'}</div>
                    <div className="text-sm text-gray-500">Days Left</div>
                  </div>
                </div>

                <div className="mt-auto space-y-3">
                   <Link to="/#donate" className={`w-full text-center block text-white py-3 rounded-lg font-semibold transition-colors text-lg ${cause.isUrgent ? 'bg-accent hover:bg-red-700' : 'bg-primary hover:bg-accent'}`}>
                    Donate Now
                  </Link>
                  <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center">
                    <Share2 size={20} className="mr-2" /> Share
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-12">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('story')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'story' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Our Story
                </button>
                <button
                  onClick={() => setActiveTab('donors')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'donors' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Donors ({donations.length})
                </button>
              </nav>
            </div>
            <div className="py-6">
              {activeTab === 'story' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose max-w-none text-gray-700 leading-relaxed">
                  <p>{cause.description}</p>
                </motion.div>
              )}
              {activeTab === 'donors' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="text-xl font-bold text-dark mb-4">Recent Donations</h3>
                  <div className="space-y-4">
                    {donations.length > 0 ? donations.map(donation => (
                      <div key={donation._id} className="bg-white p-4 rounded-lg shadow-sm flex items-center">
                        <div className="bg-orange-100 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                          {donation.isAnonymous ? <Gift size={20} className="text-primary" /> : <User size={20} className="text-primary" />}
                        </div>
                        <div className="flex-grow">
                          <p className="font-semibold text-dark">{donation.isAnonymous ? 'Anonymous Donor' : donation.donorName}</p>
                          <p className="text-sm text-gray-500">{donation.message || 'A generous contribution.'}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary text-lg">₹{donation.amount.toLocaleString('en-IN')}</p>
                          <p className="text-xs text-gray-400">{new Date(donation.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    )) : (
                      <p className="text-gray-600">Be the first to donate to this cause!</p>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CauseDetailPage;
