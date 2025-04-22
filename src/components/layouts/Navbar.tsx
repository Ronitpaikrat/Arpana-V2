import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Home, Search, PlusSquare, Film, User, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/authStore';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { path: '/', icon: <Home size={20} />, label: 'Home' },
    { path: '/explore', icon: <Search size={20} />, label: 'Explore' },
    { path: '/create', icon: <PlusSquare size={20} />, label: 'Create' },
    { path: '/reels', icon: <Film size={20} />, label: 'Reels' },
    { path: '/donation', icon: <Heart size={20} />, label: 'Donate' },
  ];
  
  return (
    <nav className="bg-white shadow-elevation-2 sticky top-0 z-50 py-3 md:py-4">
      <div className="container px-4 mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Heart className="text-primary-500" size={28} />
          <span className="text-xl font-bold text-primary-800">Arpan</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors ${
                isActive(link.path)
                  ? 'text-primary-600 font-medium'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
        
        {/* Auth Buttons or User Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link 
                to="/emergency" 
                className="text-error-600 font-medium flex items-center"
              >
                <span className="animate-pulse mr-1">●</span> Emergency Donation
              </Link>
              <Link to="/profile" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-300">
                  {user?.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt={user.fullName} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary-100 flex items-center justify-center">
                      <User size={16} className="text-primary-500" />
                    </div>
                  )}
                </div>
                <span className="font-medium">{user?.fullName?.split(' ')[0]}</span>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">Log In</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-50 py-3 px-4 animate-slideUp">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                  isActive(link.path)
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-600'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
            
            <Link 
              to="/emergency" 
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-error-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="animate-pulse">●</span> 
              <span>Emergency Donation</span>
            </Link>
            
            <div className="border-t border-gray-200 pt-3 mt-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={20} />
                    <span>My Profile</span>
                  </Link>
                  <button
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 w-full text-left"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <span>Log Out</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" fullWidth>Log In</Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button fullWidth>Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};