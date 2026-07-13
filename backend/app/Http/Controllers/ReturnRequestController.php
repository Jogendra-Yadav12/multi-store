<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\ReturnRequest;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class ReturnRequestController extends Controller
{
    // Buyer: Request a return
    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_item_id' => 'required|exists:order_items,id',
            'reason' => 'required|string',
            'details' => 'nullable|string'
        ]);

        $orderItem = OrderItem::whereHas('order', function ($query) use ($request) {
            $query->where('buyer_id', $request->user()->id);
        })->findOrFail($validated['order_item_id']);

        if ($orderItem->status !== 'delivered') {
            return response()->json(['success' => false, 'message' => 'Can only return delivered items'], 400);
        }

        $returnRequest = ReturnRequest::create([
            'order_item_id' => $validated['order_item_id'],
            'user_id' => $request->user()->id,
            'reason' => $validated['reason'],
            'details' => $validated['details'] ?? null,
            'status' => 'pending'
        ]);

        return response()->json(['success' => true, 'message' => 'Return requested successfully', 'data' => $returnRequest], 201);
    }

    // Seller: Approve return
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate(['status' => 'required|in:approved,rejected,refunded']);

        $returnRequest = ReturnRequest::whereHas('orderItem', function ($query) use ($request) {
            $query->where('seller_id', $request->user()->id);
        })->findOrFail($id);

        $returnRequest->update(['status' => $validated['status']]);

        // Here we could trigger a Refund creation logic if status === refunded

        return response()->json(['success' => true, 'message' => 'Return status updated', 'data' => $returnRequest]);
    }
}
