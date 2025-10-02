<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Retencion extends Model
{
    use HasFactory;
    protected $table = 'retencions';


    protected $fillable = [
        'legajo',
        'periodo',
        'cuota',
        'ss_adm',
        'fcia_maria_luisa',
        'fcia_amur',
        'fcia_la_botica',
        'oseca',
        'villegas',
        'luz_y_fza',
        'flama',
        'fontana',
        'moto_city',
        'transporte',
        'mutual_sol',
        'viandas',
        'seguro',
        'uso_ins_cd',
        'cantina_cd',
        'varios_bebidas',
        'prestamos',
        'interes_prestamos',
        'saldo',
        'interes_saldo',
        'cant_metal',
        'sofia_shop',
        'sub_total',
        'gasto_bancario',
        'total',
    ];




    public function socio()
    {
        return $this->belongsTo(Socio::class, 'legajo', 'legajo')->withTrashed();
    }
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->diffForHumans();
    }
}
