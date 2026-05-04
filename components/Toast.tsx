'use client';
import { useCart } from '@/context/CartContext';
import { CheckCircle, X } from 'lucide-react';

export default function Toast() {
  const { notification, setNotification } = useCart();

  if (!notification) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[100] animate-in slide-in-from-bottom-5">
      <div className="bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-4 border border-gray-800">
        <CheckCircle className="text-green-400" size={24} />
        <p className="font-bold">{notification}</p>
        <button 
          onClick={() => setNotification(null)}
          className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
