-- Agregar columna torno_pezca a las tablas necesarias
-- Ejecutar este SQL en la base de datos

ALTER TABLE retenciones_mensuales ADD COLUMN torno_pezca DECIMAL(10,2) DEFAULT 0.00;
ALTER TABLE retenciones ADD COLUMN torno_pezca DECIMAL(10,2) DEFAULT 0.00;

-- Actualizar registros existentes (opcional)
-- UPDATE retenciones_mensuales SET torno_pezca = 0.00 WHERE torno_pezca IS NULL;
-- UPDATE retenciones SET torno_pezca = 0.00 WHERE torno_pezca IS NULL;
