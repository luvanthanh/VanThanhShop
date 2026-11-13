# Văn Thành Shop — Frontend React cho khách hàng

Đây là phiên bản React/Vite của giao diện khách hàng. Bản cũ tại
`FrontEnd/2_FrontEndOfUser` vẫn được giữ nguyên và có thể chạy bằng Live Server.

## Chạy dự án

1. Cài **Node.js bản LTS** từ [nodejs.org](https://nodejs.org/). `npm` được cài
   kèm Node.js. Trong lúc cài, giữ tùy chọn thêm Node.js vào `PATH`.
2. Đóng và mở lại terminal/VS Code, rồi kiểm tra:

   ```powershell
   node -v
   npm -v
   ```

   Nếu `npm` vẫn không được nhận diện, kiểm tra Node.js đã được thêm vào `PATH`
   (thường là `C:\Program Files\nodejs\`) rồi mở terminal mới.
3. Khởi động API Gateway và các backend service cần thiết tại `http://localhost:8888`.
4. Tại thư mục này, cài dependency và chạy Vite:

   ```powershell
   npm install
   npm run dev
   ```

5. Mở URL Vite hiển thị trong terminal (mặc định `http://localhost:5173`).
6. Nếu API Gateway dùng URL khác, tạo file `.env` với
   `VITE_API_BASE_URL=http://dia-chi-gateway`.

API Gateway đã cho phép CORS từ hai origin mặc định của Vite trên cổng `5173`.
Frontend sử dụng các khóa `token`, `userId` và `username` trong local storage
giống bản cũ.

## Các trang

- `/`: trang chủ, tìm kiếm/lọc sản phẩm và phân trang.
- `/phone/:id`: chi tiết sản phẩm và thêm vào giỏ.
- `/cart`: quản lý giỏ hàng và đặt hàng.
- `/login`, `/register`, `/profile`: đăng nhập, đăng ký và thông tin tài khoản.
- `/orders`: lịch sử đơn hàng và chi tiết từng đơn.
- `/news` và `/news/:id`: danh sách tin tức và nội dung bài viết.
- `/about`: giới thiệu cửa hàng và dự án.

Các trang được chia theo feature trong `src/features`; API client, auth provider,
layout dùng chung, hooks, tiện ích, CSS và hình ảnh nằm trong các thư mục riêng
theo cấu trúc React đã thống nhất.
