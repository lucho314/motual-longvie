<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRetencionRequest;
use App\Jobs\EnviarLiquidacionesPorCorreo;
use App\Mail\LiquidacionMail;
use App\Models\Retencion;
use App\Models\RetencionMensual;
use App\Models\Socio;
use App\Services\RetencionService;
use App\Services\SocioService;
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
    protected $retencionService;
    protected $socioService;
    public function __construct(RetencionService $retencionService, SocioService $socioService)
    {
        $this->socioService = $socioService;
        $this->retencionService = $retencionService;
    }

    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);

        $periodos = RetencionMensual::with('user')
            ->select('periodo', 'user_id', 'created_at', "id")
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return response()->json($periodos);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRetencionRequest $request)
    {
        $liquidaciones = $request->input('liquidaciones');
        $periodo = $request->input('periodo');

        try {
            // Aseguramos los socios
            $this->socioService->asegurarSocios($liquidaciones);

            // Preparamos las liquidaciones
            $liquidaciones = $this->retencionService->prepararLiquidaciones($liquidaciones, $periodo);

            // Guardamos en base
            $this->retencionService->guardar($liquidaciones, $periodo, auth()->user()->id);

            return response()->json(['message' => 'Periodo guardado correctamente']);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Error al guardar el periodo: ' . $th->getMessage()], 500);
        }
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
