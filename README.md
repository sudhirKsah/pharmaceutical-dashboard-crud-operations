# Pharma Project

This project is a database management system (DBMS) for a pharmaceutical company. It aims to manage and streamline various operations such as inventory management, sales tracking, storing medicines information, orders management and customer information and management.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Introduction
The Pharma+ Project is designed to help pharmaceutical companies manage their data efficiently. It provides a user-friendly interface/dashboard for managing inventory, tracking sales, storing medicine information, managing orders and managing medical stores to whom the company is supplying medicines.

## Features
- Inventory Management
- Sales Tracking
- Storing Medicines Informations
- Orders Management
- Customer Information Management

## Installation
To install and run the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/sudhirKsah/pharmaceutical-dashboard-crud-operations.git
    ```
2. Navigate to the project directory:
    ```bash
    cd pharmaceutical-dashboard-crud-operations
    ```
3. Install the required dependencies:
    ```bash
    cd backend
    npm install
    cd frontend
    npm install
    ```
4. Setup ```.env``` file in the root of ```backend``` folder
    ```bash
    DB_HOST=localhost
    DB_PORT=db_port
    DB_USER=db_user
    DB_PASSWORD=db_password
    DB_NAME=db_name
    JWT_SECRET=your_jwt_secret
    ```

## Usage
To start the application, run:
Run Backend
```bash
cd backend
npm run start
```
Run Frontend
```bash
cd frontend
npm run dev
```
Follow the on-screen instructions to use the application.


## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.