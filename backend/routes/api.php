<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Seller\StoreController;
use App\Http\Controllers\Admin\PlanController;
use Illuminate\Support\Facades\Route;

// ── Health Check ──
Route::get('/health', function () {
    return response()->json(['status' => 'ok', 'timestamp' => now()]);
});

// ── Public Routes ──
Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/plans',       [StoreController::class, 'plans']); // anyone can view plans

// ── Protected Routes (must be logged in) ──
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::get('/auth/me',      [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // ── Seller Routes ──
    Route::middleware('role:seller')->prefix('seller')->group(function () {
        Route::get('/store',        [StoreController::class, 'show']);
        Route::post('/store',       [StoreController::class, 'store']);
        Route::put('/store',        [StoreController::class, 'update']);
        Route::post('/subscribe',   [StoreController::class, 'subscribe']);
    });

    // ── Admin Routes ──
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        // Plan Management
        Route::get('/plans',        [PlanController::class, 'index']);
        Route::post('/plans',       [PlanController::class, 'store']);
        Route::get('/plans/{id}',   [PlanController::class, 'show']);
        Route::put('/plans/{id}',   [PlanController::class, 'update']);
        Route::delete('/plans/{id}',[PlanController::class, 'destroy']);
    });

});
