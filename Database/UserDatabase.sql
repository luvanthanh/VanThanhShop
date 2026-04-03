CREATE DATABASE IF NOT EXISTS UserDatabase;
USE UserDatabase;

-- Tạo bảng


CREATE TABLE users(
user_id nvarchar(1000) primary key,
user_name nvarchar(100),
user_password nvarchar(500),
user_first_name nvarchar(500),
user_last_name nvarchar(500),
user_address nvarchar(500),
user_email nvarchar(500),
user_phone_number nvarchar(500),
roles varchar(50)
);


CREATE TABLE invalidated_token
(
id nvarchar(100),
expiry_time DATETIME
)
select * from invalidated_token;
select * from users;

delete from users 
       where user_id ="ce527e28-047a-4948-a806-98f89b58a8a4";



