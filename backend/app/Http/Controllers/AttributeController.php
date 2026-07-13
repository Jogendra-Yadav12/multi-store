<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attribute;
use App\Models\AttributeGroup;
use App\Models\AttributeValue;

class AttributeController extends Controller
{
    // --- Attribute Groups ---

    public function getGroups()
    {
        $groups = AttributeGroup::with('attributes.values')->get();
        return response()->json(['success' => true, 'data' => $groups]);
    }

    public function storeGroup(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);
        
        $group = AttributeGroup::create($validated);
        
        return response()->json(['success' => true, 'message' => 'Attribute group created', 'data' => $group], 201);
    }

    public function destroyGroup($id)
    {
        AttributeGroup::findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Attribute group deleted']);
    }

    // --- Attributes ---

    public function index(Request $request)
    {
        $query = Attribute::with('group', 'category', 'values');
        
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        return response()->json(['success' => true, 'data' => $query->get()]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'attribute_group_id' => 'required|exists:attribute_groups,id',
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'type' => 'required|in:select,multi-select,text,number,boolean,color',
            'is_required' => 'boolean',
            'is_filterable' => 'boolean',
            'is_variant_maker' => 'boolean',
            'values' => 'nullable|array', // For select types
            'values.*' => 'string'
        ]);

        $attribute = Attribute::create($request->except('values'));

        if ($request->has('values') && in_array($attribute->type, ['select', 'multi-select', 'color'])) {
            foreach ($request->values as $val) {
                AttributeValue::create([
                    'attribute_id' => $attribute->id,
                    'value' => $val
                ]);
            }
        }

        return response()->json(['success' => true, 'message' => 'Attribute created successfully', 'data' => $attribute->load('values')], 201);
    }

    public function update(Request $request, $id)
    {
        $attribute = Attribute::findOrFail($id);

        $validated = $request->validate([
            'name' => 'string|max:255',
            'type' => 'in:select,multi-select,text,number,boolean,color',
            'is_required' => 'boolean',
            'is_filterable' => 'boolean',
            'is_variant_maker' => 'boolean',
        ]);

        $attribute->update($validated);

        return response()->json(['success' => true, 'message' => 'Attribute updated successfully', 'data' => $attribute]);
    }

    public function destroy($id)
    {
        Attribute::findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Attribute deleted successfully']);
    }
}
