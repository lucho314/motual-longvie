<?php

namespace App\Jobs;

use App\Mail\LiquidacionMail;
use App\Models\Retencion;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class EnviarLiquidacionesPorCorreo implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $periodo;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(string $periodo)
    {
        $this->periodo = $periodo;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {
            $retenciones = Retencion::with('socio')
                ->where('periodo', $this->periodo)
                ->get();

            if ($retenciones->isEmpty()) {
                logger("❌ No se encontraron retenciones para el período {$this->periodo}");
                return;
            }

            logger("✅ Se encontraron retenciones para {$retenciones->count()} socios");

            foreach ($retenciones as $items) {
                $socio = $items->socio;

                if ($socio && $socio->correo) {
                    logger("📬 Enviando mail a: {$socio->correo}");
                    Mail::to($socio->correo)->send(new LiquidacionMail($socio, $items));
                } else {
                    logger("⚠️ Socio sin correo: ID {$socio->id}");
                }
            }
        } catch (\Throwable $e) {
            logger("🔥 Error en job EnviarLiquidacionesPorCorreo: " . $e->getMessage());
            logger($e->getTraceAsString());
        }
    }
}
