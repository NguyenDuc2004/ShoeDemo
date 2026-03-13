import React, { useState } from 'react';
import { Bell, Search, Palette, Check, Sun, Moon } from 'lucide-react';
import { useTheme, ThemeColor } from '../context/ThemeContext';
import { cn } from '../utils';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const { themeColor, setThemeColor, isDarkMode, toggleDarkMode } = useTheme();
  const [showThemes, setShowThemes] = useState(false);

  const themes: { id: ThemeColor; color: string }[] = [
    { id: 'emerald', color: 'bg-emerald-500' },
    { id: 'blue', color: 'bg-blue-500' },
    { id: 'violet', color: 'bg-violet-500' },
    { id: 'rose', color: 'bg-rose-500' },
    { id: 'amber', color: 'bg-amber-500' },
    { id: 'indigo', color: 'bg-indigo-500' },
  ];

  return (
    <header className="h-20 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between px-8 sticky top-0 z-10 transition-colors">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{title}</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative group">
          <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors", `group-focus-within:text-${themeColor}-500`)} size={18} />
          <input 
            type="text" 
            placeholder="Tìm kiếm..." 
            className={cn(
              "pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-900 border-none rounded-full text-sm transition-all w-64 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-600",
              `focus:ring-2 focus:ring-${themeColor}-500/20 focus:bg-white dark:focus:bg-zinc-800`
            )}
          />
        </div>

        <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-full">
          <button 
            onClick={() => setShowThemes(!showThemes)}
            className={cn(
              "p-2 rounded-full transition-all",
              showThemes ? `bg-${themeColor}-500 text-white` : "text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            )}
          >
            <Palette size={18} />
          </button>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-all"
          >
            {isDarkMode ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} />}
          </button>
        </div>

        {showThemes && (
          <div className="absolute right-40 top-16 w-48 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800 p-2 z-50">
            <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-3 py-2">Chọn màu chủ đạo</p>
            <div className="grid grid-cols-3 gap-1">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setThemeColor(t.id);
                    setShowThemes(false);
                  }}
                  className={cn(
                    "w-full aspect-square rounded-xl flex items-center justify-center transition-transform hover:scale-105",
                    t.color
                  )}
                >
                  {themeColor === t.id && <Check size={16} className="text-white" />}
                </button>
              ))}
            </div>
          </div>
        )}

        <button className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full relative transition-colors">
          <Bell size={20} />
          <span className={cn("absolute top-2 right-2 w-2 h-2 rounded-full border-2 border-white dark:border-zinc-950", `bg-${themeColor}-500`)}></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-zinc-200 dark:border-zinc-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Admin User</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-600">Quản trị viên</p>
          </div>
          <div className="w-10 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <img src="https://picsum.photos/seed/admin/100/100" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
}
