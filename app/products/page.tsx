'use client';

import { useState } from 'react';
import { ShoppingCart, Star, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

// Mock products for now
const initialProducts: Partial<Product>[] = [
  {
    id: 'prod_001',
    name: 'Wireless Bluetooth Headphones',
    price: 149.99,
    compare_at_price: 199.99,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop'],
    category: 'Electronics',
    tags: ['Best Seller'],
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.'
  },
  {
    id: 'prod_002',
    name: 'Organic Cotton T-Shirt',
    price: 34.99,
    images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1974&auto=format&fit=crop'],
    category: 'Clothing',
    tags: ['Sustainable'],
    description: 'Soft and sustainable organic cotton t-shirt available in multiple colors.'
  },
  {
    id: 'prod_003',
    name: 'Stainless Steel Water Bottle',
    price: 28.99,
    compare_at_price: 34.99,
    images: ['https://images.unsplash.com/photo-1602143399827-bd9596fd3a54?q=80&w=1974&auto=format&fit=crop'],
    category: 'Kitchen',
    tags: ['Eco-friendly'],
    description: 'Double-walled insulated water bottle, keeps drinks cold 24hrs or hot 12hrs.'
  },
  {
    id: 'prod_004',
    name: 'Smart Watch Pro',
    price: 299.99,
    compare_at_price: 349.99,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop'],
    category: 'Electronics',
    tags: ['Premium'],
    description: 'Advanced fitness tracking, heart rate monitoring, GPS enabled.'
  },
  {
    id: 'prod_005',
    name: 'Leather Messenger Bag',
    price: 189.99,
    compare_at_price: 249.99,
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop'],
    category: 'Accessories',
    tags: ['Leather'],
    description: 'Handcrafted genuine leather messenger bag with laptop compartment.'
  },
  {
    id: 'prod_009',
    name: 'Yoga Mat Premium',
    price: 68.99,
    compare_at_price: 89.99,
    images: ['https://images.unsplash.com/photo-1592432676064-2210a79a247a?q=80&w=1974&auto=format&fit=crop'],
    category: 'Wellness',
    tags: ['New'],
    description: 'Extra thick 6mm eco-friendly yoga mat with alignment lines.'
  },
  {
    id: 'prod_010',
    name: 'Wireless Charging Pad',
    price: 24.99,
    compare_at_price: 29.99,
    images: ['https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?q=80&w=2070&auto=format&fit=crop'],
    category: 'Electronics',
    tags: ['Essential'],
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.'
  }
];

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(initialProducts.map(p => p.category)))];

  const filteredProducts = initialProducts.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">All Products</h1>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="text-gray-400" size={20} />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category || 'All')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img 
                  src={product.images?.[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  {product.tags?.[0] && (
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      {product.tags[0]}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 mr-2">
                    <Star size={14} fill="currentColor" />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">4.8 (120 reviews)</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-extrabold text-gray-900">${product.price}</span>
                    {product.compare_at_price && (
                      <span className="text-sm text-gray-400 line-through">${product.compare_at_price}</span>
                    )}
                  </div>
                  <button 
                    onClick={() => addToCart(product as Product)}
                    className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg italic">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}
