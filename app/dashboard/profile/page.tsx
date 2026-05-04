'use client';
import { useState, useEffect } from 'react';
import { User, Mail, Shield, Save } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        setFormData({
          fullName: user.user_metadata?.full_name || '',
          email: user.email || '',
        });
      }
    }
    getProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.updateUser({
      data: { full_name: formData.fullName }
    });

    if (error) {
      alert('Error updating profile: ' + error.message);
    } else {
      alert('Profile updated successfully!');
    }
    setLoading(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: passwordData.newPassword
    });

    if (error) {
      alert('Error updating password: ' + error.message);
    } else {
      alert('Password updated successfully!');
      setShowPasswordForm(false);
      setPasswordData({ newPassword: '', confirmPassword: '' });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-500">Manage your personal information and security.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <form onSubmit={handleUpdateProfile}>
          <div className="p-8 border-b border-gray-50">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <User className="mr-2 text-blue-600" size={20} /> Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  disabled
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                  value={formData.email}
                />
                <p className="mt-1 text-xs text-gray-400 italic flex items-center">
                  <Mail className="mr-1" size={12} /> Email cannot be changed here.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 border-b border-gray-50 bg-gray-50/30">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Shield className="mr-2 text-blue-600" size={20} /> Security
            </h2>
            
            {!showPasswordForm ? (
              <button 
                type="button"
                onClick={() => setShowPasswordForm(true)}
                className="px-6 py-3 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all text-sm"
              >
                Change Password
              </button>
            ) : (
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  />
                </div>
                <div className="flex space-x-4">
                  <button 
                    type="button"
                    onClick={handleUpdatePassword}
                    disabled={loading}
                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-sm disabled:opacity-50"
                  >
                    Update Password
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowPasswordForm(false)}
                    className="px-6 py-3 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 bg-white flex justify-end">
            <button 
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-10 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-50"
            >
              {loading ? 'Saving...' : <><Save className="mr-2" size={20} /> Save Changes</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
