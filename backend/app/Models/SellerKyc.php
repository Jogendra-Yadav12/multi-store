<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SellerKyc extends Model
{
    use HasFactory;

    protected $fillable = [
        'seller_id', 'status', 'full_legal_name', 'pan_number', 'pan_image', 
        'aadhaar_number', 'aadhaar_front', 'aadhaar_back', 'gst_number', 
        'bank_account_number', 'bank_ifsc', 'bank_account_name', 'cancelled_cheque', 
        'selfie_with_id', 'rejection_reason', 'reviewed_by', 'submitted_at', 'reviewed_at'
    ];

    protected $casts = [
        'submitted_at' => 'datetime',
        'reviewed_at' => 'datetime',
    ];

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
