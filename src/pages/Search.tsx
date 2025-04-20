
import React from "react";
import Navbar from "@/components/Navbar";
import SearchForm from "@/components/SearchForm";

const Search = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentRoute="/search" />
      
      <div className="container pt-8 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search</h1>
          <p className="text-gray-600">
            Find recipes, chefs, and food inspiration
          </p>
        </div>
        
        <SearchForm />
      </div>
    </div>
  );
};

export default Search;
