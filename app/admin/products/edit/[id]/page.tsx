'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    compare_at_price: '',
    inventory: '0',
    category: 'Electronics',
    sku: '',
  });

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching product:', error);
        alert('Product not found');
        router.push('/admin/products');
      } else if (data) {
        setFormData({
          name: data.name,
          slug: data.slug,
          description: data.description || '',
          price: data.price.toString(),
          compare_at_price: data.compare_at_price?.toString() || '',
          inventory: data.inventory.toString(),
          category: data.category || 'Electronics',
          sku: data.sku || '',
        });
        setImages(typeof data.images === 'string' ? JSON.parse(data.images) : data.images || []);
      }
      setLoading(false);
    }

    fetchProduct();
  }, [id, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'name' ? { slug: value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') } : {})
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setSaving(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `product-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, file);

    if (uploadError) {
      alert('Error uploading image: ' + uploadError.message);
    } else {
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);
      
      setImages([...images, publicUrl]);
    }
    setSaving(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase.from('products').update({
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      price: parseFloat(formData.price),
      compare_at_price: formData.compare_at_price ? parseFloat(formData.compare_at_price) : null,
      inventory: parseInt(formData.inventory),
      category: formData.category,
      sku: formData.sku,
      images: JSON.stringify(images),
      updated_at: new Date().toISOString()
    }).eq('id', id);

    if (error) {
      alert('Error updating product: ' + error.message);
    } else {
      router.push('/admin/products');
    }
    setSaving(false);
  };

  if (loading) return <div className="pt-32 text-center">Loading product data...</div>;

  return (
    <div className="pt-24 pb-12 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/admin/products" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors font-medium">
          <ArrowLeft className="mr-2" size={20} /> Back to Products
        </Link>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Edit Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Form fields (reuse same structure as new product) */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-50 pb-4">General Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Slug (URL)</label>
                <input 
                  type="text" 
                  name="slug"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none"
                  value={formData.slug}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <select 
                  name="category"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Wellness">Wellness</option>
                  <option value="Kitchen">Kitchen</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea 
                  name="description"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-50 pb-4">Pricing & Inventory</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Price (R)</label>
                <input 
                  type="number" 
                  name="price"
                  required
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Compare at Price (R)</label>
                <input 
                  type="number" 
                  name="compare_at_price"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.compare_at_price}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Stock Inventory</label>
                <input 
                  type="number" 
                  name="inventory"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.inventory}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-50 pb-4">Product Images</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {images.map((url, index) => (
                <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                  <img src={url} alt="" className="h-full w-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-lg"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <label className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all group">
                <Upload className="text-gray-400 group-hover:text-blue-600 mb-2" size={24} />
                <span className="text-xs font-bold text-gray-500 group-hover:text-blue-600">Upload Image</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={saving} />
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button 
              type="button" 
              onClick={() => router.push('/admin/products')}
              className="px-8 py-4 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={saving}
              className="inline-flex items-center px-10 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              {saving ? 'Saving...' : (
                <><Save className="mr-2" size={20} /> Update Product</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
