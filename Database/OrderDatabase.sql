CREATE DATABASE IF NOT EXISTS OrderDatabase;
USE OrderDatabase;



CREATE TABLE orders (
    order_id NVARCHAR(255) PRIMARY KEY,  
    
    shop_address NVARCHAR(255) NOT NULL,
    note NVARCHAR(100),                          
    customer_name NVARCHAR(100) NOT NULL,
    delivery_address NVARCHAR(255) NOT NULL,
    customer_phone_number NVARCHAR(20) NOT NULL,
    
    payment_method NVARCHAR(50),
    total_money double,
    order_status nvarchar(200),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    user_id NVARCHAR(100),
    cart_id int not null
);


create table order_details (
order_detail_id nvarchar(255) primary key,
order_id nvarchar(255),

product_name nvarchar(100),
product_image nvarchar(100),
product_price double,
product_quantity int,

product_total_price double, 
foreign key (order_id) references orders(order_id)
)

select * from order_details
select * from orders
