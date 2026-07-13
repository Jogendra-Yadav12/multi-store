<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Support\Str;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $cart = $this->getCart($request);
        
        $cart->load(['items.product', 'items.variant.attributes.attributeValue']);

        return response()->json(['success' => true, 'data' => $cart]);
    }

    public function add(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'variant_id' => 'nullable|exists:product_variants,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = $this->getCart($request);

        $cartItem = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $validated['product_id'])
            ->where('variant_id', $validated['variant_id'] ?? null)
            ->first();

        if ($cartItem) {
            $cartItem->increment('quantity', $validated['quantity']);
        } else {
            CartItem::create(array_merge($validated, ['cart_id' => $cart->id]));
        }

        return response()->json(['success' => true, 'message' => 'Item added to cart']);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate(['quantity' => 'required|integer|min:1']);
        
        CartItem::findOrFail($id)->update(['quantity' => $validated['quantity']]);

        return response()->json(['success' => true, 'message' => 'Cart updated']);
    }

    public function remove($id)
    {
        CartItem::findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Item removed from cart']);
    }

    private function getCart(Request $request)
    {
        if (auth('sanctum')->check()) {
            return Cart::firstOrCreate(['user_id' => auth('sanctum')->id()]);
        }
        
        $sessionId = $request->header('X-Session-ID');
        if (!$sessionId) {
            $sessionId = Str::uuid()->toString();
        }

        return Cart::firstOrCreate(['session_id' => $sessionId]);
    }
}
