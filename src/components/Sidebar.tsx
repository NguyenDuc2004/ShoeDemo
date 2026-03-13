import React from 'react';
import { LayoutDashboard, ShoppingBag, Users, ShoppingCart, LogOut } from 'lucide-react';
import { View } from '../types';
import { cn } from '../utils';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const { themeColor } = useTheme();
  const menuItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'shoes', label: 'Quản lý giày', icon: ShoppingBag },
    { id: 'users', label: 'Người dùng', icon: Users },
    { id: 'orders', label: 'Đơn hàng', icon: ShoppingCart },
  ];

  const activeBg = `bg-${themeColor}-500/10`;
  const activeText = `text-${themeColor}-500`;
  const activeDot = `bg-${themeColor}-500`;
  const logoBg = `bg-${themeColor}-500`;

  return (
    <div className="w-64 bg-zinc-950 text-zinc-400 flex flex-col h-screen border-r border-zinc-800 transition-colors">
      <div className="p-6 flex items-center gap-3">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-black shadow-lg", logoBg)}>
          <ShoppingBag size={24} />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">SHOE<span className={activeText}>ADMIN</span></span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as View)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                isActive 
                  ? `${activeBg} ${activeText}` 
                  : "hover:bg-zinc-900 hover:text-zinc-100"
              )}
            >
              <Icon size={20} className={cn(isActive ? activeText : "group-hover:text-zinc-100")} />
              <span className="font-medium">{item.label}</span>
              {isActive && <div className={cn("ml-auto w-1.5 h-1.5 rounded-full shadow-sm", activeDot)} />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-900">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-500 hover:bg-red-500/10 hover:text-red-500 transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}
