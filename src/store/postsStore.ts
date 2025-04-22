import { create } from 'zustand';
import { Post, Comment } from '../types';

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  addComment: (postId: string, text: string) => Promise<void>;
  getComments: (postId: string) => Promise<Comment[]>;
  createPost: (caption: string, mediaFile: File, mediaType: 'image' | 'video') => Promise<void>;
}

// Mock data and functions for now
export const usePostsStore = create<PostsState>((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,
  
  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock posts data
      const mockPosts: Post[] = [
        {
          id: '1',
          userId: 'user1',
          userName: 'Priya Sharma',
          userProfilePic: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
          caption: 'Supporting education for underprivileged children. Every child deserves access to quality education! #EducationForAll',
          mediaUrl: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg',
          mediaType: 'image',
          likes: 245,
          comments: 42,
          createdAt: '2023-04-15T10:30:00Z',
          hasUserLiked: false,
        },
        {
          id: '2',
          userId: 'user2',
          userName: 'Rahul Verma',
          userProfilePic: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
          caption: 'Our animal rescue center needs your support! These voiceless creatures need us. #AnimalWelfare',
          mediaUrl: 'https://images.pexels.com/photos/2007/animal-dog-pet-cute.jpg',
          mediaType: 'image',
          likes: 567,
          comments: 89,
          createdAt: '2023-04-14T14:20:00Z',
          hasUserLiked: true,
        },
        {
          id: '3',
          userId: 'user3',
          userName: 'Neha Patel',
          userProfilePic: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
          caption: 'Flood relief operations in progress. Your donations are making a real difference! #DisasterRelief',
          mediaUrl: 'https://images.pexels.com/photos/1446076/pexels-photo-1446076.jpeg',
          mediaType: 'image',
          likes: 891,
          comments: 156,
          createdAt: '2023-04-13T09:45:00Z',
          hasUserLiked: false,
        }
      ];
      
      set({ posts: mockPosts, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred', 
        isLoading: false 
      });
    }
  },
  
  likePost: async (postId) => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update local state optimistically
      set(state => ({
        posts: state.posts.map(post => {
          if (post.id === postId) {
            const hasUserLiked = !post.hasUserLiked;
            const likeDelta = hasUserLiked ? 1 : -1;
            return { 
              ...post, 
              likes: post.likes + likeDelta,
              hasUserLiked
            };
          }
          return post;
        })
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to like post', 
      });
    }
  },
  
  addComment: async (postId, text) => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local state optimistically
      set(state => ({
        posts: state.posts.map(post => {
          if (post.id === postId) {
            return { 
              ...post, 
              comments: post.comments + 1
            };
          }
          return post;
        })
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add comment', 
      });
    }
  },
  
  getComments: async (postId) => {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Mock comments data
    const mockComments: Comment[] = [
      {
        id: 'c1',
        postId,
        userId: 'user4',
        userName: 'Amit Kumar',
        userProfilePic: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
        text: 'This is such an important cause. Count me in!',
        createdAt: '2023-04-15T11:30:00Z',
      },
      {
        id: 'c2',
        postId,
        userId: 'user5',
        userName: 'Sneha Gupta',
        userProfilePic: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
        text: 'I donated last week. The work you\'re doing is amazing!',
        createdAt: '2023-04-15T12:15:00Z',
      }
    ];
    
    return mockComments;
  },
  
  createPost: async (caption, mediaFile, mediaType) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implement FTP upload and database storage
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock new post creation
      const newPost: Post = {
        id: Date.now().toString(),
        userId: 'currentUser',
        userName: 'Current User',
        userProfilePic: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        caption,
        mediaUrl: URL.createObjectURL(mediaFile), // This would be the FTP URL in production
        mediaType,
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString(),
        hasUserLiked: false,
      };
      
      set(state => ({ 
        posts: [newPost, ...state.posts],
        isLoading: false 
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create post', 
        isLoading: false 
      });
    }
  }
}));