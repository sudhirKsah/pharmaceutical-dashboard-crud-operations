CREATE TABLE Admin (
    admin_id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    street VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    pincode VARCHAR(10) NOT NULL
);

select * from admin;

ALTER TABLE Admin
ADD COLUMN email VARCHAR(50) UNIQUE NOT NULL;

ALTER TABLE Admin
ADD COLUMN password VARCHAR(255) NOT NULL;


CREATE TABLE AdminPhones (
    phone_id SERIAL PRIMARY KEY,
    admin_id INT,
    phone_number VARCHAR(15) NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Medicines (
    medicine_id SERIAL PRIMARY KEY,
    medicine_name VARCHAR(255) NOT NULL,
    manufacture_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    CONSTRAINT valid_dates CHECK (expiry_date > manufacture_date),
    CONSTRAINT valid_price CHECK (price > 0)
);

CREATE TABLE Stores (
    store_id SERIAL PRIMARY KEY,
    store_name VARCHAR(255) NOT NULL,
    store_location VARCHAR(255) NOT NULL
);

CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    store_id INT NOT NULL,
    medicine_id INT NOT NULL,
    order_date DATE NOT NULL,
    quantity_ordered INT NOT NULL,
    order_status VARCHAR(50) NOT NULL,
    FOREIGN KEY (store_id) REFERENCES Stores(store_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (medicine_id) REFERENCES Medicines(medicine_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT valid_status CHECK (order_status IN ('Pending', 'Fulfilled', 'Cancelled')),
    CONSTRAINT valid_quantity CHECK (quantity_ordered > 0)
);

CREATE TABLE Sales (
    sale_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    sale_date DATE NOT NULL,
    quantity_sold INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT valid_sale_quantity CHECK (quantity_sold > 0)
);

CREATE TABLE Inventory (
    inventory_id SERIAL PRIMARY KEY,
    medicine_id INT NOT NULL,
    quantity_in_stock INT NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (medicine_id) REFERENCES Medicines(medicine_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT valid_quantity CHECK (quantity_in_stock >= 0)
);


-- Insertion of rows in each tables

INSERT INTO Medicines (medicine_id, medicine_name, manufacture_date, expiry_date, price)
VALUES 
(1, 'Paracetamol', '2023-01-10', '2025-01-10', 50.00),
(2, 'Ibuprofen', '2022-06-15', '2024-06-15', 80.00),
(3, 'Amoxicillin', '2023-03-20', '2025-03-20', 120.00),
(4, 'Cough Syrup', '2022-11-01', '2024-11-01', 60.00),
(5, 'Aspirin', '2022-12-05', '2024-12-05', 40.00);

INSERT INTO Stores (store_id, store_name, store_location)
VALUES 
(1, 'PharmaCare', 'Main Street, Cityville'),
(2, 'MedDepot', 'Oak Street, Townsville'),
(3, 'HealthMart', 'Pine Street, Villagetown'),
(4, 'QuickMeds', 'Birch Street, Lakeside'),
(5, 'CurePlus', 'Cedar Street, Riverside');

INSERT INTO Orders (store_id, medicine_id, order_date, quantity_ordered, order_status)
VALUES 
(1, 1, '2023-12-01', 50, 'Pending'),
(2, 2, '2023-11-15', 100, 'Fulfilled'),
(3, 3, '2023-12-10', 30, 'Cancelled'),
(4, 4, '2023-12-05', 20, 'Fulfilled'),
(5, 5, '2023-12-20', 10, 'Pending');

INSERT INTO Sales (order_id, sale_date, quantity_sold)
VALUES 
(1, '2023-12-15', 30),
(2, '2023-11-20', 100),
(3, '2023-12-12', 15),
(4, '2023-12-07', 18),
(5, '2023-12-25', 8);

INSERT INTO Inventory (medicine_id, quantity_in_stock)
VALUES 
(1, 500),
(2, 300),
(3, 200),
(4, 150),
(5, 400);


