import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, DollarSign, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/Button';
import { Post } from '../../types';
import { formatRelativeTime } from '../../utils/validators';
import { usePostsStore } from '../../store/postsStore';
import { motion } from 'framer-motion';

interface PostCardProps {
  post: Post;
  onDonate: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onDonate }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  
  const { likePost, addComment, getComments } = usePostsStore();
  
  const handleLike = () => {
    likePost(post.id);
  };
  
  const handleComment = async () => {
    if (commentText.trim()) {
      await addComment(post.id, commentText);
      setCommentText('');
      // Refresh comments if they're currently shown
      if (showComments) {
        loadComments();
      }
    }
  };
  
  const loadComments = async () => {
    if (!showComments) {
      setIsLoadingComments(true);
      const fetchedComments = await getComments(post.id);
      setComments(fetchedComments);
      setIsLoadingComments(false);
    }
    setShowComments(!showComments);
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-elevation-3 mb-6 overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img 
              src={post.userProfilePic || 'https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg'} 
              alt={post.userName} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{post.userName}</h3>
            <p className="text-xs text-gray-500">{formatRelativeTime(post.createdAt)}</p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 mb-2">{post.caption}</p>
        <div className="rounded-lg overflow-hidden bg-gray-100">
          {post.mediaType === 'image' ? (
            <img 
              src={post.mediaUrl} 
              alt="Post content" 
              className="w-full object-cover max-h-[500px]"
            />
          ) : (
            <video 
              src={post.mediaUrl} 
              controls 
              className="w-full max-h-[500px]"
            />
          )}
        </div>
      </div>
      
      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>{post.likes} likes</span>
            <span>•</span>
            <span>{post.comments} comments</span>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button 
            className={`flex items-center justify-center space-x-1 flex-1 py-2 rounded-md transition-colors ${
              post.hasUserLiked ? 'text-primary-600' : 'text-gray-500 hover:bg-gray-50'
            }`}
            onClick={handleLike}
          >
            <Heart size={20} fill={post.hasUserLiked ? 'currentColor' : 'none'} />
            <span>Like</span>
          </button>
          
          <button 
            className="flex items-center justify-center space-x-1 flex-1 py-2 text-gray-500 rounded-md hover:bg-gray-50 transition-colors"
            onClick={loadComments}
          >
            <MessageCircle size={20} />
            <span>Comment</span>
          </button>
          
          <button className="flex items-center justify-center space-x-1 flex-1 py-2 text-gray-500 rounded-md hover:bg-gray-50 transition-colors">
            <Share2 size={20} />
            <span>Share</span>
          </button>
          
          <button 
            className="flex items-center justify-center space-x-1 flex-1 py-2 text-accent-600 rounded-md hover:bg-accent-50 transition-colors"
            onClick={onDonate}
          >
            <DollarSign size={20} />
            <span>Donate</span>
          </button>
        </div>
      </div>
      
      {/* Comments Section */}
      {showComments && (
        <div className="px-4 pt-2 pb-4 border-t border-gray-100 animate-fadeIn">
          {isLoadingComments ? (
            <div className="flex justify-center py-4">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-primary-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {comments.map(comment => (
                <div key={comment.id} className="flex space-x-3 mb-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={comment.userProfilePic || 'https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg'} 
                      alt={comment.userName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-3 py-2 flex-grow">
                    <div className="font-medium text-sm text-gray-900">{comment.userName}</div>
                    <p className="text-gray-800 text-sm">{comment.text}</p>
                    <div className="text-xs text-gray-500 mt-1">{formatRelativeTime(comment.createdAt)}</div>
                  </div>
                </div>
              ))}
              
              {/* Add comment form */}
              <div className="flex items-center space-x-3 mt-4">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                    alt="User" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow relative">
                  <input 
                    type="text" 
                    placeholder="Write a comment..." 
                    className="w-full py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-primary-500"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                  />
                  <button 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-500 hover:text-primary-600"
                    onClick={handleComment}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none">
                      <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
};