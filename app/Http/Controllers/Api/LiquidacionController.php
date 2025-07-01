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
        $q = $request->input('search', null);

        $periodos = RetencionMensual::with('user')
            ->select('periodo', 'user_id', 'created_at', "id")
            ->when($q, function ($query) use ($q) {
                $query->where('periodo', 'like', "%$q%");
            })
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
            ->select("id", "legajo", "total", "created_at")
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

    public function reenviarRetencionAlSocio(Request $request)
    {
        try {
            $retencionesId = $request->input('retenciones_id');

            foreach ($retencionesId as $retencionId) {
                $this->retencionService->reenviarRetencionAlSocio($retencionId);
            }
            return response()->json(['message' => 'Retención reenviada correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al reenviar la retención: ' . $e->getMessage()], 500);
        }
    }

    public function detalleLiquidacion($id)
    {
        try {
            $retencion = Retencion::select([
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
                "varios_bebidas",
                'prestamos',
                'interes_prestamos',
                'saldo',
                'interes_saldo',
                'sub_total',
                'gasto_bancario',
                'total',
                "periodo"

            ])
                ->with('socio')
                ->where('id', $id)
                ->first();

            if (!$retencion) {
                return response()->json(['error' => 'Retención no encontrada'], 404);
            }

            return response()->json($retencion);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener el detalle de la liquidación: ' . $e->getMessage()], 500);
        }
    }
}
