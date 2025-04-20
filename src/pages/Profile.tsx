
import React from "react";
import Navbar from "@/components/Navbar";
import ProfileHeader from "@/components/ProfileHeader";
import PostsGrid from "@/components/PostsGrid";

const mockPosts = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    likes: 245,
    comments: 32,
    title: "Homemade Pasta Carbonara",
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    likes: 189,
    comments: 24,
    title: "Perfect Pizza Margherita",
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    likes: 367,
    comments: 45,
    title: "Healthy Lunch Bowl",
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    likes: 298,
    comments: 37,
    title: "Grilled Salmon with Vegetables",
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    likes: 412,
    comments: 53,
    title: "Colorful Salad",
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    likes: 178,
    comments: 26,
    title: "Summer Berry Dessert",
  },
  {
    id: "7",
    imageUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    likes: 324,
    comments: 41,
    title: "Classic Burger",
  },
  {
    id: "8",
    imageUrl: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    likes: 256,
    comments: 34,
    title: "Morning Breakfast",
  },
  {
    id: "9",
    imageUrl: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    likes: 289,
    comments: 38,
    title: "Sushi Platter",
  },
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentRoute="/profile" />
      
      <div className="container pt-8 pb-16">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>
        
        <ProfileHeader
          name="Ronit Paikray"
          username="RonitPaikray"
          bio="Full-stack developer passionate about creating user-friendly web applications."
          postsCount={254}
          followersCount={14200}
          followingCount={1500}
          isOwnProfile={true}
        />
        
        <PostsGrid posts={mockPosts} />
      </div>
    </div>
  );
};

export default Profile;
