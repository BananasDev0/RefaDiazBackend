-- Comandos para eliminar tablas específicas, ajustando el orden para respetar las restricciones de clave foránea

-- Eliminar primero las tablas que dependen de otras tablas más fundamentales
DROP TABLE IF EXISTS control_fields CASCADE;
DROP TABLE IF EXISTS client_vehicle CASCADE;
DROP TABLE IF EXISTS provider_product CASCADE;
DROP TABLE IF EXISTS product_price CASCADE;
DROP TABLE IF EXISTS radiator CASCADE;
DROP TABLE IF EXISTS product_file CASCADE; -- Tabla de unión entre productos y archivos

-- Proceder con las tablas que podrían ser referenciadas por las tablas eliminadas anteriormente
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS price CASCADE;

-- Las tablas de archivo se deben eliminar después de eliminar cualquier tabla de unión que las referencie
DROP TABLE IF EXISTS file CASCADE; -- Asegurarse de que product_file ya esté eliminada

-- Continuar con la eliminación de tablas que son base para otras más específicas
DROP TABLE IF EXISTS vehicle CASCADE;
DROP TABLE IF EXISTS client CASCADE;
DROP TABLE IF EXISTS provider CASCADE;
DROP TABLE IF EXISTS price_type CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS person CASCADE;

-- Finalmente, eliminar tablas que sirven como referencias básicas
DROP TABLE IF EXISTS vehicle_model CASCADE;
DROP TABLE IF EXISTS brand CASCADE;
