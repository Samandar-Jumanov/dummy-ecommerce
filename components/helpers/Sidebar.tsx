'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { User, ShoppingBag, FileText, CheckSquare, LogOut, X, Menu, Home, Settings } from 'lucide-react';
import Link from 'next/link';
import useSidebar from '@/lib/hooks/useSidebar';

const Sidebar = () => {
  const { isOpen,  closeSidebar } = useSidebar();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!Cookies.get('token'));
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    closeSidebar();
  };

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '100%' },
  };

  const menuItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/account', icon: User, label: 'Account' },
    { href: '/posts', icon: FileText, label: 'Posts' },
    { href: '/todos', icon: CheckSquare, label: 'To-Dos' },
    { href: '/cart', icon: ShoppingBag, label: 'Cart' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      <button
        onClick={closeSidebar}
        className="fixed top-4 right-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
      >
        <Menu size={24} className="text-gray-800 dark:text-white" />
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={closeSidebar}
        />
      )}

      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 right-0 h-full w-full sm:w-80 bg-white text-black shadow-lg z-50 overflow-hidden"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button
              onClick={closeSidebar}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto px-4">
            {isLoggedIn ? (
              <nav className="mt-8">
                <ul className="space-y-6">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <Link 
                        href={item.href} 
                        className="flex items-center text-gray-800 transition-colors duration-200"
                        onClick={closeSidebar}
                      >
                        <item.icon className="mr-3" size={22} />
                        <span className="text-lg">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : (
              <div className="flex items-center justify-center h-full">
                <Link
                  href="/login"
                  className="py-3 px-6 bg-blue-500 text-white rounded-lg transition-colors duration-200 text-lg font-semibold"
                  onClick={closeSidebar}
                >
                  Log In
                </Link>
              </div>
            )}
          </div>

          {isLoggedIn && (
            <div className="p-4 mt-auto">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-full py-3 px-4 bg-red-500 text-white rounded-lg transition-colors duration-200 text-lg font-semibold"
              >
                <LogOut className="mr-2" size={22} />
                Log Out
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;