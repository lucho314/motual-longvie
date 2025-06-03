# 📬 Envío de Liquidaciones por Correo - Laravel

Este proyecto envía por correo electrónico las liquidaciones de socios utilizando Laravel y el servicio de Mailtrap para pruebas de envío de mails en un entorno seguro.

## 🚀 Requisitos

- PHP >= 8.0
- Laravel >= 9
- Composer
- Una cuenta gratuita en [Mailtrap](https://mailtrap.io)

## ⚙️ Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

2. Instalar dependencias:

```bash
composer install
```

3. Copiar y configurar el archivo `.env`:

```bash
cp .env.example .env
```

Configurar los datos de conexión a base de datos y correo. Ejemplo para Mailtrap:

```env
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=tu_usuario_mailtrap
MAIL_PASSWORD=tu_password_mailtrap
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=hello@example.com
MAIL_FROM_NAME="Liquidaciones CPAER"
```

4. Generar la clave de la aplicación:

```bash
php artisan key:generate
```

5. Ejecutar migraciones si corresponde:

```bash
php artisan migrate
```

## 🧪 Envío de correos de prueba

Podés probar el envío de correos de forma manual ejecutando el job directamente desde Tinker:

```bash
php artisan tinker
>>> dispatch(new App\Jobs\EnviarLiquidacionesPorCorreo('2025-04'))
```

> Asegurate de tener registros de liquidaciones con socios que tengan correo electrónico cargado.

## 📂 Estructura relevante

- `app/Jobs/EnviarLiquidacionesPorCorreo.php` → Lógica del job que agrupa liquidaciones por socio y envía el mail.
- `app/Mail/LiquidacionMail.php` → Mailable que renderiza la vista de liquidación.
- `resources/views/emails/liquidacion.blade.php` → Vista HTML del correo.
- `app/Models/Retencion.php` → Modelo con relación `socio`.

## 🛠️ Notas

- Mailtrap es utilizado para evitar envíos reales durante el desarrollo.
- Los correos enviados pueden visualizarse en [inbox.mailtrap.io](https://mailtrap.io/inboxes).

### Para agregar nuevos campos modificar
 modified:   app/Http/Controllers/Api/LiquidacionController.php
  modified:   app/Http/Requests/StoreRetencionRequest.php
  modified:   app/Models/Retencion.php
  modified:   resources/js/constants/columnasLiquidacion.ts
  modified:   resources/js/interfaces/DetalleLiquidacion.ts
  modified:   resources/js/interfaces/Liquidacion.ts
  modified:   resources/js/utils/parseExcel.ts
  modified:   resources/views/emails/liquidacion.blade.php

## 🧑‍💻 Autor

Desarrollado por Luciano Nahuel Zapata.

---

🧙‍♀️ Con cariño y magia de código.
