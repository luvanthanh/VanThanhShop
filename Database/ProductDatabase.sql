CREATE DATABASE IF NOT EXISTS ProductDatabase;
USE ProductDatabase;

-- Tạo bảng
-- drop database ProductDatabase;


CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    
    product_brand VARCHAR(50),
    product_name VARCHAR(255),
    product_screen_size DECIMAL(3,1),
    product_description TEXT,
    product_release_date DATE,
    product_warranty INT,
    product_image_thumbnail VARCHAR(500)
);

create table images(
image_id INT AUTO_INCREMENT primary key,
product_id int,

image_url varchar(200),
image_describe varchar(500),
FOREIGN KEY(product_id)
REFERENCES products(product_id)
ON DELETE CASCADE
);

create table attributes(
attribute_id int  auto_increment primary key,
product_id int,

attribute_name varchar(50),
attribute_value varchar(100),

FOREIGN KEY(product_id)
REFERENCES products(product_id)
ON DELETE CASCADE
);

create table product_variants(
product_variant_id int auto_increment primary key,
product_id int,
product_ram int,
product_rom int,
product_color varchar(100),
product_stock_quantity int,
product_price bigint,
FOREIGN KEY(product_id)
REFERENCES products(product_id)
ON DELETE CASCADE
);

-- Thêm dữ liệu
INSERT INTO products (
    product_brand,
    product_name,
    product_screen_size,
    product_description,
    product_release_date,
    product_warranty,
    product_image_thumbnail
) VALUES
( 'iphone', 'iPhone 15 Pro Max 512GB', 6.9, 'Màn hình Super Retina XDR sắc nét, cùng nhiều tính năng công nghệ mới...', '2025-07-24', 24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone_air.jpg'),
( 'oppo', 'Oppo A5i |Chính Hãng', 6.3,  'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10', 24,  'https://cdn.tgdd.vn/Products/Images/42/340259/oppo-a5i-purple-thumb-600x600.jpg'),
( 'nothing', 'Nothing Phone 2A Plus 5G| Chính Hãng ', 5.8,  'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10', 24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nothing-phone-2a-plus_1_.png'),
( 'honor', 'Honor Magic V5| Camera 200px', 6.8, 'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10', 24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:90/plain/https://cellphones.com.vn/media/catalog/product/h/o/honor-magic-v5_1.jpg'),
( 'realme', 'Xiaomi 15T Pro| 12G-256G', 6.8, 'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10', 24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-15t-5g-22.jpg'),
( 'oppo', 'Oppo Reno14 F 5GB 8GB 256GB', 6.8, 'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10', 24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-reno14-f-w.jpg'),
( 'nubia', 'Nubia Neo 3 GT 12GB 256GB ', 5.3,  'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10',24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nubia-neo-3-gt-12gb-256gb.1.png'),
( 'iphone', 'Iphone 17 512GB| Chính Hãng', 6.8, 'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10', 24,  'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone_17_256gb-3_2.jpg'),
( 'samsung', 'Samsung Galaxy Zlip 7 12GB', 6.8,  'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10',  24,'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-7-xanh.jpg'),
( 'oppo', 'Oppo A6 Pro|Camera Kép Zoom 20x', 7.0,  'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10', 24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo_a6_pro_8gb_256gb_3.jpg'),
( 'vivo', 'Vivo Y28 8GB 128GB', 6.8, 'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10',  24,  'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-vivo-y28-8gb-256gb_7_.png'),
( 'nubia', 'Nubia C21 plus 4GB 32GB ', 4, 'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10',  24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/o/nokia-c21-plus-600x600_2.jpg'),
( 'xiaomi', 'Xiaomi 15 Ultra 512GB', 6.73,  'Camera Leica, pin 5000mAh, sạc nhanh 120W, màn hình AMOLED 120Hz siêu mượt.', '2025-08-15', 24,'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/p/h/photo_2025-04-16_11-45-37.jpg'),
( 'samsung', 'Samsung Galaxy S25 Ultra', 6.9,  'Màn hình Super Retina XDR sắc nét, cùng nhiều tính năng công nghệ mới...', '2025-07-24',  24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-ultra_3__3.png'),
( 'xiaomi', 'Xiaomi PoCo X7 Pro 8GB 128GB', 6.9,  'Màn hình Super Retina XDR sắc nét, cùng nhiều tính năng công nghệ mới...', '2025-07-24',  24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-poco-x7-pro-5g_1_.png'),
( 'iphone', 'Iphone 14 Pro Max| 256GB Chính Hãng VNA', 6.3,  'Màn hình Super Retina XDR sắc nét, cùng nhiều tính năng công nghệ mới...', '2025-07-24', 24,'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro_2__5.png'),
( 'nubia', 'Nubia Z70 Ultr 5G 16GB| 512GB Chính Hãng', 6.9,  'Màn hình Super Retina XDR sắc nét, cùng nhiều tính năng công nghệ mới...', '2025-07-24',  24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nubia-z70s-ultra-5g_10_.png'),
( 'oppo', 'Oppo RenoF 12 5G 8GB| 256GB Chính Hãng', 6.3,  'Màn hình Super Retina XDR sắc nét, cùng nhiều tính năng công nghệ mới...', '2025-07-24', 24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_4__6_73.png'),
( 'honor', 'Honor X9c| 12GB 256GB', 6.9,  'Màn hình Super Retina XDR sắc nét, cùng nhiều tính năng công nghệ mới...', '2025-07-24', 24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/_/i/_i_n_tho_i_honor_x6c_6gb_128gb-1_1.jpg'),
( 'nothing', 'Nothing Phone 3A 5G| 8GB 128GB Chính Hãng ', 5.8, 'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10',24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/m/image_96__1_2.png'),
( 'oppo', 'Oppo Reno 13Pro |Chính Hãng', 6.8, 'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10',24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-reno13f-5g_3_.png'),
( 'nothing', 'Nothing Phone 3A Pro 5G| 8GB 128GB ', 5.8,  'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10',  24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nothing-phone-3a-pro_1_.png'),
( 'vivo', 'Vivo V50 Lite 5G| 8GB 128GB', 5.3,  'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10', 24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/v/i/vivo-v50-lite-5g.1.png'),
( 'honor', 'Honor X9 Pro| 12GB 256GB', 5.4,  'Màn hình Super Retina XDR sắc nét, cùng nhiều tính năng công nghệ mới...', '2025-07-24', 12,'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/h/o/honor-x9_2_.png'),
( 'nothing', 'Nothing Phone 2| 5G Chính Hãng ', 5.8,  'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10',24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/o/nothing-phone-2_1_.png'),
( 'honor', 'Honor 400 Lite 5G| 12GB 256GB', 6.3,  'Màn hình Super Retina XDR sắc nét, cùng nhiều tính năng công nghệ mới...', '2025-07-24', 24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/h/o/honor_400_lite_5g_12gb_256gb.jpg'),
( 'iphone', 'Iphone 17 Pro Max| Chính Hãng', 6.8,  'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10',24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-max_3.jpg'),
( 'realme', 'Xiaomi 14T| 12G-256G', 6.8,  'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10',  24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi_14t_2_.png'),
( 'realme', 'Xiaomi 15 Ultra | 16GB-1TB', 5.4,  'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10',  24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/p/h/photo_2025-04-16_11-45-37.jpg'),
('realme', 'Xiaomi Redmi 14C | 4GB-128GB', 6.8, 'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10',  24,  'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi_redmi_14c_5_.png'),
( 'nubia', 'Nubia Neo 2 5G 12GB 256GB ', 5.7, 'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10',24,'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/f/r/frame_143.png'),
( 'vivo', 'Vivo V40 Lite 5G ', 6.8, 'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10', 24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/m/image_-_2025-02-10t145206.786.png'),
( 'vivo', 'Vivo Y17 Lite 4G ', 6.8,  'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10',  24,'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/y/1/y17s.png'),
( 'vivo', 'Vivo Y03 Lite| 4GB 128GB ', 6.3,  'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10',  24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/y/0/y03_1.png'),
( 'vivo', 'Vivo Y39 Lite 5G|8GB 128GB ', 6.8,  'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10', 24, 'https://cdn.tgdd.vn/Products/Images/42/339180/vivo-y39-tim-thumb-600x600.jpg'),
( 'vivo', 'Vivo X300 5G| 12GB 256GB ', 6.8, 'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10', 24, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/357861/vivo-x300-hong-thumb-638961181921070616-600x600.jpg'),
( 'iphone', 'Iphone 17 Pro Max| 256GB Chính Hãng VNA', 6.9, 'Màn hình Super Retina XDR sắc nét, cùng nhiều tính năng công nghệ mới...', '2025-07-24', 24, 'https://cdn.tgdd.vn/Products/Images/42/342679/iphone-17-pro-max-xanh-duong-thumb-600x600.jpg'),
( 'iphone', 'Iphone 13 Pro Max| 128GB ', 6.3, 'Màn hình Super Retina XDR sắc nét, cùng nhiều tính năng công nghệ mới...', '2025-07-24', 24, 'https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-midnight-2-600x600.jpg'),
( 'iphone', 'Iphone 15 Plus| 128GB ', 6.8,  'Màn hình Super Retina XDR sắc nét, cùng nhiều tính năng công nghệ mới...', '2025-07-24',24, 'https://cdn.tgdd.vn/Products/Images/42/303891/iphone-15-plus-vang-126gb-thumb-600x600.jpg'),
('iphone', 'Iphone 16 Plus| 128GB ', 6.9,  'Màn hình Super Retina XDR sắc nét, cùng nhiều tính năng công nghệ mới...', '2025-07-24',24, 'https://cdn.tgdd.vn/Products/Images/42/334864/iphone-16e-white-thumb-600x600.jpg'),
( 'samsung', 'Samsung Galaxy Z Flip7 FE| 128GB ', 6.9,'Màn hình Super Retina XDR sắc nét, cùng nhiều tính năng công nghệ mới...', '2025-07-24', 24, 'https://cdn.tgdd.vn/Products/Images/42/338741/samsung-galaxy-z-flip7-fe-white-thumb-600x600.jpg'),
( 'samsung', 'Samsung Galaxy S24 Ultra| 128GB ', 6.9,  'Màn hình Super Retina XDR sắc nét, cùng nhiều tính năng công nghệ mới...', '2025-07-24', 24, 'https://cdn.tgdd.vn/2025/10/timerseo/307174-600x600-5.jpg'),
( 'samsung', 'Samsung Galaxy A16| 128GB ', 6.3,  'Màn hình Super Retina XDR sắc nét, cùng nhiều tính năng công nghệ mới...', '2025-07-24', 24, 'https://cdn.tgdd.vn/2025/10/timerseo/331207-600x600-6.jpg'),
('samsung', 'Samsung Galaxy S25 Plus| 256GB ', 6.9,  'Màn hình Super Retina XDR sắc nét, cùng nhiều tính năng công nghệ mới...', '2025-07-24', 24, 'https://cdn.tgdd.vn/2025/10/timerseo/333359-600x600-5.jpg'),
( 'samsung', 'Samsung Galaxy S23 Ultra 256GB|', 5.6,  'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10', 24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23-ulatra_2__1.png'),

( 'oppo', 'Oppo A5i Pro |Chính Hãng', 5.7,  'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10', 24, 'https://cdn.tgdd.vn/Products/Images/42/340255/oppo-a5i-pro-white-thumb-600x600.jpg'),
( 'realme', 'Realme Note 70 4GB|64GB', 5.8, 'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10', 24, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/340260/realme-note-70-4gb-64gb-160725-095001-095-600x600.jpg'),
( 'realme', 'Realme C 85  5G', 6.8,'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10', 24, 'https://cdn.tgdd.vn/Products/Images/42/357831/realme-c85-purple-thumb-600x600.jpg'),

('nubia', 'Red Magic 7S Pro', 6.8,  'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10',  24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/_/p/_p_.png'),
( 'Honor', 'Honor X7d 5G| 8GB 128GB', 6.3, 'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10', 24, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/358026/honor-x7d-5g-8gb-256gb-181025-112407-975-600x600.jpg'),
( 'Honor', 'Honor 400 Pro 5G| 8GB 128GB', 6.8,  'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10', 24, 'https://cdn.tgdd.vn/Products/Images/42/339272/honor-400-pro-xam-thumb-600x600.jpg'),
( 'nothing', 'Nothing Phone 1| 5G Chính Hãng ', 5.8,  'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10',  24,'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/o/nothing-phone-1.png'),
('nothing', 'Nothing Phone A3 Pro| 5G Chính Hãng ', 5.4, 'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10', 24,'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nothing-phone-3a-pro_1_.png'),
( 'xiaomi', 'Xiaomi Redmi 14C 6GB 128GB', 5.8, 'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10', 24,'https://cdn.tgdd.vn/2025/10/timerseo/329008-600x600-5.jpg'),
( 'xiaomi', 'Xiaomi Redmi 15Pro 6GB 128GB',5.4, 'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10', 24, 'https://cdn.tgdd.vn/Products/Images/42/341272/xiaomi-redmi-15-tim-thumbnew-600x600.jpg'),
( 'xiaomi', 'Xiaomi 15T Pro 8GB 128GB',5.8, 'Hiệu năng mạnh mẽ, camera Zoom 100x, màn hình Dynamic AMOLED 2X...', '2025-05-10', 24,'https://cdn.tgdd.vn/Products/Images/42/344647/xiaomi-15t-pro-black-thumb-600x600.jpg')
;

INSERT INTO images (product_id, image_url, image_describe) VALUES
-- 1. iPhone 15 Pro Max 512GB
(1, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone_air.jpg', 'Ảnh đại diện sản phẩm'),
(1, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/342670/Kit/iphone-air-bbh-638947425000996482.jpg', 'Ảnh bộ sản phẩm'),
(1, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/342670/iphone-air-xanh-2-638930804039872382-750x500.jpg', 'Mặt trước thiết bị'),
(1, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/342670/iphone-air-xanh-4-638930804050688764-750x500.jpg', 'Góc nghiêng cạnh viền'),

-- 2. Oppo A5i |Chính Hãng
(2, 'https://cdn.tgdd.vn/Products/Images/42/340259/oppo-a5i-purple-thumb-600x600.jpg', 'Ảnh chính màu tím'),
(2, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/340259/oppo-a5i-purple-4-638887962865821813-750x500.jpg', 'Mặt lưng thiết bị'),
(2, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/340259/oppo-a5i-purple-11-638887962914900999-750x500.jpg', 'Cận cảnh cụm camera'),
(2, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/340259/Kit/oppo-a5i-bbh-638887964509235111.jpg', 'Hộp và phụ kiện'),

-- 3. Nothing Phone 2A Plus 5G| Chính Hãng
(3, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nothing-phone-2a-plus_1_.png', 'Mặt lưng trong suốt'),
(3, 'https://cdnv2.tgdd.vn/mwg-static/common/News/1569068/gsmarena-nothing-phone-2a-plus-thiet-ke-4.jpg', 'Ảnh thực tế trên tay'),
(3, 'https://cdnv2.tgdd.vn/mwg-static/common/News/1568698/A%CC%89nh%20ma%CC%80n%20hi%CC%80nh%202024-08-01%20lu%CC%81c%2011.47.29.jpeg', 'Giao diện màn hình chính'),
(3, 'https://cdnv2.tgdd.vn/mwg-static/common/News/1568698/NOTH2.jpeg', 'Hiệu ứng đèn LED phía sau'),

-- 4. Honor Magic V5| Camera 200px
(4, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:90/plain/https://cellphones.com.vn/media/catalog/product/h/o/honor-magic-v5_1.jpg', 'Ảnh sản phẩm chính diện'),
(4, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/333479/honor-x9c-tim-4-637719482081339061-750x500.jpg', 'Phiên bản màu tím metallic'),
(4, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/h/o/honor-magic-v5-9.jpg', 'Góc cạnh máy màn hình gập'),
(4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmMxCbaylsRubrATvM9PT1yTqibAmTr4Ijmg&s', 'Ảnh chi tiết camera'),

-- 5. Xiaomi 15T Pro| 12G-256G
(5, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-15t-5g-22.jpg', 'Ảnh phối cảnh sản phẩm'),
(5, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-15t-pro-5g-1.jpg', 'Thiết kế mặt lưng nhám'),
(5, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-15t-pro-5g-13.jpg', 'Góc máy phía bên dưới'),
(5, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-15t-pro-5g-4.jpg', 'Độ mỏng thân máy'),

-- 6. Oppo Reno14 F 5GB 8GB 256GB
(6, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-reno14-f-w.jpg', 'Màu sắc phiên bản xanh'),
(6, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/l/slider-oppo-reno14.jpg', 'Banner quảng cáo sản phẩm'),
(6, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-reno14-f.png', 'Mặt trước tràn viền'),
(6, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-reno14-f_4_.png', 'Mặt lưng óng ánh'),

-- 7. Nubia Neo 3 GT 12GB 256GB
(7, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nubia-neo-3-gt-12gb-256gb.1.png', 'Ảnh thiết kế đậm chất gaming'),
(7, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nubia-neo-3-gt-12gb-256gb_1_.png', 'Họa tiết mặt lưng máy'),
(7, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nubia-neo-3-gt-12gb-256gb_3_.png', 'Màn hình hiển thị game'),
(7, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nubia-neo-3-gt-12gb-256gb_4_.png', 'Cạnh bên phím vật lý'),

-- 8. Iphone 17 512GB| Chính Hãng
(8, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone_17_256gb-3_2.jpg', 'Ảnh concept iPhone màu hồng'),
(8, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone_17_256gb-2.jpg', 'Góc chụp nghiêng mặt trước'),
(8, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone_17_sage_pdp_image_position_1_sage_color__vn-vi_1.jpg', 'Phiên bản màu xanh Sage'),
(8, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone_17_256gb_2.jpg', 'Cận cảnh cụm camera mới'),

-- 9. Samsung Galaxy Zlip 7 12GB
(9, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-7-xanh.jpg', 'Trạng thái gập một nửa'),
(9, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-7-xanh-4.jpg', 'Màn hình phụ bên ngoài'),
(9, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-7-xanh-9.jpg', 'Khi gập hoàn toàn siêu mỏng'),
(9, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-7-xanh-4.jpg', 'Ảnh chi tiết bản lề máy'),

-- 10. Oppo A6 Pro|Camera Kép Zoom 20x
(10, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo_a6_pro_8gb_256gb_3.jpg', 'Sản phẩm màu hồng pastel'),
(10, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/f/r/frame_427320357.jpg', 'Banner tính năng camera'),
(10, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-a6-pro-22.jpg', 'Mặt lưng nhám hạn chế vân tay'),
(10, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-a6-pro-16.jpg', 'Toàn bộ thân máy chính diện'),

-- 11. Vivo Y28 8GB 128GB
(11, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-vivo-y28-8gb-256gb_7_.png', 'Màu cam nổi bật năng động'),
(11, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/l/slider-vivo-y28-8gb-256gb-2.jpg', 'Góc nhìn nghiêng từ phía trên'),
(11, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/l/slider-vivo-y28-8gb-256gb.jpg', 'Ảnh giới thiệu thời lượng pin'),
(11, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-vivo-y28-8gb-256gb_8_.png', 'Mặt trước bật sáng màn hình'),

-- 12. Nubia C21 plus 4GB 32GB
(12, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/o/nokia-c21-plus-600x600_2.jpg', 'Ảnh đại diện màu xanh lam'),
(12, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/o/nokia-c21-plus_1.jpg', 'Thiết kế mặt sau vân sọc'),
(12, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/1/a1-3754-1646036035_1.jpg', 'Ảnh chi tiết cảm biến vân tay'),
(12, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/9/6/960x0_1.jpg', 'Toàn bộ linh kiện đi kèm'),

-- 13. Xiaomi 15 Ultra 512GB
(13, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/p/h/photo_2025-04-16_11-45-37.jpg', 'Ống kính Leica nổi bật phía sau'),
(13, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/p/h/photo_2025-04-16_11-45-57.jpg', 'Thiết kế khung viền cao cấp'),
(13, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/p/h/photo_2025-04-16_11-46-04.jpg', 'Góc nhìn chéo từ bên trái'),
(13, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/p/h/photo_2025-04-16_11-45-51.jpg', 'Màn hình cong tràn cạnh'),

-- 14. Samsung Galaxy S25 Ultra
(14, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-ultra_3__3.png', 'Màu đen Titanium lịch lãm'),
(14, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-utra_24_.png', 'Mặt lưng kèm bút S-Pen'),
(14, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s25_ultra_-_1.png', 'Cụm camera đặt dọc đặc trưng'),
(14, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s25_ultra_-_4.png', 'Chi tiết các phím tăng giảm âm lượng'),

-- 15. Xiaomi PoCo X7 Pro 8GB 128GB
(15, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-poco-x7-pro-5g_1_.png', 'Màu vàng cá tính rực rỡ'),
(15, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi_poco_x7_pro_5g_12gb_256gb_-_5.png', 'Góc máy ngang phía trên'),
(15, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi_poco_x7_pro_5g_12gb_256gb_-_2.png', 'Mặt lưng bóng bẩy phản chiếu ánh sáng'),
(15, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi_poco_x7_pro_5g_12gb_256gb_-_3.png', 'Ảnh chụp phần loa ngoài'),

-- 16. Iphone 14 Pro Max| 256GB Chính Hãng VNA
(16, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro_2__5.png', 'Màu tím Deep Purple đặc trưng'),
(16, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/2/5/2522.png', 'Khu vực cụm Dynamic Island'),
(16, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/8/9/896_2.png', 'Ảnh chụp nghiêng của viền thép'),
(16, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/2/5/25.10_2.png', 'Mặt trước và mặt sau sản phẩm'),

-- 17. Nubia Z70 Ultr 5G 16GB| 512GB Chính Hãng
(17, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nubia-z70s-ultra-5g_10_.png', 'Mặt lưng thiết kế ấn tượng'),
(17, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/l/slider-nubia-z70-ultra_1.jpg', 'Ảnh giới thiệu hệ thống tản nhiệt'),
(17, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/l/slider-nubia-z70-ultra-3_1.jpg', 'Ảnh quảng bá độ sáng màn hình'),
(17, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nubia-z70s-ultra-5g_3.png', 'Cụm camera lồi phá cách'),

-- 18. Oppo RenoF 12 5G 8GB| 256GB Chính Hãng
(18, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_4__6_73.png', 'Ảnh đại diện màu cam hoàng hôn'),
(18, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_4__6_73.png', 'Góc máy tổng quan mặt lưng'),
(18, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo_reno12_f_5g_12gb-256gb_-_1_1.png', 'Màn hình khóa của sản phẩm'),
(18, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo_reno12_f_5g_12gb-256gb_-_3_1.png', 'Cạnh bên siêu mỏng nhẹ'),

(19, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/_/i/_i_n_tho_i_honor_x6c_6gb_128gb-1_1.jpg', 'Ảnh thiết kế tổng quan mặt sau'),
(19, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-honor-x5b-3_3.jpg', 'Góc máy chụp nghiêng góc phải'),
(19, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-honor-x5b-2_3.jpg', 'Mặt trước màn hình giọt nước'),
(19, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/l/slider-honor-x9c-5g-12gb-256gb-2.jpg', 'Banner thông số nổi bật'),

-- 20. Nothing Phone 3A 5G| 8GB 128GB Chính Hãng
(20, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/m/image_96__1_2.png', 'Màu xanh dương bản đặc biệt'),
(20, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nothing-phone-3a.png', 'Mặt lưng phong cách cơ khí'),
(20, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nothing-phone-3a_5_.png', 'Cận cảnh dải đèn giao diện Glyph'),
(20, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nothing-phone-3a_8_.png', 'Màn hình bật sáng viền mỏng'),

-- 21. Oppo Reno 13Pro |Chính Hãng
(21, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-reno13f-5g_3_.png', 'Màu tím thời thượng quý phái'),
(21, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo_reno13_f_5g_-_1.png', 'Thiết kế cụm camera tinh tế'),
(21, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-reno13f-5g_3_.png', 'Góc nhìn trực diện mặt sau'),
(21, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-reno13-f-5g-hinh-4.jpg', 'Ảnh cầm trên tay thực tế'),

-- 22. Nothing Phone 3A Pro 5G| 8GB 128GB
(22, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nothing-phone-3a-pro_1_.png', 'Phiên bản trắng sữa sang trọng'),
(22, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nothing-phone-3a-12gb-256gb_11__1.png', 'Mặt trước phẳng tràn cạnh'),
(22, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nothing-phone-3a-12gb-256gb_14_.png', 'Chi tiết các góc bo tròn máy'),
(22, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nothing-phone-3a-12gb-256gb_13_.png', 'Khung viền vuông vắn cứng cáp'),

-- 23. Vivo V50 Lite 5G| 8GB 128GB
(23, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/v/i/vivo-v50-lite-5g.1.png', 'Màu cam hoàng hôn nổi bật'),
(23, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/v/i/vivo-v50-lite-5g_8__1_1_1_1.png', 'Mặt lưng nhám hạn chế dấu tay'),
(23, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/v/i/vivo-v50-lite-5g_5__1_1_1_1.png', 'Cận cảnh camera kép phía sau'),
(23, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/v/i/vivo-v50-lite-5g_1_1_1_1_1.png', 'Góc máy nhìn từ cạnh dưới'),

-- 24. Honor X9 Pro| 12GB 256GB
(24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/h/o/honor-x9_2_.png', 'Màu xanh dương trẻ trung'),
(24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/l/slider-honor-x9c-5g-12gb-256gb.jpg', 'Ảnh quảng cáo màn hình cong'),
(24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-honor-x5b-2_3.jpg', 'Mặt trước hiển thị camera selfie'),
(24, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-honor-x5b-6_3.jpg', 'Chi tiết cổng sạc Type-C'),

-- 25. Nothing Phone 2| 5G Chính Hãng
(25, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/o/nothing-phone-2_1_.png', 'Màu xám không gian cao cấp'),
(25, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nothing-phone-3a-12gb-256gb_11__1.png', 'Góc nhìn nghiêng cụm camera đôi'),
(25, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nothing-phone-3a-12gb-256gb_14_.png', 'Mặt lưng kính bo cong nhẹ'),
(25, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nothing-phone-3a-12gb-256gb_13_.png', 'Cạnh bên có vạch chia anten'),

-- 26. Honor 400 Lite 5G| 12GB 256GB
(26, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/h/o/honor_400_lite_5g_12gb_256gb.jpg', 'Ảnh sản phẩm chính diện'),
(26, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/l/slider-honor-400-lite-5g-12gb-256gb_1_1.jpg', 'Banner sự kiện mở bán'),
(26, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/h/o/honor_400_lite_5g_12gb_256gb.jpg', 'Mặt lưng chuyển màu gradient'),
(26, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/h/o/honor_400_lite_5g_12gb_256gb-4.jpg', 'Độ mỏng ấn tượng của thân máy'),

-- 27. Iphone 17 Pro Max| Chính Hãng
(27, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-max_3.jpg', 'Màu cam Titanium độc đáo mới'),
(27, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/342676/iphone-17-pro-cam-2-638930812072729379-750x500.jpg', 'Góc chụp nghiêng thấy cụm camera'),
(27, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/342676/iphone-17-pro-cam-4-638930812087067046-750x500.jpg', 'Cận cảnh viền màn hình siêu mỏng'),
(27, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/342676/iphone-17-pro-cam-1-638930812063567859-750x500.jpg', 'Toàn bộ thiết kế mặt lưng phẳng'),

-- 28. Xiaomi 14T| 12G-256G
(28, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi_14t_2_.png', 'Màu xám bạc metallic sang trọng'),
(28, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi_14t_12gb_512gb_-_1.png', 'Mặt trước bật sáng hình nền chuẩn'),
(28, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi_14t_12gb_512gb_-_4.png', 'Góc nhìn chéo từ phía dưới cụm loa'),
(28, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi_14t_11_.png', 'Hộp đựng sản phẩm tinh giản'),

-- 29. Xiaomi 15 Ultra | 16GB-1TB
(29, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/p/h/photo_2025-04-16_11-45-37.jpg', 'Mặt sau cụm module camera tròn lớn'),
(29, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/329007/redmi-14c-den-11-638618468081810762-750x500.jpg', 'Thiết kế màu đen quyền lực'),
(29, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/329007/redmi-14c-den-6-638618468049537431-750x500.jpg', 'Góc máy ngang khoe thân máy mỏng'),
(29, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/329007/redmi-14c-den-2-638618468023966069-750x500.jpg', 'Màn hình tràn viền tối đa'),

-- 30. Xiaomi Redmi 14C | 4GB-128GB
(30, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi_redmi_14c_5_.png', 'Màu xanh đại dương bóng bẩy'),
(30, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/u/nubia_neo_2_-_1.png', 'Ảnh đồ họa thông số cấu hình'),
(30, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/f/r/frame_143.png', 'Cận cảnh mặt kính phía trước'),
(30, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/f/r/frame_142.png', 'Họa tiết ánh sao trên mặt lưng'),

-- 31. Nubia Neo 2 5G 12GB 256GB
(31, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/f/r/frame_143.png', 'Màu tím đậm phong cách gaming'),
(31, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/329959/vivo-v40-lite-tim-6-638640908403302011-750x500.jpg', 'Các họa tiết nổi khối mặt sau'),
(31, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/329959/vivo-v40-lite-tim-11-638640908434406217-750x500.jpg', 'Cạnh bên tích hợp phím trigger'),
(31, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/329959/vivo-v40-lite-tim-4-638640908388992834-750x500.jpg', 'Góc nhìn giao diện tối ưu hóa chơi game'),

(32, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/m/image_-_2025-02-10t145206.786.png', 'Ảnh thiết kế tổng quan mặt sau'),
(32, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/v/i/vivo-y17s_1__2_3.png', 'Góc nhìn nghiêng mặt lưng sản phẩm'),
(32, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/v/i/vivo-y17s_4__1_4.png', 'Cận cảnh cụm camera và đèn flash'),
(32, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/v/i/vivo-y17s_1__2_3.png', 'Góc chụp trực diện cạnh bên và mặt lưng'),

-- 33. Vivo Y17 Lite 4G 
(33, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/y/1/y17s.png', 'Ảnh đại diện mặt sau màu tím nhạt'),
(33, 'https://cdn.tgdd.vn/Products/Images/42/322996/vivo-y03-xanh-10-750x500.jpg', 'Ảnh thực tế cầm trên tay sản phẩm'),
(33, 'https://cdn.tgdd.vn/Products/Images/42/322996/vivo-y03-xanh-11-750x500.jpg', 'Mặt trước hiển thị màn hình giọt nước'),
(33, 'https://cdn.tgdd.vn/Products/Images/42/322996/vivo-y03-xanh-6-750x500.jpg', 'Chi tiết khung viền phẳng thời thượng'),

-- 34. Vivo Y03 Lite| 4GB 128GB 
(34, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/y/0/y03_1.png', 'Màu đen huyền bí mạnh mẽ'),
(34, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/339180/vivo-y39-5g-tim-1-638872439411932669-750x500.jpg', 'Góc chéo góc lưng phản quang nhẹ'),
(34, 'https://cdn.tgdd.vn/Products/Images/42/322996/Slider/vi-vn-vivo-y03-1.png', 'Banner quảng bá tính năng màn hình mượt mà'),
(34, 'https://cdn.tgdd.vn/Products/Images/42/322996/vivo-y03-xanh-6-750x500.jpg', 'Chi tiết cạnh dưới nút âm lượng nguồn'),

-- 35. Vivo Y39 Lite 5G|8GB 128GB 
(35, 'https://cdn.tgdd.vn/Products/Images/42/339180/vivo-y39-tim-thumb-600x600.jpg', 'Ảnh hộp máy kèm mặt lưng màu tím'),
(35, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/339180/vivo-y39-5g-tim-1-638872439411932669-750x500.jpg', 'Góc chụp nghiêng phản chiếu ánh sáng'),
(35, 'https://cdn.tgdd.vn/Products/Images/42/322996/Slider/vi-vn-vivo-y03-1.png', 'Ảnh minh họa hiệu năng đồ họa trò chơi'),
(35, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/339180/vivo-y39-5g-tim-6-638872439446984069-750x500.jpg', 'Cận cảnh cụm camera kép xếp dọc'),

-- 36. Vivo X300 5G| 12GB 256GB 
(36, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/357861/vivo-x300-hong-thumb-638961181921070616-600x600.jpg', 'Màu hồng ngọt ngào quý phái'),
(36, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Campaign/6c/cf/6ccf9455c6384d14619d82fa128301f3.jpg', 'Banner sự kiện đặt trước nhận quà'),
(36, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Campaign/12/e9/12e92e185fbe6313b2a321959265ad77.jpg', 'Hình ảnh giới thiệu ống kính Zeiss cao cấp'),
(36, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Campaign/5d/0a/5d0a276a7e4ad5dbbfee826ef97afefa.png', 'Đồ họa chi tiết vi xử lý thế hệ mới'),

-- 37. Iphone 17 Pro Max| 256GB Chính Hãng VNA
(37, 'https://cdn.tgdd.vn/Products/Images/42/342679/iphone-17-pro-max-xanh-duong-thumb-600x600.jpg', 'Màu xanh dương Titanium độc quyền'),
(37, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/342679/iphone-17-pro-max-xanh-1-638930821961455986-750x500.jpg', 'Toàn bộ thiết kế mặt lưng và cụm camera sau'),
(37, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/342679/iphone-17-pro-max-xanh-5-638930821932174939-750x500.jpg', 'Mặt trước cụm Dynamic Island thông minh'),
(37, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/342679/iphone-17-pro-max-xanh-2-638930821911831487-750x500.jpg', 'Góc nhìn nghiêng thân máy siêu mỏng từ chất liệu titan'),

-- 38. Iphone 13 Pro Max| 128GB 
(38, 'https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-midnight-2-600x600.jpg', 'Màu xám Midnight lịch lãm tinh tế'),
(38, 'https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-1-2-750x500.jpg', 'Mặt trước màn hình hiển thị sống động'),
(38, 'https://cdn.tgdd.vn/Images/42/223602/iphone-13-4-1-750x500.jpg', 'Cận cảnh chi tiết loa thoại và phần tai thỏ nhỏ gọn'),
(38, 'https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-12-1-750x500.jpg', 'Góc chụp nghiêng 45 độ cụm 3 camera bếp vuông'),

-- 39. Iphone 15 Plus| 128GB 
(39, 'https://cdn.tgdd.vn/Products/Images/42/303891/iphone-15-plus-vang-126gb-thumb-600x600.jpg', 'Màu vàng pastel nhẹ nhàng thanh lịch'),
(39, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/303891/iphone-15-plus-yellow-2-638629458200572632-750x500.jpg', 'Góc chụp mặt lưng kính pha màu mờ độc đáo'),
(39, 'https://cdn.tgdd.vn/Products/Images/42/303891/iphone-15-plus-128gb-vang-3-750x500.jpg', 'Màn hình Dynamic Island lớn tràn viền mỏng'),
(39, 'https://cdn.tgdd.vn/Products/Images/42/303823/iphone-15-plus-256-vang-2-750x500.jpg', 'Chi tiết cạnh bên làm từ nhôm tái chế'),

-- 40. Iphone 16 Plus| 128GB 
(40, 'https://cdn.tgdd.vn/Products/Images/42/334864/iphone-16e-white-thumb-600x600.jpg', 'Màu trắng ngọc trai thanh khiết sáng bóng'),
(40, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/334864/iphone-16e-white-3-638756438048473598-750x500.jpg', 'Thiết kế nút Camera Control đặc thù mới'),
(40, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/334864/iphone-16e-white-4-638756438053606377-750x500.jpg', 'Mặt lưng camera xếp dọc hỗ trợ quay video không gian'),
(40, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/334864/iphone-16e-white-1-638756438035819151-750x500.jpg', 'Góc máy tổng thể mặt trước bật màn hình chính'),

-- 41. Samsung Galaxy Z Flip7 FE| 128GB 
(41, 'https://cdn.tgdd.vn/Products/Images/42/338741/samsung-galaxy-z-flip7-fe-white-thumb-600x600.jpg', 'Thiết kế gập vỏ sò màu trắng thời trang'),
(41, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/338741/samsung-galaxy-z-flip7-fe-black-13-638889664501136169-750x500.jpg', 'Màn hình phụ Flex Window đa năng phía ngoài'),
(41, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/338741/samsung-galaxy-z-flip7-fe-black-6-638889664456625449-750x500.jpg', 'Trạng thái máy gập mở một nửa góc 90 độ Flex Mode'),
(41, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/338741/samsung-galaxy-z-flip7-fe-black-2-638889664429803514-750x500.jpg', 'Thân máy siêu mỏng khi mở phẳng hoàn toàn'),

-- 42. Samsung Galaxy S24 Ultra| 128GB 
(42, 'https://cdn.tgdd.vn/2025/10/timerseo/307174-600x600-5.jpg', 'Màu đen Titanium lịch lãm mạnh mẽ'),
(42, 'https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-s24-ultra-xam-1-750x500.jpg', 'Thiết kế màn hình phẳng viền siêu mỏng'),
(42, 'https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-s24-ultra-xam-7-750x500.jpg', 'Cận cảnh cụm 4 camera độ phân giải cao phía sau'),
(42, 'https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-s24-ultra-xam-12-750x500.jpg', 'Khe chứa và chiếc bút S-Pen thông minh đi kèm máy'),

-- 43. Samsung Galaxy A16| 128GB 
(43, 'https://cdn.tgdd.vn/2025/10/timerseo/331207-600x600-6.jpg', 'Màu xanh dương trẻ trung bóng bẩy'),
(43, 'https://cdn.tgdd.vn/Products/Images/42/331207/Slider/galaxy-a16-tongquan-2048x1144.jpg', 'Banner chi tiết cấu hình và ưu đãi'),
(43, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/331207/samsung-galaxy-a16-xanh-11-638684923508048734-750x500.jpg', 'Mặt lưng phẳng với 3 ống kính xếp dọc đặc trưng'),
(43, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/331207/samsung-galaxy-a16-xanh-12-638684923516814722-750x500.jpg', 'Thiết kế cụm phím nổi Key Island ở cạnh phải'),

-- 44. Samsung Galaxy S25 Plus| 256GB 
(44, 'https://cdn.tgdd.vn/2025/10/timerseo/333359-600x600-5.jpg', 'Màu bạc Metallic ánh kim sang trọng'),
(44, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/333359/samsung-galaxy-s25-plus-xanh-2-638747847111134510-750x500.jpg', 'Góc nhìn nghiêng tinh tế của khung viền bo cong nhẹ'),
(44, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/333359/samsung-galaxy-s25-plus-xanh-5-638747847131250524-750x500.jpg', 'Giao diện tính năng Galaxy AI tiên tiến trên màn hình'),
(44, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/333359/samsung-galaxy-s25-plus-xanh-1-638747847103293464-750x500.jpg', 'Trực diện mặt trước màn hình vô cực quyến rũ'),

-- 45. Samsung Galaxy S23 Ultra 256GB
(45, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23-ulatra_2__1.png', 'Thiết kế vuông vức nguyên khối mạnh mẽ'),
(45, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/2/s23-ultra-xanh.png', 'Mặt lưng kính nhám cao cấp màu xanh quân đội'),
(45, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/2/s23-ultra-den-2.png', 'Góc nhìn chéo từ phía cụm ống kính tiềm vọng Zoom 100x'),
(45, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-s23-ultra_9_.jpg', 'Cận cảnh viền cạnh cong tinh tế sang trọng'),

-- 46. Oppo A5i Pro |Chính Hãng
(46, 'https://cdn.tgdd.vn/Products/Images/42/340255/oppo-a5i-pro-white-thumb-600x600.jpg', 'Màu trắng ngọc trai lấp lánh'),
(46, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/340255/oppo-a5i-pro-trang-11-638887992811120165-750x500.jpg', 'Mặt trước màn hình giọt nước có viền mỏng'),
(46, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/340255/oppo-a5i-pro-trang-5-638887992771009546-750x500.jpg', 'Thiết kế cụm camera hình tròn lớn nổi bật độc lạ'),
(46, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/340255/oppo-a5i-pro-trang-6-638887992777537171-750x500.jpg', 'Chi tiết các cổng kết nối và loa ở cạnh dưới máy'),

-- 47. Realme Note 70 4GB|64GB
(47, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/340260/realme-note-70-4gb-64gb-160725-095001-095-600x600.jpg', 'Hộp sản phẩm màu vàng đen mang đậm nét Realme'),
(47, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/340260/realme-note-70-black-11-638884492007089898-750x500.jpg', 'Mặt lưng hoàn thiện kiểu nhám mờ đen lịch lãm'),
(47, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/340260/realme-note-70-black-10-638884492001066113-750x500.jpg', 'Màn hình hiển thị độ sáng cao ngoài trời tốt'),
(47, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/340260/realme-note-70-black-12-638884492012523327-750x500.jpg', 'Góc nhìn nghiêng siêu mỏng nhẹ của thân máy'),

-- 48. Realme C 85  5G
(48, 'https://cdn.tgdd.vn/Products/Images/42/357831/realme-c85-purple-thumb-600x600.jpg', 'Màu tím lãng mạn lôi cuốn thời thượng'),
(48, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/357832/realme-c85-pro-purple-2-638957030615156745-750x500.jpg', 'Thiết kế hoa văn lấp lánh phản quang khi nghiêng máy'),
(48, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/357832/realme-c85-pro-purple-4-638957030602605306-750x500.jpg', 'Góc chụp nghiêng thấy cụm camera tinh xảo lồi nhẹ'),
(48, 'https://cdn.tgdd.vn/Products/Images/42/357831/realme-c85-purple-3-638957023346883619-750x500.jpg', 'Giao diện màn hình chính mượt mà sắc nét'),

-- 49: Red Magic 7S Pro
(49, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/_/p/_p_.png', 'Mặt lưng phong cách gaming hầm hố và cá tính'),
(49, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/n/gnhj_2.png', 'Hệ thống tản nhiệt độc đáo hỗ trợ chơi game mượt mà'),
(49, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/h/th.png', 'Góc nghiêng siêu mỏng thể hiện các đường nét tinh xảo'),
(49, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/_/p/_p_bgh.png', 'Giao diện màn hình tối ưu trải nghiệm giải trí đỉnh cao'),

-- 50: Honor X7d 5G
(50, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/358026/honor-x7d-5g-8gb-256gb-181025-112407-975-600x600.jpg', 'Phiên bản màu trắng thanh lịch thời trang năng động'),
(50, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/h/o/honor-x8a_4_.png', 'Mặt lưng phản chiếu ánh sáng nhẹ nhàng sang trọng'),
(50, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/h/o/honor-x8a_5_.png', 'Cạnh bên bo cong nhẹ mang lại cảm giác cầm nắm chắc chắn'),
(50, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/h/o/honor-x8a_3_.png', 'Trực diện màn hình hiển thị không gian góc nhìn rộng lớn'),

-- 51: Honor 400 Pro 5G
(51, 'https://cdn.tgdd.vn/Products/Images/42/339272/honor-400-pro-xam-thumb-600x600.jpg', 'Phối màu thời thượng tôn lên vẻ đẳng cấp cao cấp'),
(51, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/339638/honor-400-den-12-638878533384091442-750x500.jpg', 'Cụm camera độc đáo tích hợp công nghệ zoom siêu nét'),
(51, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/339638/honor-400-den-11-638878533378667467-750x500.jpg', 'Độ hoàn thiện cao cấp đến từng chi tiết nhỏ ở viền máy'),
(51, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/339638/honor-400-den-13-638878533390191451-750x500.jpg', 'Màn hình tràn viền cong quyến rũ lôi cuốn người dùng'),

-- 52: Nothing Phone 1
(52, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/o/nothing-phone-1.png', 'Màu đen huyền bí kết hợp mặt lưng trong suốt độc bản'),
(52, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/o/nothing-phone-1_2_.png', 'Hệ thống đèn LED Glyph tỏa sáng độc đáo khi có thông báo'),
(52, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/o/nothing-phone-1_6_.png', 'Khung viền vuông vức cứng cáp hiện đại và trẻ trung'),
(52, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nothing-phone-3a-pro_6_.png', 'Giao diện Nothing OS tối giản trực quan mang chất riêng'),

-- 53: Nothing Phone A3 Pro
(53, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nothing-phone-3a-pro_1_.png', 'Màu metallic ánh kim nổi bật cuốn hút mọi ánh nhìn'),
(53, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nothing-phone-3a-pro_6_.png', 'Cận cảnh dải LED phía sau tạo điểm nhấn công nghệ đột phá'),
(53, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nothing-phone-3a-pro_8_.png', 'Thiết kế đối xứng hoàn hảo mang lại tính thẩm mỹ cao'),
(53, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-nothing-phone-3a-pro_10_.png', 'Màn hình sắc nét hiển thị nội dung vô cùng sống động'),

-- 54: Xiaomi Redmi 14C
(54, 'https://cdn.tgdd.vn/2025/10/timerseo/329008-600x600-5.jpg', 'Sắc xanh đại dương tươi mát trẻ trung năng động'),
(54, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/329007/redmi-14c-den-4-638618468036307624-750x500.jpg', 'Cụm camera tròn lớn làm điểm nhấn thiết kế nổi bật phía sau'),
(54, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/329007/redmi-14c-den-11-638618468081810762-750x500.jpg', 'Mặt lưng nhám nhẹ hạn chế bám mồ hôi dấu vân tay hiệu quả'),
(54, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/329007/redmi-14c-den-12-638618468087205248-750x500.jpg', 'Trải nghiệm màn hình kích thước lớn giải trí cực đã mắt'),

-- 55: Xiaomi Redmi 15 Pro
(55, 'https://cdn.tgdd.vn/Products/Images/42/341272/xiaomi-redmi-15-tim-thumbnew-600x600.jpg', 'Sắc tím mộng mơ thời thượng lôi cuốn ngay từ cái nhìn đầu tiên'),
(55, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/333147/xiaomi-redmi-note-14-purple-12-638723659899179032-750x500.jpg', 'Thiết kế cụm camera tinh xảo xếp hài hòa tinh tế'),
(55, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/333147/xiaomi-redmi-note-14-purple-7-638723659854624265-750x500.jpg', 'Góc nhìn nghiêng siêu mỏng nhẹ thời trang lịch lãm'),
(55, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/333147/xiaomi-redmi-note-14-purple-4-638723659829038792-750x500.jpg', 'Màn hình rực rỡ với màu sắc có độ tương phản cao'),

-- 56: Xiaomi 15T Pro
(56, 'https://cdn.tgdd.vn/Products/Images/42/344647/xiaomi-15t-pro-black-thumb-600x600.jpg', 'Màu đen lịch lãm mang phong cách quý phái mạnh mẽ'),
(56, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-redmi-note-14-5g.1.png', 'Hệ thống thấu kính camera chuyên nghiệp cao cấp'),
(56, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-redmi-note-14-5g.png', 'Mặt lưng xử lý tinh tế mang lại cảm giác mượt mà'),
(56, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-redmi-note-14-5g_1_.png', 'Màn hình hiển thị mượt mà với tần số quét cao ấn tượng')
;

INSERT INTO attributes (product_id, attribute_name, attribute_value) VALUES
-- Product 1: iPhone 15 Pro Max
(1,'CPU','Apple A18 Pro'),
(1,'GPU','Apple GPU 6 nhân'),
(1,'Camera sau','48MP + 12MP + 12MP'),
(1,'Camera trước','12MP'),
(1,'Pin','4676 mAh'),
(1,'Hệ điều hành','iOS 18'),
(1,'Bluetooth','5.4'),
(1,'Wi-Fi','Wi-Fi 7'),
(1,'Màn hình','Super Retina XDR OLED'),
(1,'Tần số quét','120Hz'),

-- Product 2: Oppo A5i
(2,'CPU','Snapdragon 6s Gen 1'),
(2,'GPU','Adreno'),
(2,'Camera sau','50MP'),
(2,'Camera trước','8MP'),
(2,'Pin','5100 mAh'),
(2,'Hệ điều hành','Android 15'),
(2,'Bluetooth','5.3'),
(2,'Wi-Fi','Wi-Fi 5'),
(2,'Màn hình','IPS LCD'),
(2,'Tần số quét','90Hz'),

-- Product 3: Nothing Phone 2A Plus
(3,'CPU','MediaTek Dimensity 7350 Pro'),
(3,'GPU','Mali-G610'),
(3,'Camera sau','50MP + 50MP'),
(3,'Camera trước','50MP'),
(3,'Pin','5000 mAh'),
(3,'Hệ điều hành','Nothing OS'),
(3,'Bluetooth','5.3'),
(3,'Wi-Fi','Wi-Fi 6'),
(3,'Màn hình','AMOLED'),
(3,'Tần số quét','120Hz'),

-- Product 4: Honor Magic V5
(4,'CPU','Snapdragon 8 Elite'),
(4,'GPU','Adreno 830'),
(4,'Camera sau','200MP + 50MP + 50MP'),
(4,'Camera trước','20MP'),
(4,'Pin','6100 mAh'),
(4,'Hệ điều hành','MagicOS'),
(4,'Bluetooth','5.4'),
(4,'Wi-Fi','Wi-Fi 7'),
(4,'Màn hình','LTPO OLED'),
(4,'Tần số quét','120Hz'),

-- Product 5: Xiaomi 15T Pro
(5,'CPU','MediaTek Dimensity 9400'),
(5,'GPU','Immortalis-G925'),
(5,'Camera sau','50MP + 50MP + 12MP'),
(5,'Camera trước','32MP'),
(5,'Pin','5500 mAh'),
(5,'Hệ điều hành','HyperOS'),
(5,'Bluetooth','5.4'),
(5,'Wi-Fi','Wi-Fi 7'),
(5,'Màn hình','AMOLED'),
(5,'Tần số quét','144Hz'),

-- Product 6: Oppo Reno14 F
(6,'CPU','Snapdragon 7 Gen 3'),
(6,'GPU','Adreno 720'),
(6,'Camera sau','50MP + 8MP + 2MP'),
(6,'Camera trước','32MP'),
(6,'Pin','6000 mAh'),
(6,'Hệ điều hành','ColorOS'),
(6,'Bluetooth','5.4'),
(6,'Wi-Fi','Wi-Fi 6'),
(6,'Màn hình','AMOLED'),
(6,'Tần số quét','120Hz'),

-- Product 7: Nubia Neo 3 GT
(7,'CPU','Unisoc T9100'),
(7,'GPU','Mali-G57'),
(7,'Camera sau','50MP'),
(7,'Camera trước','16MP'),
(7,'Pin','6000 mAh'),
(7,'Hệ điều hành','Android 15'),
(7,'Bluetooth','5.2'),
(7,'Wi-Fi','Wi-Fi 6'),
(7,'Màn hình','AMOLED'),
(7,'Tần số quét','120Hz'),

-- Product 8: iPhone 17
(8,'CPU','Apple A19'),
(8,'GPU','Apple GPU 6 nhân'),
(8,'Camera sau','48MP + 12MP'),
(8,'Camera trước','12MP'),
(8,'Pin','4800 mAh'),
(8,'Hệ điều hành','iOS 19'),
(8,'Bluetooth','5.4'),
(8,'Wi-Fi','Wi-Fi 7'),
(8,'Màn hình','Super Retina XDR OLED'),
(8,'Tần số quét','120Hz'),

-- Product 9: Samsung Galaxy Z Flip7
(9,'CPU','Exynos 2500'),
(9,'GPU','Xclipse'),
(9,'Camera sau','50MP + 12MP'),
(9,'Camera trước','10MP'),
(9,'Pin','4300 mAh'),
(9,'Hệ điều hành','One UI 8'),
(9,'Bluetooth','5.4'),
(9,'Wi-Fi','Wi-Fi 7'),
(9,'Màn hình','Dynamic AMOLED 2X'),
(9,'Tần số quét','120Hz'),

-- Product 10: Oppo A6 Pro
(10,'CPU','Snapdragon 7s Gen 2'),
(10,'GPU','Adreno 710'),
(10,'Camera sau','64MP + 2MP'),
(10,'Camera trước','16MP'),
(10,'Pin','5500 mAh'),
(10,'Hệ điều hành','ColorOS'),
(10,'Bluetooth','5.3'),
(10,'Wi-Fi','Wi-Fi 6'),
(10,'Màn hình','AMOLED'),
(10,'Tần số quét','120Hz'),

-- Product 11: Vivo Y28
(11,'CPU','MediaTek Helio G85'),
(11,'GPU','Mali-G52 MC2'),
(11,'Camera sau','50MP + 2MP'),
(11,'Camera trước','8MP'),
(11,'Pin','6000 mAh'),
(11,'Hệ điều hành','Android 14'),
(11,'Bluetooth','5.0'),
(11,'Wi-Fi','Wi-Fi 5'),
(11,'Màn hình','IPS LCD'),
(11,'Tần số quét','90Hz'),

-- Product 12: Nubia C21 Plus
(12,'CPU','Unisoc SC9863A'),
(12,'GPU','PowerVR GE8322'),
(12,'Camera sau','13MP'),
(12,'Camera trước','5MP'),
(12,'Pin','5050 mAh'),
(12,'Hệ điều hành','Android 13'),
(12,'Bluetooth','5.0'),
(12,'Wi-Fi','Wi-Fi 5'),
(12,'Màn hình','IPS LCD'),
(12,'Tần số quét','60Hz'),

-- Product 13: Xiaomi 15 Ultra
(13,'CPU','Snapdragon 8 Elite'),
(13,'GPU','Adreno 830'),
(13,'Camera sau','50MP + 50MP + 200MP + 50MP'),
(13,'Camera trước','32MP'),
(13,'Pin','5410 mAh'),
(13,'Hệ điều hành','HyperOS'),
(13,'Bluetooth','5.4'),
(13,'Wi-Fi','Wi-Fi 7'),
(13,'Màn hình','AMOLED'),
(13,'Tần số quét','120Hz'),

-- Product 14: Samsung Galaxy S25 Ultra
(14,'CPU','Snapdragon 8 Elite'),
(14,'GPU','Adreno 830'),
(14,'Camera sau','200MP + 50MP + 50MP + 10MP'),
(14,'Camera trước','12MP'),
(14,'Pin','5000 mAh'),
(14,'Hệ điều hành','One UI 7'),
(14,'Bluetooth','5.4'),
(14,'Wi-Fi','Wi-Fi 7'),
(14,'Màn hình','Dynamic AMOLED 2X'),
(14,'Tần số quét','120Hz'),

-- Product 15: Poco X7 Pro
(15,'CPU','Dimensity 8400 Ultra'),
(15,'GPU','Mali-G720'),
(15,'Camera sau','50MP + 8MP'),
(15,'Camera trước','20MP'),
(15,'Pin','6000 mAh'),
(15,'Hệ điều hành','HyperOS'),
(15,'Bluetooth','5.4'),
(15,'Wi-Fi','Wi-Fi 6'),
(15,'Màn hình','AMOLED'),
(15,'Tần số quét','120Hz'),

-- Product 16: iPhone 14 Pro Max
(16,'CPU','Apple A16 Bionic'),
(16,'GPU','Apple GPU 5 nhân'),
(16,'Camera sau','48MP + 12MP + 12MP'),
(16,'Camera trước','12MP'),
(16,'Pin','4323 mAh'),
(16,'Hệ điều hành','iOS 18'),
(16,'Bluetooth','5.3'),
(16,'Wi-Fi','Wi-Fi 6E'),
(16,'Màn hình','Super Retina XDR OLED'),
(16,'Tần số quét','120Hz'),

-- Product 17: Nubia Z70 Ultra
(17,'CPU','Snapdragon 8 Elite'),
(17,'GPU','Adreno 830'),
(17,'Camera sau','50MP + 64MP + 50MP'),
(17,'Camera trước','16MP'),
(17,'Pin','6150 mAh'),
(17,'Hệ điều hành','Android 15'),
(17,'Bluetooth','5.4'),
(17,'Wi-Fi','Wi-Fi 7'),
(17,'Màn hình','AMOLED'),
(17,'Tần số quét','144Hz'),

-- Product 18: Oppo Reno12 F
(18,'CPU','Snapdragon 6 Gen 1'),
(18,'GPU','Adreno 710'),
(18,'Camera sau','50MP + 8MP + 2MP'),
(18,'Camera trước','32MP'),
(18,'Pin','5000 mAh'),
(18,'Hệ điều hành','ColorOS'),
(18,'Bluetooth','5.3'),
(18,'Wi-Fi','Wi-Fi 6'),
(18,'Màn hình','AMOLED'),
(18,'Tần số quét','120Hz'),

-- Product 19: Honor X9c
(19,'CPU','Snapdragon 6 Gen 1'),
(19,'GPU','Adreno 710'),
(19,'Camera sau','108MP + 5MP'),
(19,'Camera trước','16MP'),
(19,'Pin','6600 mAh'),
(19,'Hệ điều hành','MagicOS'),
(19,'Bluetooth','5.3'),
(19,'Wi-Fi','Wi-Fi 6'),
(19,'Màn hình','AMOLED'),
(19,'Tần số quét','120Hz'),

-- Product 20: Nothing Phone 3A
(20,'CPU','Snapdragon 7s Gen 3'),
(20,'GPU','Adreno 720'),
(20,'Camera sau','50MP + 50MP + 8MP'),
(20,'Camera trước','32MP'),
(20,'Pin','5000 mAh'),
(20,'Hệ điều hành','Nothing OS'),
(20,'Bluetooth','5.4'),
(20,'Wi-Fi','Wi-Fi 6'),
(20,'Màn hình','AMOLED'),
(20,'Tần số quét','120Hz'),

-- Product 21: Oppo Reno13 Pro
(21,'CPU','MediaTek Dimensity 8350'),
(21,'GPU','Mali-G615'),
(21,'Camera sau','50MP + 50MP + 8MP'),
(21,'Camera trước','50MP'),
(21,'Pin','5800 mAh'),
(21,'Hệ điều hành','ColorOS'),
(21,'Bluetooth','5.4'),
(21,'Wi-Fi','Wi-Fi 7'),
(21,'Màn hình','AMOLED'),
(21,'Tần số quét','120Hz'),

-- Product 22: Nothing Phone 3A Pro
(22,'CPU','Snapdragon 7s Gen 3'),
(22,'GPU','Adreno 720'),
(22,'Camera sau','50MP + 50MP + 8MP'),
(22,'Camera trước','32MP'),
(22,'Pin','5000 mAh'),
(22,'Hệ điều hành','Nothing OS'),
(22,'Bluetooth','5.4'),
(22,'Wi-Fi','Wi-Fi 6'),
(22,'Màn hình','AMOLED'),
(22,'Tần số quét','120Hz'),

-- Product 23: Vivo V50 Lite
(23,'CPU','Snapdragon 6 Gen 1'),
(23,'GPU','Adreno 710'),
(23,'Camera sau','50MP + 8MP'),
(23,'Camera trước','32MP'),
(23,'Pin','6500 mAh'),
(23,'Hệ điều hành','Funtouch OS'),
(23,'Bluetooth','5.3'),
(23,'Wi-Fi','Wi-Fi 6'),
(23,'Màn hình','AMOLED'),
(23,'Tần số quét','120Hz'),

-- Product 24: Honor X9 Pro
(24,'CPU','Snapdragon 6 Gen 1'),
(24,'GPU','Adreno 710'),
(24,'Camera sau','108MP + 5MP'),
(24,'Camera trước','16MP'),
(24,'Pin','6600 mAh'),
(24,'Hệ điều hành','MagicOS'),
(24,'Bluetooth','5.3'),
(24,'Wi-Fi','Wi-Fi 6'),
(24,'Màn hình','AMOLED'),
(24,'Tần số quét','120Hz'),

-- Product 25: Nothing Phone 2
(25,'CPU','Snapdragon 8+ Gen 1'),
(25,'GPU','Adreno 730'),
(25,'Camera sau','50MP + 50MP'),
(25,'Camera trước','32MP'),
(25,'Pin','4700 mAh'),
(25,'Hệ điều hành','Nothing OS'),
(25,'Bluetooth','5.3'),
(25,'Wi-Fi','Wi-Fi 6'),
(25,'Màn hình','OLED'),
(25,'Tần số quét','120Hz'),

-- Product 26: Honor 400 Lite
(26,'CPU','MediaTek Dimensity 7025'),
(26,'GPU','IMG BXM'),
(26,'Camera sau','108MP + 5MP'),
(26,'Camera trước','16MP'),
(26,'Pin','5230 mAh'),
(26,'Hệ điều hành','MagicOS'),
(26,'Bluetooth','5.3'),
(26,'Wi-Fi','Wi-Fi 6'),
(26,'Màn hình','AMOLED'),
(26,'Tần số quét','120Hz'),

-- Product 27: iPhone 17 Pro Max
(27,'CPU','Apple A19 Pro'),
(27,'GPU','Apple GPU 6 nhân'),
(27,'Camera sau','48MP + 48MP + 48MP'),
(27,'Camera trước','12MP'),
(27,'Pin','5000 mAh'),
(27,'Hệ điều hành','iOS 19'),
(27,'Bluetooth','5.4'),
(27,'Wi-Fi','Wi-Fi 7'),
(27,'Màn hình','Super Retina XDR OLED'),
(27,'Tần số quét','120Hz'),

-- Product 28: Xiaomi 14T
(28,'CPU','MediaTek Dimensity 8300 Ultra'),
(28,'GPU','Mali-G615'),
(28,'Camera sau','50MP + 12MP + 50MP'),
(28,'Camera trước','32MP'),
(28,'Pin','5000 mAh'),
(28,'Hệ điều hành','HyperOS'),
(28,'Bluetooth','5.4'),
(28,'Wi-Fi','Wi-Fi 6E'),
(28,'Màn hình','AMOLED'),
(28,'Tần số quét','144Hz'),

-- Product 29: Xiaomi 15 Ultra 1TB
(29,'CPU','Snapdragon 8 Elite'),
(29,'GPU','Adreno 830'),
(29,'Camera sau','50MP + 50MP + 200MP + 50MP'),
(29,'Camera trước','32MP'),
(29,'Pin','5410 mAh'),
(29,'Hệ điều hành','HyperOS'),
(29,'Bluetooth','5.4'),
(29,'Wi-Fi','Wi-Fi 7'),
(29,'Màn hình','AMOLED'),
(29,'Tần số quét','120Hz'),

-- Product 30: Redmi 14C
(30,'CPU','MediaTek Helio G81'),
(30,'GPU','Mali-G52'),
(30,'Camera sau','50MP'),
(30,'Camera trước','13MP'),
(30,'Pin','5160 mAh'),
(30,'Hệ điều hành','HyperOS'),
(30,'Bluetooth','5.4'),
(30,'Wi-Fi','Wi-Fi 5'),
(30,'Màn hình','IPS LCD'),
(30,'Tần số quét','120Hz'),

-- Product 31: Nubia Neo 2 5G
(31,'CPU','Unisoc T820'),
(31,'GPU','Mali-G57 MC4'),
(31,'Camera sau','50MP + 2MP'),
(31,'Camera trước','16MP'),
(31,'Pin','6000 mAh'),
(31,'Hệ điều hành','Android 15'),
(31,'Bluetooth','5.2'),
(31,'Wi-Fi','Wi-Fi 6'),
(31,'Màn hình','AMOLED'),
(31,'Tần số quét','120Hz'),

-- Product 32: Vivo V40 Lite 5G
(32,'CPU','Snapdragon 6 Gen 1'),
(32,'GPU','Adreno 710'),
(32,'Camera sau','50MP + 8MP'),
(32,'Camera trước','32MP'),
(32,'Pin','5500 mAh'),
(32,'Hệ điều hành','Funtouch OS'),
(32,'Bluetooth','5.3'),
(32,'Wi-Fi','Wi-Fi 6'),
(32,'Màn hình','AMOLED'),
(32,'Tần số quét','120Hz'),

-- Product 33: Vivo Y17 Lite
(33,'CPU','MediaTek Helio G85'),
(33,'GPU','Mali-G52 MC2'),
(33,'Camera sau','50MP'),
(33,'Camera trước','8MP'),
(33,'Pin','5000 mAh'),
(33,'Hệ điều hành','Android 14'),
(33,'Bluetooth','5.0'),
(33,'Wi-Fi','Wi-Fi 5'),
(33,'Màn hình','IPS LCD'),
(33,'Tần số quét','90Hz'),

-- Product 34: Vivo Y03 Lite
(34,'CPU','MediaTek Helio G85'),
(34,'GPU','Mali-G52 MC2'),
(34,'Camera sau','13MP'),
(34,'Camera trước','5MP'),
(34,'Pin','5000 mAh'),
(34,'Hệ điều hành','Android 14'),
(34,'Bluetooth','5.0'),
(34,'Wi-Fi','Wi-Fi 5'),
(34,'Màn hình','IPS LCD'),
(34,'Tần số quét','90Hz'),

-- Product 35: Vivo Y39 Lite
(35,'CPU','Snapdragon 4 Gen 2'),
(35,'GPU','Adreno 613'),
(35,'Camera sau','50MP'),
(35,'Camera trước','8MP'),
(35,'Pin','6500 mAh'),
(35,'Hệ điều hành','Funtouch OS'),
(35,'Bluetooth','5.3'),
(35,'Wi-Fi','Wi-Fi 6'),
(35,'Màn hình','LCD'),
(35,'Tần số quét','120Hz'),

-- Product 36: Vivo X300
(36,'CPU','MediaTek Dimensity 9500'),
(36,'GPU','Immortalis-G925'),
(36,'Camera sau','50MP + 50MP + 200MP'),
(36,'Camera trước','50MP'),
(36,'Pin','6000 mAh'),
(36,'Hệ điều hành','Funtouch OS'),
(36,'Bluetooth','5.4'),
(36,'Wi-Fi','Wi-Fi 7'),
(36,'Màn hình','LTPO AMOLED'),
(36,'Tần số quét','120Hz'),

-- Product 37: iPhone 17 Pro Max 256GB
(37,'CPU','Apple A19 Pro'),
(37,'GPU','Apple GPU 6 nhân'),
(37,'Camera sau','48MP + 48MP + 48MP'),
(37,'Camera trước','12MP'),
(37,'Pin','5000 mAh'),
(37,'Hệ điều hành','iOS 19'),
(37,'Bluetooth','5.4'),
(37,'Wi-Fi','Wi-Fi 7'),
(37,'Màn hình','Super Retina XDR OLED'),
(37,'Tần số quét','120Hz'),

-- Product 38: iPhone 13 Pro Max
(38,'CPU','Apple A15 Bionic'),
(38,'GPU','Apple GPU 5 nhân'),
(38,'Camera sau','12MP + 12MP + 12MP'),
(38,'Camera trước','12MP'),
(38,'Pin','4352 mAh'),
(38,'Hệ điều hành','iOS 18'),
(38,'Bluetooth','5.0'),
(38,'Wi-Fi','Wi-Fi 6'),
(38,'Màn hình','Super Retina XDR OLED'),
(38,'Tần số quét','120Hz'),

-- Product 39: iPhone 15 Plus
(39,'CPU','Apple A16 Bionic'),
(39,'GPU','Apple GPU 5 nhân'),
(39,'Camera sau','48MP + 12MP'),
(39,'Camera trước','12MP'),
(39,'Pin','4383 mAh'),
(39,'Hệ điều hành','iOS 18'),
(39,'Bluetooth','5.3'),
(39,'Wi-Fi','Wi-Fi 6E'),
(39,'Màn hình','Super Retina XDR OLED'),
(39,'Tần số quét','60Hz'),

-- Product 40: iPhone 16 Plus
(40,'CPU','Apple A18'),
(40,'GPU','Apple GPU 5 nhân'),
(40,'Camera sau','48MP + 12MP'),
(40,'Camera trước','12MP'),
(40,'Pin','4674 mAh'),
(40,'Hệ điều hành','iOS 18'),
(40,'Bluetooth','5.4'),
(40,'Wi-Fi','Wi-Fi 7'),
(40,'Màn hình','Super Retina XDR OLED'),
(40,'Tần số quét','60Hz'),

-- Product 41: Samsung Galaxy Z Flip7 FE
(41,'CPU','Exynos 2500'),
(41,'GPU','Xclipse 950'),
(41,'Camera sau','50MP + 12MP'),
(41,'Camera trước','10MP'),
(41,'Pin','4300 mAh'),
(41,'Hệ điều hành','One UI 8'),
(41,'Bluetooth','5.4'),
(41,'Wi-Fi','Wi-Fi 7'),
(41,'Màn hình','Dynamic AMOLED 2X'),
(41,'Tần số quét','120Hz'),

-- Product 42: Samsung Galaxy S24 Ultra
(42,'CPU','Snapdragon 8 Gen 3'),
(42,'GPU','Adreno 750'),
(42,'Camera sau','200MP + 50MP + 12MP + 10MP'),
(42,'Camera trước','12MP'),
(42,'Pin','5000 mAh'),
(42,'Hệ điều hành','One UI 7'),
(42,'Bluetooth','5.3'),
(42,'Wi-Fi','Wi-Fi 7'),
(42,'Màn hình','Dynamic AMOLED 2X'),
(42,'Tần số quét','120Hz'),

-- Product 43: Samsung Galaxy A16
(43,'CPU','MediaTek Helio G99'),
(43,'GPU','Mali-G57 MC2'),
(43,'Camera sau','50MP + 5MP + 2MP'),
(43,'Camera trước','13MP'),
(43,'Pin','5000 mAh'),
(43,'Hệ điều hành','One UI Core'),
(43,'Bluetooth','5.3'),
(43,'Wi-Fi','Wi-Fi 5'),
(43,'Màn hình','Super AMOLED'),
(43,'Tần số quét','90Hz'),

-- Product 44: Samsung Galaxy S25 Plus
(44,'CPU','Snapdragon 8 Elite'),
(44,'GPU','Adreno 830'),
(44,'Camera sau','50MP + 12MP + 10MP'),
(44,'Camera trước','12MP'),
(44,'Pin','4900 mAh'),
(44,'Hệ điều hành','One UI 7'),
(44,'Bluetooth','5.4'),
(44,'Wi-Fi','Wi-Fi 7'),
(44,'Màn hình','Dynamic AMOLED 2X'),
(44,'Tần số quét','120Hz'),

-- Product 45: Samsung Galaxy S23 Ultra
(45,'CPU','Snapdragon 8 Gen 2'),
(45,'GPU','Adreno 740'),
(45,'Camera sau','200MP + 12MP + 10MP + 10MP'),
(45,'Camera trước','12MP'),
(45,'Pin','5000 mAh'),
(45,'Hệ điều hành','One UI 6'),
(45,'Bluetooth','5.3'),
(45,'Wi-Fi','Wi-Fi 6E'),
(45,'Màn hình','Dynamic AMOLED 2X'),
(45,'Tần số quét','120Hz'),

-- Product 46: Oppo A5i Pro
(46,'CPU','Snapdragon 6s Gen 1'),
(46,'GPU','Adreno 610'),
(46,'Camera sau','50MP'),
(46,'Camera trước','8MP'),
(46,'Pin','6000 mAh'),
(46,'Hệ điều hành','ColorOS'),
(46,'Bluetooth','5.2'),
(46,'Wi-Fi','Wi-Fi 5'),
(46,'Màn hình','IPS LCD'),
(46,'Tần số quét','90Hz'),

-- Product 47: Realme Note 70
(47,'CPU','Unisoc T7250'),
(47,'GPU','Mali-G57'),
(47,'Camera sau','50MP'),
(47,'Camera trước','8MP'),
(47,'Pin','5000 mAh'),
(47,'Hệ điều hành','realme UI'),
(47,'Bluetooth','5.2'),
(47,'Wi-Fi','Wi-Fi 5'),
(47,'Màn hình','IPS LCD'),
(47,'Tần số quét','90Hz'),

-- Product 48: Realme C85
(48,'CPU','MediaTek Dimensity 6300'),
(48,'GPU','Mali-G57'),
(48,'Camera sau','50MP'),
(48,'Camera trước','8MP'),
(48,'Pin','6000 mAh'),
(48,'Hệ điều hành','realme UI'),
(48,'Bluetooth','5.3'),
(48,'Wi-Fi','Wi-Fi 5'),
(48,'Màn hình','IPS LCD'),
(48,'Tần số quét','120Hz'),

-- Product 49: Red Magic 7S Pro
(49,'CPU','Snapdragon 8+ Gen 1'),
(49,'GPU','Adreno 730'),
(49,'Camera sau','64MP + 8MP + 2MP'),
(49,'Camera trước','16MP'),
(49,'Pin','5000 mAh'),
(49,'Hệ điều hành','RedMagic OS'),
(49,'Bluetooth','5.2'),
(49,'Wi-Fi','Wi-Fi 6E'),
(49,'Màn hình','AMOLED'),
(49,'Tần số quét','165Hz'),

-- Product 50: Honor X7d
(50,'CPU','Snapdragon 6 Gen 1'),
(50,'GPU','Adreno 710'),
(50,'Camera sau','108MP + 5MP'),
(50,'Camera trước','16MP'),
(50,'Pin','6000 mAh'),
(50,'Hệ điều hành','MagicOS'),
(50,'Bluetooth','5.3'),
(50,'Wi-Fi','Wi-Fi 6'),
(50,'Màn hình','AMOLED'),
(50,'Tần số quét','120Hz'),

-- Product 51: Honor 400 Pro
(51,'CPU','Snapdragon 8 Gen 3'),
(51,'GPU','Adreno 750'),
(51,'Camera sau','200MP + 50MP + 12MP'),
(51,'Camera trước','50MP'),
(51,'Pin','5300 mAh'),
(51,'Hệ điều hành','MagicOS'),
(51,'Bluetooth','5.4'),
(51,'Wi-Fi','Wi-Fi 7'),
(51,'Màn hình','AMOLED'),
(51,'Tần số quét','120Hz'),

-- Product 52: Nothing Phone 1
(52,'CPU','Snapdragon 778G+'),
(52,'GPU','Adreno 642L'),
(52,'Camera sau','50MP + 50MP'),
(52,'Camera trước','16MP'),
(52,'Pin','4500 mAh'),
(52,'Hệ điều hành','Nothing OS'),
(52,'Bluetooth','5.2'),
(52,'Wi-Fi','Wi-Fi 6'),
(52,'Màn hình','OLED'),
(52,'Tần số quét','120Hz'),

-- Product 53: Nothing Phone A3 Pro
(53,'CPU','Snapdragon 7s Gen 3'),
(53,'GPU','Adreno 720'),
(53,'Camera sau','50MP + 50MP + 8MP'),
(53,'Camera trước','32MP'),
(53,'Pin','5000 mAh'),
(53,'Hệ điều hành','Nothing OS'),
(53,'Bluetooth','5.4'),
(53,'Wi-Fi','Wi-Fi 6'),
(53,'Màn hình','AMOLED'),
(53,'Tần số quét','120Hz'),

-- Product 54: Xiaomi Redmi 14C
(54,'CPU','Helio G81 Ultra'),
(54,'GPU','Mali-G52'),
(54,'Camera sau','50MP'),
(54,'Camera trước','13MP'),
(54,'Pin','5160 mAh'),
(54,'Hệ điều hành','HyperOS'),
(54,'Bluetooth','5.4'),
(54,'Wi-Fi','Wi-Fi 5'),
(54,'Màn hình','IPS LCD'),
(54,'Tần số quét','120Hz'),

-- Product 55: Xiaomi Redmi 15 Pro
(55,'CPU','Snapdragon 7s Gen 3'),
(55,'GPU','Adreno 720'),
(55,'Camera sau','50MP + 8MP'),
(55,'Camera trước','20MP'),
(55,'Pin','6000 mAh'),
(55,'Hệ điều hành','HyperOS'),
(55,'Bluetooth','5.4'),
(55,'Wi-Fi','Wi-Fi 6'),
(55,'Màn hình','AMOLED'),
(55,'Tần số quét','120Hz'),

-- Product 56: Xiaomi 15T Pro
(56,'CPU','Dimensity 9400'),
(56,'GPU','Immortalis-G925'),
(56,'Camera sau','50MP + 50MP + 12MP'),
(56,'Camera trước','32MP'),
(56,'Pin','5500 mAh'),
(56,'Hệ điều hành','HyperOS'),
(56,'Bluetooth','5.4'),
(56,'Wi-Fi','Wi-Fi 7'),
(56,'Màn hình','AMOLED'),
(56,'Tần số quét','144Hz')
;

INSERT INTO product_variants
(product_id, product_ram, product_rom, product_color, product_stock_quantity, product_price)
VALUES

-- Product 1: iPhone 15 Pro Max
(1,8,256,'Titanium',20,29990000),
(1,8,512,'Titanium',15,33990000),
(1,8,1024,'Titanium',8,38990000),
(1,8,256,'Blue Titanium',18,29990000),
(1,8,512,'Blue Titanium',12,33990000),
(1,8,256,'White Titanium',15,29990000),

-- Product 2: Oppo A5i
(2,4,64,'Purple',25,4990000),
(2,4,128,'Purple',18,5490000),
(2,6,128,'Purple',12,5990000),
(2,4,64,'Black',22,4990000),
(2,4,128,'Black',16,5490000),

-- Product 3: Nothing Phone 2A Plus
(3,8,128,'Black',15,14990000),
(3,12,256,'Black',10,16990000),
(3,12,512,'Black',5,18990000),
(3,8,128,'White',12,14990000),
(3,12,256,'White',8,16990000),

-- Product 4: Honor Magic V5
(4,12,256,'Metallic',12,32990000),
(4,16,512,'Metallic',8,36990000),
(4,16,1024,'Metallic',4,41990000),
(4,12,256,'Gold',10,32990000),
(4,16,512,'Gold',6,36990000),

-- Product 5: Xiaomi 15T Pro
(5,12,256,'Black',20,21990000),
(5,12,512,'Black',12,24990000),
(5,16,512,'Black',8,27990000),
(5,12,256,'Silver',18,21990000),
(5,12,512,'Silver',10,24990000),

-- Product 6: Oppo Reno14 F
(6,8,256,'White',20,9990000),
(6,12,256,'White',12,10990000),
(6,8,512,'White',8,11990000),
(6,8,256,'Green',18,9990000),
(6,12,256,'Green',10,10990000),

-- Product 7: Nubia Neo 3 GT
(7,12,256,'Black',15,9990000),
(7,12,512,'Black',10,10990000),
(7,16,512,'Black',5,12990000),
(7,12,256,'Yellow',12,9990000),

-- Product 8: iPhone 17
(8,8,256,'Blue',20,32990000),
(8,8,512,'Blue',12,36990000),
(8,8,1024,'Blue',6,40990000),
(8,8,256,'Black',18,32990000),
(8,8,512,'Black',10,36990000),

-- Product 9: Samsung Galaxy Z Flip7
(9,12,256,'Blue',15,25990000),
(9,12,512,'Blue',8,28990000),
(9,12,256,'Cream',12,25990000),
(9,12,512,'Cream',6,28990000),

-- Product 10: Oppo A6 Pro
(10,8,256,'Black',20,6990000),
(10,12,256,'Black',12,7990000),
(10,8,512,'Black',6,8990000),
(10,8,256,'Purple',18,6990000),

-- Product 11: Vivo Y28
(11,8,128,'Orange',20,5490000),
(11,8,256,'Orange',12,5990000),
(11,12,256,'Orange',8,6990000),
(11,8,128,'Black',18,5490000),

-- Product 12: Nubia C21 Plus
(12,4,32,'Black',30,2290000),
(12,4,64,'Black',20,2490000),
(12,6,64,'Black',15,2790000),
(12,4,32,'Blue',25,2290000),

-- Product 13: Xiaomi 15 Ultra
(13,12,256,'Silver',15,28990000),
(13,12,512,'Silver',10,31990000),
(13,16,512,'Silver',6,33990000),
(13,12,256,'Black',15,28990000),
(13,16,1024,'Black',4,37990000),

-- Product 14: Samsung Galaxy S25 Ultra
(14,12,256,'Titanium Gray',15,29990000),
(14,12,512,'Titanium Gray',10,32990000),
(14,16,1024,'Titanium Gray',5,38990000),
(14,12,256,'Titanium Black',15,29990000),
(14,12,512,'Titanium Black',8,32990000),

-- Product 15: Xiaomi Poco X7 Pro
(15,8,128,'Yellow',20,9990000),
(15,8,256,'Yellow',15,10990000),
(15,12,256,'Yellow',10,11990000),
(15,8,128,'Black',18,9990000),
(15,12,512,'Black',6,13990000),

-- Product 16: iPhone 14 Pro Max
(16,8,128,'Deep Purple',15,22990000),
(16,8,256,'Deep Purple',12,25990000),
(16,8,512,'Deep Purple',8,28990000),
(16,8,128,'Gold',15,22990000),
(16,8,256,'Gold',10,25990000),
(16,8,512,'Silver',8,28990000),

-- Product 17: Nubia Z70 Ultra
(17,12,256,'Black',12,21990000),
(17,16,512,'Black',8,24990000),
(17,16,1024,'Black',5,28990000),
(17,12,256,'Silver',10,21990000),
(17,16,512,'Silver',6,24990000),

-- Product 18: Oppo Reno12 F
(18,8,256,'Green',18,8990000),
(18,12,256,'Green',12,9990000),
(18,12,512,'Green',8,10990000),
(18,8,256,'Black',15,8990000),

-- Product 19: Honor X9c
(19,8,256,'Purple',20,9990000),
(19,12,256,'Purple',15,10990000),
(19,12,512,'Purple',8,11990000),
(19,8,256,'Black',18,9990000),
(19,12,256,'Black',10,10990000),

-- Product 20: Nothing Phone 3A
(20,8,128,'White',15,11990000),
(20,8,256,'White',10,12990000),
(20,12,256,'White',8,13990000),
(20,8,128,'Black',15,11990000),
(20,12,256,'Black',8,13990000),

-- Product 21: Oppo Reno13 Pro
(21,12,256,'Gray',15,14990000),
(21,12,512,'Gray',10,16990000),
(21,16,512,'Gray',6,18990000),
(21,12,256,'Purple',12,14990000),
(21,12,512,'Purple',8,16990000),

-- Product 22: Nothing Phone 3A Pro
(22,8,128,'Black',15,13990000),
(22,8,256,'Black',10,14990000),
(22,12,256,'Black',8,15990000),
(22,8,128,'White',15,13990000),
(22,12,256,'White',8,15990000),

-- Product 23: Vivo V50 Lite
(23,8,128,'Gold',20,8990000),
(23,8,256,'Gold',15,9990000),
(23,12,256,'Gold',8,10990000),
(23,8,128,'Black',18,8990000),

-- Product 24: Honor X9 Pro
(24,12,256,'White',15,12990000),
(24,12,512,'White',10,13990000),
(24,16,512,'White',6,15990000),
(24,12,256,'Black',15,12990000),

-- Product 25: Nothing Phone 2
(25,8,128,'White',15,15990000),
(25,8,256,'White',10,16990000),
(25,12,256,'White',8,17990000),
(25,8,128,'Black',15,15990000),
(25,12,256,'Black',8,17990000),

-- Product 26: Honor 400 Lite
(26,8,256,'Green',18,9990000),
(26,12,256,'Green',12,10990000),
(26,12,512,'Green',6,11990000),
(26,8,256,'Black',15,9990000),

-- Product 27: iPhone 17 Pro Max
(27,8,256,'Black',15,35990000),
(27,8,512,'Black',10,39990000),
(27,8,1024,'Black',5,43990000),
(27,8,256,'White',15,35990000),
(27,8,512,'White',8,39990000),
(27,8,1024,'Desert Titanium',5,43990000),

-- Product 28: Xiaomi 14T
(28,12,256,'Blue',20,14990000),
(28,12,512,'Blue',12,16990000),
(28,16,512,'Blue',8,18990000),
(28,12,256,'Black',18,14990000),
(28,16,512,'Black',6,18990000),

-- Product 29: Xiaomi 15 Ultra
(29,12,256,'Silver',15,28990000),
(29,12,512,'Silver',10,31990000),
(29,16,512,'Silver',8,33990000),
(29,16,1024,'Silver',5,37990000),
(29,12,256,'Black',15,28990000),

-- Product 30: Redmi 14C
(30,4,128,'Black',30,3990000),
(30,6,128,'Black',20,4490000),
(30,8,256,'Black',10,5490000),
(30,4,128,'Blue',25,3990000),
(30,6,128,'Blue',18,4490000),

-- Product 31: Nubia Neo 2
(31,8,256,'Yellow',18,8490000),
(31,12,256,'Yellow',12,9490000),
(31,12,512,'Yellow',8,10990000),
(31,8,256,'Black',18,8490000),
(31,12,256,'Black',10,9490000),

-- Product 32: Vivo V40 Lite
(32,8,256,'Purple',18,9990000),
(32,12,256,'Purple',10,10990000),
(32,12,512,'Purple',6,11990000),
(32,8,256,'Gold',18,9990000),
(32,12,256,'Gold',10,10990000),

-- Product 33: Vivo Y17 Lite
(33,4,128,'Blue',25,3990000),
(33,6,128,'Blue',18,4490000),
(33,8,256,'Blue',10,5490000),
(33,4,128,'Black',22,3990000),

-- Product 34: Vivo Y03 Lite
(34,4,128,'Black',25,3490000),
(34,6,128,'Black',18,3990000),
(34,8,256,'Black',10,4990000),
(34,4,128,'Green',20,3490000),

-- Product 35: Vivo Y39 Lite
(35,8,128,'Purple',20,6490000),
(35,8,256,'Purple',12,6990000),
(35,12,256,'Purple',8,7990000),
(35,8,128,'Blue',18,6490000),

-- Product 36: Vivo X300
(36,12,256,'Pink',15,22990000),
(36,12,512,'Pink',10,24990000),
(36,16,512,'Pink',6,26990000),
(36,12,256,'Black',15,22990000),
(36,16,512,'Black',6,26990000),

-- Product 37: iPhone 17 Pro Max
(37,8,256,'Blue',15,35990000),
(37,8,512,'Blue',10,39990000),
(37,8,1024,'Blue',5,43990000),
(37,8,256,'Black',15,35990000),
(37,8,512,'Black',8,39990000),

-- Product 38: iPhone 13
(38,4,128,'Midnight',20,18990000),
(38,4,256,'Midnight',12,20990000),
(38,4,512,'Midnight',6,23990000),
(38,4,128,'Pink',18,18990000),
(38,4,256,'Pink',10,20990000),

-- Product 39: iPhone 15 Plus
(39,6,128,'Yellow',20,21990000),
(39,6,256,'Yellow',12,23990000),
(39,6,512,'Yellow',6,26990000),
(39,6,128,'Blue',18,21990000),
(39,6,256,'Blue',10,23990000),

-- Product 40: iPhone 16 Plus
(40,8,128,'White',20,24990000),
(40,8,256,'White',12,26990000),
(40,8,512,'White',6,29990000),
(40,8,128,'Black',18,24990000),
(40,8,256,'Black',10,26990000),

-- Product 41: Samsung Galaxy Z Flip7 FE
(41,8,128,'White',18,24990000),
(41,8,256,'White',12,26990000),
(41,12,256,'White',8,28990000),
(41,8,128,'Black',18,24990000),
(41,12,256,'Black',8,28990000),

-- Product 42: Samsung Galaxy S24 Ultra
(42,12,256,'Titanium Black',15,26990000),
(42,12,512,'Titanium Black',10,29990000),
(42,16,1024,'Titanium Black',5,34990000),
(42,12,256,'Titanium Gray',15,26990000),
(42,12,512,'Titanium Gray',8,29990000),

-- Product 43: Samsung Galaxy A16
(43,6,128,'Black',30,5990000),
(43,8,128,'Black',20,6490000),
(43,8,256,'Black',10,7490000),
(43,6,128,'Green',25,5990000),
(43,8,256,'Green',8,7490000),

-- Product 44: Samsung Galaxy S25 Plus
(44,12,256,'Silver',15,27990000),
(44,12,512,'Silver',10,30990000),
(44,16,512,'Silver',5,33990000),
(44,12,256,'Blue',15,27990000),
(44,12,512,'Blue',8,30990000),

-- Product 45: Samsung Galaxy S23 Ultra
(45,8,256,'Green',15,19990000),
(45,12,256,'Green',12,21990000),
(45,12,512,'Green',8,24990000),
(45,8,256,'Cream',15,19990000),
(45,12,512,'Cream',6,24990000),

-- Product 46: Oppo A5i Pro
(46,8,128,'White',20,5490000),
(46,8,256,'White',12,6290000),
(46,12,256,'White',8,6990000),
(46,8,128,'Black',18,5490000),
(46,8,256,'Black',10,6290000),

-- Product 47: Realme Note 70
(47,4,64,'Blue',30,2990000),
(47,4,128,'Blue',20,3490000),
(47,6,128,'Blue',12,3990000),
(47,4,64,'Black',25,2990000),
(47,6,128,'Black',10,3990000),

-- Product 48: Realme C85
(48,8,128,'Purple',20,4990000),
(48,8,256,'Purple',12,5490000),
(48,12,256,'Purple',8,6490000),
(48,8,128,'Black',18,4990000),
(48,12,256,'Black',8,6490000),

-- Product 49: Red Magic 7S Pro
(49,12,256,'Black',12,16990000),
(49,16,512,'Black',8,18990000),
(49,18,512,'Black',5,20990000),
(49,16,1024,'Transparent',3,23990000),
(49,12,256,'Silver',10,16990000),

-- Product 50: Honor X7d
(50,8,128,'Black',20,6990000),
(50,8,256,'Black',12,7990000),
(50,12,256,'Black',8,8990000),
(50,8,128,'Blue',18,6990000),
(50,12,256,'Blue',6,8990000),

-- Product 51: Honor 400 Pro
(51,8,128,'Gray',15,16990000),
(51,12,256,'Gray',10,18990000),
(51,12,512,'Gray',6,20990000),
(51,8,128,'Black',15,16990000),
(51,12,512,'Black',5,20990000),

-- Product 52: Nothing Phone 1
(52,8,128,'White',20,9990000),
(52,8,256,'White',12,10990000),
(52,12,256,'White',8,11990000),
(52,8,128,'Black',18,9990000),
(52,12,256,'Black',6,11990000),

-- Product 53: Nothing Phone A3 Pro
(53,8,128,'Black',20,12990000),
(53,8,256,'Black',12,13990000),
(53,12,256,'Black',8,14990000),
(53,8,128,'White',18,12990000),
(53,12,256,'White',6,14990000),

-- Product 54: Xiaomi Redmi 14C
(54,6,128,'Blue',30,4290000),
(54,8,128,'Blue',20,4690000),
(54,8,256,'Blue',10,5290000),
(54,6,128,'Black',25,4290000),
(54,8,256,'Black',8,5290000),

-- Product 55: Xiaomi Redmi 15 Pro
(55,6,128,'Purple',20,5490000),
(55,8,256,'Purple',12,6490000),
(55,12,256,'Purple',8,7490000),
(55,6,128,'Black',18,5490000),
(55,12,256,'Black',6,7490000),

-- Product 56: Xiaomi 15T Pro
(56,8,128,'Black',20,18990000),
(56,12,256,'Black',15,20990000),
(56,12,512,'Black',8,22990000),
(56,8,128,'Silver',18,18990000),
(56,12,512,'Silver',6,22990000);
;


select * from products;
select * from images;
select * from attributes;
select * from product_variants;


