<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PlanController extends Controller
{
    use ApiResponseTrait;

    /**
     * GET /api/admin/plans
     * List all plans (including inactive)
     */
    public function index()
    {
        $plans = SubscriptionPlan::orderBy('price')->get();
        return $this->successResponse('Plans fetched', $plans);
    }

    /**
     * POST /api/admin/plans
     * Create a new plan
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'            => 'required|string|max:100',
            'description'     => 'nullable|string',
            'price'           => 'required|numeric|min:0',
            'duration'        => 'required|in:monthly,yearly,lifetime',
            'commission_rate' => 'required|numeric|min:0|max:100',
            'product_limit'   => 'required|integer|min:1',
            'is_featured'     => 'boolean',
            'features'        => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation Error', $validator->errors(), 422);
        }

        $plan = SubscriptionPlan::create([
            'name'            => $request->name,
            'slug'            => Str::slug($request->name),
            'description'     => $request->description,
            'price'           => $request->price,
            'duration'        => $request->duration,
            'commission_rate' => $request->commission_rate,
            'product_limit'   => $request->product_limit,
            'is_featured'     => $request->boolean('is_featured', false),
            'is_active'       => true,
            'features'        => $request->features ?? [],
        ]);

        return $this->successResponse('Plan created successfully', $plan, 201);
    }

    /**
     * GET /api/admin/plans/{id}
     * Get single plan details
     */
    public function show($id)
    {
        $plan = SubscriptionPlan::findOrFail($id);
        return $this->successResponse('Plan fetched', $plan);
    }

    /**
     * PUT /api/admin/plans/{id}
     * Update a plan (price, commission, limits etc.)
     */
    public function update(Request $request, $id)
    {
        $plan = SubscriptionPlan::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name'            => 'sometimes|string|max:100',
            'description'     => 'nullable|string',
            'price'           => 'sometimes|numeric|min:0',
            'duration'        => 'sometimes|in:monthly,yearly,lifetime',
            'commission_rate' => 'sometimes|numeric|min:0|max:100',
            'product_limit'   => 'sometimes|integer|min:1',
            'is_featured'     => 'boolean',
            'is_active'       => 'boolean',
            'features'        => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation Error', $validator->errors(), 422);
        }

        $plan->update($request->only([
            'name', 'description', 'price', 'duration',
            'commission_rate', 'product_limit',
            'is_featured', 'is_active', 'features',
        ]));

        return $this->successResponse('Plan updated successfully', $plan);
    }

    /**
     * DELETE /api/admin/plans/{id}
     * Deactivate a plan (soft disable, don't delete — existing subscribers keep it)
     */
    public function destroy($id)
    {
        $plan = SubscriptionPlan::findOrFail($id);

        // Don't hard delete — just deactivate so existing subscriptions still work
        $plan->update(['is_active' => false]);

        return $this->successResponse('Plan deactivated successfully');
    }
}
