"use client";

import React, { useState } from "react";
import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";

// Mock user type (Replace with your actual Auth context/type)
interface User {
  id: string;
  name: string;
  role: "customer" | "merchant" | "admin";
}

interface NavbarProps {
  user: User | null; // Pass null if guest, user object if logged in
}

export default function Navbar({ user }: NavbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1 rounded">🛒</div>
            <span className="text-xl font-bold text-gray-900">BlitzCart</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 mx-8 max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
              />
              <button className="absolute right-0 top-0 h-full px-4 text-blue-600">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            {!user ? (
              // GUEST VIEW
              <Link
                href="/login"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                <User size={20} />
                <span>Login / Register</span>
              </Link>
            ) : (
              // LOGGED IN VIEW
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    {user.name[0]}
                  </div>
                  <span className="hidden md:block">Hi, {user.name}</span>
                </button>

                {/* Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1">
                    <Link
                      href={`/${user.role}/dashboard`}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <Link
              href="/wishlist"
              className="text-gray-700 hover:text-blue-600 relative"
            >
              <Heart size={24} />
            </Link>
            <Link
              href="/cart"
              className="text-gray-700 hover:text-blue-600 relative"
            >
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 text-sm font-medium text-gray-700">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 hover:text-blue-600">
                <Menu size={20} /> All Categories
              </button>
              <Link href="/" className="text-blue-600">
                Home
              </Link>
              <Link href="/flash-deals" className="hover:text-blue-600">
                Flash Deals
              </Link>
              <Link href="/best-sellers" className="hover:text-blue-600">
                Best Sellers
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-2 text-gray-600">
              <span>🚚</span> Free Shipping on orders above ₹999
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
