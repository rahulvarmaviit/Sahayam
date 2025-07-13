import React from 'react';
import { Heart, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center">
                <Heart className="text-white" size={16} />
              </div>
              <h2 className="text-xl font-bold ml-2 text-white">Sahayam</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Connecting compassionate donors with verified social causes across India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/#causes" className="text-gray-300 hover:text-white transition-colors">Causes</a></li>
              <li><a href="/#emergency" className="text-gray-300 hover:text-white transition-colors">Emergency</a></li>
              <li><a href="/#donate" className="text-gray-300 hover:text-white transition-colors">Donate</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Causes</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Orphanages</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Children's Education</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Medical Emergencies</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Disability Support</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Elderly Care</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="text-primary mt-1 mr-3 flex-shrink-0" size={16} />
                <span className="text-gray-300">123 Social Service St, Mumbai, India</span>
              </li>
              <li className="flex items-start">
                <Phone className="text-primary mt-1 mr-3 flex-shrink-0" size={16} />
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-start">
                <Mail className="text-primary mt-1 mr-3 flex-shrink-0" size={16} />
                <span className="text-gray-300">support@sahayam.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2025 Sahayam. All rights reserved. | Verified by Government of India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
