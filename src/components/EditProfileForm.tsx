
import React from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { Camera, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(3, { message: "Username must be at least 3 characters." })
    .regex(/^[a-z0-9_]+$/i, { message: "Username can only contain letters, numbers, and underscores." }),
  bio: z.string().max(160, { message: "Bio cannot be more than 160 characters." }).optional(),
  email: z.string().email({ message: "Invalid email address." }),
  website: z.string().url({ message: "Invalid URL." }).optional().or(z.literal("")),
  avatar: z.instanceof(FileList).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const EditProfileForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Default values for the form
  const defaultValues: Partial<ProfileFormValues> = {
    name: "Ronit Paikray",
    username: "RonitPaikray",
    bio: "Full-stack developer passionate about creating user-friendly web applications.",
    email: "john@example.com",
    website: "",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Profile data submitted:", data);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully",
      });
      
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Avatar upload section */}
          <div className="flex flex-col items-center sm:items-start mb-6">
            <div className="relative group">
              <Avatar className="h-24 w-24">
                {avatarPreview ? (
                  <AvatarImage src={avatarPreview} alt="Profile" />
                ) : (
                  <AvatarFallback className="bg-dishit-yellow text-white text-xl">
                    {defaultValues.name?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <label htmlFor="avatar-upload" className="cursor-pointer text-white">
                    <Camera size={24} />
                    <span className="sr-only">Upload avatar</span>
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
              </Avatar>
            </div>
            <p className="text-sm text-gray-600 mt-2">Click on the avatar to upload a new photo</p>
          </div>

          {/* Name field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Username field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormDescription>
                  Your unique username. Letters, numbers and underscores only.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  Your email address for account notifications.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bio field */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell others a bit about yourself"
                    className="resize-none"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormDescription>
                  A brief description about yourself. Max 160 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Website field */}
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourwebsite.com" {...field} value={field.value || ''} />
                </FormControl>
                <FormDescription>
                  Your personal or professional website (optional).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit and cancel buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button type="submit" className="bg-dishit-orange hover:bg-dishit-orange/90" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/profile")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditProfileForm;
