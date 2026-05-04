'use client';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

const products: Partial<Product>[] = [
  {
    id: 'prod_001',
    name: 'Wireless Bluetooth Headphones',
    price: 149.99,
    compare_at_price: 199.99,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop'],
    category: 'Electronics',
    tags: ['Best Seller']
  },
  {
    id: 'prod_004',
    name: 'Smart Watch Pro',
    price: 299.99,
    compare_at_price: 349.99,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop'],
    category: 'Electronics',
    tags: ['Premium']
  },
  {
    id: 'prod_009',
    name: 'Yoga Mat Premium',
    price: 68.99,
    compare_at_price: 89.99,
    images: ['https://images.unsplash.com/photo-1592432676064-2210a79a247a?q=80&w=1974&auto=format&fit=crop'],
    category: 'Wellness',
    tags: ['New']
  },
  {
    id: 'prod_010',
    name: 'Wireless Charging Pad',
    price: 24.99,
    compare_at_price: 29.99,
    images: ['https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?q=80&w=2070&auto=format&fit=crop'],
    category: 'Electronics',
    tags: ['Essential']
  }
];

export default function ProductShowcase() {
  const { addToCart } = useCart();

  return (
    <section id="products" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">Featured Products</h2>
            <p className="text-3xl lg:text-4xl font-extrabold text-gray-900">Curated Just For You</p>
          </div>
          <Link href="/products" className="mt-4 md:mt-0 text-blue-600 font-bold flex items-center hover:underline">
            View All Products <ShoppingCart className="ml-2" size={20} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={product.images?.[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    {product.tags?.[0]}
                  </span>
                </div>
                <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                  <Heart size={18} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => addToCart(product as Product)}
                    className="w-full bg-white text-gray-900 py-2 rounded-xl font-bold flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    Add to Cart
                  </button>
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
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-extrabold text-gray-900">${product.price}</span>
                  {product.compare_at_price && (
                    <span className="text-sm text-gray-400 line-through">${product.compare_at_price}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
