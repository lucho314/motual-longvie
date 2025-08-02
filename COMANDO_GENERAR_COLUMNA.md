# Comando para Generar Nueva Columna

## Descripción
Este comando automatiza la creación de nuevas columnas en todos los archivos necesarios del sistema de liquidaciones.

## Uso
```bash
php artisan generar:columna {key} {label} {row}
```

### Parámetros:
- **key**: El nombre de la clave/campo en camelCase o snake_case (ej: `nueva_deduccion`)
- **label**: La etiqueta que se mostrará en la interfaz (ej: `"Nueva Deducción"`)
- **row**: El nombre de la columna en el Excel (ej: `"Nueva Ded"`)

## Ejemplos de uso:
```bash
# Agregar una nueva deducción
php artisan generar:columna nueva_deduccion "Nueva Deducción" "Nueva Ded"

# Agregar descuento médico
php artisan generar:columna descuento_medico "Descuento Médico" "Desc Med"

# Agregar aporte jubilatorio
php artisan generar:columna aporte_jubilatorio "Aporte Jubilatorio" "Ap Jubil"
```

## ¿Qué hace el comando?

### 1. Actualiza `resources/js/constants/columnasLiquidacion.ts`
Agrega la nueva columna al array de columnas:
```typescript
{ key: 'nueva_deduccion', label: 'Nueva Deducción' }
```

Y al array de campos:
```typescript
'nueva_deduccion',
```

### 2. Actualiza `resources/js/interfaces/DetalleLiquidacion.ts`
Agrega la propiedad como string:
```typescript
nueva_deduccion: string
```

### 3. Actualiza `resources/js/interfaces/Liquidacion.ts`
Agrega la propiedad como number:
```typescript
nueva_deduccion: number
```

### 4. Actualiza `resources/js/utils/parseExcel.ts`
Agrega el mapeo desde el Excel:
```typescript
nueva_deduccion: +Number(row['Nueva Ded']).toFixed(2) || 0,
```

### 5. Genera archivos SQL y migración Laravel
- Crea un archivo `.sql` con las sentencias ALTER TABLE
- Crea una migración de Laravel para agregar la columna a las tablas

## Archivos generados:
- `database/migrations/YYYY_MM_DD_HHMMSS_add_{key}_column.sql` - SQL directo
- `database/migrations/YYYY_MM_DD_HHMMSS_add_{key}_column.php` - Migración Laravel

## Después de ejecutar el comando:

### Opción 1: Usar migración Laravel (recomendado)
```bash
php artisan migrate
```

### Opción 2: Ejecutar SQL manualmente
Ejecutar el contenido del archivo `.sql` generado directamente en la base de datos.

## Estructura de las tablas afectadas:
- `retenciones_mensuales` - Se agrega la columna como `DECIMAL(10,2) DEFAULT 0.00`
- `retenciones` - Se agrega la columna como `DECIMAL(10,2) DEFAULT 0.00`

## Notas importantes:
- ✅ El comando añade las columnas después de la columna `total` en todos los archivos
- ✅ Las columnas se crean como `DECIMAL(10,2)` con valor por defecto `0.00`
- ✅ El comando es seguro de ejecutar múltiples veces (no duplica entradas)
- ✅ Los archivos TypeScript quedan listos para usar inmediatamente
- ✅ Se genera tanto SQL directo como migración de Laravel para máxima flexibilidad

## Flujo completo de trabajo:
1. **Ejecutar el comando** con los parámetros necesarios
2. **Revisar los archivos** generados
3. **Ejecutar** `php artisan migrate` o el SQL manualmente
4. **¡Listo!** La nueva columna ya estará disponible en toda la aplicación

## Ejemplo práctico completo:

```bash
# 1. Ejecutar el comando
php artisan generar:columna descuento_osde "Descuento OSDE" "Desc OSDE"

# 2. Aplicar los cambios a la base de datos
php artisan migrate

# 3. ¡La nueva columna ya está lista para usar!
```

¡El comando automatiza completamente el proceso de agregar nuevas columnas al sistema de liquidaciones!