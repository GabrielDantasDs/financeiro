<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PaymentCondition extends Model
{
    use HasFactory;

    protected $fillable = [
        'installment',
        'method',
        'paid',
        'id_bank_account'
    ];

    public function bankAccount(): HasOne {
        return $this->hasOne('bank_account');
    }
}
