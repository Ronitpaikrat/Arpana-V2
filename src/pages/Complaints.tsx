
import React from "react";
import Navbar from "@/components/Navbar";
import ComplaintsForm from "@/components/ComplainsForm";

const Complaints = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentRoute="/complaints" />
      
      <div className="container pt-8 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Complaints</h1>
          <p className="text-gray-600">
            Submit a complaint or report an issue with a dish or user
          </p>
        </div>
        
        <ComplaintsForm />
      </div>
    </div>
  );
};

export default Complaints;
