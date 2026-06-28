<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Store extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'description',
        'logo',
        'banner',
        'phone',
        'email',
        'address',
        'city',
        'state',
        'country',
        'pincode',
        'status',
        'approved_at',
    ];

    protected $casts = [
        'approved_at' => 'datetime',
    ];

    // Auto-generate slug from name
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($store) {
            if (empty($store->slug)) {
                $store->slug = Str::slug($store->name) . '-' . Str::random(6);
            }
        });
    }

    // Relationships
    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function activeSubscription(): HasOne
    {
        return $this->hasOne(StoreSubscription::class)
                    ->where('status', 'active')
                    ->latest();
    }

    public function subscriptions()
    {
        return $this->hasMany(StoreSubscription::class);
    }

    // Helper: is store active?
    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    // Helper: get current commission rate
    public function getCommissionRate(): float
    {
        $sub = $this->activeSubscription()->with('plan')->first();
        return $sub ? (float) $sub->plan->commission_rate : 10.00;
    }
}
