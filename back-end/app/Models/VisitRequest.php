<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VisitRequest extends Model
{
    use HasFactory;
    
    protected $table = 'visit_requests';
    
    protected $fillable = [
        'immobile_id',
        'name',
        'phone',
        'email',
        'visit_date',
    ];

    public function immobile()
    {
        return $this->belongsTo(Immobile::class, 'immobile_id');
    }
}
