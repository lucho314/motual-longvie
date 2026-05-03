<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\Http;

$to = $argv[1] ?? 'admin@example.com';
$apiKey = env('BREVO_API_KEY');
$allowInsecure = filter_var(env('BREVO_API_INSECURE_LOCAL', false), FILTER_VALIDATE_BOOLEAN);
$from = (string) config('mail.from.address');
$fromName = (string) config('mail.from.name');
$subject = 'Prueba API Brevo - '.date('Y-m-d H:i:s');

if (! $apiKey) {
    fwrite(STDERR, "Falta BREVO_API_KEY en el entorno.\n");
    exit(1);
}

echo "Probando API Brevo\n";
echo "API key: ".strlen($apiKey)." caracteres\n";
echo "From: {$from}\n";
echo "To: {$to}\n";
echo "Subject: {$subject}\n\n";

$request = Http::withHeaders([
    'accept' => 'application/json',
    'api-key' => $apiKey,
    'content-type' => 'application/json',
]);

if ($allowInsecure) {
    echo "Aviso: verificacion SSL desactivada para prueba local.\n";
    $request = $request->withoutVerifying();
}

try {
    $response = $request->post('https://api.brevo.com/v3/smtp/email', [
    'sender' => [
        'name' => $fromName,
        'email' => $from,
    ],
    'to' => [
        [
            'email' => $to,
        ],
    ],
    'subject' => $subject,
    'textContent' => 'Prueba de envio transaccional desde la API de Brevo.',
    ]);
} catch (Throwable $e) {
    echo "Error al llamar a la API Brevo:\n";
    echo $e->getMessage()."\n";

    if (str_contains($e->getMessage(), 'cURL error 60')) {
        echo "\nTu PHP local no tiene certificados CA configurados.\n";
        echo "Para una prueba local temporal, agrega BREVO_API_INSECURE_LOCAL=true al .env.\n";
        echo "En produccion/Dokploy no uses esa variable.\n";
    }

    exit(1);
}

echo 'HTTP status: '.$response->status()."\n";
echo "Respuesta:\n";
echo $response->body()."\n";

if (! $response->successful()) {
    exit(1);
}

$messageId = $response->json('messageId');

if ($messageId) {
    echo "Message-ID: {$messageId}\n";
}

echo "API Brevo acepto el mensaje.\n";
