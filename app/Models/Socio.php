<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Socio extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'legajo',
        'nombre',
        'correo',
        'usuario_alta_id',
        'usuario_modificacion_id',
        'baja'
    ];

    //poner el usuario de alta y de modificacion por default
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($socio) {
            if (Auth::check()) {
                $userId = Auth::id();
                $socio->usuario_alta_id = $userId;
                $socio->usuario_modificacion_id = $userId;
            }
        });

        static::updating(function ($socio) {
            if (Auth::check()) {
                $socio->usuario_modificacion_id = Auth::id();
            }
        });
    }

    public function retenciones()
    {
        return $this->hasMany(Retencion::class, 'legajo', 'legajo');
    }

    public function setNombreAttribute($value)
    {
        $this->attributes['nombre'] = strtoupper($value);
    }
}
