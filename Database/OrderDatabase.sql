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
);


INSERT INTO orders (
    order_id,
    shop_address,
    note,
    customer_name,
    delivery_address,
    customer_phone_number,
    payment_method,
    total_money,
    order_status,
    created_at,
    user_id,
    cart_id
) VALUES
(
    'ORD001', 'Cầu Giấy, Hà Nội', 'Giao giờ hành chính',
    'Văn Thành', 'Cầu Giấy, Hà Nội', '0901234001',
    'COD', 30990000, 'Đã giao',
    '2026-09-01 09:15:00', 'USR001', 1
),
(
    'ORD002', 'Cầu Giấy, Hà Nội', 'Gọi trước khi giao',
    'Minh Nguyễn', 'Đống Đa, Hà Nội', '0901234002',
    'VNPay', 25990000, 'Đang giao',
    '2026-09-03 10:20:00', 'USR002', 2
),
(
    'ORD003', 'Cầu Giấy, Hà Nội', NULL,
    'Anh Hoàng', 'Ba Đình, Hà Nội', '0901234003',
    'COD', 15990000, 'Chờ xác nhận',
    '2026-09-05 14:30:00', 'USR003', 3
),
(
    'ORD004', 'Cầu Giấy, Hà Nội', 'Đóng gói cẩn thận',
    'Linh Phạm', 'Thanh Xuân, Hà Nội', '0901234004',
    'VNPay', 21990000, 'Đã giao',
    '2026-09-07 16:45:00', 'USR004', 4
),
(
    'ORD005', 'Cầu Giấy, Hà Nội', 'Giao buổi sáng',
    'Huy Quang', 'Hà Đông, Hà Nội', '0901234005',
    'COD', 8990000, 'Đã hủy',
    '2026-09-10 08:00:00', 'USR005', 5
),
(
    'ORD006', 'Cầu Giấy, Hà Nội', NULL,
    'Tuấn Anh', 'Long Biên, Hà Nội', '0901234006',
    'VNPay', 34980000, 'Đang giao',
    '2026-09-12 11:10:00', 'USR006', 6
),
(
    'ORD007', 'Cầu Giấy, Hà Nội', 'Vui lòng kiểm tra máy trước khi giao',
    'Châu Minh', 'Nam Từ Liêm, Hà Nội', '0901234007',
    'COD', 12490000, 'Chờ xác nhận',
    '2026-09-15 13:25:00', 'USR007', 7
),
(
    'ORD008', 'Cầu Giấy, Hà Nội', NULL,
    'Ly Hương', 'Bắc Từ Liêm, Hà Nội', '0901234008',
    'VNPay', 27990000, 'Đã giao',
    '2026-09-18 15:40:00', 'USR008', 8
),
(
    'ORD009', 'Cầu Giấy, Hà Nội', 'Gọi điện trước khi đến',
    'Mạnh Đức', 'Hai Bà Trưng, Hà Nội', '0901234009',
    'COD', 18990000, 'Đang giao',
    '2026-09-20 09:50:00', 'USR009', 9
),
(
    'ORD010', 'Cầu Giấy, Hà Nội', NULL,
    'Dương Thúy', 'Hoàng Mai, Hà Nội', '0901234010',
    'VNPay', 39990000, 'Đã giao',
    '2026-09-25 17:00:00', 'USR010', 10
);


-- =========================================
-- 2. THÊM CHI TIẾT ĐƠN HÀNG
-- Tổng tiền mỗi đơn = tổng giá trị các sản phẩm
-- =========================================

INSERT INTO order_details (
    order_detail_id,
    order_id,
    product_name,
    product_image,
    product_price,
    product_quantity,
    product_total_price
) VALUES

-- ORD001: 30.990.000
('OD001', 'ORD001', 'Samsung Galaxy S25 Ultra',
 'https://example.com/s25-ultra.jpg', 30990000, 1, 30990000),

-- ORD002: 25.990.000
('OD002', 'ORD002', 'iPhone 16 Pro',
 'https://example.com/iphone16pro.jpg', 25990000, 1, 25990000),

-- ORD003: 15.990.000
('OD003', 'ORD003', 'Samsung Galaxy S25 FE',
 'https://example.com/s25-fe.jpg', 15990000, 1, 15990000),

-- ORD004: 21.990.000
('OD004', 'ORD004', 'iPhone 16',
 'https://example.com/iphone16.jpg', 21990000, 1, 21990000),

-- ORD005: 8.990.000
('OD005', 'ORD005', 'Xiaomi Redmi Note 14 Pro',
 'https://example.com/redmi-note14pro.jpg', 8990000, 1, 8990000),

-- ORD006: 34.980.000
('OD006', 'ORD006', 'iPhone 16',
 'https://example.com/iphone16.jpg', 21990000, 1, 21990000),
('OD007', 'ORD006', 'Samsung Galaxy S25 FE',
 'https://example.com/s25-fe.jpg', 12990000, 1, 12990000),

-- ORD007: 12.490.000
('OD008', 'ORD007', 'Xiaomi 14T',
 'https://example.com/xiaomi14t.jpg', 12490000, 1, 12490000),

-- ORD008: 27.990.000
('OD009', 'ORD008', 'Samsung Galaxy Z Flip',
 'https://example.com/zflip.jpg', 27990000, 1, 27990000),

-- ORD009: 18.990.000
('OD010', 'ORD009', 'iPhone 15',
 'https://example.com/iphone15.jpg', 18990000, 1, 18990000),

-- ORD010: 39.990.000
('OD011', 'ORD010', 'Samsung Galaxy S25 Ultra',
 'https://example.com/s25-ultra.jpg', 30990000, 1, 30990000),
('OD012', 'ORD010', 'Xiaomi Redmi Note 14 Pro',
 'https://example.com/redmi-note14pro.jpg', 9000000, 1, 9000000);
 
 
select * from order_details;
select * from orders;

