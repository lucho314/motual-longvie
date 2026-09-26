-- Agregar columna taborda a las tablas necesarias
-- Ejecutar este SQL en la base de datos

ALTER TABLE retencions ADD COLUMN taborda DECIMAL(10,2) DEFAULT 0.00;

-- Actualizar registros existentes (opcional)
-- UPDATE retenciones_mensuales SET taborda = 0.00 WHERE taborda IS NULL;
-- UPDATE retenciones SET taborda = 0.00 WHERE taborda IS NULL;
