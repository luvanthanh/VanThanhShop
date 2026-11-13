# VanThanhShop

Hướng dẫn clone, cấu hình và chạy toàn bộ dự án trên Windows bằng PowerShell.
Backend chạy trong Docker; frontend khách hàng React chạy bằng Vite.

## 1. Cài công cụ cần thiết

Cài đặt:

- [Git for Windows](https://git-scm.com/download/win)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) và khởi động Docker Desktop
- [Node.js LTS](https://nodejs.org/en/download) (npm được cài kèm Node.js)

Mở terminal mới sau khi cài và kiểm tra:

```powershell
git --version
docker --version
docker compose version
node -v
npm -v
```

Nếu `node` hoặc `npm` chưa được nhận diện, đóng/mở lại terminal hoặc VS Code để cập nhật `PATH`.

## 2. Clone dự án

Mở PowerShell tại thư mục muốn lưu dự án, ví dụ:

```powershell
cd D:\ProjectInCV\Project1
git clone https://github.com/luvanthanh/VanThanhShop.git
cd VanThanhShop
```

Các lệnh Docker ở những bước sau cần chạy từ thư mục `VanThanhShop`, nơi có file `docker-compose.yml`.

## 3. Tạo cấu hình môi trường cho Docker

Repo không kèm file `.env.example`. Tạo file `.env` ở thư mục gốc bằng PowerShell:

```powershell
'MYSQL_ROOT_PASSWORD=123456' | Set-Content -Encoding ascii .env
```

Đây là mật khẩu MySQL local mà các backend service hiện được cấu hình sử dụng. Chỉ dùng cấu hình này cho môi trường phát triển trên máy cá nhân; không đưa thông tin xác thực thật lên Git.

## 4. Khởi động backend

Đảm bảo Docker Desktop đang chạy, sau đó tại thư mục gốc dự án chạy:

```powershell
docker compose up -d --build
```

Kiểm tra trạng thái các container:

```powershell
docker compose ps
```

Đợi các service ở trạng thái `Up`. Nếu service chưa khởi động thành công, xem log bằng:

```powershell
docker compose logs --tail 100
```

Các địa chỉ local:

- Eureka Dashboard: http://localhost:8761
- API Gateway: http://localhost:8888
- MySQL: `localhost:3333`

## 5. Cài và chạy frontend React

Mở **terminal thứ hai** trong VS Code hoặc PowerShell; giữ nguyên terminal dùng cho Docker. Chạy:

```powershell
cd D:\ProjectInCV\Project1\VanThanhShop\FrontEnd\3_FrontEndOfUserReact
npm install
npm run dev
```

`npm install` chỉ cần chạy lần đầu hoặc sau khi dependency thay đổi. Mở URL Vite hiện trong terminal, thường là http://localhost:5173.

Không mở `index.html` bằng Live Server để chạy React. Nếu cổng `5173` đang được sử dụng, Vite có thể chọn cổng khác; API Gateway hiện cho phép CORS từ `localhost:5173` và `127.0.0.1:5173`, vì vậy dùng đúng cổng `5173`.

### Frontend HTML/JavaScript cũ (tùy chọn)

Muốn chạy giao diện cũ thay vì React, mở `FrontEnd/2_FrontEndOfUser/html/Home.html` bằng Live Server trong VS Code.

## 6. Dừng và khởi động lại

- Dừng frontend React: nhấn `Ctrl+C` trong terminal đang chạy Vite.
- Dừng backend nhưng giữ dữ liệu database:

  ```powershell
  cd D:\ProjectInCV\Project1\VanThanhShop
  docker compose stop
  ```

- Khởi động lại các container đã dừng:

  ```powershell
  docker compose start
  ```

- Dừng và xóa container/network (dữ liệu database trong volume vẫn được giữ):

  ```powershell
  docker compose down
  ```

Không chạy `docker compose down -v` nếu chưa muốn xóa volume database và dữ liệu bên trong.
