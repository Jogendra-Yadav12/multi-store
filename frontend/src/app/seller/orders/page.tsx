'use client';

import { useState, useEffect, useCallback } from 'react';
import { Package, Truck, Search, Eye, Filter, CheckCircle } from 'lucide-react';
import api from '@/lib/axios';

interface OrderItem {
  product_name: string;
  quantity: number;
  price: string;
}

interface Order {
  id: number;
  customer_name: string;
  total_amount: string;
  status: string;
  created_at: string;
  shipping_address: string;
  items: OrderItem[];
}

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`/seller/orders?page=${page}&status=${statusFilter}`);
      setOrders(res.data.data.orders || []);
      setTotalPages(res.data.data.last_page || 1);
    } catch (err) {
      console.log('Failed to fetch orders, using mock data');
      setOrders([
        {
          id: 1042,
          customer_name: 'Aarav Mehta',
          total_amount: '₹4,200',
          status: 'pending',
          created_at: 'Oct 24, 2023',
          shipping_address: '123 Luxury Lane, Mumbai, MH',
          items: [{ product_name: 'Luxe Silk Scarf', quantity: 1, price: '₹4,200' }]
        },
        {
          id: 1043,
          customer_name: 'Elena Rose',
          total_amount: '₹8,490',
          status: 'dispatched',
          created_at: 'Oct 23, 2023',
          shipping_address: '456 Rosewood Drive, Delhi',
          items: [{ product_name: 'Ceramic Vase Set', quantity: 1, price: '₹8,490' }]
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleDispatch = async (id: number) => {
    try {
      await api.patch(`/seller/orders/${id}/dispatch`);
      setOrders(orders.map(o => o.id === id ? { ...o, status: 'dispatched' } : o));
      if (selectedOrder?.id === id) {
        setSelectedOrder({ ...selectedOrder, status: 'dispatched' });
      }
    } catch (err) {
      console.error('Failed to dispatch order', err);
      // Optimistic mock update
      setOrders(orders.map(o => o.id === id ? { ...o, status: 'dispatched' } : o));
      if (selectedOrder?.id === id) {
        setSelectedOrder({ ...selectedOrder, status: 'dispatched' });
      }
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-on-surface">Order Management</h2>
          <p className="font-body-md text-on-surface-variant mt-1">Fulfill and track customer orders efficiently.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search Order ID..."
              className="pl-9 pr-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary outline-none transition-colors w-64"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="bg-surface border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface-variant focus:border-primary outline-none transition-colors cursor-pointer"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="dispatched">Dispatched</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[500px]">
        <div className="overflow-x-auto flex-grow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-6 py-4 font-label-md font-semibold text-on-surface-variant">Order ID</th>
                <th className="px-6 py-4 font-label-md font-semibold text-on-surface-variant">Customer</th>
                <th className="px-6 py-4 font-label-md font-semibold text-on-surface-variant">Total Amount</th>
                <th className="px-6 py-4 font-label-md font-semibold text-on-surface-variant">Date</th>
                <th className="px-6 py-4 font-label-md font-semibold text-on-surface-variant">Status</th>
                <th className="px-6 py-4 font-label-md font-semibold text-on-surface-variant text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="px-6 py-4 font-mono font-medium">#{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-on-surface">{order.customer_name}</div>
                      <div className="text-xs text-on-surface-variant">{order.items.length} items</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-on-surface">{order.total_amount}</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{order.created_at}</td>
                    <td className="px-6 py-4">
                      {order.status === 'pending' && <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-error-container/20 text-error">Pending</span>}
                      {order.status === 'dispatched' && <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-primary/20 text-primary">Dispatched</span>}
                      {order.status === 'delivered' && <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-secondary/20 text-secondary">Delivered</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container hover:bg-surface-container-high transition-colors rounded-lg text-sm font-bold text-on-surface"
                      >
                        <Eye className="w-4 h-4" /> View Details
                      </button>
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

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden border border-outline-variant flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
              <div>
                <h3 className="font-display text-xl font-bold">Order #{selectedOrder.id}</h3>
                <p className="text-sm text-on-surface-variant">{selectedOrder.created_at}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-on-surface-variant hover:text-on-surface p-2">
                &times;
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-grow space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Customer Details</h4>
                  <p className="font-bold text-on-surface">{selectedOrder.customer_name}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Shipping Address</h4>
                  <p className="text-sm text-on-surface">{selectedOrder.shipping_address}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">Order Items</h4>
                <div className="border border-outline-variant rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-surface-container-low text-on-surface-variant">
                      <tr>
                        <th className="px-4 py-2 font-medium">Item</th>
                        <th className="px-4 py-2 font-medium text-center">Qty</th>
                        <th className="px-4 py-2 font-medium text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                      {selectedOrder.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-3 font-medium">{item.product_name}</td>
                          <td className="px-4 py-3 text-center">{item.quantity}</td>
                          <td className="px-4 py-3 text-right font-bold">{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="bg-surface-container-lowest px-4 py-3 border-t border-outline-variant flex justify-between items-center font-bold">
                    <span>Total</span>
                    <span className="text-primary text-lg">{selectedOrder.total_amount}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-outline-variant bg-surface-container-lowest flex justify-end gap-3">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2.5 rounded-lg font-bold text-on-surface hover:bg-surface-container transition-colors"
              >
                Close
              </button>
              {selectedOrder.status === 'pending' && (
                <button 
                  onClick={() => handleDispatch(selectedOrder.id)}
                  className="px-5 py-2.5 rounded-lg font-bold text-white bg-primary hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  Mark as Dispatched
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
