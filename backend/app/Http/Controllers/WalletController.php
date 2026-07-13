<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Wallet;
use App\Models\WalletTransaction;

class WalletController extends Controller
{
    public function index(Request $request)
    {
        $wallet = Wallet::firstOrCreate(
            ['user_id' => $request->user()->id],
            ['balance' => 0.00]
        );
        
        $transactions = WalletTransaction::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->limit(20)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'balance' => $wallet->balance,
                'recent_transactions' => $transactions
            ]
        ]);
    }
}
