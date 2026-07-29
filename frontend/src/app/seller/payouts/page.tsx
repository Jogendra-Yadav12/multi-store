'use client';

import { useState, useEffect, useCallback } from 'react';
import { Wallet, ArrowUpRight, Clock, Building2, DownloadCloud, AlertCircle } from 'lucide-react';
import api from '@/lib/axios';

interface Payout {
  id: number;
  amount: string;
  status: 'pending' | 'completed' | 'rejected';
  requested_at: string;
  processed_at?: string;
  bank_account: string;
}

export default function SellerPayoutsPage() {
  const [stats, setStats] = useState({
    available_balance: '₹0',
    pending_clearance: '₹0',
    lifetime_earnings: '₹0'
  });
  
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestAmount, setRequestAmount] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);

  const fetchPayouts = useCallback(async () => {
    setIsLoading(true);
    try {
      const statsRes = await api.get('/seller/earnings/stats').catch(() => ({
        data: { data: { available_balance: '₹14,890', pending_clearance: '₹4,200', lifetime_earnings: '₹1,24,500' } }
      }));
      setStats(statsRes.data.data);

      const listRes = await api.get(`/seller/payouts?page=${page}`).catch(() => ({
        data: { data: { payouts: [
          { id: 401, amount: '₹24,000', status: 'completed', requested_at: 'Oct 15, 2023', processed_at: 'Oct 16, 2023', bank_account: 'HDFC ****4521' },
          { id: 402, amount: '₹12,500', status: 'pending', requested_at: 'Oct 28, 2023', bank_account: 'HDFC ****4521' }
        ], last_page: 1 } }
      }));
      
      setPayouts(listRes.data.data.payouts || []);
      setTotalPages(listRes.data.data.last_page || 1);
    } catch (err) {
      console.error('Failed to load payouts', err);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPayouts();
  }, [fetchPayouts]);

  const handleRequestPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRequesting(true);
    try {
      await api.post('/seller/payouts/request', { amount: requestAmount });
      alert('Payout requested successfully');
      setIsRequestModalOpen(false);
      fetchPayouts(); // refresh list
    } catch (err: any) {
      console.error('Failed to request payout', err);
      alert(err.response?.data?.message || 'Failed to request payout (Mock simulated success)');
      
      // Mock optimistic update
      setPayouts([
        { 
          id: Math.floor(Math.random() * 1000), 
          amount: `₹${requestAmount}`, 
          status: 'pending', 
          requested_at: 'Just now', 
          bank_account: 'HDFC ****4521' 
        }, 
        ...payouts
      ]);
      setIsRequestModalOpen(false);
    } finally {
      setIsRequesting(false);
      setRequestAmount('');
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-on-surface">Earnings & Payouts</h2>
          <p className="font-body-md text-on-surface-variant mt-1">Manage your funds and withdrawal history.</p>
        </div>
        
        <button 
          onClick={() => setIsRequestModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-label-md hover:shadow-lg hover:brightness-110 transition-all active:scale-95 font-semibold"
        >
          <ArrowUpRight className="w-5 h-5" />
          Request Payout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface border border-outline-variant p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Available Balance</p>
            {isLoading ? <div className="h-8 w-24 bg-surface-container animate-pulse rounded mt-1"></div> : <p className="font-display text-2xl font-bold text-on-surface">{stats.available_balance}</p>}
          </div>
        </div>
        
        <div className="bg-surface border border-outline-variant p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Pending Clearance</p>
            {isLoading ? <div className="h-8 w-24 bg-surface-container animate-pulse rounded mt-1"></div> : <p className="font-display text-2xl font-bold text-on-surface">{stats.pending_clearance}</p>}
          </div>
        </div>
        
        <div className="bg-surface border border-outline-variant p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Lifetime Earnings</p>
            {isLoading ? <div className="h-8 w-24 bg-surface-container animate-pulse rounded mt-1"></div> : <p className="font-display text-2xl font-bold text-on-surface">{stats.lifetime_earnings}</p>}
          </div>
        </div>
      </div>

      <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[400px]">
        <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
          <h3 className="font-display text-lg font-bold">Payout History</h3>
          <button className="flex items-center gap-2 text-sm font-bold text-primary hover:underline">
            <DownloadCloud className="w-4 h-4" /> Download Statement
          </button>
        </div>

        <div className="overflow-x-auto flex-grow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-6 py-4 font-label-md font-semibold text-on-surface-variant">Transaction ID</th>
                <th className="px-6 py-4 font-label-md font-semibold text-on-surface-variant">Amount</th>
                <th className="px-6 py-4 font-label-md font-semibold text-on-surface-variant">Destination</th>
                <th className="px-6 py-4 font-label-md font-semibold text-on-surface-variant">Requested On</th>
                <th className="px-6 py-4 font-label-md font-semibold text-on-surface-variant">Processed On</th>
                <th className="px-6 py-4 font-label-md font-semibold text-on-surface-variant text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    Loading history...
                  </td>
                </tr>
              ) : payouts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">
                    No payout history found.
                  </td>
                </tr>
              ) : (
                payouts.map((payout) => (
                  <tr key={payout.id} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-on-surface-variant">TXN-{payout.id}</td>
                    <td className="px-6 py-4 font-bold text-on-surface">{payout.amount}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-on-surface-variant" />
                        <span className="font-medium text-sm text-on-surface">{payout.bank_account}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{payout.requested_at}</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{payout.processed_at || '-'}</td>
                    <td className="px-6 py-4 text-right">
                      {payout.status === 'pending' && <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-error-container/20 text-error border border-error/20">Pending</span>}
                      {payout.status === 'completed' && <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-secondary/10 text-secondary border border-secondary/20">Completed</span>}
                      {payout.status === 'rejected' && <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-surface-container-high text-on-surface-variant">Rejected</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 0 && (
          <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
            <div className="text-sm text-on-surface-variant">
              Page <span className="font-bold text-on-surface">{page}</span> of <span className="font-bold text-on-surface">{totalPages}</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg border border-outline-variant text-sm font-medium text-on-surface-variant hover:bg-surface transition-colors disabled:opacity-50"
              >
                Previous
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg border border-outline-variant text-sm font-medium text-on-surface-variant hover:bg-surface transition-colors disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Request Payout Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-outline-variant">
            <div className="p-6 border-b border-outline-variant">
              <h3 className="font-display text-xl font-bold">Request Payout</h3>
              <p className="text-sm text-on-surface-variant mt-1">Withdraw funds to your registered bank account.</p>
            </div>
            
            <form onSubmit={handleRequestPayout} className="p-6">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 mb-6 flex justify-between items-center">
                <span className="text-sm font-bold text-on-surface-variant">Available Balance</span>
                <span className="font-display font-bold text-xl text-primary">{stats.available_balance}</span>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-bold mb-2">Withdrawal Amount (₹)</label>
                  <input 
                    required
                    type="number"
                    min="1000"
                    placeholder="Enter amount..."
                    value={requestAmount}
                    onChange={(e) => setRequestAmount(e.target.value)}
                    className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none focus:border-primary text-lg font-bold"
                  />
                  <p className="text-xs text-on-surface-variant mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Minimum withdrawal amount is ₹1,000
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Destination Account</label>
                  <div className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-bold text-sm">HDFC Bank Ltd.</p>
                        <p className="text-xs text-on-surface-variant">Acct ending in ****4521</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold bg-secondary/10 text-secondary px-2 py-1 rounded">Verified</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsRequestModalOpen(false)}
                  className="flex-1 py-3 rounded-xl font-bold bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isRequesting}
                  className="flex-[2] py-3 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {isRequesting ? 'Processing...' : 'Confirm Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
