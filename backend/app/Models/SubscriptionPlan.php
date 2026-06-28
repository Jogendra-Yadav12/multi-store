<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubscriptionPlan extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'duration',
        'commission_rate',
        'product_limit',
        'is_featured',
        'is_active',
        'features',
    ];

    protected $casts = [
        'features'        => 'array',
        'is_featured'     => 'boolean',
        'is_active'       => 'boolean',
        'price'           => 'decimal:2',
        'commission_rate' => 'decimal:2',
    ];
}

