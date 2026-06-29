-- Agregar columna inst_cd a las tablas necesarias
-- Ejecutar este SQL en la base de datos

ALTER TABLE retencions ADD COLUMN inst_cd DECIMAL(10,2) DEFAULT 0.00;

-- Actualizar registros existentes (opcional)
-- UPDATE retenciones_mensuales SET inst_cd = 0.00 WHERE inst_cd IS NULL;
-- UPDATE retenciones SET inst_cd = 0.00 WHERE inst_cd IS NULL;
