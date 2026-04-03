CREATE DATABASE IF NOT EXISTS OrderDatabase;
USE OrderDatabase;



CREATE TABLE orders (
    order_id NVARCHAR(100) PRIMARY KEY,          -- UUID lưu dưới dạng chuỗi
    shop_address NVARCHAR(255) NOT NULL,
    note NVARCHAR(100),                          -- có thể chứa nhiều ký tự
    customer_name NVARCHAR(100) NOT NULL,
    delivery_address NVARCHAR(255) NOT NULL,
    customer_phone_number NVARCHAR(20) NOT NULL,
    payment_method NVARCHAR(50),
    total_money DOUBLE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id NVARCHAR(100),
    cart_id int not null
);

select * from orders;


TRUNCATE TABLE orders;



