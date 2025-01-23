import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export default function Home() {
  return (
    <div className="text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to EcoShop
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover our amazing collection of products
        </p>
        <Link
          to="/products"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Start Shopping
        </Link>
      </div>
    </div>
  );
}