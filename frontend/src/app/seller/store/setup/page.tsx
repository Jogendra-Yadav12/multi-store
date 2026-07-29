'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/axios';
import { toast } from 'sonner';
import { Store, Zap, CheckCircle2, Upload } from 'lucide-react';

export default function StoreSetupPage() {
  const router = useRouter();
  const { user, setStore } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    description: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await api.post('/seller/store', form);
      if (response.data.success) {
        toast.success('Store created! Awaiting admin approval.');
        setStore(response.data.data);
        router.push('/seller/dashboard');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create store');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#3525cd] to-[#4f46e5] rounded-xl p-8 text-white shadow-md relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute right-0 top-0 w-64 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
            <polygon points="0,100 100,0 100,100" />
          </svg>
        </div>
        
        <div className="relative z-10">
          <h1 className="font-display text-3xl font-bold mb-2">Welcome, {user?.name ? user.name.split(' ')[0] : 'Seller'}! 👋</h1>
          <p className="text-[#dad7ff] font-medium max-w-2xl text-sm leading-relaxed mb-6">
            Set up your store to start selling on Aetheris Luxe and reach thousands of premium customers globally.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/20 backdrop-blur-sm">
              <Store className="w-4 h-4 text-[#dad7ff]" />
              <span className="text-sm font-semibold">Your Own Storefront</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/20 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-[#dad7ff]" />
              <span className="text-sm font-semibold">Free Plan Included</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/20 backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-[#dad7ff]" />
              <span className="text-sm font-semibold">Approved in 24hrs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-outline-variant rounded-xl shadow-sm">
        <div className="p-6 border-b border-outline-variant flex justify-between items-center">
          <div>
            <h2 className="font-display text-lg font-bold text-on-surface">Store Details</h2>
            <p className="text-sm text-on-surface-variant mt-1">Tell us about your brand to customize your storefront.</p>
          </div>
          <div className="bg-surface-container-low px-3 py-1 rounded-full text-xs font-bold text-primary border border-outline-variant">
            STEP 1 OF 3
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Store Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-on-surface" htmlFor="name">
              Store Name <span className="text-error">*</span>
            </label>
            <input
              id="name" name="name" type="text" required
              value={form.name} onChange={handleChange}
              placeholder="E.g. Velvet & Vine"
              className="w-full h-10 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-on-surface" htmlFor="description">Store Description</label>
            <textarea
              id="description" name="description" rows={3}
              value={form.description} onChange={handleChange}
              placeholder="Briefly describe what your store offers..."
              className="w-full px-4 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface" htmlFor="email">
                Store Email <span className="text-error">*</span>
              </label>
              <input
                id="email" name="email" type="email" required
                value={form.email} onChange={handleChange}
                placeholder="contact@yourstore.com"
                className="w-full h-10 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface" htmlFor="phone">Store Phone</label>
              <input
                id="phone" name="phone" type="tel"
                value={form.phone} onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full h-10 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="relative pt-2 pb-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-xs font-bold tracking-wider text-outline uppercase">
                Store Address (Optional)
              </span>
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface" htmlFor="address">Street Address</label>
              <input
                id="address" name="address" type="text"
                value={form.address} onChange={handleChange}
                placeholder="123 Luxury Ave, Suite 100"
                className="w-full h-10 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-on-surface" htmlFor="city">City</label>
                <input
                  id="city" name="city" type="text"
                  value={form.city} onChange={handleChange}
                  placeholder="London"
                  className="w-full h-10 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-on-surface" htmlFor="state">State / Province</label>
                <input
                  id="state" name="state" type="text"
                  value={form.state} onChange={handleChange}
                  placeholder="Greater London"
                  className="w-full h-10 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-on-surface" htmlFor="pincode">Pincode</label>
                <input
                  id="pincode" name="pincode" type="text"
                  value={form.pincode} onChange={handleChange}
                  placeholder="W1A 1AA"
                  className="w-full h-10 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div className="space-y-1.5 pt-2">
            <label className="text-sm font-semibold text-on-surface">Store Logo</label>
            <div className="border border-dashed border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-surface-container-lowest hover:border-primary transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Upload className="w-5 h-5 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-on-surface">Click to upload or drag and drop</p>
                <p className="text-xs text-on-surface-variant mt-1">SVG, PNG, JPG or GIF (max. 2MB)</p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !form.name || !form.email}
              className="w-full h-11 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                'Create My Store'
              )}
            </button>
            <p className="text-xs text-center text-on-surface-variant mt-3">
              Your store will be reviewed by our team for quality standards. You&apos;ll receive an email once approved and your dashboard features will be unlocked.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
