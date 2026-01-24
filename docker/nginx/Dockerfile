# syntax=docker/dockerfile:1

FROM node:20-alpine AS node_builder
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

COPY . ./
RUN pnpm build


FROM nginx:1.25-alpine

WORKDIR /var/www/html

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY public ./public
COPY --from=node_builder /app/public/build ./public/build

RUN rm -rf public/storage \
  && ln -s ../storage/app/public public/storage
