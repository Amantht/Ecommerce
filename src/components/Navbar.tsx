import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Package, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
  <div className="container mx-auto px-4">
    <div className="flex justify-between items-center h-16">
      <Link to="/" className="text-xl font-bold text-gray-800">
        EcoShop
      </Link>

      <div className="flex items-center space-x-4">
        <Link to="/products" className="text-gray-600 hover:text-gray-800">
          Products
        </Link>

        {user ? (
          <>
            <Link to="/orders" className="text-gray-600 hover:text-gray-800">
              <Package className="h-5 w-5" />
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-gray-800">
              <ShoppingCart className="h-5 w-5" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-600 hover:text-gray-800">
              <User className="h-5 w-5" />
            </Link>
            <Link to="/register" className="text-gray-600 hover:text-gray-800">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  </div>
</nav>

  );
}