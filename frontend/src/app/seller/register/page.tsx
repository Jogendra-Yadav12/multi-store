'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Zap, Users, ShieldCheck, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SellerRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    storeName: '',
    storeSlug: '',
    category: '',
    phone: '',
    password: '',
    passwordConfirm: '',
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (val: string) => {
    setFormData({ ...formData, password: val });
    let strength = 0;
    if (val.length > 5) strength += 25;
    if (val.length > 10) strength += 25;
    if (/[A-Z]/.test(val)) strength += 25;
    if (/[0-9]/.test(val) || /[^A-Za-z0-9]/.test(val)) strength += 25;
    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-error';
    if (passwordStrength <= 50) return 'bg-tertiary-fixed-dim';
    if (passwordStrength <= 75) return 'bg-secondary';
    return 'bg-secondary-fixed-dim';
  };

  const getStrengthLabel = () => {
    if (passwordStrength <= 25) return 'Weak';
    if (passwordStrength <= 50) return 'Fair';
    if (passwordStrength <= 75) return 'Good';
    return 'Strong';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      alert("Passwords don't match");
      return;
    }
    
    setIsLoading(true);
    try {
      // using dynamic import of axios if needed, but let's assume api from '@/lib/axios'
      const { default: api } = await import('@/lib/axios');
      await api.post('/auth/seller/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        store_name: formData.storeName,
        store_slug: formData.storeSlug,
        category: formData.category,
        phone: formData.phone
      });
      alert('Registration successful! Please login.');
      router.push('/seller/login');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-on-surface bg-surface flex flex-col font-body-md">
      <main className="flex flex-1 overflow-hidden">
        {/* Left Side: Marketing Panel */}
        <section className="hidden lg:flex w-5/12 bg-primary-container relative flex-col justify-between p-12 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent"></div>
          
          <div className="relative z-10">
            <div className="mb-12">
              <span className="font-display text-2xl font-bold tracking-tight">Aetheris Luxe</span>
              <span className="block font-label-md mt-1 opacity-80 uppercase tracking-widest text-on-primary-container">Sellers Suite</span>
            </div>
            
            <h1 className="font-display text-4xl mb-8 leading-tight font-bold">Empower your brand with the world's most elegant selling platform.</h1>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-2 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">0% Commission on Pro Plans</h3>
                  <p className="text-on-primary-container opacity-90 mt-1">Keep every cent you earn with our transparent flat-fee model.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-2 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">Instant Payouts to Bank</h3>
                  <p className="text-on-primary-container opacity-90 mt-1">Real-time settlement ensures your cash flow never misses a beat.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-2 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">Reach Thousands of Buyers</h3>
                  <p className="text-on-primary-container opacity-90 mt-1">Tap into our global luxury marketplace and high-intent customer base.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 pt-12 border-t border-white/10">
            <p className="text-sm font-medium text-on-primary-container">Trusted by over 12,000 premium sellers worldwide.</p>
          </div>
        </section>

        {/* Right Side: Registration Form */}
        <section className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-surface overflow-y-auto">
          <div className="max-w-2xl w-full">
            <div className="lg:hidden mb-8">
              <span className="font-display text-2xl font-bold text-primary">Aetheris Luxe</span>
            </div>
            
            <div className="mb-10">
              <h2 className="font-display text-3xl font-bold mb-2">Create your store</h2>
              <p className="text-on-surface-variant">Tell us about your business and start selling in minutes.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 0: User Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="font-label-md text-on-surface" htmlFor="name">Full Name</label>
                  <input 
                    id="name"
                    required
                    type="text"
                    placeholder="John Doe"
                    className="w-full h-10 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-200"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-md text-on-surface" htmlFor="email">Email Address</label>
                  <input 
                    id="email"
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="w-full h-10 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-200"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="font-label-md text-on-surface" htmlFor="store-name">Store Name</label>
                  <input 
                    id="store-name"
                    required
                    type="text"
                    placeholder="E.g. Velvet & Vine"
                    className="w-full h-10 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-200"
                    value={formData.storeName}
                    onChange={(e) => {
                      setFormData({ 
                        ...formData, 
                        storeName: e.target.value,
                        storeSlug: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-')
                      })
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-md text-on-surface" htmlFor="store-slug">Store Slug</label>
                  <div className="relative">
                    <input 
                      id="store-slug"
                      required
                      type="text"
                      placeholder="store-name"
                      className="w-full h-10 px-4 pr-10 rounded-lg bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-200"
                      value={formData.storeSlug}
                      onChange={(e) => setFormData({ ...formData, storeSlug: e.target.value })}
                    />
                    {formData.storeSlug && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                        <CheckCircle2 className="w-5 h-5 text-secondary" />
                      </div>
                    )}
                  </div>
                  {formData.storeSlug && (
                    <div className="flex items-center gap-1.5 px-1 mt-1">
                      <span className="text-xs font-medium text-secondary">{formData.storeSlug}.aetheris.com</span>
                      <span className="text-xs text-on-surface-variant">is available</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="font-label-md text-on-surface" htmlFor="category">Business Category</label>
                  <select 
                    id="category"
                    required
                    className="w-full h-10 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-200 bg-white"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">Select category</option>
                    <option value="fashion">Fashion & Apparel</option>
                    <option value="jewelry">Fine Jewelry</option>
                    <option value="home">Home & Lifestyle</option>
                    <option value="art">Digital & Fine Art</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-label-md text-on-surface" htmlFor="phone">Contact Phone</label>
                  <input 
                    id="phone"
                    required
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full h-10 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-200"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="font-label-md text-on-surface" htmlFor="password">Password</label>
                  <input 
                    id="password"
                    required
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-10 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-200"
                    value={formData.password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                  />
                  <div className="pt-1">
                    <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${getStrengthColor()}`} style={{ width: `${passwordStrength}%` }}></div>
                    </div>
                    {formData.password && (
                      <p className="text-xs text-on-surface-variant mt-1.5 font-medium">Strength: {getStrengthLabel()}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="font-label-md text-on-surface" htmlFor="confirm-password">Confirm Password</label>
                  <input 
                    id="confirm-password"
                    required
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-10 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-200"
                    value={formData.passwordConfirm}
                    onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant">
                <div className="flex items-center gap-3 mb-8 mt-4">
                  <input 
                    id="terms"
                    required
                    type="checkbox"
                    className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                  />
                  <label className="text-sm text-on-surface-variant" htmlFor="terms">
                    I agree to the <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
                  </label>
                </div>
                
                <button 
                  disabled={isLoading}
                  type="submit"
                  className="w-full md:w-auto px-10 h-12 rounded-lg bg-primary text-white font-label-md font-bold shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {isLoading ? 'Creating Account...' : 'Launch Store'}
                </button>
                <Link href="/seller/login" className="block md:inline-block md:ml-4 text-center mt-4 md:mt-0 text-primary font-medium hover:underline">
                  Already have an account? Sign in
                </Link>
              </div>
            </form>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-on-surface-variant" />
                <span className="text-xs font-medium text-on-surface-variant">PCI DSS Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-on-surface-variant" />
                <span className="text-xs font-medium text-on-surface-variant">256-bit SSL Security</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="w-full bg-surface py-6 px-6 border-t border-outline-variant z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xs font-medium text-on-surface-variant">© 2026 Aetheris Luxe. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="#" className="text-xs font-medium text-on-surface-variant hover:text-primary transition-colors">Help Center</Link>
            <Link href="#" className="text-xs font-medium text-on-surface-variant hover:text-primary transition-colors">Contact Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
