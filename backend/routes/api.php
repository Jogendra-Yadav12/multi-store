<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\SellerAuthController;
use App\Http\Controllers\Seller\StoreController;
use App\Http\Controllers\Admin\PlanController;
use Illuminate\Support\Facades\Route;

// ── Health Check ──
Route::get('/health', function () {
    return response()->json(['status' => 'ok', 'timestamp' => now()]);
});

// ── Public Routes ──
Route::post('/auth/login',       [AuthController::class,     'login']);
Route::post('/seller/register',  [SellerAuthController::class, 'register']);
Route::get('/plans',             [StoreController::class,    'plans']);
Route::get('/categories',        [\App\Http\Controllers\CategoryController::class, 'index']);
Route::get('/categories/{slug}', [\App\Http\Controllers\CategoryController::class, 'show']);
Route::get('/attributes/groups', [\App\Http\Controllers\AttributeController::class, 'getGroups']);
Route::get('/attributes',        [\App\Http\Controllers\AttributeController::class, 'index']);
Route::get('/products',          [\App\Http\Controllers\ProductController::class, 'index']);
Route::get('/products/{slug}',   [\App\Http\Controllers\ProductController::class, 'show']);

// Cart (Public/Guest Support)
Route::get('/cart',              [\App\Http\Controllers\CartController::class, 'index']);
Route::post('/cart/add',         [\App\Http\Controllers\CartController::class, 'add']);
Route::put('/cart/items/{id}',   [\App\Http\Controllers\CartController::class, 'update']);
Route::delete('/cart/items/{id}',[\App\Http\Controllers\CartController::class, 'remove']);

// ── Protected Routes (must be logged in) ──
Route::middleware('auth:sanctum')->group(function () {

    // ── Buyer / General Logged-in Routes ──
    // Checkout
    Route::post('/checkout', [\App\Http\Controllers\OrderController::class, 'checkout']);
    
    // Returns
    Route::post('/returns',  [\App\Http\Controllers\ReturnRequestController::class, 'store']);

    // Auth
    Route::get('/auth/me',      [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // ── Seller Routes ──
    Route::middleware('role:seller')->prefix('seller')->group(function () {
        Route::get('/store',        [StoreController::class, 'show']);
        Route::post('/store',       [StoreController::class, 'store']);
        Route::put('/store',        [StoreController::class, 'update']);
        Route::post('/subscribe',   [StoreController::class, 'subscribe']);
        
        // Products
        Route::get('/products',     [\App\Http\Controllers\ProductController::class, 'sellerIndex']);
        Route::post('/products',    [\App\Http\Controllers\ProductController::class, 'store']);
        
        // Orders (Shipments)
        Route::get('/orders',       [\App\Http\Controllers\SellerOrderController::class, 'index']);
        Route::put('/orders/{id}',  [\App\Http\Controllers\SellerOrderController::class, 'updateStatus']);
        
        // Returns
        Route::put('/returns/{id}', [\App\Http\Controllers\ReturnRequestController::class, 'updateStatus']);
        
        // KYC
        Route::get('/kyc',          [\App\Http\Controllers\SellerKycController::class, 'getKycStatus']);
        Route::post('/kyc',         [\App\Http\Controllers\SellerKycController::class, 'submitKyc']);
        
        // Wallet
        Route::get('/wallet',       [\App\Http\Controllers\WalletController::class, 'index']);
    });

    // ── Admin Routes ──
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        // Plan Management
        Route::get('/plans',        [PlanController::class, 'index']);
        Route::post('/plans',       [PlanController::class, 'store']);
        Route::get('/plans/{id}',   [PlanController::class, 'show']);
        Route::put('/plans/{id}',   [PlanController::class, 'update']);
        Route::delete('/plans/{id}',[PlanController::class, 'destroy']);
        
        // Category Management
        Route::post('/categories',       [\App\Http\Controllers\CategoryController::class, 'store']);
        Route::put('/categories/{id}',   [\App\Http\Controllers\CategoryController::class, 'update']);
        Route::delete('/categories/{id}',[\App\Http\Controllers\CategoryController::class, 'destroy']);
        
        // Product Management & Approvals
        Route::get('/products',              [\App\Http\Controllers\ProductController::class, 'adminIndex']);
        Route::post('/products',             [\App\Http\Controllers\ProductController::class, 'adminStore']);
        Route::get('/products/{id}',         [\App\Http\Controllers\ProductController::class, 'adminShow']);
        Route::put('/products/{id}',         [\App\Http\Controllers\ProductController::class, 'adminUpdate']);
        Route::delete('/products/{id}',      [\App\Http\Controllers\ProductController::class, 'adminDestroy']);
        Route::put('/products/{id}/approve', [\App\Http\Controllers\ProductController::class, 'adminApprove']);
        Route::put('/products/{id}/reject',  [\App\Http\Controllers\ProductController::class, 'adminReject']);
        
        // KYC Management
        Route::get('/kyc',               [\App\Http\Controllers\SellerKycController::class, 'indexPending']);
        Route::put('/kyc/{id}/approve',  [\App\Http\Controllers\SellerKycController::class, 'approve']);
        Route::put('/kyc/{id}/reject',   [\App\Http\Controllers\SellerKycController::class, 'reject']);

        // Commission Rules
        Route::get('/commissions',       [\App\Http\Controllers\CommissionRuleController::class, 'index']);
        Route::post('/commissions',      [\App\Http\Controllers\CommissionRuleController::class, 'store']);

        // Attribute Management
        Route::post('/attributes/groups',       [\App\Http\Controllers\AttributeController::class, 'storeGroup']);
        Route::delete('/attributes/groups/{id}',[\App\Http\Controllers\AttributeController::class, 'destroyGroup']);
        Route::post('/attributes',              [\App\Http\Controllers\AttributeController::class, 'store']);
        Route::put('/attributes/{id}',          [\App\Http\Controllers\AttributeController::class, 'update']);
        Route::delete('/attributes/{id}',       [\App\Http\Controllers\AttributeController::class, 'destroy']);
    });

});
