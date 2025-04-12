<?php

namespace App\Services;

use App\Models\Socio;

class SocioService
{
    public function asegurarSocios(array $liquidaciones): void
    {
        foreach ($liquidaciones as $liquidacion) {
            $existe = Socio::where('legajo', $liquidacion['legajo'])->exists();
            if (!$existe) {
                Socio::create([
                    'legajo' => $liquidacion['legajo'],
                    'nombre' => $liquidacion['socioNombre'],
                    'correo' => null,
                ]);
            }
        }
    }
}
