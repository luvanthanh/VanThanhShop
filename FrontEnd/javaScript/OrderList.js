const userId = localStorage.getItem("userId");
const cartId = localStorage.getItem("cartId");
if (!userId) {
    alert("Bạn cần đăng nhập để xem đơn hàng!");
    window.location.href = "LoginClient.html";
} else {
    fetch(`http://localhost:8888/api/orders/getOrderByUserId/${userId}`)
        .then(res => res.json())
        .then(orders => {
            const orderListDiv = document.getElementById("order_list");
            orderListDiv.innerHTML = ""; // xóa nội dung cũ nếu có

            if (orders.length === 0) {
                orderListDiv.innerHTML = "<p>Chưa có đơn hàng nào.</p>";
                return;
            }

            orders.forEach(order => {
                const orderDiv = document.createElement("div");
                orderDiv.style.border = "1px solid #ccc";
                orderDiv.style.padding = "10px";
                orderDiv.style.marginBottom = "10px";

                orderDiv.innerHTML = `
                <div class = "order-table">
                    <div class="order-id"><strong>Order ID:</strong> ${order.orderId}</div>
                    <div class="order-shopAddress" ><strong>Shop Address:</strong> ${order.shopAddress}</div>
                    <div class="order-userName"><strong>Customer Name:</strong> ${order.customerName}</div>
                    <div class="order-address"><strong>Delivery Address:</strong> ${order.deliveryAddress}</div>
                    <div class="order-"><strong>Phone:</strong> ${order.customerPhoneNumber}</div>
                    <div><strong>Note:</strong> ${order.note || "-"}</div>
                    <div><strong>Payment Method:</strong> ${order.paymentMethod || "-"}</div>
                    <div><strong>Total Money:</strong> ${order.totalMoney || 0} VND</div>
                </div>
                `;

                orderListDiv.appendChild(orderDiv);
            });
        })
        .catch(err => {
            console.error("Lỗi khi lấy đơn hàng:", err);
        });
}

fetch(`http://localhost:8888/api/carts/${cartId}/cartItems`)
    .then(res => res.json())
    .then(async cartItems => {
        const orderListDiv = document.getElementById("list_items");
        orderListDiv.innerHTML = "<h3>Items in Cart:</h3>";

        for (let item of cartItems) {
            // Gọi API lấy product theo productId
            const product = await fetch(`http://localhost:8888/api/products/getProductById/${item.productId}`)
                .then(res => res.json())
                .catch(err => {
                    console.error("Lỗi lấy product:", err);
                    return null;
                });

            const itemDiv = document.createElement("div");
            itemDiv.style.borderTop = "1px solid #eee";
            itemDiv.style.padding = "10px 0";

            // Nếu lấy được product
            if (product) {
                itemDiv.innerHTML = `
                    <div class="list-items">
                    <div><strong>Product Image:</strong><img src="${product.productImageUrl}" alt="Product Image" style="width: 80px; height: 80px; object-fit: cover; margin-left: 10px;"></div>
                    <div><strong>Product Name:</strong> ${product.productName}</div>
                    <div><strong>Price:</strong> ${product.productPrice} VND</div>
                    <div><strong>Quantity:</strong> ${item.quantity}</div>
                    <div><strong>Total:</strong> ${product.productPrice * item.quantity} VND</div>
                    </div>
                `;
            }
            else {
                // Nếu product bị lỗi / không tìm thấy
                itemDiv.innerHTML = `
                    <div><strong>Product ID:</strong> ${item.productId}</div>
                    <div style="color:red;">Không lấy được thông tin sản phẩm.</div>
                    <div><strong>Quantity:</strong> ${item.quantity}</div>
                `;
            }

            orderListDiv.appendChild(itemDiv);
        }
    })
    .catch(err => {
        console.error("Lỗi khi lấy chi tiết giỏ hàng:", err);
    });


