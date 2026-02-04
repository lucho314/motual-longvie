# syntax=docker/dockerfile:1

FROM node:20-alpine AS node_builder
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

COPY . ./
RUN pnpm build


FROM php:8.2-fpm-bookworm AS composer_builder

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    unzip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . ./
RUN composer install \
    --no-dev \
    --prefer-dist \
    --no-interaction \
    --optimize-autoloader


FROM php:8.2-fpm-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    git \
    libicu-dev \
    libzip-dev \
    unzip \
    zip \
    $PHPIZE_DEPS \
    && docker-php-ext-install \
        intl \
        opcache \
        pdo \
        pdo_mysql \
        zip \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apt-get purge -y --auto-remove $PHPIZE_DEPS \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

COPY --from=composer_builder /app /var/www/html
COPY --from=node_builder /app/public/build /var/www/html/public/build

COPY docker/php/opcache.ini /usr/local/etc/php/conf.d/opcache.ini

COPY docker/php/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh \
    && rm -rf public/storage \
    && ln -s ../storage/app/public public/storage \
    && chown -R www-data:www-data storage bootstrap/cache

ENTRYPOINT ["/entrypoint.sh"]
CMD ["php-fpm"]
