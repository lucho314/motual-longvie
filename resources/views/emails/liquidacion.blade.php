<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            padding: 20px;
            margin: 0;
            color: #333;
        }

        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 25px;
            max-width: 600px;
            margin: auto;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        h1 {
            color: #0073aa;
            font-size: 24px;
        }

        p {
            font-size: 16px;
            line-height: 1.6;
        }

        ul {
            list-style: none;
            padding-left: 0;
        }

        li {
            margin-bottom: 6px;
            font-size: 15px;
        }

        .section-title {
            margin-top: 20px;
            font-weight: bold;
            font-size: 17px;
            color: #555;
        }

        .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #777;
        }

        @media only screen and (max-width: 600px) {
            .container {
                padding: 15px;
            }

            h1 {
                font-size: 20px;
            }

            p, li {
                font-size: 14px;
            }

            .section-title {
                font-size: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hola {{ $socio->nombre }}</h1>

        <p>Este es el detalle de tu liquidación del período <strong>{{ $retenciones->periodo }}</strong>.</p>

        <div class="section-title">Socio #{{ $retenciones->legajo }}</div>
        <ul>
            @php
                $detalles = [
                    'cuota', 'ss_adm', 'fcia_maria_luisa', 'fcia_amur', 'fcia_la_botica',
                    'oseca', 'villegas', 'luz_y_fza', 'flama', 'fontana',
                    'moto_city', 'transporte', 'mutual_sol', 'viandas', 'seguro',
                    'uso_ins_cd', 'cantina_cd', 'saldo', 'interes_saldo',
                    'sub_total', 'gasto_bancario', 'total'
                ];
            @endphp

            @foreach($detalles as $campo)
                @if($retenciones->$campo != "0.00")
                    <li><strong>{{ ucwords(str_replace('_', ' ', $campo)) }}:</strong> ${{ number_format($retenciones->$campo, 2, ',', '.') }}</li>
                @endif
            @endforeach
        </ul>

        <div class="footer">
            <p>Gracias por tu confianza.</p>
            <p>Atentamente,</p>
            <p>El equipo de Asociación Mutual Personal Longvie Paraná</p>
        </div>
    </div>
</body>
</html>
