
CREATE DATABASE IF NOT EXISTS UserDatabase
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
    
USE UserDatabase;


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
);

INSERT INTO users (
    user_name,
    user_password,
    user_first_name,
    user_last_name,
    user_address,
    user_email,
    user_phone_number,
    roles
) VALUES
('thanh01', '123456', 'Văn', 'Thành', 'Cầu Giấy, Hà Nội', 'thanh01@gmail.com', '0901234001', 'USER'),
('nguyenminh', '123456', 'Minh', 'Nguyễn', 'Đống Đa, Hà Nội', 'nguyenminh@gmail.com', '0901234002', 'USER'),
('hoanganh', '123456', 'Anh', 'Hoàng', 'Ba Đình, Hà Nội', 'hoanganh@gmail.com', '0901234003', 'USER'),
('linhpham', '123456', 'Linh', 'Phạm', 'Thanh Xuân, Hà Nội', 'linhpham@gmail.com', '0901234004', 'USER'),
('quanghuy', '123456', 'Huy', 'Quang', 'Hà Đông, Hà Nội', 'quanghuy@gmail.com', '0901234005', 'USER'),
('tuananh', '123456', 'Tuấn', 'Anh', 'Long Biên, Hà Nội', 'tuananh@gmail.com', '0901234006', 'USER'),
('minhchau', '123456', 'Châu', 'Minh', 'Nam Từ Liêm, Hà Nội', 'minhchau@gmail.com', '0901234007', 'USER'),
('huongly', '123456', 'Ly', 'Hương', 'Bắc Từ Liêm, Hà Nội', 'huongly@gmail.com', '0901234008', 'USER'),
('ducmanh', '123456', 'Mạnh', 'Đức', 'Hai Bà Trưng, Hà Nội', 'ducmanh@gmail.com', '0901234009', 'USER'),
('thuyduong', '123456', 'Dương', 'Thúy', 'Hoàng Mai, Hà Nội', 'thuyduong@gmail.com', '0901234010', 'USER'),
('vietanh', '123456', 'Anh', 'Việt', 'Hải Châu, Đà Nẵng', 'vietanh@gmail.com', '0901234011', 'USER'),
('baongoc', '123456', 'Ngọc', 'Bảo', 'Ninh Kiều, Cần Thơ', 'baongoc@gmail.com', '0901234012', 'USER'),
('hoanglong', '123456', 'Long', 'Hoàng', 'Thủ Đức, TP. Hồ Chí Minh', 'hoanglong@gmail.com', '0901234013', 'USER'),
('kimngan', '123456', 'Ngân', 'Kim', 'Quận 7, TP. Hồ Chí Minh', 'kimngan@gmail.com', '0901234014', 'USER'),
('trungkien', '123456', 'Kiên', 'Trung', 'Biên Hòa, Đồng Nai', 'trungkien@gmail.com', '0901234015', 'USER'),
('nhatnam', '123456', 'Nam', 'Nhật', 'Hạ Long, Quảng Ninh', 'nhatnam@gmail.com', '0901234016', 'USER'),
('thanhha', '123456', 'Hà', 'Thanh', 'Vinh, Nghệ An', 'thanhha@gmail.com', '0901234017', 'USER'),
('phuongthao', '123456', 'Thảo', 'Phương', 'Huế, Thừa Thiên Huế', 'phuongthao@gmail.com', '0901234018', 'USER'),
('dinhkhoa', '123456', 'Khoa', 'Đinh', 'Quy Nhơn, Bình Định', 'dinhkhoa@gmail.com', '0901234019', 'USER'),
('ngocson', '123456', 'Sơn', 'Ngọc', 'Thủ Dầu Một, Bình Dương', 'ngocson@gmail.com', '0901234020', 'USER'),
('ngocmai', '123456', 'Mai', 'Ngọc', 'Cầu Giấy, Hà Nội', 'ngocmai@gmail.com', '0901234023', 'USER'),
('trongnghia', '123456', 'Nghĩa', 'Trọng', 'Đà Lạt, Lâm Đồng', 'trongnghia@gmail.com', '0901234024', 'USER'),
('thanhtruc', '123456', 'Trúc', 'Thanh', 'Vũng Tàu, TP. Hồ Chí Minh', 'thanhtruc@gmail.com', '0901234025', 'USER'),
('minhquan', '123456', 'Quân', 'Minh', 'Bắc Ninh', 'minhquan@gmail.com', '0901234026', 'USER'),
('hoamy', '123456', 'My', 'Hoa', 'Hải Phòng', 'hoamy@gmail.com', '0901234027', 'USER'),
('tiendat', '123456', 'Đạt', 'Tiến', 'Thanh Hóa', 'tiendat@gmail.com', '0901234028', 'USER'),
('nhuquynh', '123456', 'Quỳnh', 'Như', 'Nam Định', 'nhuquynh@gmail.com', '0901234029', 'USER'),
('baokhanh', '123456', 'Khánh', 'Bảo', 'Thái Nguyên', 'baokhanh@gmail.com', '0901234030', 'USER');

select * from invalidated_token;
select * from users;




