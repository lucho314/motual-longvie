<?php

namespace App\Http\Controllers;

use App\Models\Socio;
use Illuminate\Http\Request;

class SocioController extends Controller
{
    public function index()
    {
        $socios = Socio::all();
        return view('socios.index', compact('socios'));
    }

    public function create()
    {
        return view('socios.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'legajo' => 'required|unique:socios',
            'nombre' => 'required',
            'email' => 'required|email|unique:socios',
        ]);

        Socio::create($request->all());

        return redirect()->route('socios.index')->with('success', 'Socio creado correctamente.');
    }

    public function show(Socio $socio)
    {
        return view('socios.show', compact('socio'));
    }

    public function edit(Socio $socio)
    {
        return view('socios.edit', compact('socio'));
    }

    public function update(Request $request, Socio $socio)
    {
        $request->validate([
            'legajo' => 'required|unique:socios,legajo,' . $socio->id,
            'nombre' => 'required',
            'email' => 'required|email|unique:socios,email,' . $socio->id,
        ]);

        $socio->update($request->all());

        return redirect()->route('socios.index')->with('success', 'Socio actualizado correctamente.');
    }

    public function destroy(Socio $socio)
    {
        //vamos a marcarlo como eliminado

        $socio->delete();

        return redirect()->route('socios.index')->with('success', 'Socio eliminado correctamente.');
    }
}
