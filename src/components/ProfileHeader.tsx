
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, Settings, UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProfileHeaderProps {
  name: string;
  username: string;
  bio: string;
  avatarUrl?: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isOwnProfile?: boolean;
}

const ProfileHeader = ({
  name,
  username,
  bio,
  avatarUrl,
  postsCount,
  followersCount,
  followingCount,
  isOwnProfile = false
}: ProfileHeaderProps) => {
  const { toast } = useToast();
  
  const handleFollow = () => {
    toast({
      title: `Following ${name}`,
      description: "You'll now see their posts in your feed"
    });
  };
  
  const handleMessage = () => {
    toast({
      title: `Messaging ${name}`,
      description: "Opening chat window"
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <Avatar className="h-24 w-24">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={name} />
          ) : (
            <AvatarFallback className="bg-dishit-yellow text-white text-xl">
              {name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="text-dishit-darkGray">@{username}</p>
            </div>
            
            {isOwnProfile ? (
              <Link to="/profile/edit">
                <Button 
                  variant="outline" 
                  className="mt-4 md:mt-0"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
            ) : (
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button 
                  variant="default" 
                  className="bg-dishit-orange hover:bg-dishit-orange/90"
                  onClick={handleFollow}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Follow
                </Button>
                <Button variant="outline" onClick={handleMessage}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
            )}
          </div>
          
          <p className="mt-4 text-gray-700">{bio}</p>
          
          <div className="flex justify-center md:justify-start gap-8 mt-6">
            <div className="text-center">
              <p className="font-bold text-xl">{postsCount}</p>
              <p className="text-dishit-darkGray">Posts</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-xl">{followersCount}</p>
              <p className="text-dishit-darkGray">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-xl">{followingCount}</p>
              <p className="text-dishit-darkGray">Following</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
