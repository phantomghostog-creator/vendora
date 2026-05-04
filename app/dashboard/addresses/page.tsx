'use client';
import { useState } from 'react';
import { MapPin, Plus, Home, Briefcase, Trash2, Edit } from 'lucide-react';

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([
    { id: 1, type: 'Home', name: 'John Customer', street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'USA', isDefault: true },
    { id: 2, type: 'Office', name: 'John Customer', street: '456 Tech Plaza', city: 'San Francisco', state: 'CA', zip: '94105', country: 'USA', isDefault: false },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Saved Addresses</h1>
          <p className="text-gray-500">Manage your shipping and billing locations.</p>
        </div>
        <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
          <Plus className="mr-2" size={20} /> Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div key={address.id} className={`bg-white p-8 rounded-3xl border ${address.isDefault ? 'border-blue-200 ring-4 ring-blue-50' : 'border-gray-100'} shadow-sm relative group transition-all`}>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${address.isDefault ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                  {address.type === 'Home' ? <Home size={20} /> : <Briefcase size={20} />}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{address.type} Address</h3>
                  {address.isDefault && <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Default</span>}
                </div>
              </div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={16} /></button>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-bold text-gray-900">{address.name}</p>
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.zip}</p>
              <p>{address.country}</p>
            </div>

            {!address.isDefault && (
              <button className="mt-6 text-xs font-bold text-blue-600 hover:underline">
                Set as default
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
