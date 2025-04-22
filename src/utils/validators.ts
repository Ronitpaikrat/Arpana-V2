import { CredentialValidation } from '../types';

// Credential validation functions
export const credentialValidators: CredentialValidation = {
  // Aadhar: 12-digit unique number
  aadhar: (value: string) => {
    const aadharRegex = /^\d{12}$/;
    return aadharRegex.test(value);
  },
  
  // Driving License: alphanumeric format
  dl: (value: string) => {
    // DL format varies by state, but typically has alphanumeric pattern
    const dlRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4,11}$/;
    return dlRegex.test(value);
  },
  
  // Voter ID: alphanumeric format with specific pattern
  voterId: (value: string) => {
    // Voter ID format: 3 letters followed by 7 digits
    const voterIdRegex = /^[A-Z]{3}[0-9]{7}$/;
    return voterIdRegex.test(value);
  },
  
  // Passport: Letter followed by 7 digits
  passport: (value: string) => {
    const passportRegex = /^[A-Z]{1}[0-9]{7}$/;
    return passportRegex.test(value);
  }
};

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

// Phone number validation (Indian format)
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// Password validation
export const validatePassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Format currency in Indian Rupees
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Calculate percentage for progress bars
export const calculatePercentage = (raised: number, goal: number): number => {
  return Math.min(Math.round((raised / goal) * 100), 100);
};

// Format large numbers with abbreviated units (K, L, Cr)
export const formatNumber = (num: number): string => {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(1) + ' Cr';
  } else if (num >= 100000) {
    return (num / 100000).toFixed(1) + ' L';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Format date to relative time (e.g., "2 days ago")
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    // Format as date for older posts
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }
};