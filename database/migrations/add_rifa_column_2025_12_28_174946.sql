-- Agregar columna rifa a las tablas necesarias
-- Ejecutar este SQL en la base de datos

ALTER TABLE retencions ADD COLUMN rifa DECIMAL(10,2) DEFAULT 0.00;

-- Actualizar registros existentes (opcional)
-- UPDATE retenciones_mensuales SET rifa = 0.00 WHERE rifa IS NULL;
-- UPDATE retenciones SET rifa = 0.00 WHERE rifa IS NULL;
