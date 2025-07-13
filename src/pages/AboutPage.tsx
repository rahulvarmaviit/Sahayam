import React from 'react';
import { motion } from 'framer-motion';
import { Heart, CheckSquare, Target } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-light">
      {/* Hero Section */}
      <motion.section 
        className="bg-gradient-to-r from-primary to-secondary text-white py-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Mission: Connecting Hearts, Changing Lives</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Sahayam is a bridge of compassion, linking generous donors to verified social causes and urgent needs across India.
          </p>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">Who We Are</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We are a dedicated team passionate about making a tangible difference. Our crowdfunding platform was born from a simple desire: to create a trusted, transparent, and effective way for people to support those in need.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We focus on showcasing the real stories of orphanages, children's charities, and individuals facing medical emergencies. We ensure that every cause is thoroughly verified, so your donation reaches the people who need it most.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1170&auto=format&fit=crop" 
                alt="Community support in India" 
                className="rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">These principles guide every action we take.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Heart className="mx-auto text-accent mb-4" size={48} />
              <h3 className="text-xl font-bold text-dark mb-2">Compassion</h3>
              <p className="text-gray-600">Empathy is at the heart of our work. We strive to understand and address the real needs of communities.</p>
            </motion.div>
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CheckSquare className="mx-auto text-accent mb-4" size={48} />
              <h3 className="text-xl font-bold text-dark mb-2">Transparency</h3>
              <p className="text-gray-600">We believe in complete clarity. Donors can track the impact of their contributions and see where every rupee goes.</p>
            </motion.div>
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Target className="mx-auto text-accent mb-4" size={48} />
              <h3 className="text-xl font-bold text-dark mb-2">Impact</h3>
              <p className="text-gray-600">Our goal is to create lasting, positive change. We support sustainable projects that empower individuals and communities.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">How You Can Help</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Making a difference is simple and secure.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-secondary mb-4">1.</div>
              <h3 className="text-xl font-bold mb-2">Discover a Cause</h3>
              <p className="text-gray-600">Browse through our list of verified orphanages, charities, and emergency medical cases.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-secondary mb-4">2.</div>
              <h3 className="text-xl font-bold mb-2">Donate Securely</h3>
              <p className="text-gray-600">Choose a cause that resonates with you and make a donation through our secure payment gateway.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-secondary mb-4">3.</div>
              <h3 className="text-xl font-bold mb-2">See Your Impact</h3>
              <p className="text-gray-600">Receive updates on the progress of the cause you supported and see how your contribution is changing lives.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
