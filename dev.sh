#!/bin/bash

# Mutual Retenciones - Development Helper Script

set -e

COMPOSE_FILE="docker-compose.dev.yml"
DC="docker-compose -f $COMPOSE_FILE"

case "${1:-}" in
  start)
    echo "🚀 Starting development environment..."
    $DC up -d
    echo "✅ Services started!"
    echo ""
    echo "📍 Access URLs:"
    echo "   Frontend: http://localhost:5173"
    echo "   Backend:  http://localhost:8000"
    echo "   phpMyAdmin: http://localhost:8080"
    echo "   MailHog: http://localhost:8025"
    ;;

  stop)
    echo "🛑 Stopping development environment..."
    $DC down
    echo "✅ Services stopped!"
    ;;

  restart)
    echo "🔄 Restarting development environment..."
    $DC restart
    echo "✅ Services restarted!"
    ;;

  logs)
    SERVICE=${2:-}
    if [ -z "$SERVICE" ]; then
      $DC logs -f
    else
      $DC logs -f "$SERVICE"
    fi
    ;;

  build)
    echo "🔨 Building containers..."
    $DC build --no-cache
    echo "✅ Build complete!"
    ;;

  setup)
    echo "🔧 Setting up development environment..."

    if [ ! -f .env ]; then
      echo "📄 Copying .env.development to .env..."
      cp .env.development .env
    fi

    echo "🔨 Building containers..."
    $DC build

    echo "🚀 Starting services..."
    $DC up -d

    echo "⏳ Waiting for database..."
    sleep 10

    echo "📦 Installing PHP dependencies..."
    $DC exec app composer install

    echo "🔑 Generating application key..."
    $DC exec app php artisan key:generate

    echo "🗄️  Running migrations..."
    $DC exec app php artisan migrate

    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "📍 Access URLs:"
    echo "   Frontend: http://localhost:5173"
    echo "   Backend:  http://localhost:8000"
    echo "   phpMyAdmin: http://localhost:8080"
    echo "   MailHog: http://localhost:8025"
    ;;

  artisan)
    shift
    $DC exec app php artisan "$@"
    ;;

  composer)
    shift
    $DC exec app composer "$@"
    ;;

  pnpm)
    shift
    pnpm "$@"
    ;;

  test)
    echo "🧪 Running tests..."
    $DC exec app php artisan test
    ;;

  shell)
    SERVICE=${2:-app}
    echo "🐚 Opening shell in $SERVICE container..."
    $DC exec "$SERVICE" sh
    ;;

  mysql)
    echo "🗄️  Connecting to MySQL..."
    $DC exec mariadb mysql -u laravel -plaravel mutual
    ;;

  redis)
    echo "📦 Connecting to Redis..."
    $DC exec redis redis-cli
    ;;

  queue:restart)
    echo "🔄 Restarting queue worker..."
    $DC restart queue
    echo "✅ Queue worker restarted!"
    ;;

  fresh)
    echo "🗑️  Removing all containers and volumes..."
    $DC down -v
    echo "🔨 Rebuilding..."
    $DC build --no-cache
    echo "🚀 Starting services..."
    $DC up -d
    echo "✅ Fresh environment ready!"
    ;;

  *)
    echo "Mutual Retenciones - Development Helper"
    echo ""
    echo "Usage: ./dev.sh [command]"
    echo ""
    echo "Commands:"
    echo "  start          Start all services"
    echo "  stop           Stop all services"
    echo "  restart        Restart all services"
    echo "  logs [service] Show logs (optionally for specific service)"
    echo "  build          Rebuild containers"
    echo "  setup          Initial setup (first time only)"
    echo ""
    echo "  artisan ...    Run artisan command"
    echo "  composer ...   Run composer command"
    echo "  pnpm ...       Run pnpm command"
    echo "  test           Run PHPUnit tests"
    echo ""
    echo "  shell [service] Open shell in container (default: app)"
    echo "  mysql          Connect to MySQL CLI"
    echo "  redis          Connect to Redis CLI"
    echo "  queue:restart  Restart queue worker"
    echo ""
    echo "  fresh          Reset everything (⚠️  destroys data)"
    echo ""
    echo "Examples:"
    echo "  ./dev.sh start"
    echo "  ./dev.sh artisan migrate"
    echo "  ./dev.sh composer require package/name"
    echo "  ./dev.sh logs app"
    ;;
esac
