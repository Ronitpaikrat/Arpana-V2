
import React from "react";
import Navbar from "@/components/Navbar";
import PaymentSection from "@/components/PaymentSection";

const Payment = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentRoute="/payment" />
      
      <div className="container pt-8 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Payments</h1>
          <p className="text-gray-600">
            Manage your payment methods and transactions
          </p>
        </div>
        
        <PaymentSection />
      </div>
    </div>
  );
};

export default Payment;
