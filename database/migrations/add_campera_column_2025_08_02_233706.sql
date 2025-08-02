-- Agregar columna campera a las tablas necesarias
-- Ejecutar este SQL en la base de datos

ALTER TABLE retenciones_mensuales ADD COLUMN campera DECIMAL(10,2) DEFAULT 0.00;
ALTER TABLE retenciones ADD COLUMN campera DECIMAL(10,2) DEFAULT 0.00;

-- Actualizar registros existentes (opcional)
-- UPDATE retenciones_mensuales SET campera = 0.00 WHERE campera IS NULL;
-- UPDATE retenciones SET campera = 0.00 WHERE campera IS NULL;
