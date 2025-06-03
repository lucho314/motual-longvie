<?php

namespace App\Jobs;

use App\Mail\LiquidacionMail;
use App\Models\Retencion;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class ReenviarRetencionAlSocio implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $retencionId;

    /**
     * Create a new job instance.
     */
    public function __construct($retencionId)
    {
        $this->retencionId = $retencionId;
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        $retencion = Retencion::with('socio')->find($this->retencionId);

        if (!$retencion) {
            logger("❌ Retención ID {$this->retencionId} no encontrada.");
            return;
        }

        $socio = $retencion->socio;

        if (!$socio) {
            logger("⚠️ Socio no encontrado para retención ID {$this->retencionId}");
            return;
        }

        if (!$socio->correo) {
            logger("⚠️ El socio ID {$socio->id} no tiene correo.");
            return;
        }

        logger("📬 Reenviando retención ID {$retencion->id} al correo {$socio->correo}");

        Mail::to($socio->correo)->send(new LiquidacionMail($socio, $retencion));
    }
}
