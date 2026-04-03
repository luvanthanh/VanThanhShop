CREATE DATABASE IF NOT EXISTS CartDatabase;

USE CartDatabase;

-- Tạo bảng
CREATE TABLE carts (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255)
);



CREATE TABLE cart_items
(
cart_items_id Int auto_increment primary key,
cart_id int not null,
product_id int not null ,
quantity int not null,
foreign key (cart_id) references carts(cart_id)
);

select * from carts;
select * from cart_items
where cart_id = 1 ;