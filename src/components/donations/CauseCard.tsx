import React from 'react';
import { Cause } from '../../types';
import { Button } from '../ui/Button';
import { formatCurrency, calculatePercentage } from '../../utils/validators';
import { motion } from 'framer-motion';

interface CauseCardProps {
  cause: Cause;
  onDonate: (causeId: string) => void;
  isEmergency?: boolean;
}

export const CauseCard: React.FC<CauseCardProps> = ({ 
  cause, 
  onDonate,
  isEmergency = false
}) => {
  const percentage = calculatePercentage(cause.raised, cause.goal);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };
  
  return (
    <motion.div 
      className={`bg-white rounded-xl shadow-elevation-2 overflow-hidden ${isEmergency ? 'border-2 border-error-500' : ''}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative">
        <img 
          src={cause.imageUrl} 
          alt={cause.title} 
          className="w-full h-48 object-cover"
        />
        {isEmergency && (
          <div className="absolute top-3 right-3 bg-error-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
            <span className="animate-pulse mr-1">●</span>
            URGENT
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="text-white font-medium">{cause.category}</div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">{cause.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{cause.description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-900">{formatCurrency(cause.raised)}</span>
            <span className="text-gray-500">of {formatCurrency(cause.goal)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${isEmergency ? 'bg-error-500' : 'bg-primary-500'}`} 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-gray-500">
              {isEmergency ? (
                <span className="text-error-600 font-medium">{cause.daysLeft} days left</span>
              ) : (
                <span>{cause.daysLeft} days left</span>
              )}
            </span>
          </div>
          <Button
            size="sm"
            variant={isEmergency ? "accent" : "primary"}
            onClick={() => onDonate(cause.id)}
          >
            Donate Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};