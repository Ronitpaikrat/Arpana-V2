export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  profilePicture?: string;
  bio?: string;
  credentialType: 'aadhar' | 'dl' | 'voterId' | 'passport';
  credentialNumber: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userProfilePic?: string;
  caption: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  likes: number;
  comments: number;
  createdAt: string;
  hasUserLiked?: boolean;
}

export interface Cause {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  goal: number;
  raised: number;
  daysLeft: number;
  isEmergency: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userProfilePic?: string;
  text: string;
  createdAt: string;
}

export interface Donation {
  id: string;
  causeId: string;
  userId: string;
  amount: number;
  createdAt: string;
}

export interface CredentialValidation {
  aadhar: (value: string) => boolean;
  dl: (value: string) => boolean;
  voterId: (value: string) => boolean;
  passport: (value: string) => boolean;
}