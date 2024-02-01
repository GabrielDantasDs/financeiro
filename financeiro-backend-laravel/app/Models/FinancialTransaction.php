<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class FinancialTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'value',
        'note',
        'invoice_date',
        'paid',
        'payment_day',
        'periodicity',
        'periodicity_type',
        'id_subscriber'
    ];

    public function subscriber() : HasOne { 
        return $this->hasOne('subscriber');
    }
}
