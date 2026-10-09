import { apiRequest, getCollection } from "./api.js";
import { badge, emptyState, errorState, escapeHtml, formatCurrency, formatDate, loadingState } from "./ui.js";

const content = document.getElementById("page-content");

function getOrders(response) {
    return getCollection(response);
}

function variantsOf(product) {
    return product.productVariantResponses || [];
}

function productStock(product) {
    return variantsOf(product).reduce((total, variant) => total + (Number(variant.productStockQuantity) || 0), 0);
}

function moneyOf(order) {
    if (order.totalMoney === null || order.totalMoney === undefined || order.totalMoney === "") return null;
    const amount = Number(order.totalMoney);
    return Number.isFinite(amount) ? amount : null;
}

function monthKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function renderRevenueChart(orders) {
    const canvas = document.getElementById("revenue-chart");
    const empty = document.getElementById("revenue-chart-empty");
    if (!canvas || !orders || !orders.length) {
        if (empty) {
            empty.textContent = orders ? "Chưa có đơn hàng để hiển thị biểu đồ." : "Không thể tải biểu đồ doanh thu từ API đơn hàng.";
            empty.hidden = false;
        }
        return;
    }
    if (orders.some(order => moneyOf(order) === null)) {
        empty.textContent = "Thiếu totalMoney ở một số đơn hàng; không thể lập biểu đồ đầy đủ.";
        empty.hidden = false;
        return;
    }
    empty.hidden = true;
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, index) => {
        const date = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);
        return { key: monthKey(date), label: new Intl.DateTimeFormat("vi-VN", { month: "short" }).format(date), amount: 0 };
    });
    const byMonth = new Map(months.map(month => [month.key, month]));
    orders.forEach(order => {
        const date = new Date(order.createdAt);
        if (Number.isNaN(date.getTime())) return;
        const month = byMonth.get(monthKey(date));
        if (month) month.amount += moneyOf(order);
    });

    const draw = () => {
        const rect = canvas.getBoundingClientRect();
        const ratio = window.devicePixelRatio || 1;
        canvas.width = Math.max(1, Math.floor(rect.width * ratio));
        canvas.height = Math.max(1, Math.floor(rect.height * ratio));
        const context = canvas.getContext("2d");
        if (!context) return;
        context.scale(ratio, ratio);
        const width = rect.width;
        const height = rect.height;
        const left = 4, right = 5, top = 12, bottom = 27;
        const chartHeight = height - top - bottom;
        const max = Math.max(...months.map(month => month.amount), 1);
        context.font = "10px DM Sans, sans-serif";
        context.textAlign = "right";
        context.fillStyle = "#8c99aa";
        for (let grid = 0; grid <= 3; grid += 1) {
            const y = top + chartHeight * grid / 3;
            context.strokeStyle = "#edf1f6";
            context.beginPath();
            context.moveTo(left, y);
            context.lineTo(width - right, y);
            context.stroke();
            const label = new Intl.NumberFormat("vi-VN", { notation: "compact", maximumFractionDigits: 0 }).format(max * (3 - grid) / 3);
            context.fillText(label, width - right, y - 4);
        }
        const slot = (width - left - right) / months.length;
        const barWidth = Math.min(30, slot * .5);
        months.forEach((month, index) => {
            const x = left + slot * index + (slot - barWidth) / 2;
            const barHeight = month.amount ? Math.max(3, chartHeight * month.amount / max) : 0;
            const gradient = context.createLinearGradient(0, top + chartHeight - barHeight, 0, top + chartHeight);
            gradient.addColorStop(0, "#4b8bf0");
            gradient.addColorStop(1, "#2864dc");
            context.fillStyle = month.amount ? gradient : "#e7edf6";
            context.beginPath();
            context.roundRect(x, top + chartHeight - barHeight, barWidth, Math.max(barHeight, 2), 5);
            context.fill();
            context.textAlign = "center";
            context.fillStyle = "#8794a6";
            context.fillText(month.label, x + barWidth / 2, height - 7);
        });
    };
    draw();
    if ("ResizeObserver" in window) new ResizeObserver(draw).observe(canvas.parentElement);
}

function renderDashboard(products, users, orders, failures) {
    const revenue = orders && orders.every(order => moneyOf(order) !== null)
        ? orders.reduce((sum, order) => sum + moneyOf(order), 0)
        : null;
    const lowStock = (products || []).map(product => ({ product, stock: productStock(product) }))
        .filter(item => item.stock >= 0 && item.stock <= 5)
        .sort((a, b) => a.stock - b.stock)
        .slice(0, 5);
    const latestOrders = [...(orders || [])].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 6);

    content.innerHTML = `
      <div class="stats-grid">
        <article class="stat-card" style="--stat-color:#2864dc;--stat-tint:#edf4ff"><span class="stat-label">Tổng sản phẩm</span><span class="stat-icon" aria-hidden="true">▣</span><div class="stat-value">${products ? products.length.toLocaleString("vi-VN") : "—"}</div></article>
        <article class="stat-card" style="--stat-color:#138a62;--stat-tint:#eaf8f2"><span class="stat-label">Người dùng</span><span class="stat-icon" aria-hidden="true">♙</span><div class="stat-value">${users ? users.length.toLocaleString("vi-VN") : "—"}</div></article>
        <article class="stat-card" style="--stat-color:#bb7a1b;--stat-tint:#fff5e7"><span class="stat-label">Đơn hàng</span><span class="stat-icon" aria-hidden="true">▤</span><div class="stat-value">${orders ? orders.length.toLocaleString("vi-VN") : "—"}</div></article>
        <article class="stat-card" style="--stat-color:#7952cb;--stat-tint:#f2edff"><span class="stat-label">Tổng giá trị đơn hàng</span><span class="stat-icon" aria-hidden="true">₫</span><div class="stat-value">${revenue === null ? "—" : formatCurrency(revenue)}</div></article>
      </div>
      ${failures.length ? `<div class="inline-notice"><strong>Một số chỉ số chưa tải được.</strong> ${escapeHtml(failures.join(" "))} Các số liệu còn lại lấy trực tiếp từ API.</div>` : ""}
      <div class="dashboard-grid">
        <section class="panel chart-panel">
          <header class="panel-header"><div><h2>Giá trị đơn hàng theo tháng</h2><p>Tổng totalMoney theo ngày tạo, lấy từ API đơn hàng.</p></div></header>
          <div class="chart-area"><canvas id="revenue-chart" aria-label="Biểu đồ tổng tiền đơn hàng sáu tháng gần nhất"></canvas><div class="chart-empty" id="revenue-chart-empty" hidden>Chưa có đơn hàng để hiển thị biểu đồ.</div></div>
          <div class="chart-footnote">Cộng totalMoney của mọi trạng thái đơn hàng; đây không phải doanh thu đã thanh toán. Tháng không có đơn hiển thị 0.</div>
        </section>
        <section class="panel">
          <header class="panel-header"><div><h2>Tồn kho thấp</h2><p>Sản phẩm có số lượng tồn từ 0 đến 5.</p></div><a class="button button-secondary button-small" href="products.html">Sản phẩm</a></header>
          <div class="panel-body">
            ${products === null ? `<p class="text-muted">Không thể tải dữ liệu tồn kho từ API sản phẩm.</p>` : lowStock.length ? `<div class="quick-list">${lowStock.map(({ product, stock }) => `
              <div class="quick-row"><div class="quick-main"><strong>${escapeHtml(product.productName)}</strong><span>${escapeHtml(product.productBrand || "Chưa phân loại")}</span></div><span class="badge badge-danger">${stock} còn lại</span></div>`).join("")}</div>`
                : emptyState("Không có sản phẩm tồn kho thấp", "Số lượng tồn được tính từ các biến thể API trả về.")}
          </div>
        </section>
      </div>
      <section class="panel dashboard-lower">
        <header class="panel-header"><div><h2>Đơn hàng mới nhất</h2><p>Đơn hàng được sắp xếp theo thời gian tạo.</p></div><a class="button button-secondary button-small" href="orders.html">Tất cả đơn hàng</a></header>
        ${orders === null ? `<p class="data-status-note">Không thể tải đơn hàng từ API.</p>` : latestOrders.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th>Mã đơn</th><th>Khách hàng</th><th>Ngày đặt</th><th>Tổng tiền</th><th>Trạng thái</th></tr></thead><tbody>
          ${latestOrders.map(order => `<tr><td><span class="table-primary">${escapeHtml(order.orderId || "—")}</span></td><td>${escapeHtml(order.customerName || order.userId || "—")}</td><td>${formatDate(order.createdAt)}</td><td class="table-primary">${formatCurrency(order.totalMoney)}</td><td>${badge(order.order_status)}</td></tr>`).join("")}
        </tbody></table></div>` : emptyState("Chưa có đơn hàng", "Danh sách sẽ hiển thị khi API có đơn hàng.")}
      </section>`;
    renderRevenueChart(orders);
}

export function initPage() {
    content.innerHTML = loadingState("Đang tải số liệu từ API...");
    const load = () => Promise.all([
        apiRequest("/products").then(getCollection).catch(error => ({ error })),
        apiRequest("/users").then(getCollection).catch(error => ({ error })),
        apiRequest("/orders").then(getOrders).catch(error => ({ error }))
    ]).then(results => {
        const names = ["sản phẩm", "người dùng", "đơn hàng"];
        const failures = [];
        const data = results.map((result, index) => {
            if (result && result.error) {
                failures.push(`${names[index]}: ${result.error.message}`);
                return null;
            }
            return result;
        });
        renderDashboard(data[0], data[1], data[2], failures);
    }).catch(error => {
        content.innerHTML = errorState(error.message);
    });
    load();
    content.addEventListener("click", event => {
        if (event.target.closest('[data-action="retry"]')) load();
    });
}
