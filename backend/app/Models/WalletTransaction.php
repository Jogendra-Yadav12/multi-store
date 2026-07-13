<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WalletTransaction extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'type', 'amount', 'reason', 'reference_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
