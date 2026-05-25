CREATE DATABASE PaymentDatabase;

USE PaymentDatabase;

CREATE TABLE payments (

    payment_id VARCHAR(36) PRIMARY KEY,

    order_id VARCHAR(255) NOT NULL UNIQUE,

    payment_amount BIGINT NOT NULL,

    transaction_no VARCHAR(255),

    payment_method VARCHAR(100),

    payment_status VARCHAR(50),

    response_code VARCHAR(50),

    transaction_date TIMESTAMP NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

SELECT * FROM payments;