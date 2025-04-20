
import React from "react";
import Navbar from "@/components/Navbar";
import EditProfileForm from "@/components/EditProfileForm";

const EditProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentRoute="/profile" />
      
      <div className="container pt-8 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
          <p className="text-gray-600">
            Update your personal information and preferences
          </p>
        </div>
        
        <EditProfileForm />
      </div>
    </div>
  );
};

export default EditProfile;
