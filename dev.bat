@echo off
setlocal enabledelayedexpansion

REM Mutual Retenciones - Development Helper Script (Windows)

set COMPOSE_FILE=docker-compose.dev.yml
set DC=docker-compose -f %COMPOSE_FILE%

if "%1"=="" goto help
if "%1"=="start" goto start
if "%1"=="stop" goto stop
if "%1"=="restart" goto restart
if "%1"=="logs" goto logs
if "%1"=="build" goto build
if "%1"=="setup" goto setup
if "%1"=="artisan" goto artisan
if "%1"=="composer" goto composer
if "%1"=="pnpm" goto pnpm
if "%1"=="test" goto test
if "%1"=="shell" goto shell
if "%1"=="mysql" goto mysql
if "%1"=="redis" goto redis
if "%1"=="queue:restart" goto queue_restart
if "%1"=="fresh" goto fresh
goto help

:start
echo 🚀 Starting development environment...
%DC% up -d
echo ✅ Services started!
echo.
echo 📍 Access URLs:
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:8000
echo    phpMyAdmin: http://localhost:8080
echo    MailHog: http://localhost:8025
goto end

:stop
echo 🛑 Stopping development environment...
%DC% down
echo ✅ Services stopped!
goto end

:restart
echo 🔄 Restarting development environment...
%DC% restart
echo ✅ Services restarted!
goto end

:logs
if "%2"=="" (
  %DC% logs -f
) else (
  %DC% logs -f %2
)
goto end

:build
echo 🔨 Building containers...
%DC% build --no-cache
echo ✅ Build complete!
goto end

:setup
echo 🔧 Setting up development environment...

if not exist .env (
  echo 📄 Copying .env.development to .env...
  copy .env.development .env
)

echo 🔨 Building containers...
%DC% build

echo 🚀 Starting services...
%DC% up -d

echo ⏳ Waiting for database...
timeout /t 10 /nobreak >nul

echo 📦 Installing PHP dependencies...
%DC% exec app composer install

echo 🔑 Generating application key...
%DC% exec app php artisan key:generate

echo 🗄️  Running migrations...
%DC% exec app php artisan migrate

echo.
echo ✅ Setup complete!
echo.
echo 📍 Access URLs:
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:8000
echo    phpMyAdmin: http://localhost:8080
echo    MailHog: http://localhost:8025
goto end

:artisan
shift
%DC% exec app php artisan %*
goto end

:composer
shift
%DC% exec app composer %*
goto end

:pnpm
shift
pnpm %*
goto end

:test
echo 🧪 Running tests...
%DC% exec app php artisan test
goto end

:shell
if "%2"=="" (
  set SERVICE=app
) else (
  set SERVICE=%2
)
echo 🐚 Opening shell in !SERVICE! container...
%DC% exec !SERVICE! sh
goto end

:mysql
echo 🗄️  Connecting to MySQL...
%DC% exec mariadb mysql -u laravel -plaravel mutual
goto end

:redis
echo 📦 Connecting to Redis...
%DC% exec redis redis-cli
goto end

:queue_restart
echo 🔄 Restarting queue worker...
%DC% restart queue
echo ✅ Queue worker restarted!
goto end

:fresh
echo 🗑️  Removing all containers and volumes...
%DC% down -v
echo 🔨 Rebuilding...
%DC% build --no-cache
echo 🚀 Starting services...
%DC% up -d
echo ✅ Fresh environment ready!
goto end

:help
echo Mutual Retenciones - Development Helper
echo.
echo Usage: dev.bat [command]
echo.
echo Commands:
echo   start          Start all services
echo   stop           Stop all services
echo   restart        Restart all services
echo   logs [service] Show logs (optionally for specific service)
echo   build          Rebuild containers
echo   setup          Initial setup (first time only)
echo.
echo   artisan ...    Run artisan command
echo   composer ...   Run composer command
echo   pnpm ...       Run pnpm command
echo   test           Run PHPUnit tests
echo.
echo   shell [service] Open shell in container (default: app)
echo   mysql          Connect to MySQL CLI
echo   redis          Connect to Redis CLI
echo   queue:restart  Restart queue worker
echo.
echo   fresh          Reset everything (⚠️  destroys data)
echo.
echo Examples:
echo   dev.bat start
echo   dev.bat artisan migrate
echo   dev.bat composer require package/name
echo   dev.bat logs app
goto end

:end
endlocal
