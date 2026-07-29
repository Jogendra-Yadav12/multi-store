'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import Link from 'next/link';

export default function SellerLoginPage() {
  const router = useRouter();
  const { login, fetchStore } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.success) {
        const user = response.data.data.user;
        if (user.role !== 'seller') {
          toast.error("Access Denied: This portal is strictly for Vendors. Please use the Customer login.");
          return;
        }
        toast.success('Logged in successfully!');
        login(response.data.data.access_token, user);
        
        // Check if seller has a store
        try {
          await fetchStore();
          const store = useAuthStore.getState().store;
          if (store) {
            router.push('/seller/dashboard');
          } else {
            router.push('/seller/store/setup');
          }
        } catch {
          router.push('/seller/store/setup');
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left Panel: Brand & Illustration */}
      <section className="hidden md:flex md:w-1/2 bg-surface-container-high p-12 flex-col justify-between relative overflow-hidden">
        <div className="z-10">
          <Link href="/" className="font-display text-3xl font-bold text-primary-container">Aetheris Luxe <span className="text-sm font-normal text-on-surface-variant ml-2">Vendor Portal</span></Link>
        </div>
        <div className="z-10 max-w-md">
          <h1 className="font-display text-4xl text-on-surface mb-stack-md leading-tight">
            Manage your boutique with precision.
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-sm">
            Streamline workflows, manage inventory, and reach global audiences with a single, elegant command center.
          </p>
        </div>
        <div className="z-10 flex items-center gap-stack-sm text-on-surface-variant text-sm">
          <span>Join a network of over 500+ premium vendors.</span>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.6,-31.3,87,-15.7,86.1,-0.5C85.2,14.6,80.1,29.2,71.8,41.9C63.5,54.6,52,65.4,38.6,72.6C25.2,79.8,10,83.4,-4.3,90.8C-18.6,98.2,-37.2,109.4,-52.1,105.1C-67,100.8,-78.2,81,-85.4,62.1C-92.6,43.2,-95.8,25.2,-95.5,7.5C-95.2,-10.2,-91.4,-27.6,-82.1,-41.8C-72.8,-56,-58,-67,-42.6,-73.4C-27.2,-79.8,-11.2,-81.6,2.4,-85.7C16,-89.8,31.3,-83.6,44.7,-76.4Z" fill="#4f46e5" transform="translate(100 100)"></path>
          </svg>
        </div>
      </section>

      {/* Right Panel: Login Interaction */}
      <section className="flex-1 bg-surface-container-lowest flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-[440px]">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg shadow-sm">
            <div className="text-center mb-stack-lg">
              <h2 className="font-display text-2xl font-bold text-on-surface mb-stack-xs">Vendor Login</h2>
              <p className="font-body-md text-on-surface-variant">Access your enterprise command center</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-stack-md">
              <div>
                <label className="block text-sm text-on-surface mb-2" htmlFor="email">Vendor Email</label>
                <input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-stack-md bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md outline-none focus:border-primary-container transition-all" 
                  id="email" 
                  placeholder="vendor@company.com" 
                  type="email"
                  required
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm text-on-surface" htmlFor="password">Password</label>
                </div>
                <input 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 px-stack-md bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md outline-none focus:border-primary-container transition-all" 
                  id="password" 
                  placeholder="••••••••" 
                  type="password"
                  required
                />
              </div>
              <button 
                disabled={isLoading}
                className="w-full h-10 mt-stack-md bg-primary-container text-on-primary text-sm font-bold rounded-lg hover:bg-primary transition-all duration-200" 
                type="submit"
              >
                {isLoading ? 'Authenticating...' : 'Sign In as Vendor'}
              </button>
            </form>
          </div>
          <div className="mt-stack-lg flex justify-center gap-4 text-sm text-outline">
            <Link href="/login" className="hover:text-primary-container transition-colors font-medium">Shop as Buyer</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
