<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\CommissionRule;

class CommissionRuleController extends Controller
{
    public function index()
    {
        $rules = CommissionRule::with('seller:id,name', 'category:id,name')->get();
        return response()->json(['success' => true, 'data' => $rules]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'seller_id' => 'nullable|exists:users,id',
            'category_id' => 'nullable|exists:categories,id',
            'rate' => 'required|numeric|min:0|max:100',
            'priority' => 'integer',
            'is_active' => 'boolean'
        ]);

        $rule = CommissionRule::create($validated);
        
        return response()->json(['success' => true, 'message' => 'Commission rule created.', 'data' => $rule], 201);
    }
}
