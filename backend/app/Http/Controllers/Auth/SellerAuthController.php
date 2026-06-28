<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class SellerAuthController extends Controller
{
    use ApiResponseTrait;

    /**
     * POST /api/seller/register
     * Register a new seller account
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'                  => 'required|string|max:100',
            'email'                 => 'required|email|unique:users,email',
            'password'              => 'required|string|min:8|confirmed',
            'password_confirmation' => 'required',
            'phone'                 => 'nullable|string|max:15',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation Error', $validator->errors(), 422);
        }

        // Create the seller user
        $user = User::create([
            'name'              => $request->name,
            'email'             => $request->email,
            'password'          => Hash::make($request->password),
            'phone'             => $request->phone,
            'role'              => 'seller',
            'status'            => 'active',
            'email_verified_at' => now(),
        ]);

        // Assign seller role via Spatie
        $user->assignRole('seller');

        // Auto-login: create token immediately after registration
        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->successResponse('Seller registered successfully!', [
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'user'         => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'role'  => $user->role,
                'phone' => $user->phone,
            ],
        ], 201);
    }
}
