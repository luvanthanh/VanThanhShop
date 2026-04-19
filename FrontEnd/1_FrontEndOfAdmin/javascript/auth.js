export function checkAuth() {
    const token = localStorage.getItem("adminToken");
    if (!token) location.href = "LoginAdmin.html";
    return token;
}

export function logout() {
    localStorage.removeItem("adminToken");
    location.href = "LoginAdmin.html";
}