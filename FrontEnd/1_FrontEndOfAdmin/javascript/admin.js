import { checkAuth, logout } from "./auth.js";
import { initials } from "./ui.js";

const pages = {
    dashboard: { title: "Tổng quan", subtitle: "Theo dõi hoạt động kinh doanh của cửa hàng.", file: "./dashboard.js" },
    products: { title: "Sản phẩm", subtitle: "Quản lý danh mục và cấu hình sản phẩm.", file: "./products.js" },
    users: { title: "Người dùng", subtitle: "Tra cứu và quản lý tài khoản khách hàng.", file: "./users.js" },
    orders: { title: "Đơn hàng", subtitle: "Theo dõi đơn hàng và thông tin thanh toán.", file: "./orders.js" },
    news: { title: "Tin tức", subtitle: "Quản lý nội dung và bài viết của cửa hàng.", file: "./news.js" },
    profile: { title: "Tài khoản Admin", subtitle: "Thông tin cá nhân và phiên đăng nhập.", file: "./profile.js" }
};

const activePage = document.body.dataset.page;
const page = pages[activePage] || pages.dashboard;
const links = [
    ["dashboard", "⌂", "Tổng quan", "dashboard.html"],
    ["products", "▣", "Sản phẩm", "products.html"],
    ["users", "♙", "Người dùng", "users.html"],
    ["orders", "▤", "Đơn hàng", "orders.html"],
    ["news", "▧", "Tin tức", "news.html"]
];

document.getElementById("admin-root").innerHTML = `
  <div class="app-layout">
    <aside class="sidebar" id="sidebar">
      <a class="brand" href="dashboard.html" aria-label="VAN THANH SHOP - Tổng quan">
        <span class="brand-mark">VT</span>
        <span>VAN THANH <b>SHOP</b></span>
      </a>
      <div class="sidebar-label">MENU CHÍNH</div>
      <nav class="side-nav" aria-label="Điều hướng quản trị">
        ${links.map(([key, icon, label, href]) => `
          <a class="nav-link ${activePage === key ? "active" : ""}" href="${href}" ${activePage === key ? 'aria-current="page"' : ""}>
            <span class="nav-icon" aria-hidden="true">${icon}</span><span>${label}</span>
          </a>`).join("")}
      </nav>
      <div class="sidebar-bottom">
        <div class="sidebar-label">TÀI KHOẢN</div>
        <a class="nav-link ${activePage === "profile" ? "active" : ""}" href="profile.html" ${activePage === "profile" ? 'aria-current="page"' : ""}>
          <span class="nav-icon" aria-hidden="true">⚙</span><span>Hồ sơ Admin</span>
        </a>
        <button class="nav-link nav-logout" type="button" id="logout-button">
          <span class="nav-icon" aria-hidden="true">↪</span><span>Đăng xuất</span>
        </button>
        <div class="sidebar-note">Hệ thống quản trị<br><strong>VAN THANH SHOP</strong></div>
      </div>
    </aside>
    <div class="main-column">
      <header class="topbar">
        <button class="icon-button menu-toggle" type="button" id="menu-toggle" aria-label="Mở menu">☰</button>
        <div class="topbar-title">
          <p class="eyebrow">QUẢN TRỊ CỬA HÀNG</p>
          <h1>${page.title}</h1>
        </div>
        <div class="topbar-user">
          <div class="topbar-user-copy"><strong id="admin-name">Admin</strong><span>Quản trị viên</span></div>
          <a class="avatar" id="admin-avatar" href="profile.html" aria-label="Mở hồ sơ Admin">A</a>
        </div>
      </header>
      <main class="page-main">
        <div class="page-intro"><p>${page.subtitle}</p><span class="live-indicator"><i></i> Kết nối API</span></div>
        <section id="page-content" aria-live="polite"></section>
      </main>
      <footer class="app-footer"><span>© VAN THANH SHOP</span><span>Admin workspace</span></footer>
    </div>
  </div>
  <div class="mobile-overlay" id="mobile-overlay"></div>
  <div class="toast-region" id="toast-region" aria-live="polite"></div>
  <div id="modal-root"></div>`;

document.getElementById("menu-toggle").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("sidebar-open");
    document.getElementById("mobile-overlay").classList.toggle("overlay-open");
});
document.getElementById("mobile-overlay").addEventListener("click", () => {
    document.getElementById("sidebar").classList.remove("sidebar-open");
    document.getElementById("mobile-overlay").classList.remove("overlay-open");
});
document.getElementById("logout-button").addEventListener("click", () => {
    logout();
});

checkAuth().then(claims => {
    const name = claims.sub || "Admin";
    localStorage.setItem("adminUserName", name);
    document.getElementById("admin-name").textContent = name;
    document.getElementById("admin-avatar").textContent = initials(name);
    return import(page.file);
}).then(module => {
    module.initPage();
}).catch(error => {
    document.getElementById("page-content").innerHTML = `
      <div class="state-card error-state"><h3>Không thể xác thực Admin</h3><p>${error.message}</p></div>`;
});
