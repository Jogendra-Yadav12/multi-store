<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number', 'buyer_id', 'overall_status', 'payment_method', 'payment_status',
        'shipping_address', 'billing_address', 'subtotal', 'shipping_cost',
        'discount_amount', 'tax_amount', 'total', 'notes'
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
    
    public function shipments()
    {
        return $this->hasMany(OrderShipment::class);
    }
}
