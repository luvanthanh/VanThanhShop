# Hướng dẫn chạy dự án VanThanhShop

### Bước 1: Cài đặt môi trường

- Cài đặt Git: https://git-scm.com/
- Cài đặt Docker Desktop: https://www.docker.com/products/docker-desktop/
- Mở Docker Desktop và chờ Docker khởi động hoàn tất.

### Bước 2: Clone dự án

Mở Terminal hoặc PowerShell và chạy:

```bash
git clone https://github.com/luvanthanh/VanThanhShop.git
```

Di chuyển vào thư mục dự án:

```bash
cd VanThanhShop
```

### Bước 3: Cấu hình môi trường

Nếu dự án có file `.env.example`, tạo file `.env` bằng lệnh:

```powershell
Copy-Item .env.example .env
```

Mở file `.env` và điền các thông tin cấu hình cần thiết.

### Bước 4: Chạy dự án bằng Docker

Tại thư mục chứa file `docker-compose.yml`, chạy:

```bash
docker compose up -d --build
```

Chờ Docker build và khởi động các service.

Kiểm tra trạng thái:

```bash
docker compose ps
```

### Bước 5: Truy cập dự án

- Eureka Dashboard: http://localhost:8761
- API Gateway: http://localhost:8888
- MySQL: `localhost:3333`

Giao diện cũ: mở `FrontEnd/2_FrontEndOfUser/html/Home.html` bằng **Live Server** trong VS Code.

Giao diện React: vào `FrontEnd/3_FrontEndOfUserReact`, chạy `npm install` rồi `npm run dev`. Hướng dẫn chi tiết có trong [README của frontend React](FrontEnd/3_FrontEndOfUserReact/README.md).

### Bước 6: Dừng dự án

Dừng các container nhưng giữ nguyên dữ liệu database:

```bash
docker compose stop
```

Khởi động lại dự án:

```bash
docker compose start
```

Nếu muốn dừng và xóa các container:

```bash
docker compose down
```

**Lưu ý:** Không sử dụng `docker compose down -v` nếu chưa sao lưu dữ liệu database.
