import React, { useState } from 'react';
import { Search, Mail, Shield, MoreHorizontal, UserPlus } from 'lucide-react';
import { mockUsers } from '../mockData';
import { User } from '../types';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils';

export default function UserManagement() {
  const [users] = useState<User[]>(mockUsers);
  const { themeColor } = useTheme();

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden transition-colors">
      <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <div className="relative max-w-sm flex-1 group">
          <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors", `group-focus-within:text-${themeColor}-500`)} size={18} />
          <input 
            type="text" 
            placeholder="Tìm người dùng..." 
            className={cn(
              "w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm transition-all text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-600",
              `focus:ring-2 focus:ring-${themeColor}-500/20 focus:border-${themeColor}-500 focus:bg-white dark:focus:bg-zinc-800`
            )}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-800 text-white rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors text-sm font-medium border border-zinc-800 dark:border-zinc-700">
          <UserPlus size={18} />
          Thêm người dùng
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Người dùng</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Vai trò</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Ngày tham gia</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-sm", `bg-${themeColor}-100 dark:bg-${themeColor}-500/20 text-${themeColor}-700 dark:text-${themeColor}-400`)}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">{user.name}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-500 flex items-center gap-1">
                        <Mail size={12} />
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                    <Shield size={16} className={user.role === 'admin' ? `text-${themeColor}-500` : 'text-zinc-400 dark:text-zinc-600'} />
                    <span className="capitalize text-sm">{user.role}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-medium border",
                    user.status === 'active' 
                      ? `bg-${themeColor}-100 dark:bg-${themeColor}-500/10 text-${themeColor}-700 dark:text-${themeColor}-400 border-${themeColor}-200 dark:border-${themeColor}-500/20` 
                      : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-500 border-zinc-200 dark:border-zinc-800'
                  )}>
                    {user.status === 'active' ? 'Hoạt động' : 'Ngoại tuyến'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-600">{user.joinedAt}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
