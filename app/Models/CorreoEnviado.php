<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CorreoEnviado extends Model
{
    use HasFactory;
    protected $fillable = ['socio_id', 'correo', 'asunto'];
}
