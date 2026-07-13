<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderShipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id', 'seller_id', 'status', 'courier_name', 'tracking_number',
        'tracking_url', 'shipped_at', 'delivered_at'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    
    public function items()
    {
        return $this->hasMany(OrderShipmentItem::class, 'shipment_id');
    }
}
