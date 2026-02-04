# Setup para Desarrollo Local (Sin Docker para PHP)

Esta guía te permite ejecutar el proyecto con **mejor performance** usando PHP nativo de Windows y solo Docker para la base de datos.

## 📋 Requisitos

### 1. PHP 8.2
Descarga e instala PHP 8.2 desde: https://windows.php.net/download/

**Extensiones necesarias:**
- pdo_mysql
- mbstring
- openssl
- zip
- curl

**Verificar instalación:**
```bash
php -v
# Debe mostrar: PHP 8.2.x
```

### 2. Composer
https://getcomposer.org/download/

### 3. Node.js + pnpm
```bash
npm install -g pnpm
```

### 4. Docker Desktop
Solo para MariaDB, Redis y MailHog

## 🚀 Setup Inicial

### Opción 1: Usando el script (Recomendado)

1. **Edita `local-dev.bat`** y ajusta la ruta de PHP 8.2:
   ```batch
   set PHP_PATH=C:\php-8.2\php.exe
   ```

2. **Ejecuta el setup:**
   ```bash
   local-dev.bat setup
   ```

3. **Inicia los servicios de Docker:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d mariadb redis mailhog
   ```

4. **Inicia el backend:**
   ```bash
   local-dev.bat serve
   ```

5. **En otra terminal, inicia el frontend:**
   ```bash
   pnpm run dev
   ```

### Opción 2: Manual

```bash
# 1. Copiar configuración
copy .env.local .env

# 2. Instalar dependencias
composer install
pnpm install

# 3. Limpiar cachés
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# 4. Iniciar servicios Docker
docker-compose -f docker-compose.dev.yml up -d mariadb redis mailhog

# 5. Verificar base de datos
php artisan migrate:status

# 6. Iniciar backend (terminal 1)
php artisan serve

# 7. Iniciar frontend (terminal 2)
pnpm run dev
```

## 📍 URLs

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000
- **phpMyAdmin**: http://localhost:8080 (si está en Docker)
- **MailHog**: http://localhost:8025

## 🛠️ Comandos Útiles

### Usando el script helper
```bash
local-dev.bat serve              # Iniciar servidor
local-dev.bat artisan migrate    # Ejecutar migraciones
local-dev.bat artisan tinker     # Shell interactivo
local-dev.bat db                 # Conectar a MySQL
```

### Manual
```bash
php artisan serve                # Iniciar servidor
php artisan migrate              # Ejecutar migraciones
php artisan tinker               # Shell interactivo
php artisan queue:work           # Procesar colas
```

## ⚡ Performance

Con desarrollo local esperado:
- Primera request: ~200-500ms ⚡
- Requests posteriores: ~100-300ms ⚡⚡
- Login: ~300-600ms ⚡

**5-10x más rápido que Docker completo!**

## 🔧 Troubleshooting

### Error: "Class not found"
```bash
composer dump-autoload
php artisan config:clear
```

### Error: "SQLSTATE[HY000] [2002] Connection refused"
```bash
# Verificar que MariaDB esté corriendo
docker-compose -f docker-compose.dev.yml ps

# Iniciar MariaDB
docker-compose -f docker-compose.dev.yml up -d mariadb
```

### Error: "Session store not set"
```bash
php artisan config:clear
php artisan cache:clear
```

### PHP muestra deprecation warnings
Edita `php.ini` y cambia:
```ini
error_reporting = E_ALL & ~E_DEPRECATED
```

O en `.env`:
```env
LOG_LEVEL=warning
```

## 🔄 Volver a Docker

Si quieres volver a usar Docker completo:

```bash
# Detener servicios locales (Ctrl+C en las terminales)

# Copiar .env.development a .env
copy .env.development .env

# Iniciar Docker completo
docker-compose -f docker-compose.dev.yml up -d
```

## 📝 Notas

- `.env.local` tiene la configuración para desarrollo nativo
- `.env.development` tiene la configuración para Docker
- MariaDB, Redis y MailHog siguen corriendo en Docker
- Solo PHP y Node corren nativamente en Windows
