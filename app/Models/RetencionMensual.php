<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class RetencionMensual extends Model
{
    use HasFactory;
    protected $fillable = [
        'periodo',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($socio) {
            if (Auth::check()) {
                $userId = Auth::id();
                $socio->user_id = $userId;
            }
        });
    }
}
