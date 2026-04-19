const PAGE_SIZE = 10;

async function productPage(pageNumber = 1) {
    const page = document.getElementById("content-right-page");
    page.innerHTML = "<p>Đang tải sản phẩm...</p>";

    try {
        const res = await fetch("http://localhost:8888/api/products");
        const products = await res.json();

        const totalPages = Math.ceil(products.length / PAGE_SIZE);
        const start = (pageNumber - 1) * PAGE_SIZE;
        const pageProducts = products.slice(start, start + PAGE_SIZE);

        page.innerHTML = `
            <h2>Quản lý sản phẩm</h2>
            <table class="admin-table">
                <tbody>
                    ${pageProducts.map(p => `
                        <tr>
                            <td>${p.productId}</td>
                            <td><img src="${p.productImageUrl}" /></td>
                            <td>${p.productName}</td>
                            <td>${p.productFormattedPrice} VNĐ</td>
                            <td>
                                <button onclick="editProduct(${p.productId})">Sửa</button>
                                <button onclick="deleteProduct(${p.productId})">Xóa</button>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;

        window.editProduct = async (id) => {
            const product = products.find(p => p.productId === id);

            const name = prompt("Tên:", product.productName);
            const price = prompt("Giá:", product.productPrice);

            await fetch(`http://localhost:8888/api/products/updateProductById/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...product,
                    productName: name,
                    productPrice: Number(price)
                })
            });

            productPage(pageNumber);
        };

        window.deleteProduct = async (id) => {
            if (!confirm("Xóa sản phẩm?")) return;

            await fetch(`http://localhost:8888/api/products/deleteProductById/${id}`, {
                method: "DELETE"
            });

            productPage(pageNumber);
        };

    } catch {
        page.innerHTML = "<p>Lỗi tải sản phẩm</p>";
    }
}

async function userPage() {
    const page = document.getElementById("content-right-page");
    page.innerHTML = "<p>Đang tải user...</p>";

    try {
        const token = localStorage.getItem("adminToken");

        const res = await fetch("http://localhost:8888/api/users", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const result = await res.json();
        const users = result.data;

        page.innerHTML = `
            <h2>Quản lý người dùng</h2>
            <table class="admin-table">
                <tbody>
                    ${users.map(u => `
                        <tr>
                            <td>${u.userId}</td>
                            <td>${u.userName}</td>
                            <td>${u.userEmail}</td>
                            <td>
                                <button onclick="deleteUser(${u.userId})">Xóa</button>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;

        window.deleteUser = async (id) => {
            await fetch(`http://localhost:8888/api/users/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

            userPage();
        };

    } catch {
        page.innerHTML = "<p>Lỗi tải user</p>";
    }
}


async function newsPage() {
    const page = document.getElementById("content-right-page");
    page.innerHTML = "<p>Đang tải tin tức...</p>";

    try {
        const res = await fetch("http://localhost:8888/api/news");
        const newsItems = await res.json();

        page.innerHTML = `
            <h2>Quản lý tin tức</h2>
            <table class="admin-table">
                <tbody>
                    ${newsItems.map(n => `
                        <tr>
                            <td>${n.newsId}</td>
                            <td><img src="${n.newsImage}" width="80"/></td>
                            <td>${n.newsTitle}</td>
                            <td>${n.newsContent?.slice(0, 80) || ""}...</td>
                            <td>
                                <button onclick="deleteNews(${n.newsId})">Xóa</button>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;

        window.deleteNews = async (id) => {
            await fetch(`http://localhost:8888/api/news/${id}`, {
                method: "DELETE"
            });

            newsPage();
        };

    } catch {
        page.innerHTML = "<p>Lỗi tải tin tức</p>";
    }
}