'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  FileText, 
  Wallet, 
  Settings, 
  LogOut,
  Search,
  Bell,
  HelpCircle,
  Store
} from 'lucide-react';
import Link from 'next/link';

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const { user, store, storeLoading, isAuthenticated, isLoading, logout, fetchUser, fetchStore } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const isOnboarding = !store && !storeLoading && isAuthenticated && user?.role === 'seller';
  const isSetupPage = pathname === '/seller/store/setup';

  useEffect(() => {
    setMounted(true);
    if (!user && !isAuthenticated) {
      fetchUser();
    }
  }, [user, isAuthenticated, fetchUser]);

  // Fetch store when authenticated seller loads
  useEffect(() => {
    if (isAuthenticated && user?.role === 'seller' && !store && !storeLoading) {
      fetchStore();
    }
  }, [isAuthenticated, user, store, storeLoading, fetchStore]);

  useEffect(() => {
    if (pathname === '/seller/login' || pathname === '/seller/register') return;
    
    if (!isLoading && !isAuthenticated) {
      router.push('/seller/login');
    } else if (!isLoading && user) {
      const isSeller = user.role === 'seller';
      if (!isSeller) {
        router.push('/');
      }
    }
  }, [isLoading, isAuthenticated, user, router, pathname]);

  // Redirect to setup if no store and not already on setup page
  useEffect(() => {
    if (isOnboarding && !isSetupPage && !isLoading && !storeLoading) {
      router.push('/seller/store/setup');
    }
  }, [isOnboarding, isSetupPage, isLoading, storeLoading, router]);

  if (pathname === '/seller/login' || pathname === '/seller/register') {
    return <>{children}</>;
  }

  if (!mounted || isLoading || !isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface">
         <span className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/seller/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/seller/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/seller/products', icon: Package },
    { name: 'Orders', href: '/seller/orders', icon: ShoppingCart },
    { name: 'KYC & Compliance', href: '/seller/kyc', icon: FileText },
    { name: 'Wallet & Earnings', href: '/seller/wallet', icon: Wallet },
  ];

  return (
    <div className="bg-background text-on-background antialiased overflow-x-hidden">
      {/* SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 border-r border-outline-variant bg-surface flex flex-col py-stack-lg z-50">
        <div className="px-6 mb-10">
          <h1 className="font-headline-sm text-xl font-bold text-primary">Aetheris Luxe</h1>
          <p className="text-on-surface-variant font-label-sm">Merchant Portal</p>
        </div>
        
        <nav className="flex-1 space-y-1 px-4">
          {/* Store Setup nav item — shown only during onboarding */}
          {isOnboarding && (
            <Link
              href="/seller/store/setup"
              className="flex items-center gap-3 px-4 py-3 font-body-md text-primary bg-surface-container-low border-l-2 border-primary font-semibold"
            >
              <Store className="w-5 h-5" />
              <span>Store Setup</span>
            </Link>
          )}

          {navItems.map((item) => {
            const isActive = !isOnboarding && (pathname === item.href || pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.name}
                href={isOnboarding ? '#' : item.href}
                onClick={isOnboarding ? (e) => e.preventDefault() : undefined}
                className={`flex items-center gap-3 px-4 py-3 font-body-md transition-colors duration-200 ${
                  isOnboarding
                    ? 'text-on-surface-variant/40 cursor-not-allowed'
                    : isActive 
                      ? 'text-primary bg-surface-container-low border-l-2 border-primary font-semibold' 
                      : 'text-on-surface-variant hover:bg-surface-container-lowest'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="px-4 mt-auto space-y-1">
          <Link
            href="/seller/settings"
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-lowest transition-colors duration-200 rounded-lg"
          >
            <Settings className="w-5 h-5" />
            <span className="font-body-md">Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-error hover:bg-error-container/10 transition-colors duration-200 rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-body-md">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 min-h-screen transition-all duration-300">
        {/* TopAppBar */}
        <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-gutter z-40">
          <div className="flex items-center gap-4 bg-surface-container px-4 py-2 rounded-xl w-96">
            <Search className="w-5 h-5 text-outline" />
            <input 
              className="bg-transparent border-none focus:ring-0 w-full text-body-md font-body-md outline-none" 
              placeholder="Search portal..." 
              type="text"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-on-surface-variant hover:text-primary transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-surface"></span>
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-outline-variant">
              <div className="text-right">
                <p className="font-label-md font-bold text-on-surface">{user?.name}</p>
                <p className="text-[10px] uppercase tracking-wider font-bold">
                  {isOnboarding ? (
                    <span className="text-amber-600">PENDING SETUP</span>
                  ) : (
                    <span className="text-on-surface-variant">Premium Seller</span>
                  )}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full border border-outline-variant object-cover bg-primary-container text-on-primary flex items-center justify-center font-bold">
                {user?.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <div className="pt-24 px-gutter pb-12 max-w-container-max mx-auto space-y-gutter">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="ml-64 py-6 border-t border-outline-variant bg-surface-container-low">
        <div className="flex flex-col sm:flex-row justify-between items-center px-gutter max-w-container-max mx-auto">
          <p className="text-xs text-on-surface-variant">© 2026 Aetheris Luxe. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-2 sm:mt-0">
            <a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors">Cookie Settings</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
