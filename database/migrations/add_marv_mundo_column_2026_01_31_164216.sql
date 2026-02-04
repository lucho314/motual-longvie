-- Agregar columna marv_mundo a las tablas necesarias
-- Ejecutar este SQL en la base de datos

ALTER TABLE retencions ADD COLUMN marv_mundo DECIMAL(10,2) DEFAULT 0.00;

-- Actualizar registros existentes (opcional)
-- UPDATE retenciones_mensuales SET marv_mundo = 0.00 WHERE marv_mundo IS NULL;
-- UPDATE retenciones SET marv_mundo = 0.00 WHERE marv_mundo IS NULL;
