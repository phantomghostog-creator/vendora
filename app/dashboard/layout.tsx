'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Package, Settings, LogOut, CreditCard, MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: User },
    { name: 'My Orders', href: '/dashboard/orders', icon: Package },
    { name: 'Addresses', href: '/dashboard/addresses', icon: MapPin },
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
    { name: 'Account Settings', href: '/dashboard/profile', icon: Settings },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all ${
                        isActive 
                          ? 'bg-blue-50 text-blue-600 shadow-sm' 
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon className="mr-3" size={20} />
                      {item.name}
                    </Link>
                  );
                })}
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-sm font-bold text-red-500 rounded-xl hover:bg-red-50 transition-all mt-4 border-t border-gray-50 pt-6"
                >
                  <LogOut className="mr-3" size={20} />
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
