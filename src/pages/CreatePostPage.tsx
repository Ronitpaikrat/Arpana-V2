import React, { useState, useRef } from 'react';
import { Image, Film, Upload, Hash, Users, Calendar, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { usePostsStore } from '../store/postsStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const CreatePostPage: React.FC = () => {
  const [caption, setCaption] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createPost } = usePostsStore();
  const navigate = useNavigate();
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit');
      return;
    }
    
    // Determine media type
    const type = file.type.startsWith('image/') ? 'image' : 'video';
    setMediaType(type);
    setMediaFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setMediaPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    setError(null);
  };
  
  const handleRemoveMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleCreatePost = async () => {
    if (!mediaFile) {
      setError('Please select an image or video');
      return;
    }
    
    if (!caption.trim()) {
      setError('Please add a caption');
      return;
    }
    
    setIsUploading(true);
    setError(null);
    
    try {
      await createPost(caption, mediaFile, mediaType);
      navigate('/');
    } catch (err) {
      setError('Failed to create post. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleTriggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="bg-white rounded-xl shadow-elevation-3 overflow-hidden">
        <div className="border-b border-gray-200">
          <h1 className="text-xl font-semibold text-center py-4">Create Post</h1>
        </div>
        
        <div className="p-6">
          {/* Media Upload */}
          <div className="mb-6">
            {mediaPreview ? (
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  {mediaType === 'image' ? (
                    <img 
                      src={mediaPreview} 
                      alt="Preview" 
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <video 
                      src={mediaPreview} 
                      controls 
                      className="max-w-full max-h-full"
                    />
                  )}
                </div>
                <button 
                  className="absolute top-2 right-2 bg-black bg-opacity-60 text-white p-1 rounded-full"
                  onClick={handleRemoveMedia}
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <motion.div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={handleTriggerFileInput}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                />
                <Upload size={40} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">Upload Media</h3>
                <p className="text-gray-500 text-sm mb-4">Click to select an image or video</p>
                <div className="flex justify-center space-x-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Image size={16} />
                    <span>Images</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Film size={16} />
                    <span>Videos</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Caption */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caption
            </label>
            <textarea
              placeholder="What's on your mind?"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[120px]"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          
          {/* Additional options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hashtags
              </label>
              <Input
                placeholder="Add hashtags"
                leftIcon={<Hash size={18} />}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tag People
              </label>
              <Input
                placeholder="Tag friends"
                leftIcon={<Users size={18} />}
              />
            </div>
          </div>
          
          {/* Schedule option */}
          <div className="flex items-center mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Schedule Post
              </label>
              <p className="text-xs text-gray-500">Post now or schedule for later</p>
            </div>
            <Input
              type="datetime-local"
              className="w-auto"
              leftIcon={<Calendar size={18} />}
            />
          </div>
          
          {error && (
            <div className="bg-error-50 text-error-700 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              fullWidth
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              isLoading={isUploading}
              onClick={handleCreatePost}
            >
              {isUploading ? 'Creating Post...' : 'Post Now'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};