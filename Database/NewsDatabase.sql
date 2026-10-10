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


INSERT INTO news (
    news_product_id,
    news_name,
    news_title,
    news_create_at,
    news_category,
    news_image_thumbnail
) VALUES
(
    14,
    'iPhone 17 Pro Max chính thức ra mắt',
    'Khám phá iPhone 17 Pro Max với thiết kế mới, camera nâng cấp và hiệu năng mạnh mẽ',
    '2026-01-10 09:00:00',
    'Sản Phẩm Mới',
    'https://cdn.tgdd.vn/Products/Images/42/342676/Slider/iphone-17-pro638949088567223883.jpg'
);

SET @news1 = LAST_INSERT_ID();

INSERT INTO images (news_id, image_url, image_describe) VALUES
(@news1, 'https://cdn.tgdd.vn/Products/Images/42/342676/Slider/iphone-17-pro638949088567223883.jpg', 'Hình ảnh iPhone 17 Pro'),
(@news1, 'https://cdn.tgdd.vn/Products/Images/42/342676/Slider/iphone-17-pro638949088568563906.jpg', 'Góc chụp khác của iPhone 17 Pro');

INSERT INTO contents (news_id, content_name, content_text) VALUES
(@news1, 'Giới thiệu', 'iPhone 17 Pro Max là mẫu điện thoại cao cấp hướng đến người dùng yêu thích công nghệ, chụp ảnh và giải trí. Bài viết giới thiệu thiết kế, màn hình và những điểm nổi bật của sản phẩm.'),
(@news1, 'Camera và hiệu năng', 'Hệ thống camera được thiết kế để hỗ trợ chụp ảnh trong nhiều điều kiện ánh sáng. Hiệu năng mạnh mẽ đáp ứng nhu cầu chơi game, chỉnh sửa video và sử dụng nhiều ứng dụng.'),
(@news1, 'Kết luận', 'iPhone 17 Pro Max là lựa chọn đáng tham khảo cho người dùng đang tìm kiếm một chiếc smartphone cao cấp.');


INSERT INTO news (
    news_product_id, news_name, news_title,
    news_create_at, news_category, news_image_thumbnail
) VALUES (
    37,
    'Samsung Galaxy Z Fold ra mắt',
    'Điện thoại màn hình gập Samsung Galaxy Z Fold mang đến trải nghiệm đa nhiệm tiện lợi',
    '2026-01-15 10:30:00',
    'Công Nghệ',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s25_ultra_-_1_1.png'
);

SET @news2 = LAST_INSERT_ID();

INSERT INTO images (news_id, image_url, image_describe) VALUES
(@news2, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s25_ultra_-_1_1.png', 'Điện thoại Samsung'),
(@news2, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s25_ultra_-_4_1.png', 'Thiết kế mặt lưng Samsung');

INSERT INTO contents (news_id, content_name, content_text) VALUES
(@news2, 'Tổng quan', 'Dòng điện thoại gập Samsung hướng đến người dùng cần màn hình lớn nhưng vẫn muốn một thiết bị có thể mang theo thuận tiện.'),
(@news2, 'Trải nghiệm sử dụng', 'Màn hình mở rộng hỗ trợ đọc tài liệu, xem video và sử dụng nhiều ứng dụng. Người dùng nên tìm hiểu kích thước, dung lượng pin và chính sách bảo hành trước khi mua.');


INSERT INTO news (
    news_product_id, news_name, news_title,
    news_create_at, news_category, news_image_thumbnail
) VALUES (
    27,
    'Xiaomi ra mắt smartphone mới',
    'Smartphone Xiaomi hướng đến hiệu năng cao trong phân khúc tầm trung',
    '2026-02-05 08:15:00',
    'Sản Phẩm Mới',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'
);

SET @news3 = LAST_INSERT_ID();

INSERT INTO images (news_id, image_url, image_describe) VALUES
(@news3, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800', 'Smartphone Xiaomi minh họa'),
(@news3, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800', 'Điện thoại thông minh');

INSERT INTO contents (news_id, content_name, content_text) VALUES
(@news3, 'Thông tin sản phẩm', 'Xiaomi tiếp tục phát triển các dòng smartphone phục vụ nhu cầu học tập, làm việc và giải trí hằng ngày.'),
(@news3, 'Điểm đáng chú ý', 'Khi chọn điện thoại, người dùng nên so sánh bộ xử lý, dung lượng RAM, bộ nhớ trong, camera và thời lượng pin.');


INSERT INTO news (
    news_product_id, news_name, news_title,
    news_create_at, news_category, news_image_thumbnail
) VALUES (
    14,
    'Ưu đãi mua điện thoại đầu năm',
    'Săn ưu đãi smartphone với nhiều lựa chọn phù hợp ngân sách',
    '2026-02-12 14:00:00',
    'Khuyến Mãi',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'
);

SET @news4 = LAST_INSERT_ID();

INSERT INTO images (news_id, image_url, image_describe) VALUES
(@news4, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800', 'Điện thoại trong chương trình ưu đãi');

INSERT INTO contents (news_id, content_name, content_text) VALUES
(@news4, 'Thông tin ưu đãi', 'Đây là nội dung khuyến mãi mẫu dùng để kiểm thử giao diện tin tức. Giá bán và điều kiện ưu đãi cần được cửa hàng xác nhận trước khi công bố.'),
(@news4, 'Lưu ý khi mua hàng', 'Khách hàng nên kiểm tra giá cuối cùng, thời hạn áp dụng, điều kiện bảo hành và chính sách đổi trả.');


INSERT INTO news (
    news_product_id, news_name, news_title,
    news_create_at, news_category, news_image_thumbnail
) VALUES (
    37,
    'Cách chọn điện thoại chơi game',
    'Những tiêu chí cần quan tâm khi chọn smartphone chơi game',
    '2026-03-01 11:20:00',
    'Kinh Nghiệm',
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800'
);

SET @news5 = LAST_INSERT_ID();

INSERT INTO images (news_id, image_url, image_describe) VALUES
(@news5, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800', 'Smartphone dùng để chơi game');

INSERT INTO contents (news_id, content_name, content_text) VALUES
(@news5, 'Bộ xử lý và RAM', 'Bộ xử lý và RAM ảnh hưởng đến khả năng chạy game. Người dùng nên tham khảo yêu cầu phần cứng của trò chơi thường sử dụng.'),
(@news5, 'Màn hình và pin', 'Màn hình có tần số quét cao có thể mang lại trải nghiệm chuyển động mượt hơn trong các trò chơi tương thích. Dung lượng pin và khả năng tản nhiệt cũng rất đáng cân nhắc.');


INSERT INTO news (
    news_product_id, news_name, news_title,
    news_create_at, news_category, news_image_thumbnail
) VALUES (
    27,
    'Hướng dẫn bảo quản điện thoại',
    '5 mẹo giúp điện thoại luôn sạch và hoạt động ổn định',
    '2026-03-10 09:45:00',
    'Mẹo Công Nghệ',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'
);

SET @news6 = LAST_INSERT_ID();

INSERT INTO images (news_id, image_url, image_describe) VALUES
(@news6, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800', 'Điện thoại thông minh');

INSERT INTO contents (news_id, content_name, content_text) VALUES
(@news6, 'Vệ sinh thiết bị', 'Sử dụng khăn mềm phù hợp để vệ sinh điện thoại. Tránh để hơi ẩm lọt vào các cổng kết nối và không sử dụng hóa chất không phù hợp.'),
(@news6, 'Bảo vệ pin', 'Hạn chế để thiết bị trong môi trường nhiệt độ quá cao. Sử dụng bộ sạc tương thích và theo dõi tình trạng pin định kỳ.');


INSERT INTO news (
    news_product_id, news_name, news_title,
    news_create_at, news_category, news_image_thumbnail
) VALUES (
    14,
    'So sánh smartphone Android và iPhone',
    'Nên chọn Android hay iPhone khi mua điện thoại mới?',
    '2026-04-02 16:00:00',
    'Tư Vấn',
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800'
);

SET @news7 = LAST_INSERT_ID();

INSERT INTO images (news_id, image_url, image_describe) VALUES
(@news7, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800', 'Điện thoại thông minh'),
(@news7, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800', 'Thiết bị di động');

INSERT INTO contents (news_id, content_name, content_text) VALUES
(@news7, 'Hệ điều hành', 'Android có nhiều lựa chọn thiết bị và mức giá. iPhone sử dụng hệ sinh thái iOS của Apple. Mỗi nền tảng có ưu điểm riêng tùy theo nhu cầu.'),
(@news7, 'Cách lựa chọn', 'Hãy cân nhắc ngân sách, thời gian hỗ trợ phần mềm, camera, pin, nhu cầu chơi game và những thiết bị bạn đang sử dụng.');


INSERT INTO news (
    news_product_id, news_name, news_title,
    news_create_at, news_category, news_image_thumbnail
) VALUES (
    37,
    'Những điều cần biết về sạc nhanh',
    'Sạc nhanh trên smartphone hoạt động như thế nào?',
    '2026-04-18 08:30:00',
    'Công Nghệ',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'
);

SET @news8 = LAST_INSERT_ID();

INSERT INTO images (news_id, image_url, image_describe) VALUES
(@news8, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800', 'Điện thoại và công nghệ sạc');

INSERT INTO contents (news_id, content_name, content_text) VALUES
(@news8, 'Nguyên lý sạc nhanh', 'Công nghệ sạc nhanh điều chỉnh công suất sạc phù hợp với thiết bị và bộ sạc tương thích. Tốc độ thực tế còn phụ thuộc nhiệt độ và mức pin.'),
(@news8, 'Sử dụng an toàn', 'Nên sử dụng bộ sạc đạt tiêu chuẩn và phụ kiện tương thích. Không sử dụng thiết bị sạc bị hư hỏng.');


INSERT INTO news (
    news_product_id, news_name, news_title,
    news_create_at, news_category, news_image_thumbnail
) VALUES (
    27,
    'Hướng dẫn chọn dung lượng bộ nhớ',
    '128GB, 256GB hay 512GB: nên mua smartphone bao nhiêu bộ nhớ?',
    '2026-05-06 13:10:00',
    'Tư Vấn',
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800'
);

SET @news9 = LAST_INSERT_ID();

INSERT INTO images (news_id, image_url, image_describe) VALUES
(@news9, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800', 'Điện thoại thông minh');

INSERT INTO contents (news_id, content_name, content_text) VALUES
(@news9, 'Nhu cầu lưu trữ', 'Người thường xuyên chụp ảnh, quay video hoặc cài nhiều trò chơi có thể cần dung lượng bộ nhớ lớn hơn.'),
(@news9, 'Gợi ý lựa chọn', 'Hãy ước tính lượng dữ liệu đang sử dụng và cân nhắc khả năng sao lưu trước khi chọn phiên bản bộ nhớ.');


INSERT INTO news (
    news_product_id, news_name, news_title,
    news_create_at, news_category, news_image_thumbnail
) VALUES (
    14,
    'Hướng dẫn mua điện thoại online',
    'Kiểm tra những gì trước khi đặt mua smartphone trực tuyến?',
    '2026-06-20 10:00:00',
    'Kinh Nghiệm',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'
);

SET @news10 = LAST_INSERT_ID();

INSERT INTO images (news_id, image_url, image_describe) VALUES
(@news10, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800', 'Smartphone mua sắm trực tuyến');

INSERT INTO contents (news_id, content_name, content_text) VALUES
(@news10, 'Kiểm tra thông tin', 'Đọc kỹ thông số, phiên bản sản phẩm, nguồn gốc hàng hóa, thời gian giao hàng và chính sách bảo hành trước khi đặt mua.'),
(@news10, 'Sau khi nhận hàng', 'Kiểm tra ngoại hình, phụ kiện và tình trạng hoạt động của sản phẩm. Giữ lại hóa đơn và thông tin đơn hàng để tiện bảo hành.');

 select * from contents;
  select * from images;
  select * from news;
 



