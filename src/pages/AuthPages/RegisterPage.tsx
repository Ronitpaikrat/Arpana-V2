import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, User, Mail, Phone, Lock, CreditCard } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { validateEmail, validatePhone, validatePassword, credentialValidators } from '../../utils/validators';
import { motion } from 'framer-motion';

type CredentialType = 'aadhar' | 'dl' | 'voterId' | 'passport';

export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    credentialType: 'aadhar' as CredentialType,
    credentialNumber: '',
    password: '',
    confirmPassword: '',
  });
  
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    credentialNumber: '',
    password: '',
    confirmPassword: '',
  });
  
  const { register, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const validateForm = (): boolean => {
    const errors = {
      fullName: '',
      email: '',
      phone: '',
      credentialNumber: '',
      password: '',
      confirmPassword: '',
    };
    
    let isValid = true;
    
    // Validate name
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
      isValid = false;
    }
    
    // Validate email
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email';
      isValid = false;
    }
    
    // Validate phone
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
      isValid = false;
    } else if (!validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }
    
    // Validate credential
    if (!formData.credentialNumber.trim()) {
      errors.credentialNumber = 'Credential number is required';
      isValid = false;
    } else {
      const validator = credentialValidators[formData.credentialType];
      if (!validator(formData.credentialNumber)) {
        errors.credentialNumber = 'Please enter a valid credential number';
        isValid = false;
      }
    }
    
    // Validate password
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (!validatePassword(formData.password)) {
      errors.password = 'Password must be at least 8 characters with 1 uppercase, 1 lowercase and 1 number';
      isValid = false;
    }
    
    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (validateForm()) {
      try {
        const { confirmPassword, ...userData } = formData;
        await register(userData);
        navigate('/');
      } catch (err) {
        // Error is handled by the store
      }
    }
  };
  
  const getCredentialLabel = (): string => {
    switch (formData.credentialType) {
      case 'aadhar': return 'Aadhar Number (12 digits)';
      case 'dl': return 'Driving License Number';
      case 'voterId': return 'Voter ID Number';
      case 'passport': return 'Passport Number';
      default: return 'Credential Number';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          className="flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Heart className="text-primary-500" size={48} />
        </motion.div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          className="bg-white py-8 px-4 shadow-elevation-3 sm:rounded-lg sm:px-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {error && (
            <div className="bg-error-50 border border-error-300 text-error-700 px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              error={formErrors.fullName}
              fullWidth
              leftIcon={<User size={18} />}
            />
            
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
              fullWidth
              leftIcon={<Mail size={18} />}
            />
            
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={formErrors.phone}
              fullWidth
              leftIcon={<Phone size={18} />}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credential Type
              </label>
              <select
                name="credentialType"
                value={formData.credentialType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="aadhar">Aadhar Card</option>
                <option value="dl">Driving License</option>
                <option value="voterId">Voter ID</option>
                <option value="passport">Passport</option>
              </select>
            </div>
            
            <Input
              label={getCredentialLabel()}
              name="credentialNumber"
              type="text"
              value={formData.credentialNumber}
              onChange={handleChange}
              error={formErrors.credentialNumber}
              fullWidth
              leftIcon={<CreditCard size={18} />}
            />
            
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={formErrors.password}
              helperText="At least 8 characters with 1 uppercase, 1 lowercase and 1 number"
              fullWidth
              leftIcon={<Lock size={18} />}
            />
            
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={formErrors.confirmPassword}
              fullWidth
              leftIcon={<Lock size={18} />}
            />

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};