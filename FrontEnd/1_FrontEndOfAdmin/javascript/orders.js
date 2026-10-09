import { apiRequest, getCollection, responseData } from "./api.js";
import { badge, emptyState, errorState, escapeHtml, formatCurrency, formatDate, openModal, renderPagination, showToast } from "./ui.js";

const content = document.getElementById("page-content");
const PAGE_SIZE = 9;
let orders = [];
let allOrders = [];
let currentPage = 1;
let sortKey = "createdAt";
let sortDirection = "desc";

const ORDER_STATUSES = [
    "PENDING",
    "SHIPPING",
    "DELIVERED",
    "CANCELED"
];

function filteredOrders() {
    const query = document.getElementById("order-search")?.value.trim().toLocaleLowerCase("vi") || "";
    const status = document.getElementById("order-status")?.value || "";
    return orders.filter(order => {
        const matches = [order.orderId, order.customerName, order.userId, order.customerPhoneNumber]
            .some(value => String(value || "").toLocaleLowerCase("vi").includes(query));
        return matches && (!status || String(order.order_status || "") === status);
    }).sort((a, b) => {
        const left = a[sortKey];
        const right = b[sortKey];
        const comparison = sortKey === "createdAt" || sortKey === "totalMoney"
            ? Number(sortKey === "createdAt" ? new Date(left || 0) : left || 0) - Number(sortKey === "createdAt" ? new Date(right || 0) : right || 0)
            : String(left || "").localeCompare(String(right || ""), "vi");
        return sortDirection === "asc" ? comparison : -comparison;
    });
}

function safeImage(value) {
    const url = String(value || "").trim();
    return /^https?:\/\//i.test(url) ? escapeHtml(url) : "";
}

function renderTable() {
    const statuses = [...new Set(orders.map(order => order.order_status).filter(Boolean))].sort();
    const statusSelect = document.getElementById("order-status");
    const selected = statusSelect.value;
    statusSelect.innerHTML = `<option value="">Tất cả trạng thái</option>${statuses.map(status => `<option value="${escapeHtml(status)}">${escapeHtml(status)}</option>`).join("")}`;
    statusSelect.value = statuses.includes(selected) ? selected : "";
    const matches = filteredOrders();
    currentPage = Math.min(currentPage, Math.ceil(matches.length / PAGE_SIZE) || 1);
    const shown = matches.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const body = document.getElementById("orders-body");
    body.innerHTML = shown.map(order => `<tr>
      <td><span class="table-primary">${escapeHtml(order.orderId || "—")}</span><div class="table-subtext">${escapeHtml(order.userId || "")}</div></td>
      <td><span class="table-primary">${escapeHtml(order.customerName || "—")}</span><div class="table-subtext">${escapeHtml(order.customerPhoneNumber || "")}</div></td>
      <td>${formatDate(order.createdAt)}</td>
      <td class="table-primary">${formatCurrency(order.totalMoney)}</td>
      <td>${badge(order.order_status)}</td>
      <td><div class="table-actions">
        <button class="button button-secondary" type="button" data-action="details" data-id="${escapeHtml(order.orderId)}">Chi tiết</button>
        <button class="button button-primary" type="button" data-action="edit-status" data-id="${escapeHtml(order.orderId)}">Cập nhật trạng thái</button>
      </div></td>
    </tr>`).join("");
    if (!shown.length) body.innerHTML = `<tr><td colspan="6">${emptyState(orders.length ? "Không tìm thấy đơn hàng" : "Chưa có đơn hàng")}</td></tr>`;
    renderPagination(document.getElementById("orders-pagination"), currentPage, matches.length, PAGE_SIZE, page => {
        currentPage = page;
        renderTable();
    });
}

function renderPage() {
    content.innerHTML = `
      <section class="panel">
        <header class="panel-header"><div><h2>Danh sách đơn hàng</h2><p>${orders.length} đơn hàng từ API</p></div></header>
        <div class="panel-body"><form class="toolbar" id="order-search-form">
          <select class="filter-select" id="order-search-mode" aria-label="Phạm vi tìm kiếm">
            <option value="all">Tìm trong danh sách</option>
            <option value="customer">Tên khách hàng chính xác (API)</option>
            <option value="phone">Số điện thoại chính xác (API)</option>
          </select>
          <input class="search-input" id="order-search" type="search" placeholder="Mã đơn, tên, số điện thoại hoặc User ID..." aria-label="Tìm đơn hàng">
          <select class="filter-select" id="order-status" aria-label="Lọc trạng thái"><option value="">Tất cả trạng thái</option></select>
          <button class="button button-primary" type="submit">Tìm kiếm</button>
          <button class="button button-secondary" type="button" data-action="clear-search">Xóa lọc</button>
        </form>        <p class="form-note">Tìm theo tên/số điện thoại gọi API backend chính xác; tùy chọn danh sách lọc các kết quả đã tải.</p><p id="order-search-message" class="form-message" role="status"></p></div>
        <div class="table-wrap"><table class="data-table"><thead><tr><th>Mã đơn / User ID</th><th>Khách hàng</th><th><button class="sort-button" type="button" data-sort="createdAt">Ngày đặt ↕</button></th><th><button class="sort-button" type="button" data-sort="totalMoney">Tổng tiền ↕</button></th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody id="orders-body"></tbody></table></div>
        <div class="pagination-bar" id="orders-pagination"></div>
      </section>`;
    document.getElementById("order-search-form").addEventListener("submit", event => {
        event.preventDefault();
        searchOrders();
    });
    document.getElementById("order-status").addEventListener("change", () => { currentPage = 1; renderTable(); });
    content.querySelectorAll("[data-sort]").forEach(button => button.addEventListener("click", () => {
        const nextKey = button.dataset.sort;
        sortDirection = sortKey === nextKey && sortDirection === "asc" ? "desc" : "asc";
        sortKey = nextKey;
        renderTable();
    }));
    renderTable();
}

function searchOrders() {
    const query = document.getElementById("order-search").value.trim();
    const mode = document.getElementById("order-search-mode").value;
    const message = document.getElementById("order-search-message");
    message.textContent = "";

    if (mode === "all") {
        orders = allOrders;
        currentPage = 1;
        renderTable();
        return;
    }
    if (!query) {
        message.textContent = mode === "phone"
            ? "Nhập số điện thoại để tìm đơn."
            : "Nhập chính xác tên khách hàng để tìm đơn.";
        return;
    }

    const button = document.querySelector('#order-search-form [type="submit"]');
    button.disabled = true;
    button.textContent = "Đang tìm...";
    const endpoint = mode === "phone"
        ? `/orders/getOrderByCustomerPhoneNumber/${encodeURIComponent(query)}`
        : `/orders/getOrderByCustomer/${encodeURIComponent(query)}`;
    apiRequest(endpoint).then(response => {
        orders = getCollection(response);
        currentPage = 1;
        renderTable();
    }).catch(error => {
        message.textContent = `Không thể tìm đơn hàng: ${error.message}`;
    }).finally(() => {
        button.disabled = false;
        button.textContent = "Tìm kiếm";
    });
}

function editOrderStatus(order) {
    const currentStatus = String(order.order_status || "");
    const statuses = [...new Set([...ORDER_STATUSES, ...(currentStatus ? [currentStatus] : [])])];
    const modal = openModal(`Cập nhật trạng thái đơn ${order.orderId || ""}`, `
      <form id="order-status-form" class="form-stack">
        <label class="field-label">Trạng thái đơn hàng
          <select name="order_status" required>
            <option value="">Chọn trạng thái</option>
            ${statuses.map(status => `<option value="${escapeHtml(status)}" ${status === currentStatus ? "selected" : ""}>${escapeHtml(status)}</option>`).join("")}
          </select>
        </label>
        <p class="form-note">Chọn một trạng thái được ứng dụng sử dụng. Giá trị hiện tại: ${escapeHtml(currentStatus || "Chưa cập nhật")}.</p>
        <p id="order-status-message" class="form-message" role="alert"></p>
        <div class="form-actions">
          <button class="button button-secondary" type="button" data-close-modal>Hủy</button>
          <button class="button button-primary" type="submit">Lưu trạng thái</button>
        </div>
      </form>`);
    modal.querySelector("#order-status-form").addEventListener("submit", event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.reportValidity()) return;
        const status = String(new FormData(form).get("order_status") || "");
        if (status === currentStatus) {
            modal.innerHTML = "";
            showToast("Trạng thái đơn hàng không thay đổi.", "error");
            return;
        }

        const submit = form.querySelector('[type="submit"]');
        submit.disabled = true;
        submit.textContent = "Đang lưu...";
        apiRequest(`/orders/${encodeURIComponent(order.orderId)}`, {
            method: "PUT",
            body: { order_status: status }
        }).then(response => {
            const updated = responseData(response);
            if (updated && typeof updated === "object") Object.assign(order, updated);
            order.order_status = status;
            const originalOrder = allOrders.find(item => String(item.orderId) === String(order.orderId));
            if (originalOrder && originalOrder !== order) {
                if (updated && typeof updated === "object") Object.assign(originalOrder, updated);
                originalOrder.order_status = status;
            }
            modal.innerHTML = "";
            renderTable();
            showToast(`Đã cập nhật trạng thái đơn ${order.orderId}.`);
        }).catch(error => {
            modal.querySelector("#order-status-message").textContent = error.message;
            submit.disabled = false;
            submit.textContent = "Lưu trạng thái";
        });
    });
}

function showOrderDetails(order, details) {
    const items = Array.isArray(details) ? details : [];
    openModal(`Chi tiết đơn hàng ${order.orderId || ""}`, `
      <div class="detail-list">
        <div class="detail-item"><span>Khách hàng</span><strong>${escapeHtml(order.customerName || "—")}</strong></div>
        <div class="detail-item"><span>Số điện thoại</span><strong>${escapeHtml(order.customerPhoneNumber || "—")}</strong></div>
        <div class="detail-item"><span>Địa chỉ giao hàng</span><strong>${escapeHtml(order.deliveryAddress || "—")}</strong></div>
        <div class="detail-item"><span>Ngày đặt</span><strong>${formatDate(order.createdAt)}</strong></div>
        <div class="detail-item"><span>Thanh toán</span><strong>${escapeHtml(order.paymentMethod || "—")}</strong></div>
        <div class="detail-item"><span>Trạng thái</span><strong>${badge(order.order_status)}</strong></div>
        <div class="detail-item field-full"><span>Ghi chú</span><strong>${escapeHtml(order.note || "Không có ghi chú")}</strong></div>
      </div>
      <h3 class="modal-section-title">Sản phẩm trong đơn</h3>
      ${items.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th>Sản phẩm</th><th>Đơn giá</th><th>Số lượng</th><th>Thành tiền</th></tr></thead><tbody>${items.map(item => `<tr><td><div class="order-product">${safeImage(item.productImage) ? `<img class="table-thumb" src="${safeImage(item.productImage)}" alt="" loading="lazy">` : ""}<span>${escapeHtml(item.productName || "—")}</span></div></td><td>${formatCurrency(item.productPrice)}</td><td>${escapeHtml(item.productQuantity)}</td><td class="table-primary">${formatCurrency(item.productTotalPrice)}</td></tr>`).join("")}</tbody></table></div>` : emptyState("Không có sản phẩm chi tiết", "API không trả về dòng sản phẩm cho đơn hàng này.")}
      <div class="order-total"><span>Tổng tiền</span><strong>${formatCurrency(order.totalMoney)}</strong></div>`, { wide: true });
}

function loadOrders() {
    content.innerHTML = `<section class="panel panel-body"><span class="spinner" aria-hidden="true"></span> <span class="text-muted">Đang tải đơn hàng...</span></section>`;
    return apiRequest("/orders").then(response => {
        allOrders = getCollection(response);
        orders = allOrders;
        renderPage();
    }).catch(error => { content.innerHTML = errorState(error.message); });
}

export function initPage() {
    loadOrders();
    content.addEventListener("click", event => {
        if (event.target.closest('[data-action="retry"]')) return loadOrders();
        if (event.target.closest('[data-action="clear-search"]')) {
            document.getElementById("order-search").value = "";
            document.getElementById("order-search-mode").value = "all";
            document.getElementById("order-status").value = "";
            document.getElementById("order-search-message").textContent = "";
            orders = allOrders;
            currentPage = 1;
            return renderTable();
        }
        const statusButton = event.target.closest('[data-action="edit-status"]');
        if (statusButton) {
            const selectedOrder = orders.find(item => String(item.orderId) === statusButton.dataset.id);
            if (selectedOrder) editOrderStatus(selectedOrder);
            return;
        }
        const button = event.target.closest('[data-action="details"]');
        if (!button) return;
        const order = orders.find(item => String(item.orderId) === button.dataset.id);
        if (!order) return;
        button.disabled = true;
        apiRequest(`/orders/${encodeURIComponent(order.orderId)}/details`).then(response => {
            showOrderDetails(order, responseData(response));
        }).catch(error => {
            openModal(`Chi tiết đơn hàng ${order.orderId}`, `<div class="state-card error-state"><h3>Không thể tải chi tiết đơn hàng</h3><p>${escapeHtml(error.message)}</p></div>`);
        }).finally(() => { button.disabled = false; });
    });
}
