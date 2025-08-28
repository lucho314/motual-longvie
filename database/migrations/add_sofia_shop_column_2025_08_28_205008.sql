-- Agregar columna sofia_shop a las tablas necesarias
-- Ejecutar este SQL en la base de datos

ALTER TABLE retencions ADD COLUMN sofia_shop DECIMAL(10,2) DEFAULT 0.00;

-- Actualizar registros existentes (opcional)
-- UPDATE retenciones_mensuales SET sofia_shop = 0.00 WHERE sofia_shop IS NULL;
-- UPDATE retenciones SET sofia_shop = 0.00 WHERE sofia_shop IS NULL;
