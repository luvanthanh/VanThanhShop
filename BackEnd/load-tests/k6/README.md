# K6 load test

Thu muc nay chua kich ban k6 cho `product-service`, `order-service`, va `cart-service`. Cart test dang nhap qua `user-service` de lay token.

## Chuan bi

1. Cai k6: https://k6.io/docs/get-started/installation/
2. Chay cac service can test:
   - `eureka-service`: `http://localhost:8761`
   - `api-gateway`: `http://localhost:8888`
   - `product-service`: `http://localhost:8081`
   - `user-service`: `http://localhost:8082` (dang nhap cho cart test)
   - `cart-service`: `http://localhost:8084`
   - `order-service`: `http://localhost:8085`
3. Mac dinh script goi qua gateway voi base URL `http://localhost:8888/api`.

## Chay load test

```powershell
k6 run .\load-tests\k6\product-service.load.js
k6 run .\load-tests\k6\cart-service.load.js
k6 run .\load-tests\k6\order-service.load.js
```

## Goi truc tiep service (cart test van dang nhap qua gateway)

```powershell
$env:PRODUCT_BASE_URL="http://localhost:8081"; k6 run .\load-tests\k6\product-service.load.js
$env:CART_BASE_URL="http://localhost:8084"; $env:AUTH_BASE_URL="http://localhost:8888/api"; k6 run .\load-tests\k6\cart-service.load.js
$env:ORDER_BASE_URL="http://localhost:8085"; k6 run .\load-tests\k6\order-service.load.js
```

## Bien moi truong huu ich

- `PRODUCT_ID`: product id de test endpoint lay chi tiet, mac dinh `1`.
- `CART_USER_ID`: user id dung cho cart test; mac dinh lay tu tai khoan dang nhap (`USERNAME`/`PASSWORD`).
- `CART_PRODUCT_ID`: product id dung cho thao tac ghi cart, mac dinh `1`.
- `AUTH_BASE_URL`: base URL dung de dang nhap, mac dinh `http://localhost:8888/api` (can khi goi cart-service truc tiep).
- `USERNAME`, `PASSWORD`: tai khoan login user-service, mac dinh `admin/admin`.
- `ORDER_USER_ID`: user id de test endpoint lay order theo user, mac dinh `c5a6ae2f-b48b-4956-a60e-6fb610edf2ba`.
- `ORDER_ID`: neu co gia tri thi script order se test them endpoint lay order details.
- `CART_ID`: cart id dung khi bat create order, mac dinh `1`.
- `ENABLE_WRITES=true`: bat request ghi du lieu (`POST /products/post`, `POST /orders`, va cac thao tac them/sua/xoa item trong cart). Mac dinh tat de tranh tao du lieu khi test. Cart script chi them, sua va xoa san pham neu `CART_PRODUCT_ID` chua co trong cart.

Vi du bat request ghi:

```powershell
$env:ENABLE_WRITES="true"; k6 run .\load-tests\k6\product-service.load.js
```

## Nguong danh gia mac dinh

- Load test: loi HTTP duoi 5%, p95 latency duoi 800ms.

Neu database local yeu hoac du lieu test chua co san, co the can tang nguong latency hoac tao san product/order/user mau truoc khi chay.
