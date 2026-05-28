-- Agregar columna c_superv a las tablas necesarias
-- Ejecutar este SQL en la base de datos

ALTER TABLE retencions ADD COLUMN c_superv DECIMAL(10,2) DEFAULT 0.00;

-- Actualizar registros existentes (opcional)
-- UPDATE retenciones_mensuales SET c_superv = 0.00 WHERE c_superv IS NULL;
-- UPDATE retenciones SET c_superv = 0.00 WHERE c_superv IS NULL;
