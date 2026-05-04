'use client';
import { useState, useEffect } from 'react';
import { Package, Clock, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function DashboardOverview() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({ orders: 0, spent: 0 });

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { count } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);
        
        setStats({ orders: count || 0, spent: 0 }); // Spent would need more complex query
      }
    }
    getProfile();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome back, {user?.user_metadata?.full_name || 'Customer'}!</h1>
        <p className="text-gray-500">Here&apos;s what&apos;s happening with your account today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Package size={24} /></div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Orders</span>
          </div>
          <div className="text-3xl font-extrabold text-gray-900">{stats.orders}</div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><Clock size={24} /></div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Orders</span>
          </div>
          <div className="text-3xl font-extrabold text-gray-900">0</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><Star size={24} /></div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Loyalty Points</span>
          </div>
          <div className="text-3xl font-extrabold text-gray-900">1,250</div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
          <Link href="/dashboard/orders" className="text-blue-600 text-sm font-bold hover:underline flex items-center">
            View All <ArrowRight className="ml-1" size={16} />
          </Link>
        </div>
        <div className="p-8 text-center text-gray-500 italic">
          <p>You haven&apos;t placed any orders yet.</p>
          <Link href="/products" className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-bold not-italic hover:bg-blue-700 transition-colors">
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
