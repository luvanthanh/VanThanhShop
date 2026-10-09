import { apiRequest, responseData } from "./api.js";

function decodeToken(token) {
    const payload = token.split(".")[1];
    if (!payload) throw new Error("Token đăng nhập không đúng định dạng.");
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
    const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
}

export function hasAdminRole(claims) {
    const scope = claims && claims.scope;
    const roles = Array.isArray(scope) ? scope : typeof scope === "string" ? scope.split(/[ ,]+/) : [];
    return roles.some(role => {
        const normalized = String(role).toUpperCase();
        return normalized === "ADMIN" || normalized === "ROLE_ADMIN";
    });
}

export function verifyAdmin(token) {
    let claims;
    try {
        claims = decodeToken(token);
    } catch (error) {
        return Promise.reject(error);
    }
    return apiRequest("/users/auth/introspect", {
        method: "POST",
        body: { token },
        skipAuth: true,
        keepOnUnauthorized: true
    }).then(response => {
        const result = responseData(response);
        if (!result || result.checkToken !== true) throw new Error("Phiên đăng nhập không hợp lệ hoặc đã hết hạn.");
        if (!hasAdminRole(claims)) throw new Error("Tài khoản này không có quyền ADMIN.");
        return claims;
    });
}

export function checkAuth() {
    const token = localStorage.getItem("adminToken");
    if (!token) {
        window.location.replace("LoginAdmin.html");
        return Promise.reject(new Error("Vui lòng đăng nhập để tiếp tục."));
    }
    return verifyAdmin(token).catch(error => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUserId");
        localStorage.removeItem("adminUserName");
        window.location.replace("LoginAdmin.html");
        throw error;
    });
}

export function logout() {
    const token = localStorage.getItem("adminToken");
    const request = token
        ? apiRequest("/users/auth/logout", { method: "POST", body: { token }, keepOnUnauthorized: true })
        : Promise.resolve();
    return request.catch(() => null).then(() => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUserId");
        localStorage.removeItem("adminUserName");
        window.location.replace("LoginAdmin.html");
    });
}
