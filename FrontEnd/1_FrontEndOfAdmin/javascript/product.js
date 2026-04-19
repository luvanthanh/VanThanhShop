import { api } from "./api.js";

export async function loadProducts() {
    const content = document.getElementById("content");
    const products = await api.get("/products");

    content.innerHTML = `
        <h2>Sản phẩm</h2>
        <table>
            ${products.map(p => `
                <tr>
                    <td>${p.productName}</td>
                    <td>${p.productFormattedPrice}</td>
                    <td>
                        <button onclick="deleteProduct(${p.productId})">Xóa</button>
                    </td>
                </tr>
            `).join("")}
        </table>
    `;

    window.deleteProduct = async (id) => {
        await api.delete(`/products/deleteProductById/${id}`);
        loadProducts();
    };
}