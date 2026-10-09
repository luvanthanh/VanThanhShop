export function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
}

export function formatCurrency(value) {
    if (value === null || value === undefined || value === "") return "—";
    const amount = Number(value);
    return Number.isFinite(amount)
        ? `${new Intl.NumberFormat("vi-VN").format(amount)} ₫`
        : "—";
}

export function formatDate(value) {
    if (!value) return "—";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? escapeHtml(value) : new Intl.DateTimeFormat("vi-VN").format(date);
}

export function initials(value) {
    return String(value || "Admin").trim().split(/\s+/).slice(0, 2)
        .map(part => part.charAt(0).toUpperCase()).join("") || "A";
}

export function showToast(message, type = "success") {
    const region = document.getElementById("toast-region");
    if (!region) return;
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.setAttribute("role", type === "error" ? "alert" : "status");
    toast.textContent = message;
    region.append(toast);
    window.setTimeout(() => toast.remove(), 4500);
}

export function loadingState(message = "Đang tải dữ liệu...") {
    return `<div class="state-card"><span class="spinner" aria-hidden="true"></span><p>${escapeHtml(message)}</p></div>`;
}

export function emptyState(title, description = "Thử thay đổi bộ lọc hoặc thêm dữ liệu mới.") {
    return `<div class="state-card empty-state"><span class="state-icon" aria-hidden="true">⌕</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p></div>`;
}

export function errorState(message, retryAction = "retry") {
    return `<div class="state-card error-state"><span class="state-icon" aria-hidden="true">!</span><h3>Không thể tải dữ liệu</h3><p>${escapeHtml(message)}</p><button class="button button-secondary" type="button" data-action="${retryAction}">Thử lại</button></div>`;
}

export function badge(value) {
    const text = String(value || "Chưa cập nhật");
    const className = text.toLowerCase().includes("cancel") || text.toLowerCase().includes("hủy")
        ? "badge badge-danger"
        : text.toLowerCase().includes("deliver") || text.toLowerCase().includes("hoàn")
            ? "badge badge-success"
            : "badge badge-neutral";
    return `<span class="${className}">${escapeHtml(text)}</span>`;
}

export function openModal(title, body, options = {}) {
    const root = document.getElementById("modal-root");
    root.innerHTML = `
      <div class="modal-backdrop" data-close-modal>
        <section class="modal-card ${options.wide ? "modal-wide" : ""}" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <header class="modal-header">
            <div><p class="eyebrow">VAN THANH SHOP</p><h2 id="modal-title">${escapeHtml(title)}</h2></div>
            <button class="icon-button" type="button" aria-label="Đóng" data-close-modal>×</button>
          </header>
          <div class="modal-body">${body}</div>
        </section>
      </div>`;
    root.querySelectorAll("[data-close-modal]").forEach(element => element.addEventListener("click", event => {
        if (event.target === element || element.closest(".icon-button")) root.innerHTML = "";
    }));
    const firstInput = root.querySelector("input, textarea, select, button");
    if (firstInput) firstInput.focus();
    const handleEscape = event => {
        if (event.key === "Escape") {
            root.innerHTML = "";
            document.removeEventListener("keydown", handleEscape);
        }
    };
    document.addEventListener("keydown", handleEscape);
    return root;
}

export function renderPagination(container, currentPage, totalItems, pageSize, onPageChange) {
    const pages = Math.max(1, Math.ceil(totalItems / pageSize));
    const safePage = Math.min(Math.max(currentPage, 1), pages);
    container.innerHTML = `
      <span class="pagination-info">${totalItems ? `Hiển thị ${(safePage - 1) * pageSize + 1}–${Math.min(safePage * pageSize, totalItems)} / ${totalItems}` : "0 kết quả"}</span>
      <div class="pagination-actions">
        <button class="button button-secondary button-small" type="button" data-page="${safePage - 1}" ${safePage <= 1 ? "disabled" : ""}>Trước</button>
        <span class="page-number">${safePage} / ${pages}</span>
        <button class="button button-secondary button-small" type="button" data-page="${safePage + 1}" ${safePage >= pages ? "disabled" : ""}>Sau</button>
      </div>`;
    container.querySelectorAll("[data-page]").forEach(button => button.addEventListener("click", () => {
        onPageChange(Number(button.dataset.page));
    }));
    return safePage;
}
