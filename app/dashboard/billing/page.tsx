'use client';
import { useState } from 'react';
import { CreditCard, Plus, Lock, CheckCircle2, MoreVertical, Trash2 } from 'lucide-react';

export default function BillingPage() {
  const [methods, setMethods] = useState([
    { id: 1, type: 'Visa', last4: '4242', exp: '12/25', isDefault: true },
    { id: 2, type: 'Mastercard', last4: '8888', exp: '09/24', isDefault: false },
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Billing & Payments</h1>
        <p className="text-gray-500">Manage your payment methods and billing history.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Methods */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
            <button className="text-blue-600 font-bold text-sm hover:underline flex items-center">
              <Plus className="mr-1" size={16} /> Add New
            </button>
          </div>

          <div className="space-y-4">
            {methods.map((method) => (
              <div key={method.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-blue-200 transition-all group">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gray-50 rounded-2xl text-gray-400 group-hover:text-blue-600 transition-colors">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{method.type} ending in {method.last4}</p>
                    <p className="text-sm text-gray-500 italic">Expires {method.exp}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {method.isDefault && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-2 py-0.5 rounded">Default</span>
                  )}
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-start space-x-4">
            <Lock className="text-blue-600 mt-1" size={20} />
            <div>
              <p className="text-sm font-bold text-blue-900">Secure Payments</p>
              <p className="text-xs text-blue-700 mt-1">Your payment information is encrypted and stored securely. We never store your full card details.</p>
            </div>
          </div>
        </div>

        {/* Billing History (Quick View) */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Invoices</h2>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-50">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Invoice #INV-2024-00{i}</p>
                      <p className="text-xs text-gray-400">May {i}, 2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-gray-900 text-sm">R{450 + i * 50}</p>
                    <button 
                      onClick={() => alert('Invoice download started...')}
                      className="text-[10px] font-black uppercase text-blue-600 hover:underline"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
