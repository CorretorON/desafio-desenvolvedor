<?php
namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Immobile;
class VisitRequest extends Model
{
    use HasFactory;
    
    protected $table = 'visit_requests';
    
    protected $fillable = [
        'user_id',
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
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
