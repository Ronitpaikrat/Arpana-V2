
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { motion } from "framer-motion";

interface Post {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  title: string;
}

interface PostsGridProps {
  posts: Post[];
}

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card className="overflow-hidden group cursor-pointer transition-all duration-200 hover:shadow-md">
      <CardContent className="p-0 relative">
        <div
          className="aspect-square bg-cover bg-center"
          style={{ backgroundImage: `url(${post.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3 text-white">
          <h3 className="font-medium truncate">{post.title}</h3>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Heart size={16} />
              <span className="text-sm">{post.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle size={16} />
              <span className="text-sm">{post.comments}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PostsGrid = ({ posts }: PostsGridProps) => {
  return (
    <Tabs defaultValue="posts" className="mt-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <div className="grid grid-cols-3 gap-1 mt-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="about">
        <Card className="mt-4">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">About</h3>
            <p>
              Welcome to my Dish It profile! I'm passionate about sharing delicious food experiences
              and connecting with other food enthusiasts. Feel free to browse my posts and don't
              hesitate to follow or message me for recipe requests or collaborations.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default PostsGrid;
