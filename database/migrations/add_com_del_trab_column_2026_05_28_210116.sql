-- Agregar columna com_del_trab a las tablas necesarias
-- Ejecutar este SQL en la base de datos

ALTER TABLE retencions ADD COLUMN com_del_trab DECIMAL(10,2) DEFAULT 0.00;

-- Actualizar registros existentes (opcional)
-- UPDATE retenciones_mensuales SET com_del_trab = 0.00 WHERE com_del_trab IS NULL;
-- UPDATE retenciones SET com_del_trab = 0.00 WHERE com_del_trab IS NULL;
