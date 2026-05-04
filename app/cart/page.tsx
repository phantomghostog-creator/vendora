'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal, itemCount, clearCart } = useCart();

  if (itemCount === 0) {
    return (
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Your cart is empty</h1>
            <p className="text-gray-600 mb-10 text-lg">
              Looks like you haven&apos;t added anything to your cart yet. 
              Explore our collection to find the perfect gear for your setup.
            </p>
            <Link 
              href="/#products" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-10">
          <Link href="/#products" className="text-blue-600 hover:underline flex items-center font-medium">
            <ArrowLeft className="mr-2" size={20} /> Back to Shop
          </Link>
        </div>
        
        <div className="flex justify-between items-end mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">Shopping Cart ({itemCount})</h1>
          <button 
            onClick={() => clearCart()}
            className="text-red-500 hover:text-red-600 font-bold text-sm transition-colors"
          >
            Clear Cart
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center">
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <img 
                    src={item.product?.images?.[0]} 
                    alt={item.product?.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-6 flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{item.product?.name}</h3>
                      <p className="text-gray-500 text-sm mt-1">{item.product?.category}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.product_id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-50 text-gray-600 transition-colors border-r border-gray-200"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 font-bold text-gray-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-50 text-gray-600 transition-colors border-l border-gray-200"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <span className="text-xl font-extrabold text-gray-900">
                      ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-32">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-medium text-gray-900">$0.00</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-extrabold text-blue-600">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center">
                Proceed to Checkout
              </button>
              <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-400 font-medium uppercase tracking-wider">
                <span>Safe & Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
