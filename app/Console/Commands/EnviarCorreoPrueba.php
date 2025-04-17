<?php

namespace App\Console\Commands;

use App\Mail\PruebaMail;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class EnviarCorreoPrueba extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'enviar:correo-prueba';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Envía un correo de prueba a luciano.zapata314@gmail.com';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $correo = 'luciano.zapata314@gmail.com';

        Mail::to($correo)->send(new PruebaMail());

        $this->info("Correo de prueba enviado a $correo ✅");
    }
}
