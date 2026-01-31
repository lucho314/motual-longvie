# CLAUDE.md - Project Guide

> **Nota**: Las respuestas en el chat serán en español.

## Project Overview

**Awesome Lovelace** is a Laravel + React full-stack application for managing and sending monthly retention/deduction statements ("liquidaciones") for cooperative members ("socios"). The system handles financial records, email distribution, and provides a dashboard for administrative operations.

## Tech Stack

- **Backend**: Laravel 9.19, PHP 8.0+, MySQL/MariaDB
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Flowbite-React
- **State Management**: React Query (TanStack), React Hook Form + Yup
- **Auth**: Laravel Sanctum
- **Containerization**: Docker + Docker Compose
- **Package Manager**: pnpm

## Quick Commands

### Backend
```bash
composer install              # Install PHP dependencies
php artisan migrate           # Run database migrations
php artisan serve             # Start dev server (port 8000)
php artisan test              # Run PHPUnit tests
php artisan tinker            # Interactive shell
```

### Frontend
```bash
pnpm install                  # Install JS dependencies
pnpm run dev                  # Start Vite dev server (port 5173)
pnpm run build                # Production build
pnpm run lint                 # Run ESLint
```

### Docker
```bash
docker-compose up -d          # Start containers
docker-compose down           # Stop containers
```

## Project Structure

```
app/
├── Console/Commands/         # CLI commands (GenerarNuevaColumna)
├── Http/Controllers/Api/     # RESTful API controllers
├── Jobs/                     # Queue jobs (email sending)
├── Mail/                     # Mailable classes
├── Models/                   # Eloquent models (User, Socio, Retencion)
└── Services/                 # Business logic (RetencionService, SocioService)

resources/js/
├── components/               # React components (auth, liquidacion, socios, ui)
├── hooks/                    # Custom hooks for API calls
├── interfaces/               # TypeScript interfaces
├── pages/                    # Page components
├── schemas/                  # Yup validation schemas
└── utils/                    # Helpers (parseExcel, column filtering)

database/migrations/          # Schema migrations (including dynamic columns)
routes/
├── api.php                   # API routes (protected by Sanctum)
└── web.php                   # Web routes (SPA entry)
```

## Key Models

- **Socio**: Cooperative member (legajo, nombre, correo) - uses soft deletes
- **Retencion**: Monthly deduction record (30+ financial fields, periodo as YYYY-MM)
- **RetencionMensual**: Period tracking for uploads
- **CorreoEnviado**: Email audit log

## API Endpoints

```
GET/POST   /api/socios                    # List/Create members
GET/PATCH/DELETE /api/socios/{id}         # Member CRUD

GET    /api/liquidacion                   # List periods
POST   /api/liquidacion                   # Upload retentions
GET    /api/liquidacion/{periodo}         # Get period retentions
POST   /api/liquidacion/reenviar          # Resend emails
GET    /api/liquidacion/{id}/detalle      # Single retention detail
```

## Development Patterns

### Backend
- Service layer pattern for business logic
- Form request classes for validation
- Queue jobs for async email sending
- Soft deletes on Socios model

### Frontend
- Custom hooks for API calls (`useSocios`, `useLiquidacion`, etc.)
- React Query for server state
- Flowbite-React UI components
- Feature-based folder organization

## Adding New Deduction Fields

1. Update `Retencion` model `$fillable` array
2. Create SQL migration in `database/migrations/`
3. Update TypeScript interfaces in `resources/js/interfaces/`
4. Update `resources/js/constants/columnasLiquidacion.ts`
5. Update `resources/js/utils/parseExcel.ts` for Excel mapping
6. Update email template `resources/views/emails/liquidacion.blade.php`

Use `php artisan GenerarNuevaColumna` to automate parts of this process.

## Code Style

- **PHP**: PSR-4 autoloading
- **TypeScript**: ESLint + Prettier (no semicolons, 80-char lines)
- **CSS**: Tailwind utility-first

## Environment

Key `.env` variables:
- `DB_*`: Database connection
- `MAIL_*`: SMTP configuration (Mailtrap for testing)
- `QUEUE_CONNECTION`: sync (default) or database/redis

## Access URLs

- Frontend dev: `http://localhost:5173`
- Backend: `http://localhost:8000`
- Database: `localhost:3306`
