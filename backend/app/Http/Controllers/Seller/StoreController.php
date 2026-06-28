<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Store;
use App\Models\SubscriptionPlan;
use App\Models\StoreSubscription;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StoreController extends Controller
{
    use ApiResponseTrait;

    /**
     * GET /api/seller/store
     * Get the authenticated seller's store
     */
    public function show(Request $request)
    {
        $store = Store::where('user_id', $request->user()->id)
                      ->with('activeSubscription.plan')
                      ->first();

        if (!$store) {
            return $this->errorResponse('No store found. Please create one.', null, 404);
        }

        return $this->successResponse('Store fetched successfully', $store);
    }

    /**
     * POST /api/seller/store
     * Create a new store (seller can only have one store)
     */
    public function store(Request $request)
    {
        // Check if seller already has a store
        $existing = Store::where('user_id', $request->user()->id)->first();
        if ($existing) {
            return $this->errorResponse('You already have a store.', null, 422);
        }

        $validator = Validator::make($request->all(), [
            'name'        => 'required|string|max:100',
            'description' => 'nullable|string',
            'phone'       => 'nullable|string|max:15',
            'email'       => 'nullable|email',
            'address'     => 'nullable|string',
            'city'        => 'nullable|string',
            'state'       => 'nullable|string',
            'pincode'     => 'nullable|string|max:10',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation Error', $validator->errors(), 422);
        }

        $store = Store::create([
            'user_id'     => $request->user()->id,
            'name'        => $request->name,
            'description' => $request->description,
            'phone'       => $request->phone,
            'email'       => $request->email,
            'address'     => $request->address,
            'city'        => $request->city,
            'state'       => $request->state,
            'pincode'     => $request->pincode,
            'status'      => 'pending', // admin must approve
        ]);

        // Auto-assign Free plan
        $freePlan = SubscriptionPlan::where('slug', 'free')->first();
        if ($freePlan) {
            StoreSubscription::create([
                'store_id'    => $store->id,
                'plan_id'     => $freePlan->id,
                'amount_paid' => 0,
                'status'      => 'active',
                'starts_at'   => now(),
                'ends_at'     => null, // lifetime free plan
            ]);
        }

        return $this->successResponse('Store created successfully! Awaiting admin approval.', $store, 201);
    }

    /**
     * PUT /api/seller/store
     * Update the seller's store info
     */
    public function update(Request $request)
    {
        $store = Store::where('user_id', $request->user()->id)->first();

        if (!$store) {
            return $this->errorResponse('Store not found.', null, 404);
        }

        $validator = Validator::make($request->all(), [
            'name'        => 'sometimes|string|max:100',
            'description' => 'nullable|string',
            'phone'       => 'nullable|string|max:15',
            'email'       => 'nullable|email',
            'address'     => 'nullable|string',
            'city'        => 'nullable|string',
            'state'       => 'nullable|string',
            'pincode'     => 'nullable|string|max:10',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation Error', $validator->errors(), 422);
        }

        $store->update($request->only([
            'name', 'description', 'phone',
            'email', 'address', 'city', 'state', 'pincode',
        ]));

        return $this->successResponse('Store updated successfully', $store);
    }

    /**
     * GET /api/plans
     * List all available subscription plans (public)
     */
    public function plans()
    {
        $plans = SubscriptionPlan::where('is_active', true)
                                  ->orderBy('price')
                                  ->get();

        return $this->successResponse('Plans fetched successfully', $plans);
    }

    /**
     * POST /api/seller/subscribe
     * Subscribe store to a plan
     */
    public function subscribe(Request $request)
    {
        $store = Store::where('user_id', $request->user()->id)->first();

        if (!$store) {
            return $this->errorResponse('Create a store first.', null, 404);
        }

        $validator = Validator::make($request->all(), [
            'plan_id' => 'required|exists:subscription_plans,id',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation Error', $validator->errors(), 422);
        }

        $plan = SubscriptionPlan::findOrFail($request->plan_id);

        // Cancel current active subscription
        StoreSubscription::where('store_id', $store->id)
                          ->where('status', 'active')
                          ->update(['status' => 'cancelled']);

        // Calculate end date
        $endsAt = match ($plan->duration) {
            'monthly' => now()->addMonth(),
            'yearly'  => now()->addYear(),
            default   => null, // lifetime
        };

        $subscription = StoreSubscription::create([
            'store_id'    => $store->id,
            'plan_id'     => $plan->id,
            'amount_paid' => $plan->price,
            'status'      => 'active',
            'starts_at'   => now(),
            'ends_at'     => $endsAt,
        ]);

        return $this->successResponse('Subscribed to ' . $plan->name . ' plan successfully', [
            'subscription' => $subscription,
            'plan'         => $plan,
        ]);
    }
}
