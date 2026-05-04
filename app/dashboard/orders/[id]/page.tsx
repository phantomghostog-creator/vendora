'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, CreditCard, ShoppingBag, Download } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleDownloadInvoice = () => {
    alert('Invoice download started...');
  };

  useEffect(() => {
    async function fetchOrder() {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, product:products(*))')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching order:', error);
      } else {
        setOrder(data);
      }
      setLoading(false);
    }
    fetchOrder();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading order details...</div>;
  if (!order) return <div className="p-8 text-center text-red-500">Order not found.</div>;

  const steps = [
    { name: 'Order Placed', status: 'completed', icon: Clock },
    { name: 'Processing', status: order.status === 'pending' ? 'current' : 'completed', icon: Package },
    { name: 'Shipped', status: order.status === 'shipped' ? 'current' : (['delivered'].includes(order.status) ? 'completed' : 'upcoming'), icon: Truck },
    { name: 'Delivered', status: order.status === 'delivered' ? 'completed' : 'upcoming', icon: CheckCircle },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Order #{order.id.slice(0, 8).toUpperCase()}</h1>
          <p className="text-gray-500">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleDownloadInvoice}
          className="inline-flex items-center px-4 py-2 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all text-sm shadow-sm"
        >
          <Download className="mr-2" size={18} /> Download Invoice
        </button>
      </div>

      {/* Status Progress */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="relative flex justify-between">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
          {steps.map((step, idx) => (
            <div key={step.name} className="relative z-10 flex flex-col items-center">
              <div className={`p-3 rounded-2xl ${
                step.status === 'completed' ? 'bg-green-100 text-green-600' : 
                step.status === 'current' ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-400'
              } border-4 border-white shadow-sm`}>
                <step.icon size={24} />
              </div>
              <span className={`mt-3 text-xs font-bold uppercase tracking-wider ${
                step.status === 'completed' ? 'text-green-600' : 
                step.status === 'current' ? 'text-blue-600' : 'text-gray-400'
              }`}>{step.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50">
              <h2 className="text-xl font-bold text-gray-900">Order Items</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {order.order_items.map((item: any) => (
                <div key={item.id} className="p-6 flex items-center group">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={item.product?.images?.[0]} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-6 flex-grow">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity} × R{item.unit_price}</p>
                  </div>
                  <div className="text-right flex flex-col items-end space-y-2">
                    <span className="font-extrabold text-gray-900">R{item.total_price}</span>
                    <button 
                      onClick={() => addToCart(item.product)}
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center"
                    >
                      Buy Again <ArrowLeft className="ml-1 rotate-180" size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Blocks */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="mr-2 text-blue-600" size={20} /> Shipping Address
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-bold text-gray-900">{order.shipping_address?.name || 'John Customer'}</p>
              <p>{order.shipping_address?.street || '123 Main St'}</p>
              <p>{order.shipping_address?.city || 'New York'}, {order.shipping_address?.state || 'NY'} {order.shipping_address?.zip || '10001'}</p>
              <p>{order.shipping_address?.country || 'USA'}</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <CreditCard className="mr-2 text-blue-600" size={20} /> Payment Details
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold text-gray-900">R{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-bold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax</span>
                <span className="font-bold text-gray-900">R{order.tax}</span>
              </div>
              <div className="pt-4 border-t border-gray-50 flex justify-between">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-xl font-extrabold text-blue-600">R{order.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
