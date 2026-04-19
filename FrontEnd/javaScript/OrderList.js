const userId = localStorage.getItem("userId");

if (!userId) {
    alert("Bạn cần đăng nhập để xem đơn hàng!");
    window.location.href = "LoginClient.html";
} else {

    fetch(`http://localhost:8888/api/orders/getOrderByUserId/${userId}`)
        .then(res => res.json())
        .then(response => {

            const orders = response.data; // QUAN TRỌNG

            const orderListDiv = document.getElementById("order_list");
            orderListDiv.innerHTML = "";

            if (!orders || orders.length === 0) {
                orderListDiv.innerHTML = "<p>Chưa có đơn hàng nào.</p>";
                return;
            }

            orders.forEach(order => {

                const orderDiv = document.createElement("div");
                orderDiv.style.border = "1px solid #ccc";
                orderDiv.style.padding = "10px";
                orderDiv.style.marginBottom = "10px";

                orderDiv.innerHTML = `
                    <div>
                        <strong>Order ID:</strong> ${order.orderId}
                    </div>
                    <div><strong>Customer:</strong> ${order.customerName}</div>
                    <div><strong>Total:</strong> ${order.totalMoney} VND</div>

                    <div id="details-${order.orderId}">
                        <p>Đang tải chi tiết...</p>
                    </div>
                `;

                orderListDiv.appendChild(orderDiv);

                // 👉 gọi API chi tiết
                fetch(`http://localhost:8888/api/orders/${order.orderId}/details`)
                    .then(res => res.json())
                    .then(detailRes => {

                        const details = detailRes.data;
                        const detailsDiv = document.getElementById(`details-${order.orderId}`);

                        if (!details || details.length === 0) {
                            detailsDiv.innerHTML = "<p>Không có sản phẩm</p>";
                            return;
                        }

                        let html = "<h4>Chi tiết:</h4>";

                        details.forEach(item => {
                            html += `
                                <div style="border-top:1px solid #eee; padding:10px">
                                    <img src="${item.productImage}" width="80"/>
                                    <div>${item.productName}</div>
                                    <div>SL: ${item.productQuantity}</div>
                                    <div>Giá: ${item.productPrice}</div>
                                    <div>Tổng: ${item.productTotalPrice}</div>
                                </div>
                            `;
                        });

                        detailsDiv.innerHTML = html;

                    });

            });

        })
        .catch(err => {
            console.error("Lỗi:", err);
        });
}