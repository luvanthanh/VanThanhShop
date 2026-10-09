import { apiRequest, responseData } from "./api.js";
import { badge, errorState, escapeHtml, loadingState, showToast } from "./ui.js";

const content = document.getElementById("page-content");
let profile = null;

function renderProfile() {
    content.innerHTML = `
      <div class="profile-grid">
        <section class="panel profile-card">
          <div class="profile-banner"></div>
          <div class="profile-avatar-large">${escapeHtml((profile.userFirstName || profile.userName || "A").charAt(0).toUpperCase())}</div>
          <h2>${escapeHtml([profile.userFirstName, profile.userLastName].filter(Boolean).join(" ") || profile.userName || "Admin")}</h2>
          <p>${escapeHtml(profile.userEmail || "—")}</p>
          <div class="profile-roles">${(profile.roles || []).map(role => badge(role)).join(" ") || badge("Admin")}</div>
          <div class="profile-id"><span>User ID</span><strong>${escapeHtml(profile.userId || "—")}</strong></div>
        </section>
        <section class="panel profile-form-panel">
          <header class="panel-header"><div><h2>Thông tin cá nhân</h2><p>Cập nhật thông tin tài khoản quản trị.</p></div></header>
          <div class="panel-body">
            <form id="profile-form" class="form-stack">
              <div class="form-grid">
                <label class="field-label">Email<input name="userEmail" type="email" required value="${escapeHtml(profile.userEmail || "")}"></label>
                <label class="field-label">Họ<input name="userFirstName" required value="${escapeHtml(profile.userFirstName || "")}"></label>
                <label class="field-label">Tên<input name="userLastName" required value="${escapeHtml(profile.userLastName || "")}"></label>
                <label class="field-label">Số điện thoại<input name="userPhoneNumber" required value="${escapeHtml(profile.userPhoneNumber || "")}"></label>
                <label class="field-label field-full">Địa chỉ<textarea name="userAddress" required>${escapeHtml(profile.userAddress || "")}</textarea></label>
              </div>
              <p class="form-note">Tên đăng nhập và mật khẩu không thuộc API cập nhật thông tin cá nhân.</p>
              <p id="profile-message" class="form-message" role="alert"></p>
              <div class="form-actions"><button class="button button-primary" type="submit">Lưu thay đổi</button></div>
            </form>
          </div>
        </section>
      </div>`;
    document.getElementById("profile-form").addEventListener("submit", event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.reportValidity()) return;
        const values = new FormData(form);
        const payload = Object.fromEntries(["userFirstName", "userLastName", "userAddress", "userEmail", "userPhoneNumber"]
            .map(key => [key, String(values.get(key)).trim()]));
        const button = form.querySelector('[type="submit"]');
        button.disabled = true;
        button.textContent = "Đang lưu...";
        apiRequest(`/users/${encodeURIComponent(profile.userId || localStorage.getItem("adminUserId") || "")}`, {
            method: "PUT",
            body: payload
        }).then(response => {
            const updated = responseData(response);
            profile = { ...profile, ...(updated && typeof updated === "object" ? updated : {}), ...payload };
            renderProfile();
            showToast("Đã cập nhật thông tin Admin.");
        }).catch(error => {
            document.getElementById("profile-message").textContent = error.message;
            button.disabled = false;
            button.textContent = "Lưu thay đổi";
        });
    });
}

export function initPage() {
    content.innerHTML = loadingState("Đang tải hồ sơ Admin...");
    apiRequest("/users/myInfo").then(response => {
        profile = responseData(response);
        if (!profile || typeof profile !== "object") throw new Error("API không trả về hồ sơ người dùng hợp lệ.");
        if (profile.userId) localStorage.setItem("adminUserId", profile.userId);
        renderProfile();
    }).catch(error => {
        content.innerHTML = errorState(error.message, "retry-profile");
    });
    content.addEventListener("click", event => {
        if (!event.target.closest('[data-action="retry-profile"]')) return;
        content.innerHTML = loadingState("Đang tải hồ sơ Admin...");
        apiRequest("/users/myInfo").then(response => {
            profile = responseData(response);
            if (profile?.userId) localStorage.setItem("adminUserId", profile.userId);
            renderProfile();
        }).catch(error => { content.innerHTML = errorState(error.message, "retry-profile"); });
    });
}
