<?php

namespace App\Services;

use App\Models\Retencion;
use App\Models\RetencionMensual;
use App\Jobs\EnviarLiquidacionesPorCorreo;
use App\Jobs\ReenviarRetencionAlSocio;
use App\Mail\LiquidacionMail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

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

    public function reenviarRetencionAlSocio($retencionId)
    {
        dispatch(new ReenviarRetencionAlSocio($retencionId));
    }
}
