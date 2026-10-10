CREATE DATABASE IF NOT EXISTS NewsDatabase;
USE NewsDatabase;

CREATE TABLE news (
	news_id int auto_increment primary key,
    news_product_id int ,
	news_name VARCHAR(255) NOT NULL,
	news_title VARCHAR(255) NOT NULL,
    news_create_at Datetime,
    news_category VARCHAR(100),
    news_image_thumbnail  VARCHAR(255)
);

create table images(
	image_id int auto_increment primary key,
	news_id int,

	image_url varchar(255) not null,
	image_describe varchar(300),
    foreign key(news_id) references news(news_id) on delete cascade
);

create table contents(
	content_id int auto_increment PRIMARY key,
	news_id int,

	content_name varchar(255),
	content_text text,
	foreign key(news_id) references news(news_id) on delete cascade 
    
);
 
 -- thêm tin tức  
 INSERT INTO news (
    news_product_id,
    news_name,
    news_title,
    news_create_at,
    news_category,
    news_image_thumbnail
)
VALUES
(
    14,
    'Sản phẩm mới của Samsung',
    'Samsung galaxy chính thức giới thiệu Samsung galaxy S25 Ulutra| 8GB 256GB với nhiều đột phá đáng mong đợi 2026',
    '2025-10-15 09:00:00',
    'Công Nghệ',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s25_ultra_-_1_1.png'
),
(
    37,
    'Samsung Galaxy Z Fold6 ra mắt',
    'Galaxy Z Fold6 – màn hình gập mỏng nhất từ trước đến nay',
    '2025-08-20 10:30:00',
    'Sản Phẩm Mới',
    'https://cdn-media.sforum.vn/storage/app/media/nhuy/nhuy/Nhu-Y/ipad-pro-m5-antutu-3.jpg'
),
(
    27,
    'Giảm giá sốc mùa lễ hội',
    'Chương trình khuyến mãi cực lớn tại hệ thống cửa hàng',
    '2025-12-01 08:00:00',
    'Khuyến Mãi',
    'https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/8f/04/8f0489b955b6830ca76cf81d88c637b1.png'
);

INSERT INTO images (news_id, image_url, image_describe)
VALUES
-- News 1
(
    1,
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s25_ultra_-_1_1.png',
    'Hình ảnh mặt trước Samsung Galaxy S25 Ultra'
),
(
    1,
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s25_ultra_-_4_1.png',
    'Thiết kế mặt lưng Samsung Galaxy S25 Ultra'
),
(
    1,
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s25_ultra_-_5_1.png',
    'Góc nghiêng Samsung Galaxy S25 Ultra'
),

-- News 2
(
    2,
    'https://cdn-media.sforum.vn/storage/app/media/nhuy/nhuy/Nhu-Y/ipad-pro-m5-antutu-2.jpg',
    'Hình ảnh iPad Pro M5'
),
(
    2,
    'https://cdn-media.sforum.vn/storage/app/media/nhuy/nhuy/Nhu-Y/ipad-pro-m5-antutu-6.jpg',
    'Hiệu năng iPad Pro M5'
),
(
    2,
    'https://cdn-media.sforum.vn/storage/app/media/nhuy/nhuy/Nhu-Y/ipad-pro-m5-antutu-3.jpg',
    'Thiết kế iPad Pro M5'
),

-- News 3
(
    3,
    'https://cdn.tgdd.vn/Products/Images/42/342676/Slider/iphone-17-pro638949088567223883.jpg',
    'Hình ảnh iPhone 17'
),
(
    3,
    'https://cdn.tgdd.vn/Products/Images/42/342676/Slider/iphone-17-pro638949088568563906.jpg',
    'Thiết kế iPhone 17'
),
(
    3,
    'https://cdn.tgdd.vn/Products/Images/42/342676/Slider/iphone-17-pro638949088563833831.jpg',
    'Các phiên bản màu của iPhone 17'
);

INSERT INTO contents (news_id, content_name, content_text)
VALUES
(
1,
'Giới thiệu',
'Apple vừa ra mắt iPhone 17 Pro Max với thiết kế mới sang trọng cùng chip A19 Bionic mạnh mẽ. Bạn đang tìm kiếm một chiếc điện thoại vừa mạnh mẽ, vừa thông minh và thời thượng? Samsung Galaxy S25 FE chính là lựa chọn hoàn hảo dành cho bạn! Với mức giá ưu đãi chỉ từ 14.39 triệu đồng, bạn đã có thể sở hữu siêu phẩm mới nhất đến từ thương hiệu hàng đầu Samsung. Đặc biệt, khi mua Galaxy S25 FE, bạn sẽ được tặng ngay gói Google AI Pro trị giá 3 triệu đồng giúp trải nghiệm trí tuệ nhân tạo đột phá, cùng trợ giá lên đời 1 triệu đồng để dễ dàng đổi sang chiếc điện thoại mơ ước. Chưa dừng lại ở đó, học sinh và sinh viên còn được giảm thêm 7% (tối đa 700.000 đồng) – một ưu đãi vô cùng hấp dẫn dành riêng cho giới trẻ năng động. Galaxy S25 FE không chỉ sở hữu thiết kế sang trọng, camera chuyên nghiệp và hiệu năng vượt trội, mà còn mang đến những tính năng thông minh giúp bạn làm việc, giải trí và sáng tạo mọi lúc mọi nơi. Với chương trình ưu đãi có giới hạn, đừng bỏ lỡ cơ hội sở hữu chiếc Galaxy S25 FE với mức giá cực kỳ hấp dẫn. Hãy nhanh tay mua ngay hôm nay để trải nghiệm công nghệ đỉnh cao cùng hàng loạt quà tặng giá trị từ Samsung!'
),

(
1,
'Màn hình & Hiệu năng',
'Máy được trang bị màn hình Super Retina XDR cùng công nghệ ProMotion 120Hz. Samsung Galaxy S25 Ultra – siêu phẩm mới từ Samsung, mang đến trải nghiệm đẳng cấp và hiệu năng vượt trội. Máy được trang bị camera 200MP siêu sắc nét, cho phép ghi lại từng chi tiết sống động trong mọi điều kiện ánh sáng. Hiệu năng mạnh mẽ đến từ chip Snapdragon 8 Lite for Galaxy, giúp xử lý mượt mà mọi tác vụ. Màn hình Dynamic AMOLED 2X 6.9 inch hiển thị rực rỡ, cùng pin 5000mAh bền bỉ, mang đến trải nghiệm trọn vẹn suốt cả ngày. Đặc biệt, Galaxy S25 Ultra tích hợp Galaxy AI thông minh, hỗ trợ dịch trực tiếp, khoanh tròn để tìm kiếm và ghi chú nhanh chóng với S Pen. Thiết kế Titan sang trọng, độ bền chuẩn IP68 chống nước – chống bụi, khiến S25 Ultra trở thành biểu tượng của phong cách và công nghệ. Hãy sở hữu ngay Galaxy S25 Ultra để chạm đến đỉnh cao trải nghiệm di động!'
),

(
1,
'Camera',
'Camera cải tiến với khả năng zoom quang học 10x và quay video 8K.'
),

(
1,
'Kết luận',
'iPhone 17 Pro Max hứa hẹn sẽ là chiếc smartphone cao cấp đáng mong đợi nhất năm 2025. Samsung Galaxy S25 Ultra – chinh phục mọi bức ảnh với hệ thống camera đỉnh cao. Trang bị camera 200MP siêu sắc nét cùng công nghệ AI ProVisual Engine, chiếc điện thoại mang đến khả năng xử lý hình ảnh chuyên nghiệp trong mọi điều kiện. Với các tính năng vượt trội như Expert RAW và Space Zoom, Galaxy S25 Ultra giúp bạn ghi lại từng chi tiết từ cận cảnh đến xa xôi với độ rõ nét ấn tượng. Mỗi bức ảnh đều trở nên sống động, chân thực và đầy cảm xúc. Galaxy S25 Ultra – nâng tầm nhiếp ảnh di động, nơi mọi khoảnh khắc đều trở thành kiệt tác!'
);

INSERT INTO contents (news_id, content_name, content_text)
VALUES
(
2,
'Giới thiệu',
'iPad Pro mới – biểu tượng của sức mạnh và công nghệ tiên tiến. Với hiệu năng AI đột phá, iPad Pro mang đến khả năng xử lý vượt trội, giúp bạn sáng tạo, làm việc và giải trí mượt mà hơn bao giờ hết. Thiết kế mỏng nhẹ, sang trọng cùng màn hình sắc nét tạo nên trải nghiệm hoàn hảo trong từng chi tiết. Đây không chỉ là một chiếc máy tính bảng, mà là công cụ mạnh mẽ thay đổi cách bạn làm việc và học tập. Hãy đăng ký nhận tin ngay hôm nay để không bỏ lỡ những cập nhật mới nhất về iPad Pro!'
),

(
2,
'Hiệu năng',
'Màn hình chính 7.6 inch AMOLED 2X cho trải nghiệm giải trí sống động. iPad Pro M5 đạt tổng điểm 3,155,649 trong bài kiểm tra hiệu năng AnTuTu Benchmark 10, một con số cực kỳ ấn tượng, cho thấy Apple M5 không chỉ mạnh mà còn đang định nghĩa lại hiệu năng trên tablet.'
),

(
2,
'Cấu hình',
'Snapdragon 8 Gen 4 mang lại hiệu năng vượt trội, hỗ trợ AI tối ưu cho chụp ảnh và đa nhiệm.'
),

(
2,
'Thời gian mở bán',
'Sản phẩm chính thức mở bán tại Việt Nam vào tháng 11 năm 2025.'
);
INSERT INTO contents (news_id, content_name, content_text)
VALUES
(
3,
'Giới thiệu',
'Chào đón mùa lễ hội, hàng loạt sản phẩm smartphone giảm giá lên đến 30%. iPhone 17 là mẫu iPhone tiêu chuẩn của năm 2025 được xem là giá trị tốt nhất trong dòng flagship với nhiều nâng cấp mạnh mẽ như màn hình 120Hz, camera 48MP kép và chip A19 nhưng vẫn giữ mức giá hợp lý.'
),

(
3,
'Chương trình ưu đãi',
'Các thương hiệu tham gia gồm Apple, Samsung, Xiaomi và Oppo.'
),

(
3,
'Thiết kế',
'Kích thước khoảng 149,6 mm × 71,5 mm × 7,95 mm, cân nặng khoảng 177 g. Máy có các màu Black, White, Mist Blue, Sage và Lavender.'
),

(
3,
'Kết luận',
'Chương trình kéo dài đến hết ngày 31/12/2025, đừng bỏ lỡ! iPhone 17 mang đến chip A19 mạnh mẽ cùng trí tuệ nhân tạo AI thế hệ mới, màn hình Super Retina XDR 120Hz sắc nét và camera kép 48MP. Thiết kế mỏng nhẹ, sang trọng cùng màu sắc tinh tế giúp iPhone 17 trở thành lựa chọn hấp dẫn cho người dùng yêu thích công nghệ.'
);

 select * from contents;
  select * from images;
  select * from news;
 



