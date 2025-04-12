<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Socio;
use Illuminate\Http\Request;

class SocioController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10); // valor por defecto: 10
        $socios = Socio::where(function ($query) use ($request) {
            $search = strtolower($request->input('search', ''));

            $query->whereRaw('LOWER(nombre) LIKE ?', ["%{$search}%"])
                ->orWhereRaw('LOWER(legajo) LIKE ?', ["%{$search}%"])
                ->orWhereRaw('LOWER(correo) LIKE ?', ["%{$search}%"]);
        })
            ->orderBy($request->input('sort_by', 'id'), $request->input('sort_direction', 'asc'))
            ->paginate($perPage);

        return response()->json($socios);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'legajo' => 'required|unique:socios',
            'nombre' => 'required',
            'correo' => 'required|email|unique:socios',
        ]);

        $socio = Socio::create($validated);
        return response()->json($socio, 201);
    }

    public function show(Socio $socio)
    {
        return $socio;
    }

    public function update(Request $request, Socio $socio)
    {
        $validated = $request->validate([
            'legajo' => 'required|unique:socios,legajo,' . $socio->id,
            'nombre' => 'required',
            'correo' => 'required|email|unique:socios,correo,' . $socio->id,
        ]);

        $socio->update($validated);
        return response()->json($socio);
    }

    public function destroy(Socio $socio)
    {
        $socio->delete();
        return response()->json(null, 204);
    }
}
