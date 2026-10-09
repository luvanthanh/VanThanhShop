const API_BASE = "http://localhost:8888/api";

export class ApiError extends Error {
    constructor(message, status, payload) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.payload = payload;
    }
}

function errorMessage(status, payload) {
    const backendMessage = payload && (payload.message || payload.error);
    if (backendMessage) return backendMessage;
    const messages = {
        400: "Dữ liệu gửi lên không hợp lệ.",
        401: "Phiên đăng nhập không hợp lệ hoặc đã hết hạn.",
        403: "Tài khoản không có quyền thực hiện thao tác này.",
        404: "Không tìm thấy dữ liệu hoặc API yêu cầu.",
        500: "Máy chủ gặp lỗi. Vui lòng thử lại sau."
    };
    return messages[status] || `Yêu cầu thất bại (HTTP ${status}).`;
}

export function apiRequest(path, options = {}) {
    const headers = new Headers(options.headers || {});
    const token = localStorage.getItem("adminToken");
    if (token && !options.skipAuth) headers.set("Authorization", `Bearer ${token}`);
    if (options.body !== undefined && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    return fetch(`${API_BASE}${path}`, {
        method: options.method || "GET",
        headers,
        body: options.body === undefined ? undefined : JSON.stringify(options.body)
    }).then(response => {
        if (response.status === 204) return null;
        return response.text().then(text => {
            let payload = null;
            if (text) {
                try {
                    payload = JSON.parse(text);
                } catch {
                    payload = { message: text };
                }
            }
            if (!response.ok) {
                if (response.status === 401 && !options.skipAuth && !options.keepOnUnauthorized) {
                    localStorage.removeItem("adminToken");
                    localStorage.removeItem("adminUserId");
                    localStorage.removeItem("adminUserName");
                    window.location.replace("LoginAdmin.html");
                }
                throw new ApiError(errorMessage(response.status, payload), response.status, payload);
            }
            return payload;
        });
    });
}

export function responseData(response) {
    return response && Object.prototype.hasOwnProperty.call(response, "data")
        ? response.data
        : response;
}

export function getCollection(response) {
    const data = responseData(response);
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.content)) return data.content;
    throw new Error("Định dạng danh sách API trả về không đúng như mong đợi.");
}
