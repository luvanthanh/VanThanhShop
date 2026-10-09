import { apiRequest, responseData } from "./api.js";
import { verifyAdmin } from "./auth.js";

const form = document.getElementById("login-form");
const message = document.getElementById("login-message");
const submitButton = form.querySelector('[type="submit"]');

form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const values = new FormData(form);
    const userName = String(values.get("userName")).trim();
    const password = String(values.get("password"));
    message.textContent = "";
    submitButton.disabled = true;
    submitButton.textContent = "Đang xác thực...";

    apiRequest("/users/auth/login", {
        method: "POST",
        body: { userName, password },
        skipAuth: true,
        keepOnUnauthorized: true
    }).then(response => {
        const result = responseData(response);
        if (!result || !result.token || result.checkLogin !== true) {
            throw new Error("Tên đăng nhập hoặc mật khẩu không chính xác.");
        }
        return verifyAdmin(result.token).then(() => result);
    }).then(result => {
        localStorage.setItem("adminToken", result.token);
        if (result.userId) localStorage.setItem("adminUserId", result.userId);
        localStorage.setItem("adminUserName", userName);
        window.location.replace("dashboard.html");
    }).catch(error => {
        message.textContent = error.message || "Không thể đăng nhập. Kiểm tra kết nối tới API Gateway.";
    }).finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = "Đăng nhập";
    });
});
