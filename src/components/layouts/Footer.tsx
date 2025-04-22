import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="text-primary-500" size={24} />
              <span className="text-xl font-bold text-primary-800">Arpan</span>
            </div>
            <p className="text-gray-600 mb-4">
              Making a difference through community-powered giving. Join us in supporting causes that matter.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/donation" className="text-gray-600 hover:text-primary-500 transition-colors">Donate</Link>
              </li>
              <li>
                <Link to="/explore" className="text-gray-600 hover:text-primary-500 transition-colors">Explore</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary-500 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explore?category=education" className="text-gray-600 hover:text-primary-500 transition-colors">Education</Link>
              </li>
              <li>
                <Link to="/explore?category=health" className="text-gray-600 hover:text-primary-500 transition-colors">Health</Link>
              </li>
              <li>
                <Link to="/explore?category=animals" className="text-gray-600 hover:text-primary-500 transition-colors">Animal Welfare</Link>
              </li>
              <li>
                <Link to="/explore?category=environment" className="text-gray-600 hover:text-primary-500 transition-colors">Environment</Link>
              </li>
              <li>
                <Link to="/explore?category=disaster" className="text-gray-600 hover:text-primary-500 transition-colors">Disaster Relief</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary-500 mt-0.5" />
                <span className="text-gray-600">123 Charity Lane, New Delhi, India - 110001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-primary-500" />
                <span className="text-gray-600">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-primary-500" />
                <span className="text-gray-600">support@arpan.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Arpan. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy" className="text-gray-500 text-sm hover:text-primary-500 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 text-sm hover:text-primary-500 transition-colors">
                Terms of Service
              </Link>
              <Link to="/faq" className="text-gray-500 text-sm hover:text-primary-500 transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};