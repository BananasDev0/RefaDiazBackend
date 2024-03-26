CREATE TABLE control_fields(
    active boolean,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE brand_type(
    id SERIAL PRIMARY KEY,
    type VARCHAR(100)
) INHERITS (control_fields);

CREATE TABLE brand(
    id SERIAL PRIMARY KEY,
    name VARCHAR(300),
    image_url VARCHAR(5000),
    brand_type_id INT NOT NULL,
    FOREIGN KEY (brand_type_id) REFERENCES brand_type(id)
) INHERITS (control_fields);

CREATE TABLE product(
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(300),
    brand_id INT,
    image_url VARCHAR(5000),
    comments VARCHAR(5000),
    stock_count INT,
    FOREIGN KEY (brand_id) REFERENCES brand(id)
) INHERITS (control_fields);

CREATE TABLE radiator(
    dpi VARCHAR(50) PRIMARY KEY,
    product_id INT,
    FOREIGN KEY (product_id) REFERENCES product(id)
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

CREATE TABLE client(
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(300),
    phone_number INT,
    comments VARCHAR(500) 
) INHERITS (control_fields);

CREATE TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    last_name VARCHAR(200),
    birth_date DATE,
    email VARCHAR(300),
    phone_number VARCHAR(300),
    address VARCHAR(300)
) INHERITS (control_fields);

CREATE TABLE "user"(
    id varchar(500) PRIMARY KEY,
    person_id INT,
    FOREIGN KEY (person_id) REFERENCES person(id)
) INHERITS (control_fields);

CREATE TABLE vehicle_model(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    brand_id INT,
    FOREIGN KEY (brand_id) REFERENCES brand(id)
) INHERITS (control_fields);

CREATE TABLE vehicle(
    id SERIAL PRIMARY KEY,
    vehicle_model_id INT,
    version VARCHAR(300),
    FOREIGN KEY (vehicle_model_id) REFERENCES vehicle_model(id)
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

