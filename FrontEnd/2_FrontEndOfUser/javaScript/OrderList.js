const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");
const orderListDiv = document.getElementById("order_list");

if (!userId || !token) {
  alert("Bạn cần đăng nhập để xem đơn hàng!");
  window.location.href = "LoginClient.html";
} else {
  loadOrders(userId, token);
}

async function loadOrders(userId, token) {
  try {
    const response = await fetch(`http://localhost:8888/api/orders/${encodeURIComponent(userId)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Không thể tải đơn hàng (HTTP ${response.status})`);
    }

    const result = await response.json();
    const orders = Array.isArray(result.data) ? result.data : [];
    orders.sort((first, second) => getCreatedTime(second) - getCreatedTime(first));
    renderOrders(orders, token);
  } catch (error) {
    console.error("Lỗi lấy orders:", error);
    orderListDiv.innerHTML = `
      <div class="order-state order-state-error">
        <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
        <h2>Không thể tải đơn hàng</h2>
        <p>${escapeHTML(error.message || "Đã xảy ra lỗi. Vui lòng thử lại.")}</p>
        <button class="order-retry" type="button" onclick="loadOrders(localStorage.getItem('userId'), localStorage.getItem('token'))">
          Thử lại
        </button>
      </div>
    `;
  }
}

function getCreatedTime(order) {
  const createdTime = Date.parse(order.createdAt);
  return Number.isNaN(createdTime) ? 0 : createdTime;
}

function renderOrders(orders, token) {
  if (!orders.length) {
    orderListDiv.innerHTML = `
      <div class="order-state">
        <span class="order-state-icon"><i class="fa-solid fa-receipt" aria-hidden="true"></i></span>
        <h2>Bạn chưa có đơn hàng nào</h2>
        <p>Các đơn hàng bạn đặt sẽ xuất hiện tại đây.</p>
        <a class="order-retry" href="Home.html">Khám phá sản phẩm</a>
      </div>
    `;
    return;
  }

  orderListDiv.innerHTML = orders.map((order) => {
    const status = getStatus(order.order_status);
    return `
      <article class="order-card">
        <div class="order-card-top">
          <div class="order-card-heading">
            <span class="order-caption">MÃ ĐƠN HÀNG</span>
            <h2>${escapeHTML(order.orderId || "Không có mã")}</h2>
          </div>
          <span class="order-status ${status.className}">
            <span class="status-dot" aria-hidden="true"></span>${escapeHTML(status.label)}
          </span>
        </div>

        <div class="order-card-info">
          <div class="order-info-item">
            <span class="order-info-icon"><i class="fa-regular fa-calendar" aria-hidden="true"></i></span>
            <div><span>Ngày đặt</span><strong>${escapeHTML(formatCreatedAt(order.createdAt))}</strong></div>
          </div>
          <div class="order-info-item">
            <span class="order-info-icon"><i class="fa-regular fa-user" aria-hidden="true"></i></span>
            <div><span>Người nhận</span><strong>${escapeHTML(order.customerName || "Chưa cập nhật")}</strong></div>
          </div>
          <div class="order-info-item">
            <span class="order-info-icon"><i class="fa-solid fa-location-dot" aria-hidden="true"></i></span>
            <div><span>Địa chỉ giao hàng</span><strong>${escapeHTML(order.deliveryAddress || "Chưa cập nhật")}</strong></div>
          </div>
        </div>

        <div class="order-card-bottom">
          <div class="order-total">
            <span>Tổng thanh toán</span>
            <strong>${escapeHTML(formatMoney(order.totalMoney))}</strong>
          </div>
          <button class="order-details-toggle" type="button" aria-expanded="false">
            <span>Xem chi tiết</span><i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
          </button>
        </div>
        <div class="order-details" hidden></div>
      </article>
    `;
  }).join("");

  orderListDiv.querySelectorAll(".order-details-toggle").forEach((button, index) => {
    const panel = button.closest(".order-card").querySelector(".order-details");
    const order = orders[index];
    let loaded = false;
    let loading = false;

    button.addEventListener("click", async () => {
      panel.hidden = !panel.hidden;
      button.setAttribute("aria-expanded", String(!panel.hidden));
      button.querySelector("span").textContent = panel.hidden ? "Xem chi tiết" : "Ẩn chi tiết";

      if (panel.hidden || loaded || loading) {
        return;
      }

      loading = true;
      panel.innerHTML = '<p class="details-message">Đang tải sản phẩm trong đơn...</p>';

      try {
        const response = await fetch(
          `http://localhost:8888/api/orders/${encodeURIComponent(order.orderId)}/details`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Không thể tải chi tiết đơn hàng (HTTP ${response.status})`);
        }

        const result = await response.json();
        const details = Array.isArray(result.data) ? result.data : [];
        panel.innerHTML = renderDetails(details);
        loaded = true;
      } catch (error) {
        console.error("Lỗi lấy chi tiết đơn hàng:", error);
        panel.innerHTML = `<p class="details-message details-error">${escapeHTML(error.message || "Không thể tải chi tiết đơn hàng.")}</p>`;
      } finally {
        loading = false;
      }
    });
  });
}

function renderDetails(details) {
  if (!details.length) {
    return '<p class="details-message">Đơn hàng chưa có thông tin sản phẩm.</p>';
  }

  return `
    <h3>Sản phẩm trong đơn</h3>
    <div class="order-products">
      ${details.map((item) => `
        <div class="order-product">
          <img src="${escapeHTML(item.productImage || "")}" alt="${escapeHTML(window.repairVietnameseText(item.productName || "Sản phẩm"))}" loading="lazy">
          <div class="order-product-info">
            <strong>${escapeHTML(window.repairVietnameseText(item.productName || "Sản phẩm"))}</strong>
            <span>${escapeHTML(formatMoney(item.productPrice))} × ${escapeHTML(item.productQuantity ?? 0)}</span>
          </div>
          <strong class="order-product-total">${escapeHTML(formatMoney(item.productTotalPrice))}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function getStatus(value) {
  const status = String(value || "").toUpperCase();
  const labels = {
    PENDING: ["Chờ xác nhận", "status-pending"],
    CONFIRMED: ["Đã xác nhận", "status-confirmed"],
    PROCESSING: ["Đang xử lý", "status-processing"],
    SHIPPING: ["Đang giao", "status-shipping"],
    DELIVERED: ["Đã giao", "status-delivered"],
    COMPLETED: ["Hoàn thành", "status-delivered"],
    CANCELLED: ["Đã hủy", "status-cancelled"],
    CANCELED: ["Đã hủy", "status-cancelled"],
  };
  const [label, className] = labels[status] || [status || "Chưa cập nhật", "status-default"];
  return { label, className };
}

function formatCreatedAt(value) {
  if (!value) {
    return "Không rõ thời gian";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Không rõ thời gian";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatMoney(value) {
  const amount = Number(value);
  return `${Number.isFinite(amount) ? amount.toLocaleString("vi-VN") : "0"} ₫`;
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}
