#!/usr/bin/env sh
set -eu

# Ensure runtime-writable directories exist.
mkdir -p \
  storage/app \
  storage/framework/cache \
  storage/framework/sessions \
  storage/framework/views \
  storage/logs \
  bootstrap/cache

# Make sure the public storage symlink exists (volume can mask it).
if [ ! -L public/storage ]; then
  rm -rf public/storage
  ln -s ../storage/app/public public/storage
fi

php artisan config:cache
php artisan view:cache

# These can fail if the app uses route closures or other non-cacheable constructs.
php artisan route:cache || true
php artisan event:cache || true

# Run migrations (fails silently si la DB aún no está lista en el primer arranque).
php artisan migrate --no-interaction || true

exec "$@"
