import React, { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { CauseCard } from '../components/donations/CauseCard';
import { DonateModal } from '../components/donations/DonateModal';
import { useCausesStore } from '../store/causesStore';
import { Cause } from '../types';
import { motion } from 'framer-motion';

const CATEGORIES = [
  'All',
  'Education',
  'Health',
  'Animals',
  'Environment',
  'Disaster Relief',
  'Children',
  'Women',
];

export const ExplorePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCause, setSelectedCause] = useState<Cause | null>(null);
  const [filteredCauses, setFilteredCauses] = useState<Cause[]>([]);
  
  const { causes, emergencyCauses, fetchCauses, fetchEmergencyCauses, isLoading } = useCausesStore();
  
  useEffect(() => {
    fetchCauses();
    fetchEmergencyCauses();
  }, [fetchCauses, fetchEmergencyCauses]);
  
  useEffect(() => {
    // Combine and filter causes based on search and category
    const allCauses = [...causes, ...emergencyCauses];
    
    const filtered = allCauses.filter(cause => {
      const matchesSearch = cause.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            cause.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || cause.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredCauses(filtered);
  }, [causes, emergencyCauses, searchQuery, selectedCategory]);
  
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };
  
  const handleDonate = (causeId: string) => {
    const cause = filteredCauses.find(c => c.id === causeId);
    if (cause) {
      setSelectedCause(cause);
    }
  };
  
  const handleCloseModal = () => {
    setSelectedCause(null);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Explore Causes</h1>
          <p className="text-gray-600">Discover and support causes that matter to you</p>
        </div>
        
        {/* Search */}
        <div className="w-full md:w-auto mt-4 md:mt-0">
          <div className="relative">
            <Input
              placeholder="Search causes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={18} />}
              className="pr-10"
            />
          </div>
        </div>
      </div>
      
      {/* Categories */}
      <div className="mb-6 overflow-x-auto pb-2">
        <div className="flex space-x-2">
          {CATEGORIES.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleCategorySelect(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Causes Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {filteredCauses.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Search size={48} className="inline-block" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No causes found</h3>
              <p className="text-gray-600">Try changing your search or filters</p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredCauses.map(cause => (
                <motion.div key={cause.id} variants={itemVariants}>
                  <CauseCard 
                    cause={cause} 
                    onDonate={handleDonate}
                    isEmergency={cause.isEmergency} 
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </>
      )}
      
      {selectedCause && (
        <DonateModal cause={selectedCause} onClose={handleCloseModal} />
      )}
    </div>
  );
};