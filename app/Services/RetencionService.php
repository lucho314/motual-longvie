<?php

namespace App\Services;

use App\Models\Retencion;
use App\Models\RetencionMensual;
use App\Jobs\EnviarLiquidacionesPorCorreo;
use Illuminate\Support\Facades\DB;

class RetencionService
{
    public function guardar(array $liquidaciones, string $periodo, int $userId): void
    {
        DB::beginTransaction();

        try {
            RetencionMensual::create([
                'periodo' => $periodo,
                'user_id' => $userId,
            ]);

            Retencion::insert($liquidaciones);

            DB::commit();

            EnviarLiquidacionesPorCorreo::dispatch($periodo);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function prepararLiquidaciones(array $liquidaciones, string $periodo): array
    {
        foreach ($liquidaciones as $key => $liquidacion) {
            $liquidaciones[$key]['periodo'] = $periodo;
            unset($liquidaciones[$key]['socioNombre']);
        }
        return $liquidaciones;
    }
}
