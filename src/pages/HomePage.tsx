import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { PostCard } from '../components/post/PostCard';
import { DonateModal } from '../components/donations/DonateModal';
import { CauseCard } from '../components/donations/CauseCard';
import { usePostsStore } from '../store/postsStore';
import { useCausesStore } from '../store/causesStore';
import { Post, Cause } from '../types';
import { motion } from 'framer-motion';

export const HomePage: React.FC = () => {
  const [selectedCause, setSelectedCause] = useState<Cause | null>(null);
  const { posts, fetchPosts, isLoading: isLoadingPosts } = usePostsStore();
  const { causes, emergencyCauses, fetchCauses, fetchEmergencyCauses, isLoading: isLoadingCauses } = useCausesStore();
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  useEffect(() => {
    fetchPosts();
    fetchCauses();
    fetchEmergencyCauses();
  }, [fetchPosts, fetchCauses, fetchEmergencyCauses]);
  
  const handleDonate = (causeId: string) => {
    const cause = [...causes, ...emergencyCauses].find(c => c.id === causeId);
    if (cause) {
      setSelectedCause(cause);
    }
  };
  
  const handleCloseModal = () => {
    setSelectedCause(null);
  };
  
  // Simulate post donation by showing the first cause modal
  const handlePostDonate = () => {
    if (causes.length > 0) {
      setSelectedCause(causes[0]);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feed - Left Column */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Feed</h2>
          
          {isLoadingPosts ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div>
              {posts.map(post => (
                <PostCard 
                  key={post.id} 
                  post={post}
                  onDonate={handlePostDonate}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Right Sidebar */}
        <div>
          {/* Emergency Causes */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="inline-block w-3 h-3 bg-error-500 rounded-full animate-pulse mr-2"></span>
              Emergency Donations
            </h2>
            
            {isLoadingCauses ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {emergencyCauses.slice(0, 2).map(cause => (
                  <CauseCard 
                    key={cause.id} 
                    cause={cause}
                    onDonate={handleDonate}
                    isEmergency={true}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Regular Causes */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Causes</h2>
            
            {isLoadingCauses ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {causes.slice(0, 3).map(cause => (
                  <CauseCard 
                    key={cause.id} 
                    cause={cause}
                    onDonate={handleDonate}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {selectedCause && (
        <DonateModal cause={selectedCause} onClose={handleCloseModal} />
      )}
    </div>
  );
};