<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'showcase_seller_id', 'buyer_id', 'product_id', 'fee_amount', 
        'payment_ref', 'contact_revealed_at', 'seller_lead_share', 'admin_lead_share'
    ];

    public function showcaseSeller()
    {
        return $this->belongsTo(User::class, 'showcase_seller_id');
    }

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}

