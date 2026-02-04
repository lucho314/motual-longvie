@echo off
REM Script para desarrollo local con PHP 8.2

REM Ruta a PHP 8.2 (ajusta según tu instalación)
set PHP_PATH=C:\php-8.2\php8.2.exe

REM Verificar que PHP 8.2 existe
if not exist "%PHP_PATH%" (
    echo Error: PHP 8.2 no encontrado en %PHP_PATH%
    echo.
    echo Por favor instala PHP 8.2 o ajusta la ruta en local-dev.bat
    echo Descarga: https://windows.php.net/download/
    pause
    exit /b 1
)

REM Verificar versión
echo Verificando PHP...
"%PHP_PATH%" -v
echo.

if "%1"=="" goto help
if "%1"=="serve" goto serve
if "%1"=="artisan" goto artisan
if "%1"=="setup" goto setup
if "%1"=="db" goto db
goto help

:serve
echo Iniciando servidor de desarrollo...
echo.
echo Backend: http://localhost:8000
echo Frontend: ejecuta "pnpm run dev" en otra terminal
echo.
"%PHP_PATH%" artisan serve
goto end

:artisan
shift
"%PHP_PATH%" artisan %*
goto end

:setup
echo Configurando entorno local...
echo.

REM Copiar .env.local a .env
if exist .env.local (
    copy /Y .env.local .env
    echo .env actualizado desde .env.local
) else (
    echo Advertencia: .env.local no encontrado
)

echo.
echo Instalando dependencias PHP...
composer install

echo.
echo Limpiando cachés...
"%PHP_PATH%" artisan config:clear
"%PHP_PATH%" artisan cache:clear
"%PHP_PATH%" artisan route:clear
"%PHP_PATH%" artisan view:clear

echo.
echo Verificando base de datos...
"%PHP_PATH%" artisan migrate:status

echo.
echo Setup completo!
echo.
echo Siguiente paso:
echo   1. Inicia MariaDB: docker-compose -f docker-compose.dev.yml up -d mariadb redis mailhog
echo   2. Inicia backend: local-dev.bat serve
echo   3. Inicia frontend: pnpm run dev
goto end

:db
echo Abriendo shell de MySQL...
docker-compose -f docker-compose.dev.yml exec mariadb mysql -u laravel -plaravel mutual
goto end

:help
echo Mutual Retenciones - Desarrollo Local
echo.
echo Uso: local-dev.bat [comando]
echo.
echo Comandos:
echo   serve          Iniciar servidor de desarrollo (puerto 8000)
echo   artisan ...    Ejecutar comando artisan
echo   setup          Configuración inicial
echo   db             Conectar a MySQL
echo.
echo Ejemplos:
echo   local-dev.bat serve
echo   local-dev.bat artisan migrate
echo   local-dev.bat artisan tinker
goto end

:end
