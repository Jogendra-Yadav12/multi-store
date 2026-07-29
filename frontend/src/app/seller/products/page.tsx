'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, MoreVertical, Trash2, Edit, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/axios';

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: number;
  max_stock?: number;
  status: string;
  image: string;
}

export default function SellerProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`/seller/products?page=${page}&status=${statusFilter}&category=${categoryFilter}&search=${search}`);
      setProducts(res.data.data.products || []);
      setTotalPages(res.data.data.last_page || 1);
      setTotalProducts(res.data.data.total || 0);
    } catch (err) {
      console.log('Failed to fetch products, using mock');
      setProducts([
        {
          id: 1, name: 'Luxe Silk Scarf', sku: 'SK-001', category: 'Fashion', price: '₹4,200', stock: 120, max_stock: 150, status: 'active', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3bx7tfVeTYKcPG1TmWAj0ZtlBunG43tdKXf4AXKZkxgp2dm5rVYssv9nif-c9qYl0I_We6Us_pmu7jIr4LgVNKHYsVJ1Vsdtb8zK2yTmTZv9le1IYXR1S48hTz_61N2SXOf6rWc6cAsMJOxzhD-cnCULwWv1gEXIF-r7qCvZ3UdXFgMLhxucWeg71un7e5ykBPCMOBEasycQCl85hGe8fEdeYnCEhgO28ZbaJjOJJzTV731KddJUWyR8YmfpxWdTLCgSApSud252N'
        },
        {
          id: 2, name: 'Ceramic Vase Set', sku: 'CV-202', category: 'Home Decor', price: '₹8,490', stock: 4, max_stock: 50, status: 'active', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGKKe1qRmGhQmnVmW7EwjT5hNdQOMb63fjTGVaDXaEKDJ9sWuInkGYn-2-arxxi20l2414G5VqXuwK2VuAcRfpiUtgVh2orx5VLHTFTDXZrUQFfkfZrkdK2qydA1JmDZjepZ43kuZuWdJQhdFBAQrhGuR1ka3wZx8liCfcmb-8qGN15iQ5mIbrH0C2dbCEOXTgy7Cos5mnl3-2ODZQvz9JzEs5m3-XJnJDstvHy6IzuvSxDgIvYJNzYU0gkoJc9QCmO-0kOUQDxILR'
        }
      ]);
      setTotalPages(1);
      setTotalProducts(2);
    } finally {
      setIsLoading(false);
    }
  }, [page, statusFilter, categoryFilter, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/seller/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
      setActionMenuOpen(null);
    } catch (err) {
      console.error('Failed to delete product', err);
      // Optimistic update for mock
      setProducts(products.filter(p => p.id !== id));
      setActionMenuOpen(null);
    }
  };

  const getStockPercent = (stock: number, max: number = 100) => {
    return Math.min(100, Math.max(0, Math.round((stock / max) * 100)));
  };

  return (
    <>
      {/* Header & Action Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-on-surface">My Products</h2>
          <p className="font-body-md text-on-surface-variant mt-1">Manage your inventory and product visibility across the platform.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <input 
            type="text" 
            placeholder="Search products..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="bg-surface border border-outline-variant rounded-lg px-4 py-2 text-sm focus:border-primary outline-none transition-colors"
          />
          <div className="flex items-center gap-2">
            <select 
              value={categoryFilter}
              onChange={e => { setCategoryFilter(e.target.value); setPage(1); }}
              className="bg-surface border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface-variant focus:border-primary outline-none transition-colors cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="fashion">Fashion</option>
              <option value="home decor">Home Decor</option>
              <option value="accessories">Accessories</option>
            </select>
            <select 
              value={statusFilter}
              onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
              className="bg-surface border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface-variant focus:border-primary outline-none transition-colors cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          
          <Link href="/seller/products/create" className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-label-md hover:shadow-lg hover:brightness-110 transition-all active:scale-95 font-semibold">
            <Plus className="w-5 h-5" />
            Add New Product
          </Link>
        </div>
      </div>

      {/* Inventory Table Card */}
      <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm min-h-[400px] flex flex-col">
        <div className="overflow-x-auto flex-grow">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-6 py-4 font-label-md font-semibold text-on-surface-variant">Thumbnail</th>
                <th className="px-6 py-4 font-label-md font-semibold text-on-surface-variant">Name</th>
                <th className="px-6 py-4 font-label-md font-semibold text-on-surface-variant">SKU</th>
                <th className="px-6 py-4 font-label-md font-semibold text-on-surface-variant">Category</th>
                <th className="px-6 py-4 font-label-md font-semibold text-on-surface-variant">Base Price</th>
                <th className="px-6 py-4 font-label-md font-semibold text-on-surface-variant">Stock Level</th>
                <th className="px-6 py-4 font-label-md font-semibold text-on-surface-variant">Status</th>
                <th className="px-6 py-4 font-label-md font-semibold text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant relative">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-on-surface-variant">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    Loading products...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-on-surface-variant">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const percent = getStockPercent(product.stock, product.max_stock);
                  const isLow = percent < 15;
                  return (
                    <tr key={product.id} className="hover:bg-surface-container-lowest transition-colors group">
                      <td className="px-6 py-4">
                        <img 
                          src={product.image || 'https://via.placeholder.com/150'} 
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover border border-outline-variant" 
                        />
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-label-md font-bold text-on-surface">{product.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-on-surface-variant">{product.sku}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-surface-container-high text-on-surface-variant rounded text-[11px] font-bold uppercase tracking-wider">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-label-md font-bold text-on-surface">
                        {product.price}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5 w-32">
                          <div className={`flex justify-between text-[11px] font-medium ${isLow ? 'text-error' : 'text-on-surface-variant'}`}>
                            <span>{percent}% {isLow && 'Low'}</span>
                            <span>{product.stock} units</span>
                          </div>
                          <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${isLow ? 'bg-error' : 'bg-secondary'}`} style={{ width: `${percent}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {product.status.toLowerCase() === 'active' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-secondary/10 text-secondary border border-secondary/20">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-surface-dim text-on-surface-variant border border-outline-variant">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right relative">
                        <button 
                          onClick={() => setActionMenuOpen(actionMenuOpen === product.id ? null : product.id)}
                          className="p-2 hover:bg-surface-container-high rounded-full text-on-surface-variant transition-colors"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        {actionMenuOpen === product.id && (
                          <div className="absolute right-6 top-10 bg-white border border-outline-variant shadow-lg rounded-lg py-1 w-32 z-10 text-left">
                            <Link href={`/seller/products/${product.id}/edit`} className="flex items-center gap-2 px-4 py-2 hover:bg-surface-container-lowest text-sm text-on-surface transition-colors">
                              <Edit className="w-4 h-4" /> Edit
                            </Link>
                            <button onClick={() => handleDelete(product.id)} className="w-full flex items-center gap-2 px-4 py-2 hover:bg-surface-container-lowest text-sm text-error transition-colors">
                              <Trash2 className="w-4 h-4" /> Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {!isLoading && totalPages > 0 && (
          <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
            <div className="text-sm text-on-surface-variant">
              Showing page <span className="font-bold text-on-surface">{page}</span> of <span className="font-bold text-on-surface">{totalPages}</span> ({totalProducts} total)
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
    </>
  );
}
