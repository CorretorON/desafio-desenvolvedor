<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Immobile extends Model
{
    use HasFactory;

    protected $table = 'immobile';

    protected $fillable = [
        'owner',
        'type',
        'address',
        'bedrooms',
        'bathrooms',
        'total_area',
        'price',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
