# VAN THANH SHOP — Admin

Giao diện quản trị dùng HTML, CSS và JavaScript thuần. Không cần cài dependency frontend.

## Chạy thử

1. Khởi động API Gateway và các microservice cần dùng tại `http://localhost:8888`.
2. Mở thư mục `FrontEnd/1_FrontEndOfAdmin` trong VS Code.
3. Dùng Live Server mở `html/LoginAdmin.html` (mặc định Live Server chạy ở cổng 5500).
4. Đăng nhập bằng tài khoản có role `ADMIN`. JWT được kiểm tra bằng `/api/users/auth/introspect` trước khi lưu vào `localStorage`.

Không mở trang bằng `file://`: các trang dùng JavaScript ES modules và cần được phục vụ qua HTTP. API Gateway phải cho phép CORS từ origin Live Server.

## Các trang

- `html/dashboard.html`: số sản phẩm, người dùng, đơn hàng, tổng `totalMoney`, biểu đồ 6 tháng và tồn kho thấp; tất cả đều tính từ API.
- `html/products.html`: tìm kiếm/lọc/phân trang/sắp xếp, chi tiết và CRUD sản phẩm.
- `html/users.html`: tìm kiếm/phân trang, chi tiết, sửa và xóa có xác nhận; tự xóa tài khoản đang đăng nhập bị chặn ở giao diện.
- `html/orders.html`: tìm kiếm/lọc/phân trang, chi tiết đơn và sản phẩm.
- `html/news.html`: tìm kiếm/lọc/phân trang, CRUD bài viết và xem trước nội dung.
- `html/profile.html`: xem hồ sơ `/api/users/myInfo`, cập nhật thông tin và đăng xuất.

Các request dùng chung qua `javascript/api.js`. Token được gửi bằng `Authorization: Bearer <token>`; lỗi HTTP được hiển thị thay vì giả lập dữ liệu thành công.

## Endpoint đang dùng

| Chức năng | Endpoint hiện có |
| --- | --- |
| Đăng nhập / kiểm tra / đăng xuất | `POST /api/users/auth/login`, `POST /api/users/auth/introspect`, `POST /api/users/auth/logout` |
| Danh sách, chi tiết và CRUD sản phẩm | `GET /api/products`, `GET /api/products/id/{productId}`, `POST /api/products/post`, `PUT /api/products/update/{productId}`, `DELETE /api/products/delete/{productId}` |
| Danh sách và hồ sơ người dùng | `GET /api/users`, `GET /api/users/myInfo` |
| Cập nhật / xóa người dùng | `PUT /api/users/{userId}`, `DELETE /api/users/{userId}` (Gateway hiện chưa cấp quyền PUT cho endpoint này) |
| Danh sách / chi tiết đơn hàng | `GET /api/orders`, `GET /api/orders/{orderId}/details` |
| Tin tức | `GET /api/news`, `POST /api/news/post`, `PUT /api/news/update/{newsId}`, `DELETE /api/news/delete/{newsId}` |

## Giới hạn cần backend bổ sung hoặc xác nhận

- `../../BackEnd/api-gateway/src/main/java/Myproject/Api_getWay/configuration/SecurityConfig.java`: thêm quy tắc PUT cho `/api/users/{userId}` nếu cho phép Admin sửa hồ sơ người dùng/Admin. Controller có PUT nhưng Gateway hiện không đưa route vào nhóm `SECURITY_PUT_ENDPOINTS`.
- `UserUpdateRequest` không nhận trường `roles`; giao diện chỉ xem role, không giả vờ hỗ trợ đổi USER/ADMIN. Trước khi mở PUT ở Gateway, cần xác nhận cách `UserMapper.toUpdateUser` xử lý `userPassword` null để sửa thông tin cá nhân không vô tình xóa mật khẩu hiện có.
- Backend chưa có endpoint cập nhật trạng thái đơn hàng; giao diện chỉ hiển thị `order_status`.
- Dashboard chỉ cộng `totalMoney` của mọi đơn để báo giá trị đơn hàng; chưa có dữ liệu tổng doanh thu đã thanh toán hoặc bộ lọc trạng thái thanh toán.
- Không hiển thị nút xóa đơn hàng: controller hiện khai báo `@DeleteMapping("/orderId")` nhưng yêu cầu tham số `orderId` từ path, trong khi Gateway lại bảo vệ `/api/orders/{orderId}`. Cần thống nhất route ở backend trước khi bật thao tác này.
- Upload ảnh chưa có endpoint: giao diện nhận URL ảnh và gửi các thuộc tính đúng cấu trúc request hiện có.
- Gateway đang cho phép truy cập danh sách sản phẩm và tin tức không cần xác thực (theo `PUBLIC_GET_ENDPOINTS`); các thao tác ghi được bảo vệ bởi role ADMIN.
- `GET /api/users` trả về entity `User` có trường `userPassword`; giao diện tuyệt đối không hiển thị trường này, nhưng backend nên trả DTO an toàn chỉ có các trường công khai.

Frontend kiểm tra role trong JWT để chặn điều hướng thông thường, nhưng mọi quyền truy cập vẫn phải được kiểm tra ở backend/Gateway.
