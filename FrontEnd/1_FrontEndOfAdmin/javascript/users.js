import { apiRequest, getCollection } from "./api.js";
import { badge, emptyState, errorState, escapeHtml, openModal, renderPagination, showToast } from "./ui.js";

const content = document.getElementById("page-content");
const PAGE_SIZE = 9;
let users = [];
let currentPage = 1;
let sortKey = "userName";
let sortDirection = "asc";

function safeUserName(user) {
    return [user.userFirstName, user.userLastName].filter(Boolean).join(" ") || user.userName || user.userEmail || "Người dùng";
}

function visibleUsers() {
    const query = document.getElementById("user-search")?.value.trim().toLocaleLowerCase("vi") || "";
    return users.filter(user => [
        user.userName, user.userFirstName, user.userLastName, user.userEmail, user.userPhoneNumber, user.userId
    ].some(value => String(value || "").toLocaleLowerCase("vi").includes(query))).sort((a, b) => {
        const comparison = String(a[sortKey] || "").localeCompare(String(b[sortKey] || ""), "vi");
        return sortDirection === "asc" ? comparison : -comparison;
    });
}

function renderUsers() {
    const matches = visibleUsers();
    currentPage = Math.min(currentPage, Math.ceil(matches.length / PAGE_SIZE) || 1);
    const shown = matches.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const currentAdminId = localStorage.getItem("adminUserId");
    const currentAdminName = localStorage.getItem("adminUserName");
    const body = document.getElementById("users-body");
    body.innerHTML = shown.map(user => {
        const isSelf = currentAdminId && String(user.userId) === currentAdminId
            || currentAdminName && String(user.userName || "").toLowerCase() === currentAdminName.toLowerCase();
        const roles = Array.isArray(user.roles) ? user.roles : [];
        return `<tr>
          <td><span class="table-primary">${escapeHtml(safeUserName(user))}</span><div class="table-subtext">${escapeHtml(user.userName || "")}</div></td>
          <td>${escapeHtml(user.userEmail || "—")}</td>
          <td>${escapeHtml(user.userPhoneNumber || "—")}</td>
          <td>${roles.length ? roles.map(role => badge(role)).join(" ") : "—"}</td>
          <td><div class="table-actions">
            <button class="button button-secondary" type="button" data-action="details" data-id="${escapeHtml(user.userId)}">Chi tiết</button>
            <button class="button button-secondary" type="button" data-action="edit" data-id="${escapeHtml(user.userId)}">Sửa</button>
            <button class="button button-danger" type="button" data-action="delete" data-id="${escapeHtml(user.userId)}" ${isSelf ? "disabled title='Không thể tự xóa tài khoản đang đăng nhập'" : ""}>Xóa</button>
          </div></td>
        </tr>`;
    }).join("");
    if (!shown.length) body.innerHTML = `<tr><td colspan="5">${emptyState(users.length ? "Không tìm thấy người dùng" : "Chưa có người dùng")}</td></tr>`;
    renderPagination(document.getElementById("users-pagination"), currentPage, matches.length, PAGE_SIZE, page => {
        currentPage = page;
        renderUsers();
    });
}

function renderPage() {
    content.innerHTML = `
      <section class="panel">
        <header class="panel-header"><div><h2>Danh sách người dùng</h2><p>${users.length} tài khoản từ API</p></div></header>
        <div class="panel-body"><div class="toolbar"><input class="search-input" id="user-search" type="search" placeholder="Tìm tên, email, số điện thoại..." aria-label="Tìm người dùng"></div></div>
        <div class="table-wrap"><table class="data-table"><thead><tr><th><button class="sort-button" type="button" data-sort="userName">Người dùng ↕</button></th><th><button class="sort-button" type="button" data-sort="userEmail">Email ↕</button></th><th>Số điện thoại</th><th>Vai trò</th><th>Thao tác</th></tr></thead><tbody id="users-body"></tbody></table></div>
        <div class="pagination-bar" id="users-pagination"></div>
      </section>`;
    document.getElementById("user-search").addEventListener("input", () => { currentPage = 1; renderUsers(); });
    content.querySelectorAll("[data-sort]").forEach(button => button.addEventListener("click", () => {
        const nextKey = button.dataset.sort;
        sortDirection = sortKey === nextKey && sortDirection === "asc" ? "desc" : "asc";
        sortKey = nextKey;
        renderUsers();
    }));
    renderUsers();
}

function showDetails(user) {
    openModal("Thông tin người dùng", `<div class="detail-list">
      <div class="detail-item"><span>Tên đăng nhập</span><strong>${escapeHtml(user.userName || "—")}</strong></div>
      <div class="detail-item"><span>Vai trò</span><strong>${escapeHtml((user.roles || []).join(", ") || "—")}</strong></div>
      <div class="detail-item"><span>Họ và tên</span><strong>${escapeHtml(safeUserName(user))}</strong></div>
      <div class="detail-item"><span>Email</span><strong>${escapeHtml(user.userEmail || "—")}</strong></div>
      <div class="detail-item"><span>Số điện thoại</span><strong>${escapeHtml(user.userPhoneNumber || "—")}</strong></div>
      <div class="detail-item"><span>Địa chỉ</span><strong>${escapeHtml(user.userAddress || "—")}</strong></div>
    </div><p class="form-note">Không hiển thị thông tin mật khẩu.</p>`);
}

function editUser(user) {
    const modal = openModal("Chỉnh sửa người dùng", `
      <form id="user-form" class="form-stack">
        <div class="form-grid">
          <label class="field-label">Email<input name="userEmail" type="email" required value="${escapeHtml(user.userEmail || "")}"></label>
          <label class="field-label">Họ<input name="userFirstName" required value="${escapeHtml(user.userFirstName || "")}"></label>
          <label class="field-label">Tên<input name="userLastName" required value="${escapeHtml(user.userLastName || "")}"></label>
          <label class="field-label">Số điện thoại<input name="userPhoneNumber" required value="${escapeHtml(user.userPhoneNumber || "")}"></label>
          <label class="field-label field-full">Địa chỉ<textarea name="userAddress" required>${escapeHtml(user.userAddress || "")}</textarea></label>
        </div>
        <p class="form-note">Vai trò hiện tại: ${escapeHtml((user.roles || []).join(", ") || "—")}. Thông tin đăng nhập và vai trò được quản lý riêng.</p>
        <p id="user-form-message" class="form-message" role="alert"></p>
        <div class="form-actions"><button class="button button-secondary" type="button" data-close-modal>Hủy</button><button class="button button-primary" type="submit">Lưu thay đổi</button></div>
      </form>`);
    modal.querySelector("#user-form").addEventListener("submit", event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.reportValidity()) return;
        const fields = new FormData(form);
        const payload = Object.fromEntries(["userFirstName", "userLastName", "userAddress", "userEmail", "userPhoneNumber"]
            .map(key => [key, String(fields.get(key)).trim()]));
        const submit = form.querySelector('[type="submit"]');
        submit.disabled = true;
        submit.textContent = "Đang lưu...";
        apiRequest(`/users/${encodeURIComponent(user.userId)}`, { method: "PUT", body: payload })
            .then(() => {
                modal.innerHTML = "";
                showToast("Đã cập nhật thông tin người dùng.");
                return loadUsers();
            }).catch(error => {
                modal.querySelector("#user-form-message").textContent = error.message;
                submit.disabled = false;
                submit.textContent = "Lưu thay đổi";
            });
    });
}

function loadUsers() {
    content.innerHTML = `<section class="panel panel-body"><span class="spinner" aria-hidden="true"></span> <span class="text-muted">Đang tải người dùng...</span></section>`;
    return apiRequest("/users").then(response => {
        users = getCollection(response);
        renderPage();
    }).catch(error => {
        content.innerHTML = errorState(error.message);
    });
}

export function initPage() {
    loadUsers();
    content.addEventListener("click", event => {
        if (event.target.closest('[data-action="retry"]')) return loadUsers();
        const button = event.target.closest("[data-action][data-id]");
        if (!button) return;
        const user = users.find(item => String(item.userId) === button.dataset.id);
        if (!user) return;
        if (button.dataset.action === "details") showDetails(user);
        if (button.dataset.action === "edit") editUser(user);
        if (button.dataset.action === "delete") {
            if (String(user.userId) === localStorage.getItem("adminUserId")
                || String(user.userName || "").toLowerCase() === String(localStorage.getItem("adminUserName") || "").toLowerCase()) {
                showToast("Không thể tự xóa tài khoản đang đăng nhập.", "error");
                return;
            }
            if (!window.confirm(`Xóa tài khoản "${user.userName}"? Bạn có chắc muốn xóa tài khoản này!`)) return;
            apiRequest(`/users/${encodeURIComponent(user.userId)}`, { method: "DELETE" })
                .then(() => { showToast("Đã xóa tài khoản."); return loadUsers(); })
                .catch(error => showToast(error.message, "error"));
        }
    });
}
