# K6 load test and stress test

Thu muc nay chua kich ban k6 cho `product-service`, `user-service`, va `order-service`.

## Chuan bi

1. Cai k6: https://k6.io/docs/get-started/installation/
2. Chay cac service can test:
   - `eureka-service`: `http://localhost:8761`
   - `api-gateway`: `http://localhost:8888`
   - `product-service`: `http://localhost:8081`
   - `user-service`: `http://localhost:8082`
   - `order-service`: `http://localhost:8085`
3. Mac dinh script goi qua gateway voi base URL `http://localhost:8888/api`.

## Chay load test

```powershell
k6 run .\load-tests\k6\product-service.load.js
k6 run .\load-tests\k6\user-service.load.js
k6 run .\load-tests\k6\order-service.load.js
```

## Chay stress test

```powershell
k6 run .\load-tests\k6\product-service.stress.js
k6 run .\load-tests\k6\user-service.stress.js
k6 run .\load-tests\k6\order-service.stress.js
```

## Goi truc tiep service, khong qua gateway

```powershell
$env:PRODUCT_BASE_URL="http://localhost:8081"; k6 run .\load-tests\k6\product-service.load.js
$env:USER_BASE_URL="http://localhost:8082"; k6 run .\load-tests\k6\user-service.load.js
$env:ORDER_BASE_URL="http://localhost:8085"; k6 run .\load-tests\k6\order-service.load.js
```

## Bien moi truong huu ich

- `PRODUCT_ID`: product id de test endpoint lay chi tiet, mac dinh `1`.
- `USERNAME`, `PASSWORD`: tai khoan login user-service, mac dinh `admin/admin`.
- `ORDER_USER_ID`: user id de test endpoint lay order theo user, mac dinh `admin`.
- `ORDER_ID`: neu co gia tri thi script order se test them endpoint lay order details.
- `CART_ID`: cart id dung khi bat create order, mac dinh `1`.
- `ENABLE_WRITES=true`: bat request ghi du lieu (`POST /products`, `POST /users`, `POST /orders`). Mac dinh tat de tranh tao nhieu du lieu khi stress test.

Vi du bat request ghi:

```powershell
$env:ENABLE_WRITES="true"; k6 run .\load-tests\k6\product-service.load.js
```

## Nguong danh gia mac dinh

- Load test: loi HTTP duoi 5%, p95 latency duoi 800ms.
- Stress test: loi HTTP duoi 10%, p95 latency duoi 1500ms.

Neu database local yeu hoac du lieu test chua co san, co the can tang nguong latency hoac tao san product/order/user mau truoc khi chay.
