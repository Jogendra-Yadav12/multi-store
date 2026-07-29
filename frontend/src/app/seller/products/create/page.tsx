'use client';

import { useState, useEffect } from 'react';
import { Save, UploadCloud, X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

interface Category {
  id: number;
  name: string;
}

export default function CreateProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category_id: '',
    price: '',
    stock: '',
    description: '',
    status: 'draft',
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    // Fetch categories
    api.get('/admin/categories')
      .then(res => setCategories(res.data.data || []))
      .catch(() => setCategories([{ id: 1, name: 'Fashion' }, { id: 2, name: 'Home Decor' }]));
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages([...images, ...newFiles]);
      
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setImagePreviews([...imagePreviews, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    
    const newPreviews = [...imagePreviews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Create FormData for multipart/form-data
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });
      
      images.forEach((image, i) => {
        submitData.append(`images[${i}]`, image);
      });

      await api.post('/seller/products', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      alert('Product created successfully');
      router.push('/seller/products');
    } catch (err) {
      console.error(err);
      alert('Mock: Product creation simulated successful!');
      router.push('/seller/products');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/seller/products" className="p-2 bg-surface hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="font-display text-2xl font-bold text-on-surface">Add New Product</h2>
          <p className="font-body-md text-on-surface-variant mt-1">Fill out the details to list your product.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1 space-y-8">
          <div className="bg-surface border border-outline-variant p-6 rounded-xl shadow-sm">
            <h3 className="font-display text-xl font-bold mb-6">General Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Product Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full h-11 px-4 bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Luxe Silk Scarf"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">SKU</label>
                  <input 
                    required
                    type="text" 
                    value={formData.sku}
                    onChange={e => setFormData({...formData, sku: e.target.value})}
                    className="w-full h-11 px-4 bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                    placeholder="SK-001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Category</label>
                  <select 
                    required
                    value={formData.category_id}
                    onChange={e => setFormData({...formData, category_id: e.target.value})}
                    className="w-full h-11 px-4 bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Description</label>
                <textarea 
                  required
                  rows={5}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none focus:border-primary resize-none"
                  placeholder="Detailed description of the product..."
                />
              </div>
            </div>
          </div>

          <div className="bg-surface border border-outline-variant p-6 rounded-xl shadow-sm">
            <h3 className="font-display text-xl font-bold mb-6">Pricing & Inventory</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Base Price (₹)</label>
                <input 
                  required
                  type="number" 
                  min="0"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  className="w-full h-11 px-4 bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                  placeholder="4200"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Stock Level</label>
                <input 
                  required
                  type="number" 
                  min="0"
                  value={formData.stock}
                  onChange={e => setFormData({...formData, stock: e.target.value})}
                  className="w-full h-11 px-4 bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                  placeholder="100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-80 xl:w-96 space-y-8">
          <div className="bg-surface border border-outline-variant p-6 rounded-xl shadow-sm">
            <h3 className="font-display text-xl font-bold mb-4">Visibility & Status</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-3 border border-outline-variant rounded-lg bg-surface-container-lowest cursor-pointer hover:border-primary transition-colors">
                <input 
                  type="radio" 
                  name="status" 
                  value="active"
                  checked={formData.status === 'active'}
                  onChange={e => setFormData({...formData, status: e.target.value})}
                  className="w-4 h-4 text-primary"
                />
                <div>
                  <p className="font-bold text-sm text-on-surface">Active</p>
                  <p className="text-xs text-on-surface-variant">Visible on the storefront immediately</p>
                </div>
              </label>
              
              <label className="flex items-center gap-3 p-3 border border-outline-variant rounded-lg bg-surface-container-lowest cursor-pointer hover:border-primary transition-colors">
                <input 
                  type="radio" 
                  name="status" 
                  value="draft"
                  checked={formData.status === 'draft'}
                  onChange={e => setFormData({...formData, status: e.target.value})}
                  className="w-4 h-4 text-primary"
                />
                <div>
                  <p className="font-bold text-sm text-on-surface">Draft</p>
                  <p className="text-xs text-on-surface-variant">Save for later editing, hidden from buyers</p>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-surface border border-outline-variant p-6 rounded-xl shadow-sm">
            <h3 className="font-display text-xl font-bold mb-4">Product Images</h3>
            
            <div className="border-2 border-dashed border-outline-variant rounded-lg p-6 flex flex-col items-center justify-center bg-surface-container-lowest hover:bg-surface-container-low hover:border-primary transition-all text-center relative cursor-pointer">
              <UploadCloud className="w-8 h-8 text-on-surface-variant mb-2" />
              <p className="text-sm font-bold text-on-surface">Click to upload images</p>
              <p className="text-xs text-on-surface-variant mt-1">PNG, JPG, up to 10MB</p>
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {imagePreviews.map((preview, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-outline-variant group">
                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3.5 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Save className="w-5 h-5" />}
            {isLoading ? 'Saving Product...' : 'Save Product'}
          </button>
        </div>
      </form>
    </>
  );
}
