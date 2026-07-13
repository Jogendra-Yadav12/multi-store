<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use App\Models\ProductVariantAttribute;
use App\Models\ProductAttributeValue;

class ProductController extends Controller
{
    // --- Public Routes ---
    public function index(Request $request)
    {
        $query = Product::where('status', 'active')
            ->where('admin_approved', true)
            ->with(['category', 'images' => function($q) { $q->where('is_primary', true); }]);

        if ($request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        return response()->json(['success' => true, 'data' => $query->paginate(20)]);
    }

    public function show($slug)
    {
        $product = Product::where('slug', $slug)
            ->where('status', 'active')
            ->where('admin_approved', true)
            ->with(['category', 'images', 'variants.attributes.attributeValue', 'attributes.attribute'])
            ->firstOrFail();

        return response()->json(['success' => true, 'data' => $product]);
    }

    // --- Seller Routes ---
    public function sellerIndex(Request $request)
    {
        $products = Product::where('seller_id', $request->user()->id)
            ->with('images', 'variants')
            ->get();
        return response()->json(['success' => true, 'data' => $products]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:products,slug',
            'short_description' => 'nullable|string',
            'description' => 'required|string',
            'base_price' => 'required|numeric|min:0',
            'compare_price' => 'nullable|numeric|min:0',
            'images' => 'required|array',
            'images.*' => 'string', // URLs
            'variants' => 'nullable|array',
            'variants.*.sku' => 'required|string|unique:product_variants,sku',
            'variants.*.price' => 'required|numeric',
            'variants.*.stock_quantity' => 'required|integer',
            'variants.*.attributes' => 'required|array',
            'variants.*.attributes.*.attribute_id' => 'required|exists:attributes,id',
            'variants.*.attributes.*.attribute_value_id' => 'required|exists:attribute_values,id',
        ]);

        $product = Product::create([
            'seller_id' => $request->user()->id,
            'category_id' => $validated['category_id'],
            'name' => $validated['name'],
            'slug' => $validated['slug'],
            'short_description' => $validated['short_description'],
            'description' => $validated['description'],
            'base_price' => $validated['base_price'],
            'compare_price' => $validated['compare_price'],
            'status' => 'draft', // Requires admin approval
            'admin_approved' => false
        ]);

        // Save Images
        foreach ($validated['images'] as $index => $imageUrl) {
            ProductImage::create([
                'product_id' => $product->id,
                'image_path' => $imageUrl,
                'sort_order' => $index,
                'is_primary' => $index === 0
            ]);
        }

        // Save Variants
        if (!empty($validated['variants'])) {
            foreach ($validated['variants'] as $vData) {
                $variant = ProductVariant::create([
                    'product_id' => $product->id,
                    'sku' => $vData['sku'],
                    'price' => $vData['price'],
                    'stock_quantity' => $vData['stock_quantity']
                ]);

                foreach ($vData['attributes'] as $attr) {
                    ProductVariantAttribute::create([
                        'variant_id' => $variant->id,
                        'attribute_id' => $attr['attribute_id'],
                        'attribute_value_id' => $attr['attribute_value_id']
                    ]);
                }
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Product created successfully. Awaiting admin approval.',
            'data' => $product->load('images', 'variants')
        ], 201);
    }

    // --- Admin Routes ---
    public function adminApprove($id)
    {
        $product = Product::findOrFail($id);
        $product->update([
            'admin_approved' => true,
            'status' => 'active'
        ]);

        return response()->json(['success' => true, 'message' => 'Product approved and active.']);
    }

    public function adminReject($id)
    {
        $product = Product::findOrFail($id);
        $product->update([
            'admin_approved' => false,
            'status' => 'rejected'
        ]);

        return response()->json(['success' => true, 'message' => 'Product rejected.']);
    }
}
