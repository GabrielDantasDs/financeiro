<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CostCenter extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'id_category'
    ];


    public function category() : HasOne 
    {
        return $this->hasOne('category');
    }
}
