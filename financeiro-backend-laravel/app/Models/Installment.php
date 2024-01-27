<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Installment extends Model
{
    use HasFactory;

    protected $fillable = [
        'value',
        'number',
        'payday',
        'dueday'
    ];

    public function financialTransaction() : HasOne {
        return $this->hasOne('financial_transaction');
    }
}
