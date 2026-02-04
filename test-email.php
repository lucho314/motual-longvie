<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\Mail;

$email = $argv[1] ?? 'admin@example.com';

echo "Enviando correo de prueba a: {$email}\n";

try {
    Mail::raw('Este es un correo de prueba desde Mutual Retenciones. Si recibes este mensaje, la configuración de email está funcionando correctamente.', function ($message) use ($email) {
        $message->to($email)
                ->subject('Prueba de Email - Mutual Retenciones');
    });

    echo "✅ Correo enviado exitosamente!\n";
    echo "Revisa la bandeja de entrada de: {$email}\n";
} catch (Exception $e) {
    echo "❌ Error al enviar correo:\n";
    echo $e->getMessage() . "\n";
    exit(1);
}
