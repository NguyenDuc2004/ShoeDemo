import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';
import { salesData } from '../mockData';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils';

const StatCard = ({ title, value, change, icon: Icon, colorClass }: any) => (
  <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center justify-between mb-4">
      <div className={cn(`p-3 rounded-xl bg-opacity-10`, colorClass.replace('text-', 'bg-'))}>
        <Icon className={colorClass} size={24} />
      </div>
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${change.startsWith('+') ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400'}`}>
        {change}
      </span>
    </div>
    <h3 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">{value}</p>
  </div>
);

export default function Dashboard() {
  const { themeColor, isDarkMode } = useTheme();
  
  const themeHexMap: Record<string, string> = {
    emerald: '#10b981',
    blue: '#3b82f6',
    violet: '#8b5cf6',
    rose: '#f43f5e',
    amber: '#f59e0b',
    indigo: '#6366f1',
  };

  const currentThemeHex = themeHexMap[themeColor];
  const gridColor = isDarkMode ? '#1f2937' : '#f0f0f0';
  const tickColor = isDarkMode ? '#4b5563' : '#9ca3af';

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Tổng doanh thu" value="$128,430" change="+12.5%" icon={DollarSign} colorClass={`text-${themeColor}-500`} />
        <StatCard title="Đơn hàng mới" value="456" change="+8.2%" icon={ShoppingBag} colorClass="text-blue-500" />
        <StatCard title="Người dùng mới" value="2,345" change="+15.3%" icon={Users} colorClass="text-purple-500" />
        <StatCard title="Tỷ lệ chuyển đổi" value="3.2%" change="-2.1%" icon={TrendingUp} colorClass="text-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-zinc-950 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Biểu đồ doanh thu</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={currentThemeHex} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={currentThemeHex} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: tickColor, fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: tickColor, fontSize: 12}} />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    backgroundColor: isDarkMode ? '#111827' : '#ffffff',
                    color: isDarkMode ? '#f3f4f6' : '#111827'
                  }}
                  itemStyle={{ color: currentThemeHex }}
                />
                <Area type="monotone" dataKey="sales" stroke={currentThemeHex} strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-950 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Sản phẩm bán chạy</h3>
          <div className="space-y-6">
            {[
              { name: 'Nike Air Max 270', sales: 124, price: '$150', image: 'https://picsum.photos/seed/n1/50/50' },
              { name: 'Adidas Ultraboost', sales: 98, price: '$180', image: 'https://picsum.photos/seed/a1/50/50' },
              { name: 'Vans Old Skool', sales: 85, price: '$65', image: 'https://picsum.photos/seed/v1/50/50' },
              { name: 'Reebok Classic', sales: 72, price: '$85', image: 'https://picsum.photos/seed/r1/50/50' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 p-2 rounded-xl transition-colors">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover border border-zinc-100 dark:border-zinc-800" />
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">{item.name}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-600">{item.sales} lượt bán</p>
                  </div>
                </div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
