<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Immobile extends Model
{
    protected $table = 'immobile';
    protected $fillable = [
        'owner',
        'type',
        'address',
        'bedrooms',
        'bathrooms',
        'total_area',
        'price',
    ];
}
