
import React from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Post {
  id: string;
  author: string;
  authorUsername: string;
  authorAvatar?: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
  timeAgo: string;
}

const mockPosts: Post[] = [
  {
    id: "1",
    author: "Jane Smith",
    authorUsername: "chefsmith",
    content: "Just made this delicious pasta carbonara for dinner! The secret is using fresh eggs and high-quality pancetta. #ItalianFood #Homemade",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhc3RhJTIwY2FyYm9uYXJhfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    likes: 245,
    comments: 32,
    timeAgo: "2 hours ago"
  },
  {
    id: "2",
    author: "Mark Johnson",
    authorUsername: "markthechef",
    authorAvatar: "https://i.pravatar.cc/150?u=mark",
    content: "Trying out a new recipe for my restaurant's menu. What do you think of this plating style? #FoodArt #Gastronomy",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    likes: 516,
    comments: 78,
    timeAgo: "5 hours ago"
  },
  {
    id: "3",
    author: "Emma Wilson",
    authorUsername: "bakerella",
    content: "Sunday baking session! These chocolate chip cookies are absolutely perfect - crispy on the outside, chewy in the middle. Recipe in bio! #Baking #Cookies #SweetTreats",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvb2tpZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    likes: 1243,
    comments: 124,
    timeAgo: "1 day ago"
  }
];

const PostCard = ({ post }: { post: Post }) => {
  const [liked, setLiked] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-0">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              {post.authorAvatar ? (
                <AvatarImage src={post.authorAvatar} alt={post.author} />
              ) : (
                <AvatarFallback>{post.author.substring(0, 2)}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="font-medium">{post.author}</p>
              <p className="text-sm text-gray-500">@{post.authorUsername}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Report Post</DropdownMenuItem>
              <DropdownMenuItem>Mute User</DropdownMenuItem>
              <DropdownMenuItem>Copy Link</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div 
          className="aspect-square md:aspect-video w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${post.image})` }}
        />

        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLike}
                className={liked ? "text-red-500" : ""}
              >
                <Heart className="h-5 w-5" fill={liked ? "currentColor" : "none"} />
              </Button>
              <Button variant="ghost" size="icon">
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSaved(!saved)}
              className={saved ? "text-dishit-yellow" : ""}
            >
              <Bookmark className="h-5 w-5" fill={saved ? "currentColor" : "none"} />
            </Button>
          </div>

          <p className="font-medium mb-1">{likeCount} likes</p>
          <p className="mb-2">
            <span className="font-medium">@{post.authorUsername}</span>{" "}
            {post.content}
          </p>
          <Button variant="link" className="px-0 h-auto text-gray-500">
            View all {post.comments} comments
          </Button>
          <p className="text-xs text-gray-500 mt-2">{post.timeAgo}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const Posts = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentRoute="/posts" />
      
      <div className="container pt-8 pb-16 max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Posts</h1>
          <p className="text-gray-600">
            Discover the latest food inspirations
          </p>
        </div>
        
        <Tabs defaultValue="following">
          <TabsList className="mb-6">
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
          
          <TabsContent value="following" className="animate-fade-in">
            {mockPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>
          
          <TabsContent value="trending" className="animate-fade-in">
            <div className="text-center py-12">
              <p className="text-gray-500">Trending posts coming soon!</p>
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="animate-fade-in">
            <div className="text-center py-12">
              <p className="text-gray-500">Recent posts coming soon!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Posts;
