'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck, RotateCcw, Heart, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) {
        console.error('Error fetching product:', error);
      } else if (data) {
        const parsedProduct = {
          ...data,
          tags: typeof data.tags === 'string' ? JSON.parse(data.tags) : data.tags,
          images: typeof data.images === 'string' ? JSON.parse(data.images) : data.images
        };
        setProduct(parsedProduct);
      }
      setLoading(false);
    }

    if (slug) fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
            <div className="aspect-square bg-gray-100 rounded-3xl"></div>
            <div className="space-y-6">
              <div className="h-4 bg-gray-100 rounded w-1/4"></div>
              <div className="h-10 bg-gray-100 rounded w-3/4"></div>
              <div className="h-6 bg-gray-100 rounded w-1/2"></div>
              <div className="h-32 bg-gray-100 rounded"></div>
              <div className="h-12 bg-gray-100 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-24 min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <Link href="/products" className="text-blue-600 font-bold hover:underline">Return to collection</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={() => router.back()} className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors font-medium">
          <ArrowLeft className="mr-2" size={20} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Images */}
          <div>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 mb-6">
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[activeImage]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 italic">No image available</div>
              )}
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                  <button 
                    key={index} 
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === index ? 'border-blue-600' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Info */}
          <div>
            <div className="mb-2">
              <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">{product.category}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <span className="text-gray-500 font-medium border-l border-gray-200 pl-4">124 Reviews</span>
              <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded text-xs tracking-wide">IN STOCK</span>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-4xl font-extrabold text-gray-900">R{product.price}</span>
                {product.compare_at_price && (
                  <span className="text-xl text-gray-400 line-through font-medium">R{product.compare_at_price}</span>
                )}
              </div>
              <p className="text-gray-500 text-sm italic">VAT included. Shipping calculated at checkout.</p>
            </div>

            <div className="prose prose-blue text-gray-600 mb-10">
              <p>{product.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <div className="flex items-center border border-gray-200 rounded-xl p-1 bg-gray-50">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-3 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="px-6 font-bold text-gray-900 min-w-[50px] text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-3 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
              
              <button 
                onClick={() => addToCart(product, quantity)}
                className="flex-1 inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <ShoppingCart className="mr-3" size={24} /> Add to Cart
              </button>
              
              <button className="p-4 border border-gray-200 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all group">
                <Heart size={24} className="group-active:fill-current" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-gray-100 pt-10">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Truck size={20} /></div>
                <span className="text-xs font-bold text-gray-700">Free Express Delivery</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><ShieldCheck size={20} /></div>
                <span className="text-xs font-bold text-gray-700">2-Year Warranty</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><RotateCcw size={20} /></div>
                <span className="text-xs font-bold text-gray-700">90-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
