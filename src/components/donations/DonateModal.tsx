import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Cause } from '../../types';
import { formatCurrency, calculatePercentage } from '../../utils/validators';
import { useCausesStore } from '../../store/causesStore';
import { motion } from 'framer-motion';

interface DonateModalProps {
  cause: Cause;
  onClose: () => void;
}

const DONATION_AMOUNTS = [100, 500, 1000, 5000, 10000];

export const DonateModal: React.FC<DonateModalProps> = ({ cause, onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { donate } = useCausesStore();
  
  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount(null);
    }
  };
  
  const getDonationAmount = (): number => {
    if (selectedAmount) return selectedAmount;
    return customAmount ? parseInt(customAmount) : 0;
  };
  
  const handleDonate = async () => {
    const amount = getDonationAmount();
    if (amount <= 0) return;
    
    setIsLoading(true);
    try {
      await donate(cause.id, amount);
      setIsSuccess(true);
    } catch (error) {
      console.error('Donation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const percentage = calculatePercentage(cause.raised, cause.goal);
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };
  
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        className="absolute inset-0 bg-black/50"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        onClick={onClose}
      ></motion.div>
      
      <motion.div 
        className="bg-white rounded-lg shadow-elevation-4 w-full max-w-md z-10"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold text-gray-900">Donate to cause</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {isSuccess ? (
          <div className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-50 text-success-500 mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6">
              Your donation of {formatCurrency(getDonationAmount())} to "{cause.title}" has been processed successfully.
            </p>
            <Button onClick={onClose} fullWidth>Close</Button>
          </div>
        ) : (
          <>
            <div className="p-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={cause.imageUrl} 
                    alt={cause.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{cause.title}</h3>
                  <div className="text-sm text-gray-500">{cause.category}</div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${cause.isEmergency ? 'bg-error-500' : 'bg-primary-500'}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="font-medium">{formatCurrency(cause.raised)}</span>
                    <span className="text-gray-500">of {formatCurrency(cause.goal)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select an amount
                </label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {DONATION_AMOUNTS.map((amount) => (
                    <button
                      key={amount}
                      className={`py-2 px-4 rounded-md border text-center transition-colors ${
                        selectedAmount === amount
                          ? 'bg-primary-50 border-primary-500 text-primary-700'
                          : 'border-gray-300 text-gray-800 hover:bg-gray-50'
                      }`}
                      onClick={() => handleAmountSelect(amount)}
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">₹</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Custom amount"
                    className={`pl-8 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-1 ${
                      customAmount ? 'border-primary-500 focus:ring-primary-500' : 'border-gray-300 focus:ring-primary-400'
                    }`}
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                  />
                </div>
              </div>
              
              <Button
                fullWidth
                isLoading={isLoading}
                disabled={!selectedAmount && !customAmount}
                onClick={handleDonate}
              >
                Donate {getDonationAmount() > 0 ? formatCurrency(getDonationAmount()) : ''}
              </Button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-b-lg text-xs text-gray-500">
              By donating, you agree to our terms of service and privacy policy. All donations are securely processed.
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};