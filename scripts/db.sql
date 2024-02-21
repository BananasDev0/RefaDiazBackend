CREATE DATABASE REFADIAZDB;

USE REFADIAZDB;

CREATE TABLE control_fields(
    active BIT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION control_fields_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER control_fields_trigger
BEFORE UPDATE ON control_fields
FOR EACH ROW
EXECUTE FUNCTION control_fields_updated_at();


CREATE TABLE brand(
    id SERIAL PRIMARY KEY,
    brand_name VARCHAR(300)
) INHERITS (control_fields);

CREATE TABLE product(
    id SERIAL PRIMARY KEY,
    product_Name VARCHAR(300),
    dpi VARCHAR(300),
    brand_id INT,
    image_url VARCHAR(5000),
    FOREIGN KEY (brand_id) REFERENCES brand(id)
) INHERITS (control_fields);

CREATE TABLE price_type(
    id SERIAL PRIMARY KEY,
    price_name VARCHAR(400)
) INHERITS (control_fields);

CREATE TABLE price(
    id SERIAL PRIMARY KEY,
    price_type_id INT NOT NULL,
    cost INT,
    material VARCHAR(400),
    FOREIGN KEY (price_type_id) REFERENCES price_type(id)
) INHERITS (control_fields);

CREATE TABLE product_price(
    product_id INT NOT NULL,
    price_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (price_id) REFERENCES price(id)
) INHERITS (control_fields);

CREATE TABLE provider(
    id SERIAL PRIMARY KEY,
    provider_name VARCHAR(500),
    phone_number INT,
    provider_address VARCHAR(700),
    comments VARCHAR(500)
) INHERITS (control_fields);

CREATE TABLE provider_product(
    product_id INT NOT NULL,
    price_id INT NOT NULL,
    provider_id INT NOT NULL,
    num_series VARCHAR(3000),
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (price_id) REFERENCES price(id),
    FOREIGN KEY (provider_id) REFERENCES provider(id)
) INHERITS (control_fields);

CREATE TABLE vehicle(
    id SERIAL PRIMARY KEY,
    brand_id INT NOT NULL,
    model VARCHAR(400),
    car_version VARCHAR(400),
    car_year INT,
    FOREIGN KEY (brand_id) REFERENCES brand(id)
) INHERITS (control_fields);

CREATE TABLE client(
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(300),
    phone_number INT,
    comments VARCHAR(500) 
) INHERITS (control_fields);

CREATE TABLE client_vehicle(
    vehicle_id INT NOT NULL,
    client_id INT NOT NULL,
    color VARCHAR(300),
    plate VARCHAR(600),
    comments VARCHAR(700),
    FOREIGN KEY (vehicle_id) REFERENCES vehicle(id),
    FOREIGN KEY (client_id) REFERENCES client(id)
) INHERITS (control_fields);
