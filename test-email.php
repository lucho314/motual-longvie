<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\Mail;

$email = $argv[1] ?? 'admin@example.com';
$password = (string) config('mail.mailers.smtp.password');
$subject = 'Prueba de Email - Mutual Retenciones - '.now()->format('Y-m-d H:i:s');

echo "Enviando correo de prueba a: {$email}\n";
echo "Mailer: ".config('mail.default')."\n";
echo "SMTP host: ".config('mail.mailers.smtp.host').":".config('mail.mailers.smtp.port')."\n";
echo "SMTP usuario: ".config('mail.mailers.smtp.username')."\n";
echo "SMTP password: ".strlen($password)." caracteres\n";
echo "From: ".config('mail.from.address')."\n";
echo "Asunto: {$subject}\n";

try {
    $sent = Mail::raw(
        'Este es un correo de prueba desde Mutual Retenciones. Si recibes este mensaje, la configuracion de email esta funcionando correctamente.',
        function ($message) use ($email, $subject) {
            $message->to($email)->subject($subject);
        }
    );

    if ($sent && method_exists($sent, 'getMessageId')) {
        echo "Message-ID: ".$sent->getMessageId()."\n";
    }

    echo "Correo enviado exitosamente!\n";
    echo "Revisa la bandeja de entrada de: {$email}\n";
} catch (Exception $e) {
    echo "Error al enviar correo:\n";
    echo $e->getMessage()."\n";
    exit(1);
}
