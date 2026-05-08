create database PaymentDatabase

USE Paymentdatabase;

CREATE TABLE payments (

    payment_id VARCHAR(36) PRIMARY KEY,

    order_id VARCHAR(255) NOT NULL,

    payment_amount DOUBLE NOT NULL,

    transaction_no VARCHAR(255),

    payment_method VARCHAR(100),

    payment_status VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);