CREATE TABLE control_fields(
    active boolean DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE provider(
    id SERIAL PRIMARY KEY,
    name VARCHAR(500),
    phone_number VARCHAR(20),
    address VARCHAR(700),
    comments VARCHAR(500)
) INHERITS (control_fields);

CREATE TABLE client(
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(300),
    phone_number VARCHAR(20),
    comments VARCHAR(500) 
) INHERITS (control_fields);

CREATE TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    last_name VARCHAR(200),
    birth_date DATE,
    email VARCHAR(300),
    phone_number VARCHAR(20),
    address VARCHAR(300)
) INHERITS (control_fields);


CREATE TABLE product_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
) INHERITS(control_fields);

CREATE TABLE file_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
) INHERITS(control_fields);

CREATE TABLE role(
    id SERIAL PRIMARY KEY,
    description varchar(100)
)INHERITS(control_fields);

CREATE TABLE price(
    id SERIAL PRIMARY KEY,
    cost MONEY,
    description VARCHAR(400)
) INHERITS (control_fields);


CREATE TABLE brand_type(
    id SERIAL PRIMARY KEY,
    type VARCHAR(100)
) INHERITS (control_fields);

CREATE TABLE brand(
    id SERIAL PRIMARY KEY,
    name VARCHAR(300),
    brand_type_id INT NOT NULL,
    FOREIGN KEY (brand_type_id) REFERENCES brand_type(id)
) INHERITS (control_fields);

CREATE TABLE product(
    id SERIAL PRIMARY KEY,
    name VARCHAR(300),
    comments VARCHAR(5000),
    stock_count INT,
    dpi VARCHAR(300),
    product_type_id INT NOT NULL,
    FOREIGN KEY (product_type_id) REFERENCES product_type(id)
) INHERITS (control_fields);

CREATE TABLE file (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(50) NOT NULL,
    storage_path TEXT NOT NULL,
    object_id INT NOT NULL,
    order_id INT,
    file_type_id INT NOT NULL,
    FOREIGN KEY (file_type_id) REFERENCES file_type(id)
) INHERITS (control_fields);

CREATE TABLE product_price(
    product_id INT NOT NULL,
    price_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
    FOREIGN KEY (price_id) REFERENCES price(id) ON DELETE CASCADE
) INHERITS (control_fields);

CREATE TABLE provider_product(
    product_id INT NOT NULL,
    price_id INT NOT NULL,
    provider_id INT NOT NULL,
    num_series VARCHAR(3000),
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
    FOREIGN KEY (price_id) REFERENCES price(id) ON DELETE CASCADE,
    FOREIGN KEY (provider_id) REFERENCES provider(id) ON DELETE CASCADE
) INHERITS (control_fields);

CREATE TABLE "user"(
    id varchar(500) PRIMARY KEY,
    person_id INT,
    role_id INT,
    FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
) INHERITS (control_fields);

CREATE TABLE car_model(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    brand_id INT,
    FOREIGN KEY (brand_id) REFERENCES brand(id) ON DELETE CASCADE
) INHERITS (control_fields);

CREATE TABLE vehicle(
    id SERIAL PRIMARY KEY,
    car_model_id INT,
    version VARCHAR(300),
    FOREIGN KEY (car_model_id) REFERENCES car_model(id) ON DELETE CASCADE
) INHERITS (control_fields);

CREATE TABLE client_vehicle(
    vehicle_id INT NOT NULL,
    client_id INT NOT NULL,
    color VARCHAR(300),
    plate VARCHAR(600),
    comments VARCHAR(700),
    FOREIGN KEY (vehicle_id) REFERENCES vehicle(id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES client(id) ON DELETE CASCADE
) INHERITS (control_fields);

CREATE TABLE product_car_model (
    product_id INT NOT NULL,
    car_model_id INT,
    initial_year INT,
    last_year INT,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
    FOREIGN KEY (car_model_id) REFERENCES car_model(id) ON DELETE CASCADE
) INHERITS (control_fields);


ALTER TABLE product
  ADD COLUMN parent_product_id INT,
  ADD CONSTRAINT fk_parent_product
    FOREIGN KEY (parent_product_id)
    REFERENCES product(id);