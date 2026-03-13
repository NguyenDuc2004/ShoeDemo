import React, { useState } from 'react';
import { Search, Calendar, Package, ChevronRight, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { mockOrders } from '../mockData';
import { Order } from '../types';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils';

const StatusIcon = ({ status }: { status: Order['status'] }) => {
  switch (status) {
    case 'pending': return <Clock size={16} className="text-orange-500" />;
    case 'shipped': return <Truck size={16} className="text-blue-500" />;
    case 'delivered': return <CheckCircle size={16} className="text-emerald-500" />;
    case 'cancelled': return <XCircle size={16} className="text-red-500" />;
  }
};

const StatusBadge = ({ status }: { status: Order['status'] }) => {
  const styles = {
    pending: 'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-100 dark:border-orange-500/20',
    shipped: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-500/20',
    delivered: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20',
    cancelled: 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-100 dark:border-red-500/20',
  };
  const labels = {
    pending: 'Chờ xử lý',
    shipped: 'Đang giao',
    delivered: 'Đã giao',
    cancelled: 'Đã hủy',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

export default function OrderManagement() {
  const [orders] = useState<Order[]>(mockOrders);
  const { themeColor } = useTheme();

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden transition-colors">
      <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <div className="relative max-w-sm flex-1 group">
          <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors", `group-focus-within:text-${themeColor}-500`)} size={18} />
          <input 
            type="text" 
            placeholder="Tìm mã đơn hàng..." 
            className={cn(
              "w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm transition-all text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-600",
              `focus:ring-2 focus:ring-${themeColor}-500/20 focus:border-${themeColor}-500 focus:bg-white dark:focus:bg-zinc-800`
            )}
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            Xuất báo cáo
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Mã đơn</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Khách hàng</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Ngày đặt</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Tổng tiền</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-right">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors group">
                <td className="px-6 py-4">
                  <span className="font-mono text-sm font-medium text-zinc-900 dark:text-zinc-100">{order.id}</span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">{order.userName}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500">
                    <Calendar size={14} />
                    {order.date}
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">${order.total}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <StatusIcon status={order.status} />
                    <StatusBadge status={order.status} />
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className={cn("p-2 text-zinc-400 dark:text-zinc-600 rounded-lg transition-all group-hover:translate-x-1", `hover:text-${themeColor}-500 hover:bg-${themeColor}-50 dark:hover:bg-${themeColor}-500/10`)}>
                    <ChevronRight size={20} />
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
