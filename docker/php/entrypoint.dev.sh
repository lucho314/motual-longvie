#!/usr/bin/env sh
set -eu

echo "🚀 Starting Mutual Retenciones (Development Mode)..."

# Ensure runtime-writable directories exist
mkdir -p \
  storage/app/public \
  storage/framework/cache \
  storage/framework/sessions \
  storage/framework/views \
  storage/logs \
  bootstrap/cache

# Set permissions
chown -R www-data:www-data storage bootstrap/cache

# Make sure the public storage symlink exists
if [ ! -L public/storage ]; then
  rm -rf public/storage
  ln -s ../storage/app/public public/storage
fi

# Wait for database to be ready
echo "⏳ Waiting for database..."
until php artisan db:show >/dev/null 2>&1; do
  sleep 1
done

echo "✅ Database ready!"

# Run migrations (only if needed)
if ! php artisan migrate:status >/dev/null 2>&1; then
  echo "🔧 Running migrations..."
  php artisan migrate --force
fi

# Clear caches in development
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear

echo "✨ Application ready!"

exec "$@"
