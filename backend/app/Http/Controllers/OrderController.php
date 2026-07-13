<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderShipment;
use App\Models\CommissionRule;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'shipping_address' => 'required|array',
            'billing_address' => 'required|array',
            'payment_method' => 'required|string',
        ]);

        $cart = $this->getCart($request);
        
        if (!$cart || $cart->items->isEmpty()) {
            return response()->json(['success' => false, 'message' => 'Cart is empty'], 400);
        }

        $cart->load('items.product', 'items.variant');

        $subtotal = 0;
        $orderItemsData = [];
        $sellersMap = [];

        foreach ($cart->items as $item) {
            $price = $item->variant ? $item->variant->price : $item->product->base_price;
            $itemTotal = $price * $item->quantity;
            $subtotal += $itemTotal;

            // Simple Commission Logic (fetch fallback to 10%)
            $commissionRate = CommissionRule::where('seller_id', $item->product->seller_id)->value('rate') ?? 10.00;
            $commissionAmount = ($itemTotal * $commissionRate) / 100;
            $sellerEarning = $itemTotal - $commissionAmount;

            $orderItemsData[] = [
                'seller_id' => $item->product->seller_id,
                'product_id' => $item->product_id,
                'variant_id' => $item->variant_id,
                'product_name' => $item->product->name,
                'quantity' => $item->quantity,
                'unit_price' => $price,
                'total_price' => $itemTotal,
                'commission_rate' => $commissionRate,
                'commission_amount' => $commissionAmount,
                'seller_earning' => $sellerEarning,
                'status' => 'pending'
            ];

            $sellersMap[$item->product->seller_id] = true;
        }

        $order = Order::create([
            'order_number' => 'ORD-' . strtoupper(Str::random(10)),
            'buyer_id' => auth('sanctum')->id(), // Assuming logged-in for checkout for now
            'overall_status' => 'pending',
            'payment_method' => $validated['payment_method'],
            'shipping_address' => json_encode($validated['shipping_address']),
            'billing_address' => json_encode($validated['billing_address']),
            'subtotal' => $subtotal,
            'total' => $subtotal, // simplified
        ]);

        // Create Order Items
        foreach ($orderItemsData as $data) {
            $data['order_id'] = $order->id;
            OrderItem::create($data);
        }

        // Create Shipments (one per seller)
        foreach (array_keys($sellersMap) as $sellerId) {
            OrderShipment::create([
                'order_id' => $order->id,
                'seller_id' => $sellerId,
                'status' => 'pending'
            ]);
        }

        // Empty Cart
        $cart->items()->delete();

        return response()->json([
            'success' => true, 
            'message' => 'Order placed successfully',
            'data' => $order->load('items')
        ]);
    }

    private function getCart(Request $request)
    {
        if (auth('sanctum')->check()) {
            return Cart::where('user_id', auth('sanctum')->id())->first();
        }
        $sessionId = $request->header('X-Session-ID');
        return Cart::where('session_id', $sessionId)->first();
    }
}
