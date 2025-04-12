<?php

namespace App\Services;

use App\Models\Socio;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

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

    public function crearOActualizar(Request $request): Socio
    {
        $legajo = $request->input('legajo');
        $socio = Socio::onlyTrashed()->where('legajo', $legajo)->first();

        if ($socio) {
            if ($socio->trashed()) {
                $socio->restore();
            }

            // Validar correo único salvo para sí mismo
            $correoOcupado = Socio::where('correo', $request->input('correo'))
                ->where('id', '!=', $socio->id)
                ->exists();

            if ($correoOcupado) {
                throw ValidationException::withMessages([
                    'correo' => 'El correo ya está en uso.'
                ]);
            }

            $socio->update([
                'nombre' => $request->input('nombre'),
                'correo' => $request->input('correo'),
            ]);
        } else {
            $validated = $request->validate([
                'legajo' => 'required|unique:socios',
                'nombre' => 'required',
                'correo' => 'required|email|unique:socios',
            ]);



            $socio = Socio::create($validated);
        }

        return $socio;
    }
}
