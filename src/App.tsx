import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ShoeManagement from './components/ShoeManagement';
import UserManagement from './components/UserManagement';
import OrderManagement from './components/OrderManagement';
import ChatBot from './components/ChatBot';
import { View } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'shoes': return <ShoeManagement />;
      case 'users': return <UserManagement />;
      case 'orders': return <OrderManagement />;
      default: return <Dashboard />;
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'Tổng quan hệ thống';
      case 'shoes': return 'Quản lý kho giày';
      case 'users': return 'Quản lý người dùng';
      case 'orders': return 'Quản lý đơn hàng';
      default: return 'Trang quản trị';
    }
  };

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-900 font-sans text-zinc-900 dark:text-zinc-100 overflow-hidden transition-colors">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getTitle()} />
        
        <main className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <ChatBot />
    </div>
  );
}
