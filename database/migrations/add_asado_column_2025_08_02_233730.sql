-- Agregar columna asado a las tablas necesarias
-- Ejecutar este SQL en la base de datos

ALTER TABLE retenciones_mensuales ADD COLUMN asado DECIMAL(10,2) DEFAULT 0.00;
ALTER TABLE retenciones ADD COLUMN asado DECIMAL(10,2) DEFAULT 0.00;

-- Actualizar registros existentes (opcional)
-- UPDATE retenciones_mensuales SET asado = 0.00 WHERE asado IS NULL;
-- UPDATE retenciones SET asado = 0.00 WHERE asado IS NULL;
