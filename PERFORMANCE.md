# Guía de Performance - Docker en Windows

## 📊 Tiempos Actuales

| Métrica | Tiempo |
|---------|--------|
| Primera request (cold start) | ~3-4s |
| Requests posteriores | ~1.4s |
| Login | ~2s |

## ⚡ Optimizaciones Aplicadas

### 1. PHP Optimizaciones
- ✅ **Xdebug desactivado** por defecto
- ✅ **OPcache habilitado** con 512MB de memoria
- ✅ **Realpath cache** de 4MB (reduce filesystem lookups)
- ✅ **Logs en nivel WARNING** (menos I/O)

### 2. Docker Optimizaciones
- ✅ **Volúmenes en modo `:cached`** para mejor performance
- ✅ **Volumen separado para vendor/** (reduce I/O)
- ✅ **FastCGI buffering** optimizado

### 3. Laravel Optimizaciones
- ✅ **Config cacheada** (`php artisan config:cache`)
- ✅ **Rutas cacheadas** (`php artisan route:cache`)
- ✅ **Vistas cacheadas** (`php artisan view:cache`)
- ✅ **Sesiones en archivos** (más rápido que Redis en local)

## 🐌 Por qué el "Warm-up" es Lento

Docker en Windows/WSL2 tiene overhead significativo en:
1. **Montaje de volúmenes** entre Windows y WSL2
2. **Acceso a archivos** de vendor/ (8000+ archivos)
3. **Primera compilación** de PHP (OPcache calienta)

**Después del warm-up**, OPcache y Realpath cache mantienen todo en memoria.

## 🚀 Cómo Mejorar Más

### Opción 1: Desarrollo Nativo (Más Rápido)
```bash
# Instalar dependencias localmente
composer install
pnpm install

# Usar base de datos de Docker
# En .env:
DB_HOST=localhost
DB_PORT=3306

# Iniciar servicios de Docker (solo DB y Redis)
docker-compose -f docker-compose.dev.yml up -d mariadb redis

# Servidor de desarrollo nativo
php artisan serve         # Puerto 8000
pnpm run dev             # Puerto 5173
```

**Performance esperada**: ~200-500ms por request ⚡

### Opción 2: Código Dentro de WSL2
1. Mover el código a WSL2: `/home/usuario/proyectos/mutual-retenciones`
2. Editar desde WSL2 usando VS Code Remote
3. Docker usa filesystem nativo de Linux

**Performance esperada**: ~500-800ms por request

### Opción 3: Aceptar el Warm-up
- Primera request lenta (3-4s) es normal
- Requests posteriores son rápidas (1.4s)
- Reiniciar servicios menos frecuentemente

## 🔧 Comandos Útiles

### Limpiar Cachés
```bash
dev.bat artisan cache:clear
dev.bat artisan config:clear
dev.bat artisan route:clear
dev.bat artisan view:clear
```

### Recrear Cachés
```bash
dev.bat artisan config:cache
dev.bat artisan route:cache
dev.bat artisan view:cache
```

### Ver Performance de OPcache
```bash
dev.bat artisan tinker
> opcache_get_status()
```

## 📈 Benchmarking

```bash
# Medir tiempo de una API
curl -w "Time: %{time_total}s\n" -o /dev/null -s http://localhost:8000/api/socios

# Hacer 10 requests y sacar promedio
for i in {1..10}; do curl -w "%{time_total}\n" -o /dev/null -s http://localhost:8000/api/socios; done
```

## 💡 Recomendación

Para desarrollo diario, usa **Opción 1 (Desarrollo Nativo)** para mejor performance, y usa Docker solo para:
- Testing de integración
- CI/CD
- Replicar ambiente de producción
- Trabajar en configuraciones de Docker

## ⚠️ Notas

- **NUNCA uses `migrate:fresh`** en producción
- Si cambias `.env`, ejecuta `config:clear` o `config:cache`
- Si cambias rutas, ejecuta `route:clear` o `route:cache`
- OPcache cachea código compilado por 2 segundos (`opcache.revalidate_freq = 2`)
