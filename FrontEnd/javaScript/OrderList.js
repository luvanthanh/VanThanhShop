const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

if (!userId || !token) {
    alert("Bạn cần đăng nhập để xem đơn hàng!");
    window.location.href = "LoginClient.html";
} else {
    fetch(`http://localhost:8888/api/orders/${userId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }
            return res.json();
        })
        .then(response => {
            const orders = response.data;
            const orderListDiv = document.getElementById("order_list");
            orderListDiv.innerHTML = "";

            if (!orders || orders.length === 0) {
                orderListDiv.innerHTML = "<p>Chưa có đơn hàng nào.</p>";
                return;
            }

            orders.forEach(order => {
                const orderDiv = document.createElement("div");
                orderDiv.style.border = "1px solid #ccc";
                orderDiv.style.padding = "12px";
                orderDiv.style.marginBottom = "12px";
                orderDiv.style.borderRadius = "8px";
                orderDiv.style.background = "#fff";

                const detailDiv = document.createElement("div");
                detailDiv.id = `details-${order.orderId}`;
                detailDiv.style.display = "none";
                detailDiv.style.marginTop = "10px";

                const summaryHtml = `
                    <div><strong>Mã đơn hàng:</strong> ${order.orderId}</div>
                    <div><strong>Khách hàng:</strong> ${order.customerName}</div>
                    <div><strong>Tổng tiền:</strong> ${order.totalMoney} VND</div>
                `;

                const toggleBtn = document.createElement("button");
                toggleBtn.type = "button";
                toggleBtn.textContent = "Xem chi tiết";
                toggleBtn.style.marginTop = "10px";
                toggleBtn.style.cursor = "pointer";

                let loaded = false;

                toggleBtn.addEventListener("click", () => {
                    const isVisible = detailDiv.style.display !== "none";

                    if (isVisible) {
                        detailDiv.style.display = "none";
                        toggleBtn.textContent = "Xem chi tiết";
                        return;
                    }

                    detailDiv.style.display = "block";
                    toggleBtn.textContent = "Ẩn chi tiết";

                    if (loaded) {
                        return;
                    }

                    detailDiv.innerHTML = "<p>Đang tải chi tiết...</p>";

                    fetch(`http://localhost:8888/api/orders/${order.orderId}/details`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                        .then(res => {
                            if (!res.ok) {
                                throw new Error(`HTTP ${res.status}`);
                            }
                            return res.json();
                        })
                        .then(detailRes => {
                            const details = detailRes.data || [];

                            if (!details.length) {
                                detailDiv.innerHTML = "<p>Không có sản phẩm trong đơn hàng.</p>";
                                loaded = true;
                                return;
                            }

                            let html = "<h4>Chi tiết đơn hàng:</h4>";

                            details.forEach(item => {
                                html += `
                                    <div style="border-top:1px solid #eee; padding:10px 0;">
                                        <img src="${item.productImage || ""}" width="80" alt="product" onerror="this.src='https://via.placeholder.com/80x80?text=No+Image'" />
                                        <div><strong>${item.productName}</strong></div>
                                        <div>Số lượng: ${item.productQuantity}</div>
                                        <div>Giá: ${item.productPrice} VND</div>
                                        <div>Tổng: ${item.productTotalPrice} VND</div>
                                    </div>
                                `;
                            });

                            detailDiv.innerHTML = html;
                            loaded = true;
                        })
                        .catch(err => {
                            console.error("Lỗi lấy chi tiết đơn hàng:", err);
                            detailDiv.innerHTML = "<p>Không thể tải chi tiết đơn hàng.</p>";
                            loaded = true;
                        });
                });

                orderDiv.innerHTML = summaryHtml;
                orderDiv.appendChild(toggleBtn);
                orderDiv.appendChild(detailDiv);
                orderListDiv.appendChild(orderDiv);
            });
        })
        .catch(err => {
            console.error("Lỗi lấy orders:", err);
            const orderListDiv = document.getElementById("order_list");
            if (orderListDiv) {
                orderListDiv.innerHTML = "<p>Không thể tải danh sách đơn hàng.</p>";
            }
        });
}