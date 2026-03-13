import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MoreVertical, Filter } from 'lucide-react';
import { mockShoes } from '../mockData';
import { Shoe } from '../types';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils';

export default function ShoeManagement() {
  const [shoes, setShoes] = useState<Shoe[]>(mockShoes);
  const { themeColor } = useTheme();

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden transition-colors">
      <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md group">
          <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors", `group-focus-within:text-${themeColor}-500`)} size={18} />
          <input 
            type="text" 
            placeholder="Tìm kiếm giày..." 
            className={cn(
              "w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm transition-all text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-600",
              `focus:ring-2 focus:ring-${themeColor}-500/20 focus:border-${themeColor}-500 focus:bg-white dark:focus:bg-zinc-800`
            )}
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-sm font-medium">
            <Filter size={18} />
            Lọc
          </button>
          <button className={cn(
            "flex items-center gap-2 px-4 py-2 text-white rounded-xl transition-colors text-sm font-medium shadow-sm",
            `bg-${themeColor}-500 hover:bg-${themeColor}-600 shadow-${themeColor}-200`
          )}>
            <Plus size={18} />
            Thêm giày mới
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Sản phẩm</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Thương hiệu</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Giá</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Kho hàng</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Danh mục</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {shoes.map((shoe) => (
              <tr key={shoe.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src={shoe.image} alt={shoe.name} className="w-12 h-12 rounded-lg object-cover border border-zinc-100 dark:border-zinc-800" />
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{shoe.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{shoe.brand}</td>
                <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">${shoe.price}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${shoe.stock > 50 ? 'bg-emerald-500' : shoe.stock > 20 ? 'bg-orange-500' : 'bg-red-500'}`} />
                    <span className="text-zinc-600 dark:text-zinc-400">{shoe.stock} đôi</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 text-xs font-medium border border-zinc-200 dark:border-zinc-800">
                    {shoe.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className={cn("p-2 text-zinc-400 rounded-lg transition-colors", `hover:text-${themeColor}-500 hover:bg-${themeColor}-50 dark:hover:bg-${themeColor}-500/10`)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
