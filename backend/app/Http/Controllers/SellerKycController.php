<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SellerKyc;

class SellerKycController extends Controller
{
    // Seller submits KYC
    public function submitKyc(Request $request)
    {
        $validated = $request->validate([
            'full_legal_name' => 'required|string|max:255',
            'pan_number' => 'required|string',
            'pan_image' => 'required|string',
            'aadhaar_number' => 'required|string',
            'aadhaar_front' => 'required|string',
            'aadhaar_back' => 'required|string',
            'gst_number' => 'nullable|string',
            'bank_account_number' => 'required|string',
            'bank_ifsc' => 'required|string',
            'bank_account_name' => 'required|string',
            'cancelled_cheque' => 'required|string',
            'selfie_with_id' => 'nullable|string',
        ]);

        $kyc = SellerKyc::updateOrCreate(
            ['seller_id' => $request->user()->id],
            array_merge($validated, [
                'status' => 'pending',
                'submitted_at' => now(),
                'rejection_reason' => null
            ])
        );

        return response()->json([
            'success' => true, 
            'message' => 'KYC submitted successfully and is pending review.', 
            'data' => $kyc
        ]);
    }

    // Seller gets their own KYC status
    public function getKycStatus(Request $request)
    {
        $kyc = SellerKyc::where('seller_id', $request->user()->id)->first();
        
        if (!$kyc) {
            return response()->json(['success' => false, 'message' => 'No KYC found.'], 404);
        }

        return response()->json(['success' => true, 'data' => $kyc]);
    }

    // Admin lists pending KYCs
    public function indexPending()
    {
        $kycs = SellerKyc::whereIn('status', ['pending', 'under_review'])
            ->with('seller:id,name,email')
            ->orderBy('submitted_at', 'asc')
            ->get();
            
        return response()->json(['success' => true, 'data' => $kycs]);
    }

    // Admin approves KYC
    public function approve($id)
    {
        $kyc = SellerKyc::findOrFail($id);
        $kyc->update([
            'status' => 'approved',
            'reviewed_by' => auth()->id(),
            'reviewed_at' => now(),
            'rejection_reason' => null
        ]);
        
        // Also update store status if needed
        $kyc->seller->stores()->update(['status' => 'active', 'approved_at' => now()]);

        return response()->json(['success' => true, 'message' => 'KYC approved.']);
    }

    // Admin rejects KYC
    public function reject(Request $request, $id)
    {
        $validated = $request->validate(['reason' => 'required|string']);
        
        $kyc = SellerKyc::findOrFail($id);
        $kyc->update([
            'status' => 'rejected',
            'reviewed_by' => auth()->id(),
            'reviewed_at' => now(),
            'rejection_reason' => $validated['reason']
        ]);

        return response()->json(['success' => true, 'message' => 'KYC rejected.']);
    }
}
