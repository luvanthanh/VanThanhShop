import { apiRequest, getCollection, responseData } from "./api.js";
import { badge, emptyState, errorState, escapeHtml, formatCurrency, formatDate, openModal, renderPagination } from "./ui.js";

const content = document.getElementById("page-content");
const PAGE_SIZE = 9;
let orders = [];
let currentPage = 1;
let sortKey = "createdAt";
let sortDirection = "desc";

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
      <td><button class="button button-secondary" type="button" data-action="details" data-id="${escapeHtml(order.orderId)}">Chi tiết</button></td>
    </tr>`).join("");
    if (!shown.length) body.innerHTML = `<tr><td colspan="6">${emptyState(orders.length ? "Không tìm thấy đơn hàng" : "Chưa có đơn hàng")}</td></tr>`;
    renderPagination(document.getElementById("orders-pagination"), currentPage, matches.length, PAGE_SIZE, page => {
        currentPage = page;
        renderTable();
    });
}

function renderPage() {
    content.innerHTML = `
      <div class="inline-notice"><strong>Trạng thái đơn hàng chỉ đọc:</strong> backend hiện chưa có API cập nhật trạng thái. Giao diện chỉ hiển thị giá trị <code>order_status</code> thực tế, không tự tạo trạng thái hay gọi endpoint chưa tồn tại.</div>
      <section class="panel">
        <header class="panel-header"><div><h2>Danh sách đơn hàng</h2><p>${orders.length} đơn hàng từ API</p></div></header>
        <div class="panel-body"><div class="toolbar">
          <input class="search-input" id="order-search" type="search" placeholder="Tìm mã đơn, tên khách hàng hoặc User ID..." aria-label="Tìm đơn hàng">
          <select class="filter-select" id="order-status" aria-label="Lọc trạng thái"><option value="">Tất cả trạng thái</option></select>
        </div></div>
        <div class="table-wrap"><table class="data-table"><thead><tr><th>Mã đơn / User ID</th><th>Khách hàng</th><th><button class="sort-button" type="button" data-sort="createdAt">Ngày đặt ↕</button></th><th><button class="sort-button" type="button" data-sort="totalMoney">Tổng tiền ↕</button></th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody id="orders-body"></tbody></table></div>
        <div class="pagination-bar" id="orders-pagination"></div>
      </section>`;
    document.getElementById("order-search").addEventListener("input", () => { currentPage = 1; renderTable(); });
    document.getElementById("order-status").addEventListener("change", () => { currentPage = 1; renderTable(); });
    content.querySelectorAll("[data-sort]").forEach(button => button.addEventListener("click", () => {
        const nextKey = button.dataset.sort;
        sortDirection = sortKey === nextKey && sortDirection === "asc" ? "desc" : "asc";
        sortKey = nextKey;
        renderTable();
    }));
    renderTable();
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
        orders = getCollection(response);
        renderPage();
    }).catch(error => { content.innerHTML = errorState(error.message); });
}

export function initPage() {
    loadOrders();
    content.addEventListener("click", event => {
        if (event.target.closest('[data-action="retry"]')) return loadOrders();
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
