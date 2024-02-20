CREATE DATABASE REFADIAZDB

USE REFADIAZDB

CREATE TABLE Brand(
    id int PRIMARY KEY NOT NULL,
    brandName varchar(300)
);

CREATE TABLE Product(
    id int Primary key,
    productName varchar(300),
    dpi varchar(300),
    brandId int,
    imageUrl varchar(5000),
    FOREIGN KEY (brandId) REFERENCES public.Brand(id)
);

CREATE TABLE PriceType(
    id int primary key,
    priceName varchar(400)
);

CREATE TABLE Price(
    id int primary key,
    priceTypeId int not null,
    cost int,
    material varchar(400),
    FOREIGN key (priceTypeId) REFERENCES public.PriceType(id)
);

CREATE TABLE ProductPrice(
    productId int not null,
    priceId int not null,
    FOREIGN KEY (productId) REFERENCES public.Product(id),
    FOREIGN KEY (priceId) REFERENCES public.Price(id)
);

CREATE TABLE Provider(
    id int primary key,
    providerName varchar(500),
    phoneNumber int,
    providerAddress varchar(700),
    comments varchar(500)
);

CREATE TABLE ProviderProduct(
    productId int not null,
    priceId int not null,
    providerId int not null,
    numSeries varchar(3000),
    FOREIGN key (productId) REFERENCES public.Product(id),
    FOREIGN key (priceId) REFERENCES public.Price(id),
    FOREIGN key (providerId) REFERENCES public.Provider(id)
);

CREATE TABLE Vehicle(
    id int primary key,
    brandId int not null,
    model varchar(400),
    carVersion varchar(400),
    carYear int,
    FOREIGN key (brandId) REFERENCES public.Brand(id)
);

CREATE TABLE Client(
    id int primary key,
    clientName varchar(300),
    phoneNumber int,
    comments varchar(500) 
);

CREATE TABLE ClientVehicle(
    vehicleId int not null,
    clientId int not null,
    color varchar(300),
    plate varchar(600),
    comments varchar(700),
    FOREIGN key (vehicleId) REFERENCES public.Vehicle(id),
    FOREIGN key (clientId) REFERENCES public.Client(id)
);