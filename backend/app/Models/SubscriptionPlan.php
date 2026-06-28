<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
        'features'    => 'array',
        'is_featured' => 'boolean',
        'is_active'   => 'boolean',
        'price'       => 'decimal:2',
        'commission_rate' => 'decimal:2',
    ];
}

class StoreSubscription extends Model
{
    protected $fillable = [
        'store_id',
        'plan_id',
        'amount_paid',
        'status',
        'starts_at',
        'ends_at',
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at'   => 'datetime',
    ];

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    public function plan(): BelongsTo
    {
        return $this->belongsTo(SubscriptionPlan::class, 'plan_id');
    }

    // Is this subscription still valid?
    public function isValid(): bool
    {
        if ($this->status !== 'active') return false;
        if (is_null($this->ends_at)) return true; // lifetime
        return $this->ends_at->isFuture();
    }
}
