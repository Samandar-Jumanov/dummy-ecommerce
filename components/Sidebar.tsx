"use client"

import React from 'react';
import Cookies from 'js-cookie';
import { User, ShoppingBag, FileText, CheckSquare, LogOut, X } from 'lucide-react';
import Link from 'next/link';
import useSidebar from '@/lib/hooks/useSidebar';

const Sidebar = () => {
  const { isOpen, closeSidebar } = useSidebar();
  const token = Cookies.get('token');

  const handleLogout = () => {
    Cookies.remove('token');
    // Add any additional logout logic here
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out" onClick={closeSidebar} />
      <div className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button
              onClick={closeSidebar}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto px-4">
            {token ? (
              <nav className="mt-8">
                <ul className="space-y-6">
                  <li>
                    <Link href="/account" className="flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                      <User className="mr-3" size={22} />
                      <span className="text-lg">User Account</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/posts" className="flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                      <FileText className="mr-3" size={22} />
                      <span className="text-lg">Posts</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/todos" className="flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                      <CheckSquare className="mr-3" size={22} />
                      <span className="text-lg">To-Dos</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/cart" className="flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                      <ShoppingBag className="mr-3" size={22} />
                      <span className="text-lg">Cart</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            ) : (
              <div className="flex items-center justify-center h-full">
                <Link
                  href="/login"
                  className="py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-lg font-semibold"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>

          {token && (
            <div className="p-4 mt-auto">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-full py-3 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-lg font-semibold"
              >
                <LogOut className="mr-2" size={22} />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;