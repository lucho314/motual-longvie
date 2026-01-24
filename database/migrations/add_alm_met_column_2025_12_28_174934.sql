-- Agregar columna alm_met a las tablas necesarias
-- Ejecutar este SQL en la base de datos

ALTER TABLE retencions ADD COLUMN alm_met DECIMAL(10,2) DEFAULT 0.00;

-- Actualizar registros existentes (opcional)
-- UPDATE retenciones_mensuales SET alm_met = 0.00 WHERE alm_met IS NULL;
-- UPDATE retenciones SET alm_met = 0.00 WHERE alm_met IS NULL;
