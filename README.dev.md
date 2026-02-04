# Guía de Desarrollo con Docker

## 🚀 Inicio Rápido

### 1. Preparar el entorno

```bash
# Copiar el archivo de variables de entorno para desarrollo
cp .env.development .env

# Construir los contenedores
docker-compose -f docker-compose.dev.yml build

# Iniciar los servicios
docker-compose -f docker-compose.dev.yml up -d
```

### 2. Instalar dependencias

```bash
# Instalar dependencias de PHP (dentro del contenedor)
docker-compose -f docker-compose.dev.yml exec app composer install

# Generar la clave de aplicación
docker-compose -f docker-compose.dev.yml exec app php artisan key:generate

# Ejecutar migraciones
docker-compose -f docker-compose.dev.yml exec app php artisan migrate

# (Opcional) Ejecutar seeders
docker-compose -f docker-compose.dev.yml exec app php artisan db:seed
```

### 3. Acceder a la aplicación

- **Frontend (React + Vite)**: http://localhost:5173
- **Backend (Laravel API)**: http://localhost:8000
- **phpMyAdmin**: http://localhost:8080
- **MailHog (Email Testing)**: http://localhost:8025

## 📦 Servicios Incluidos

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| **nginx** | 8000 | Servidor web para Laravel |
| **app** | - | PHP-FPM 8.2 con Xdebug |
| **mariadb** | 3306 | Base de datos MariaDB 10.11 |
| **redis** | 6379 | Cache y queue driver |
| **queue** | - | Worker de colas de Laravel |
| **vite** | 5173 | Dev server de Vite con HMR |
| **mailhog** | 1025, 8025 | Servidor SMTP para testing |
| **phpmyadmin** | 8080 | Administrador de base de datos |

## 🛠️ Comandos Útiles

### Gestión de contenedores

```bash
# Iniciar servicios
docker-compose -f docker-compose.dev.yml up -d

# Ver logs
docker-compose -f docker-compose.dev.yml logs -f

# Ver logs de un servicio específico
docker-compose -f docker-compose.dev.yml logs -f app

# Detener servicios
docker-compose -f docker-compose.dev.yml down

# Detener y eliminar volúmenes (⚠️ borra la base de datos)
docker-compose -f docker-compose.dev.yml down -v
```

### Laravel (Backend)

```bash
# Ejecutar comandos de Artisan
docker-compose -f docker-compose.dev.yml exec app php artisan <comando>

# Ejemplos:
docker-compose -f docker-compose.dev.yml exec app php artisan migrate
docker-compose -f docker-compose.dev.yml exec app php artisan tinker
docker-compose -f docker-compose.dev.yml exec app php artisan route:list

# Ejecutar tests
docker-compose -f docker-compose.dev.yml exec app php artisan test

# Limpiar cachés
docker-compose -f docker-compose.dev.yml exec app php artisan cache:clear
docker-compose -f docker-compose.dev.yml exec app php artisan config:clear
docker-compose -f docker-compose.dev.yml exec app php artisan view:clear
```

### Base de datos

```bash
# Acceder a MySQL CLI
docker-compose -f docker-compose.dev.yml exec mariadb mysql -u laravel -plaravel mutual

# Backup de la base de datos
docker-compose -f docker-compose.dev.yml exec mariadb mysqldump -u laravel -plaravel mutual > backup.sql

# Restaurar backup
docker-compose -f docker-compose.dev.yml exec -T mariadb mysql -u laravel -plaravel mutual < backup.sql

# Ver logs de MariaDB
docker-compose -f docker-compose.dev.yml logs -f mariadb
```

### Queue Worker

```bash
# Ver logs del worker
docker-compose -f docker-compose.dev.yml logs -f queue

# Reiniciar el worker (después de cambios en jobs)
docker-compose -f docker-compose.dev.yml restart queue

# Ver trabajos en la cola
docker-compose -f docker-compose.dev.yml exec app php artisan queue:monitor
```

### Redis

```bash
# Conectar a Redis CLI
docker-compose -f docker-compose.dev.yml exec redis redis-cli

# Ver todas las keys
docker-compose -f docker-compose.dev.yml exec redis redis-cli KEYS '*'

# Limpiar Redis
docker-compose -f docker-compose.dev.yml exec redis redis-cli FLUSHALL
```

## 🐛 Debugging con Xdebug

El contenedor de PHP incluye Xdebug configurado en el puerto 9003.

### Configuración en VS Code

Crea o actualiza `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Listen for Xdebug",
      "type": "php",
      "request": "launch",
      "port": 9003,
      "pathMappings": {
        "/var/www/html": "${workspaceFolder}"
      }
    }
  ]
}
```

### Activar Xdebug en el navegador

Instala la extensión "Xdebug Helper" para tu navegador y actívala cuando necesites debuggear.

## 📧 Testing de Emails

Los emails se envían a **MailHog** en desarrollo:

1. Abre http://localhost:8025
2. Todos los emails enviados por la aplicación aparecerán ahí
3. No se envían emails reales en desarrollo

## 🔄 Hot Reload

- **Frontend**: Vite tiene HMR (Hot Module Replacement) activado por defecto
- **Backend**: Los cambios en PHP se reflejan automáticamente (sin necesidad de reiniciar)
- **Queue Worker**: Requiere reinicio manual después de cambios en Jobs

## 🗄️ Acceso a Base de Datos

### Opción 1: phpMyAdmin (Recomendado)
- URL: http://localhost:8080
- Usuario: `laravel`
- Contraseña: `laravel`

### Opción 2: Cliente externo (DBeaver, TablePlus, etc.)
- Host: `localhost`
- Puerto: `3306`
- Usuario: `laravel`
- Contraseña: `laravel`
- Base de datos: `mutual`

## 🧹 Limpieza y Troubleshooting

### Resetear todo (fresh start)

```bash
# Detener y eliminar contenedores y volúmenes
docker-compose -f docker-compose.dev.yml down -v

# Eliminar imágenes
docker-compose -f docker-compose.dev.yml down --rmi all

# Reconstruir desde cero
docker-compose -f docker-compose.dev.yml build --no-cache
docker-compose -f docker-compose.dev.yml up -d
```

### Problemas comunes

#### "Port already in use"
```bash
# Ver qué proceso usa el puerto
netstat -ano | findstr :8000

# Cambiar el puerto en docker-compose.dev.yml
```

#### "Permission denied" en Linux/Mac
```bash
# Dar permisos a storage y bootstrap/cache
sudo chown -R $USER:$USER storage bootstrap/cache
```

#### El worker no procesa jobs
```bash
# Verificar que Redis esté funcionando
docker-compose -f docker-compose.dev.yml exec redis redis-cli ping

# Reiniciar el worker
docker-compose -f docker-compose.dev.yml restart queue
```

#### No se conecta a la base de datos
```bash
# Verificar que MariaDB esté healthy
docker-compose -f docker-compose.dev.yml ps

# Ver logs de MariaDB
docker-compose -f docker-compose.dev.yml logs mariadb
```

## 📝 Notas Adicionales

- Los archivos del proyecto están montados como volúmenes, los cambios se reflejan inmediatamente
- `node_modules` está en un volumen separado para mejor performance en Windows
- Redis se usa para cache, sessions y queues en desarrollo
- Los logs de Laravel están en `storage/logs/laravel.log` dentro del contenedor

## 🔗 Enlaces Útiles

- [Documentación de Laravel](https://laravel.com/docs)
- [Documentación de Docker Compose](https://docs.docker.com/compose/)
- [Xdebug Documentation](https://xdebug.org/docs/)
