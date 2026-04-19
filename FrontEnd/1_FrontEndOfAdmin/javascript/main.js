import { loadProducts } from "./product.js";
import { loadUsers } from "./user.js";
import { loadNews } from "./news.js";
import { checkAuth, logout } from "./auth.js";

const token = checkAuth();

document.querySelectorAll(".sidebar li").forEach(item => {
    item.addEventListener("click", () => {
        const page = item.dataset.page;

        if (page === "product") loadProducts();
        if (page === "user") loadUsers(token);
        if (page === "news") loadNews();
    });
});

document.getElementById("logout").onclick = logout;