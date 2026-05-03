<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$to = $argv[1] ?? 'admin@example.com';
$host = (string) config('mail.mailers.smtp.host');
$port = (int) config('mail.mailers.smtp.port');
$username = (string) config('mail.mailers.smtp.username');
$password = (string) config('mail.mailers.smtp.password');
$from = (string) config('mail.from.address');
$fromName = (string) config('mail.from.name');
$encryption = (string) config('mail.mailers.smtp.encryption');
$subject = 'Prueba SMTP directa - '.date('Y-m-d H:i:s');

echo "Probando SMTP directo contra {$host}:{$port}\n";
echo "Usuario: {$username}\n";
echo "Password: ".strlen($password)." caracteres\n";
echo "Encryption: {$encryption}\n";
echo "From: {$from}\n";
echo "To: {$to}\n";
echo "Subject: {$subject}\n\n";

$transport = in_array($encryption, ['ssl', 'smtps'], true) || $port === 465
    ? 'ssl'
    : 'tcp';

$socket = stream_socket_client(
    "{$transport}://{$host}:{$port}",
    $errno,
    $errstr,
    30,
    STREAM_CLIENT_CONNECT
);

if (! $socket) {
    fwrite(STDERR, "No se pudo conectar: {$errno} {$errstr}\n");
    exit(1);
}

stream_set_timeout($socket, 30);

$read = function () use ($socket): string {
    $response = '';

    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;

        if (preg_match('/^\d{3} /', $line)) {
            break;
        }
    }

    echo '< '.$response;

    return $response;
};

$write = function (string $command) use ($socket): void {
    $safe = preg_match('/^AUTH /', $command) ? 'AUTH <oculto>' : $command;
    echo '> '.$safe."\n";
    fwrite($socket, $command."\r\n");
};

$expect = function (string $response, array $codes, string $step): void {
    $code = substr($response, 0, 3);

    if (! in_array($code, $codes, true)) {
        fwrite(STDERR, "\nFallo en {$step}. Codigo recibido: {$code}\n");
        exit(1);
    }
};

$expect($read(), ['220'], 'conexion inicial');

$write('EHLO mutual-longvie.ar');
$expect($read(), ['250'], 'EHLO');

if ($transport !== 'ssl') {
    $write('STARTTLS');
    $expect($read(), ['220'], 'STARTTLS');

    if (! stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
        fwrite(STDERR, "No se pudo activar TLS.\n");
        exit(1);
    }

    $write('EHLO mutual-longvie.ar');
    $expect($read(), ['250'], 'EHLO TLS');
}

$auth = base64_encode($username."\0".$username."\0".$password);
$write('AUTH PLAIN '.$auth);
$expect($read(), ['235'], 'AUTH PLAIN');

$write("MAIL FROM:<{$from}>");
$expect($read(), ['250'], 'MAIL FROM');

$write("RCPT TO:<{$to}>");
$expect($read(), ['250', '251'], 'RCPT TO');

$write('DATA');
$expect($read(), ['354'], 'DATA');

$headers = [
    'From: '.$fromName.' <'.$from.'>',
    'To: <'.$to.'>',
    'Subject: '.$subject,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
];

$body = "Prueba SMTP directa desde Mutual Retenciones.\r\n";
$message = implode("\r\n", $headers)."\r\n\r\n".$body."\r\n.";

$write($message);
$expect($read(), ['250'], 'contenido del mensaje');

$write('QUIT');
$read();

echo "\nSMTP directo aceptado por el servidor.\n";
