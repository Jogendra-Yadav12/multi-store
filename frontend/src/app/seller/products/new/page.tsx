'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { toast } from 'sonner';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

const variantSchema = z.object({
  sku: z.string().min(2, "SKU is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  stock_quantity: z.coerce.number().min(0, "Stock cannot be negative"),
  attributes: z.array(z.object({
    attribute_id: z.number(),
    attribute_value_id: z.number()
  }))
});

const productSchema = z.object({
  name: z.string().min(3, "Name is required"),
  slug: z.string().min(3, "Slug is required"),
  category_id: z.coerce.number().min(1, "Category is required"),
  short_description: z.string().optional(),
  description: z.string().min(10, "Description is required"),
  base_price: z.coerce.number().min(0, "Base price must be positive"),
  compare_price: z.coerce.number().optional(),
  images: z.array(z.string().url("Must be a valid image URL")).min(1, "At least one image URL required"),
  variants: z.array(variantSchema).optional()
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');

  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      images: [],
      variants: []
    }
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: "images" as never
  });

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control,
    name: "variants"
  });

  useEffect(() => {
    // Fetch categories for the dropdown
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        if (response.data.success) {
          setCategories(response.data.data);
        }
      } catch (error) {
        toast.error('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  // Auto-generate slug from name
  const watchName = watch("name");
  useEffect(() => {
    if (watchName) {
      setValue('slug', watchName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  }, [watchName, setValue]);

  const addImageUrl = () => {
    if (imageUrlInput && imageUrlInput.startsWith('http')) {
      appendImage(imageUrlInput as never);
      setImageUrlInput('');
    } else {
      toast.error('Please enter a valid HTTP URL');
    }
  };

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await api.post('/products', data);
      if (response.data.success) {
        toast.success('Product created successfully! Awaiting approval.');
        router.push('/seller/products');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/seller/products" className="p-2 rounded-lg hover:bg-gray-100 transition">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-sm text-gray-500 mt-1">Create a new listing in your store catalog.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input {...register('name')} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Slug</label>
              <input {...register('slug')} className="w-full px-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-black outline-none" />
              {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select {...register('category_id')} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none">
                <option value="">Select a Category...</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id.message}</p>}
            </div>
          </div>
        </div>

        {/* Pricing & Description */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Pricing & Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (₹)</label>
              <input type="number" {...register('base_price')} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" />
              {errors.base_price && <p className="text-red-500 text-xs mt-1">{errors.base_price.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Compare at Price (₹) - Optional</label>
              <input type="number" {...register('compare_price')} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <input {...register('short_description')} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
              <textarea {...register('description')} rows={4} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Product Images</h2>
          <div className="flex gap-2">
            <input 
              value={imageUrlInput}
              onChange={(e) => setImageUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
            />
            <button type="button" onClick={addImageUrl} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition">
              Add URL
            </button>
          </div>
          {errors.images && <p className="text-red-500 text-xs">{errors.images.message}</p>}
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {imageFields.map((field, index) => (
              <div key={field.id} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square bg-gray-50">
                <img src={watch(`images.${index}` as never) as unknown as string} alt="" className="w-full h-full object-cover" />
                <button 
                  type="button" 
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1.5 bg-white text-red-500 rounded-full shadow opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Simplified Variants Section */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold">Variants (Optional)</h2>
            <button 
              type="button" 
              onClick={() => appendVariant({ sku: '', price: 0, stock_quantity: 0, attributes: [] })}
              className="text-sm font-medium text-black flex items-center hover:underline"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Variant
            </button>
          </div>
          
          {variantFields.map((field, index) => (
            <div key={field.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative">
              <button 
                type="button" 
                onClick={() => removeVariant(index)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pr-10">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">SKU</label>
                  <input {...register(`variants.${index}.sku`)} className="w-full px-2 py-1.5 text-sm border rounded" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Price Override</label>
                  <input type="number" {...register(`variants.${index}.price`)} className="w-full px-2 py-1.5 text-sm border rounded" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Stock Qty</label>
                  <input type="number" {...register(`variants.${index}.stock_quantity`)} className="w-full px-2 py-1.5 text-sm border rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition flex items-center"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            ) : null}
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
