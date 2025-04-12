<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\EnviarLiquidacionesPorCorreo;
use App\Mail\LiquidacionMail;
use App\Models\Retencion;
use App\Models\RetencionMensual;
use App\Models\Socio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class LiquidacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //viene liquidaciones que es un array de liquidaciones y periodo que es un string
        $liquidaciones = $request->input('liquidaciones');
        $periodo = $request->input('periodo');
        //validar que liquidaciones sea un array y periodo un string
        $request->validate([
            'liquidaciones' => 'required|array',
            'periodo' => 'required|string',
        ]);

        //validar que liquidaciones no este vacio
        if (empty($liquidaciones)) {
            return response()->json(['error' => 'El array de liquidaciones no puede estar vacío'], 422);
        }
        //validamos que las liquidaciones tenga los campos de la tabla retencion

        $campos = [
            'legajo',
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
            'saldo',
            'interes_saldo',
            'sub_total',
            'gasto_bancario',
            'total'
        ];

        foreach ($liquidaciones as $liquidacion) {
            foreach ($campos as $campo) {
                if (!array_key_exists($campo, $liquidacion)) {
                    return response()->json(['error' => 'El campo ' . $campo . ' no existe en la liquidacion'], 422);
                }
            }
        }



        //validar que el periodo tenga el formato YYYY-MM
        if (!preg_match('/^\d{4}-\d{2}$/', $periodo)) {
            return response()->json(['error' => 'El periodo debe tener el formato YYYY-MM'], 422);
        }
        //validar que el periodo no exista en la base de datos
        $existe = Retencion::where('periodo', $periodo)->exists();
        if ($existe) {
            return response()->json(['error' => 'El periodo ya existe'], 422);
        }

        //validar que el id_socio exista en la base de datos
        foreach ($liquidaciones as $liquidacion) {
            $existe = Socio::where('legajo', $liquidacion['legajo'])->exists();
            if (!$existe) {
                //lo cargamos a la base de datos
                Socio::create([
                    'legajo' => $liquidacion['legajo'],
                    'nombre' => $liquidacion['socioNombre'],
                    'correo' => null,
                ]);
            }
        }

        //actualizar el periodo en cada liquidacion y eliminar socioNombre

        foreach ($liquidaciones as $key => $liquidacion) {
            $liquidaciones[$key]['periodo'] = $periodo;
            unset($liquidaciones[$key]['socioNombre']);
        }
        DB::beginTransaction();
        try {

            RetencionMensual::create([
                'periodo' => $periodo,
                'user_id' => auth()->user()->id,
            ]);
            Retencion::insert($liquidaciones);

            DB::commit();
        } catch (\Throwable $th) {
            //si hay un error hacemos rollback
            DB::rollBack();
            return response()->json(['error' => 'Error al guardar el periodo ' . $th->getMessage()], 500);
        }

        EnviarLiquidacionesPorCorreo::dispatch($periodo);


        return response()->json(['message' => 'Liquidaciones guardadas correctamente'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($periodo)
    {
        $retenciones = Retencion::with('socio')
            ->where('periodo', $periodo)
            ->get();

        return response()->json($retenciones);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
