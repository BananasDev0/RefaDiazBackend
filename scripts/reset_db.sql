-- Comandos para eliminar tablas específicas, ajustando el orden para respetar las restricciones de clave foránea

-- Eliminar primero las tablas que dependen de otras más fundamentales
DROP TABLE IF EXISTS client_vehicle CASCADE;
DROP TABLE IF EXISTS provider_product CASCADE;
DROP TABLE IF EXISTS product_price CASCADE;
DROP TABLE IF EXISTS product_car_model CASCADE;

-- Continuar con las tablas que podrían ser referenciadas por las tablas eliminadas anteriormente
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS file CASCADE;
DROP TABLE IF EXISTS vehicle CASCADE;

-- Las tablas de relación se deben eliminar antes de eliminar las tablas de entidad a las que refieren
DROP TABLE IF EXISTS price CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

-- Continuar con la eliminación de tablas que son base para otras más específicas
DROP TABLE IF EXISTS car_model CASCADE;
DROP TABLE IF EXISTS brand CASCADE;
DROP TABLE IF EXISTS client CASCADE;
DROP TABLE IF EXISTS provider CASCADE;
DROP TABLE IF EXISTS person CASCADE;

-- Tablas que sirven como tipos para referencias o son entidades independientes
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS brand_type CASCADE;
DROP TABLE IF EXISTS file_type CASCADE;
DROP TABLE IF EXISTS product_type CASCADE;

-- Finalmente, eliminar tablas base que no tienen dependencias externas
DROP TABLE IF EXISTS control_fields CASCADE;
