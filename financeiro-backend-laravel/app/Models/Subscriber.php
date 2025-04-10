<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'document',
        'email',
        'phone',
        'address',
        'district',
        'number',
        'state',
        'city',
        'zip_code'
    ];
}
