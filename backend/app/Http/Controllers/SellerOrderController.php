<?php

namespace App\Http\Controllers;

use App\Models\OrderShipment;
use Illuminate\Http\Request;

class SellerOrderController extends Controller
{
    public function index(Request $request)
    {
        $shipments = OrderShipment::where('seller_id', $request->user()->id)
            ->with(['order', 'items.orderItem.product'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json(['success' => true, 'data' => $shipments]);
    }

    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:packed,shipped,out_for_delivery,delivered',
            'courier_name' => 'nullable|string',
            'tracking_number' => 'nullable|string',
            'tracking_url' => 'nullable|string'
        ]);

        $shipment = OrderShipment::where('seller_id', $request->user()->id)
            ->findOrFail($id);

        $updateData = ['status' => $validated['status']];
        
        if (isset($validated['courier_name'])) $updateData['courier_name'] = $validated['courier_name'];
        if (isset($validated['tracking_number'])) $updateData['tracking_number'] = $validated['tracking_number'];
        if (isset($validated['tracking_url'])) $updateData['tracking_url'] = $validated['tracking_url'];

        if ($validated['status'] === 'shipped' && !$shipment->shipped_at) {
            $updateData['shipped_at'] = now();
        }
        if ($validated['status'] === 'delivered' && !$shipment->delivered_at) {
            $updateData['delivered_at'] = now();
            // TODO: Here we could trigger dropping funds into the seller's Wallet based on CommissionRule
        }

        $shipment->update($updateData);

        // Update the individual order items status
        $shipment->items->each(function($shipmentItem) use ($validated) {
            $shipmentItem->orderItem->update(['status' => $validated['status']]);
        });

        return response()->json([
            'success' => true, 
            'message' => 'Shipment updated successfully',
            'data' => $shipment->fresh()
        ]);
    }
}
