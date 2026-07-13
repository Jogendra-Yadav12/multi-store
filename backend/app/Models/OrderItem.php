<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id', 'seller_id', 'product_id', 'variant_id', 'product_name',
        'quantity', 'unit_price', 'total_price', 'commission_rate', 'commission_amount',
        'seller_earning', 'status'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}

