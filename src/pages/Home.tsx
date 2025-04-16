import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-center flex items-center justify-center"
      style={{ backgroundImage: "url(https://t3.ftcdn.net/jpg/05/97/94/02/360_F_597940292_dmaVD664ccNHMDJqi0Wv0SCSexklLyhO.jpg)" }} // Replace with your actual image path
    >
      <div className="bg-white bg-opacity-10 p-10 rounded-lg shadow-lg max-w-2xl mx-auto">
       
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
