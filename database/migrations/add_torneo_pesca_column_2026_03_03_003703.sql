-- Agregar columna torneo_pesca a las tablas necesarias
-- Ejecutar este SQL en la base de datos

ALTER TABLE retencions ADD COLUMN torneo_pesca DECIMAL(10,2) DEFAULT 0.00;

-- Actualizar registros existentes (opcional)
-- UPDATE retenciones_mensuales SET torneo_pesca = 0.00 WHERE torneo_pesca IS NULL;
-- UPDATE retenciones SET torneo_pesca = 0.00 WHERE torneo_pesca IS NULL;
