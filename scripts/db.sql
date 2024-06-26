CREATE TABLE control_fields(
    active boolean,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE role(
    id SERIAL PRIMARY KEY,
    description varchar(100)
)INHERITS(control_fields);


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
    name VARCHAR(300),
    comments VARCHAR(5000),
    stock_count INT
) INHERITS (control_fields);

CREATE TABLE file (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(50) NOT NULL,
    storage_path TEXT NOT NULL
) INHERITS (control_fields);

CREATE TABLE product_file (
    product_id INT NOT NULL,
    file_id INT NOT NULL,
    order_id INT NOT NULL,
    PRIMARY KEY (product_id, file_id),
    FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE,
    FOREIGN KEY (file_id) REFERENCES file (id) ON DELETE CASCADE
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
    cost MONEY,
    description VARCHAR(400)
) INHERITS (control_fields);

CREATE TABLE product_price(
    product_id INT NOT NULL,
    price_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (price_id) REFERENCES price(id)
) INHERITS (control_fields);

CREATE TABLE provider(
    id SERIAL PRIMARY KEY,
    name VARCHAR(500),
    phone_number VARCHAR(20),
    address VARCHAR(700),
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
    role_id INT,
    FOREIGN KEY (person_id) REFERENCES person(id),
    FOREIGN KEY (role_id) REFERENCES role(id)
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

CREATE TABLE product_vehicle_model (
    product_id INT NOT NULL,
    vehicle_model_id INT NULL,
    initial_year INT,
    last_year INT,
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (vehicle_model_id) REFERENCES vehicle_model(id)
) INHERITS (control_fields);
