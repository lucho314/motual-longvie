# syntax=docker/dockerfile:1

FROM node:24-alpine3.24 AS node_builder
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

COPY . ./
RUN pnpm build


FROM nginx:1.30.6-alpine3.24@sha256:47928bf67eb62a1863cb08d9ecb52d3e704304ba614eaee17884204677702951

WORKDIR /var/www/html

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY public ./public
COPY --from=node_builder /app/public/build ./public/build

RUN rm -rf public/storage \
  && ln -s ../storage/app/public public/storage
