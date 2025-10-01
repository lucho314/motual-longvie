-- Agregar columna cant_metal a las tablas necesarias
-- Ejecutar este SQL en la base de datos

ALTER TABLE retencions ADD COLUMN cant_metal DECIMAL(10,2) DEFAULT 0.00;

-- Actualizar registros existentes (opcional)
-- UPDATE retenciones_mensuales SET cant_metal = 0.00 WHERE cant_metal IS NULL;
-- UPDATE retenciones SET cant_metal = 0.00 WHERE cant_metal IS NULL;
