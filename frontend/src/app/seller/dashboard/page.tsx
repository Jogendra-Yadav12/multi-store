'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { Plus, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '@/lib/axios';

interface DashboardStats {
  revenue: string;
  revenue_growth: string;
  orders: number;
  orders_growth: string;
  views: number;
  views_growth: string;
  wallet_balance: string;
}

interface Order {
  id: number;
  customer: string;
  product: string;
  value: string;
  status: string;
}

export default function SellerDashboardPage() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const statsRes = await api.get('/seller/dashboard/stats').catch(() => ({
          data: { data: { revenue: '₹84,200', revenue_growth: '+12.4%', orders: 142, orders_growth: '+8.2%', views: 3400, views_growth: '-2.4%', wallet_balance: '₹14,890' } }
        }));
        const ordersRes = await api.get('/seller/recent-orders?limit=5').catch(() => ({
          data: { data: [
            { id: 1, customer: 'Aarav Mehta', product: 'Luxe Silk Scarf', value: '₹4,200', status: 'Delivered' },
            { id: 2, customer: 'Elena Rose', product: 'Ceramic Vase Set', value: '₹8,490', status: 'Shipped' },
            { id: 3, customer: 'Vikram Singh', product: 'Leather Handbag', value: '₹12,000', status: 'Pending' }
          ] }
        }));

        setStats(statsRes.data.data);
        setRecentOrders(ordersRes.data.data);
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <>
      {/* Welcome Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-display text-3xl font-bold text-on-surface">Dashboard Overview</h2>
          <p className="text-on-surface-variant font-body-md mt-1">Good morning, {user?.name?.split(' ')[0] || 'Merchant'}. Here's what's happening with your boutique today.</p>
        </div>
        <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-label-md font-semibold flex items-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all">
          <Plus className="w-5 h-5" />
          Create Report
        </button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-8">
        {/* Gross Sales */}
        <div className="bg-surface border border-outline-variant p-stack-md rounded-xl hover:shadow-sm transition-all">
          <div className="flex justify-between items-start mb-2">
            <span className="text-on-surface-variant text-xs uppercase tracking-wide font-bold">Gross Sales</span>
            {!isLoading && <span className="text-secondary text-xs bg-secondary-container/20 px-2 py-0.5 rounded-full font-bold">{stats?.revenue_growth}</span>}
          </div>
          {isLoading ? <div className="h-9 w-24 bg-surface-container animate-pulse rounded mb-4"></div> : <p className="font-display text-3xl font-bold text-on-surface mb-4">{stats?.revenue}</p>}
          <div className="h-10 w-full">
            <svg className="w-full h-full text-primary" preserveAspectRatio="none" viewBox="0 0 100 20">
              <path d="M0 15 Q 10 5, 20 12 T 40 8 T 60 15 T 80 5 T 100 10" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
            </svg>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-surface border border-outline-variant p-stack-md rounded-xl hover:shadow-sm transition-all">
          <div className="flex justify-between items-start mb-2">
            <span className="text-on-surface-variant text-xs uppercase tracking-wide font-bold">Total Orders</span>
            {!isLoading && <span className="text-secondary text-xs bg-secondary-container/20 px-2 py-0.5 rounded-full font-bold">{stats?.orders_growth}</span>}
          </div>
          {isLoading ? <div className="h-9 w-20 bg-surface-container animate-pulse rounded mb-4"></div> : <p className="font-display text-3xl font-bold text-on-surface mb-4">{stats?.orders}</p>}
          <div className="h-10 w-full">
            <svg className="w-full h-full text-primary" preserveAspectRatio="none" viewBox="0 0 100 20">
              <path d="M0 10 Q 15 15, 30 8 T 60 12 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
            </svg>
          </div>
        </div>

        {/* Store Views */}
        <div className="bg-surface border border-outline-variant p-stack-md rounded-xl hover:shadow-sm transition-all">
          <div className="flex justify-between items-start mb-2">
            <span className="text-on-surface-variant text-xs uppercase tracking-wide font-bold">Store Views</span>
            {!isLoading && <span className="text-error text-xs bg-error-container/20 px-2 py-0.5 rounded-full font-bold">{stats?.views_growth}</span>}
          </div>
          {isLoading ? <div className="h-9 w-24 bg-surface-container animate-pulse rounded mb-4"></div> : <p className="font-display text-3xl font-bold text-on-surface mb-4">{stats?.views}</p>}
          <div className="h-10 w-full">
            <svg className="w-full h-full text-outline" preserveAspectRatio="none" viewBox="0 0 100 20">
              <path d="M0 5 Q 20 15, 40 5 T 70 12 T 100 8" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
            </svg>
          </div>
        </div>

        {/* Wallet Balance */}
        <div className="bg-surface border border-outline-variant p-stack-md rounded-xl hover:shadow-sm transition-all">
          <div className="flex justify-between items-start mb-2">
            <span className="text-on-surface-variant text-xs uppercase tracking-wide font-bold">Wallet Balance</span>
            <span className="text-on-surface-variant text-xs">Updated now</span>
          </div>
          {isLoading ? <div className="h-9 w-24 bg-surface-container animate-pulse rounded mb-4"></div> : <p className="font-display text-3xl font-bold text-on-surface mb-4">{stats?.wallet_balance}</p>}
          <div className="h-10 w-full">
            <svg className="w-full h-full text-primary" preserveAspectRatio="none" viewBox="0 0 100 20">
              <path d="M0 18 L 10 12 L 25 15 L 40 5 L 60 10 L 80 2 L 100 8" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Charts & Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-gutter mb-8">
        {/* Revenue Chart (60%) */}
        <div className="lg:col-span-6 bg-surface border border-outline-variant rounded-xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-outline-variant flex justify-between items-center">
            <h3 className="font-display text-xl font-bold text-on-surface">Revenue Over Time</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs bg-surface-container-high rounded-lg text-primary font-bold">7D</button>
              <button className="px-3 py-1 text-xs hover:bg-surface-container transition-colors rounded-lg text-on-surface-variant">30D</button>
              <button className="px-3 py-1 text-xs hover:bg-surface-container transition-colors rounded-lg text-on-surface-variant">1Y</button>
            </div>
          </div>
          <div className="p-6 flex-1 min-h-[350px] relative">
            <div className="absolute inset-x-6 inset-y-12 flex flex-col justify-between">
              <div className="w-full border-t border-outline-variant/30 h-0"></div>
              <div className="w-full border-t border-outline-variant/30 h-0"></div>
              <div className="w-full border-t border-outline-variant/30 h-0"></div>
              <div className="w-full border-t border-outline-variant/30 h-0"></div>
              <div className="w-full border-t border-outline-variant/30 h-0"></div>
            </div>
            <svg className="w-full h-full relative z-10" preserveAspectRatio="none" viewBox="0 0 1000 300">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.2"></stop>
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <path d="M0 250 Q 150 220, 250 180 T 450 100 T 700 150 T 1000 50 L 1000 300 L 0 300 Z" fill="url(#chartGradient)"></path>
              <path d="M0 250 Q 150 220, 250 180 T 450 100 T 700 150 T 1000 50" fill="none" stroke="#4f46e5" strokeLinecap="round" strokeWidth="3"></path>
            </svg>
            <div className="flex justify-between mt-4 text-on-surface-variant text-xs">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        {/* Recent Orders (40%) */}
        <div className="lg:col-span-4 bg-surface border border-outline-variant rounded-xl flex flex-col">
          <div className="p-6 border-b border-outline-variant flex justify-between items-center">
            <h3 className="font-display text-xl font-bold text-on-surface">Recent Orders</h3>
            <a className="text-primary text-sm hover:underline font-medium" href="/seller/orders">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 font-semibold">Customer</th>
                  <th className="px-6 py-3 font-semibold">Value</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {isLoading ? (
                  [...Array(3)].map((_, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4"><div className="h-8 w-24 bg-surface-container animate-pulse rounded"></div></td>
                      <td className="px-6 py-4"><div className="h-4 w-12 bg-surface-container animate-pulse rounded"></div></td>
                      <td className="px-6 py-4"><div className="h-6 w-16 bg-surface-container animate-pulse rounded-full"></div></td>
                    </tr>
                  ))
                ) : (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-surface-container-lowest transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-body-md font-semibold text-on-surface group-hover:text-primary transition-colors">{order.customer}</span>
                          <span className="text-[11px] text-on-surface-variant">{order.product}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-body-md font-medium text-on-surface">{order.value}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          order.status === 'Delivered' ? 'bg-secondary-container/20 text-secondary' :
                          order.status === 'Shipped' ? 'bg-surface-container-high text-on-surface-variant' :
                          'bg-error-container/20 text-error'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Low Stock Alerts Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-error" />
          <h3 className="font-display text-xl font-bold text-on-surface">Low Stock Alerts</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <div className="bg-surface border border-outline-variant p-4 rounded-xl flex gap-4 items-center group transition-all hover:border-primary cursor-pointer">
            <div className="w-16 h-16 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden flex-shrink-0">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASg1YYKIRre1eW9xEz65RMDfC-5zpndkC9Ck1pMUqn3P6LHngF4Iw2S9jHSvi5VDrloz3yRuTcr1Uz7zhdKQUhWIUDEor_P3gGqOlr6kkQfFKFwq0yLTBaUMHcZicD70ansJCpRpgnEn6G8pxWCsG8UgeW8wtfhC00O8kiF-41mM4Mfd6U3iYvY8ife5XWu0WT_zERjmQ-UPmzt0syFauZp0QK6_gMNM80E7m58ZoHrBGMdOSqihGIgBUuvB61Zao6083cajcuQTaB" alt="Silk Pashmina" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="font-medium text-sm text-on-surface truncate">Silk Pashmina Shawl</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-error-container/20 text-error text-xs font-bold px-1.5 py-0.5 rounded">2 left</span>
                <span className="text-primary text-xs font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Manage Stock</span>
              </div>
            </div>
          </div>
          
          <div className="bg-surface border border-outline-variant p-4 rounded-xl flex gap-4 items-center group transition-all hover:border-primary cursor-pointer">
            <div className="w-16 h-16 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden flex-shrink-0">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8bgLdiOGI2ntdi4PjNN0V4nn-stAiKaJ5Cpw6SRlY6iD5un8vIXG_4zDSV2NtQu0FjVlJzMlMOsesQHrxT0h6hPN4VDCgQYAq2ywUrr6AI6tl1Z2GRvdIa0A1T5yLTNdLd_f-YaFFFq4RDg6S-7k_n0x_ElwxGqlwRTLP5_dmTT-Foslv1TYWItf84Gf7xDEd28nFsHQ4QTZWMmlcqqY7aCVXYHrAPnpnVHUwGuaiOCaOR50WwFq8MjLa_S1HAZ8uhIHx5578yTLt" alt="Ceramic Set" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="font-medium text-sm text-on-surface truncate">Artisan Candle Set</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-error-container/20 text-error text-xs font-bold px-1.5 py-0.5 rounded">5 left</span>
                <span className="text-primary text-xs font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Manage Stock</span>
              </div>
            </div>
          </div>
          
          <div className="bg-surface border border-outline-variant p-4 rounded-xl flex gap-4 items-center group transition-all hover:border-primary cursor-pointer">
            <div className="w-16 h-16 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden flex-shrink-0">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXtRzrzHogywMN2U4vwvkbO18K82v72K2op0uBhXxTNUQJML4tIO2KziNGGLWzXwAEvRoHe_HWoS2zjvUKHnrKdF_TU3HWCciI3zD2KvO1HTUbK5mxGCF-d13Oi7mIn6-0gjs3zeGQ7m3iLtaRpMM-bkJOG58mMI8RtcUg_pm3fkFKvreRzWgsa3Oxw04cY25_yNXLxd9CbNHSGxwr2ZjKcUiEXOv7WI5DRbElDiTk4P38RbNjZudmMCHH5i5UhfBFo1NRzEwQh_cc" alt="Leather Wallet" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="font-medium text-sm text-on-surface truncate">Saffiano Leather Wallet</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-error-container/20 text-error text-xs font-bold px-1.5 py-0.5 rounded">1 left</span>
                <span className="text-primary text-xs font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Manage Stock</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
