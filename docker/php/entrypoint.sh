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

# Espera a que MariaDB esté lista y corre migrations con retry.
RETRIES=0
while [ $RETRIES -lt 30 ]; do
  if php artisan migrate --no-interaction --force; then
    break
  fi
  RETRIES=$((RETRIES + 1))
  echo "DB no lista, retry $RETRIES/30 en 3s..."
  sleep 3
done

exec "$@"
