function productPage(pageNumber = 1) {
  const page = document.getElementById("content-right-page");
  const PAGE_SIZE = 10;

  page.innerHTML = "<p>Đang tải danh sách sản phẩm...</p>";

  fetch("http://localhost:8888/api/products")
    .then(res => {
      if (!res.ok) throw new Error("Không gọi được API");
      return res.json();
    })
    .then(products => {

      /* ================= PHÂN TRANG ================= */
      const totalItems = products.length;
      const totalPages = Math.ceil(totalItems / PAGE_SIZE);

      if (pageNumber < 1) pageNumber = 1;
      if (pageNumber > totalPages) pageNumber = totalPages;

      const start = (pageNumber - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const pageProducts = products.slice(start, end);

      /* ================= CRUD FUNCTIONS (INNER) ================= */
      window.editProduct = function (id) {
        const product = products.find(p => p.productId === id);
        if (!product) return;

        const newName = prompt("Tên sản phẩm:", product.productName);
        const newPrice = prompt("Giá:", product.productPrice);
        if (newPrice === null || isNaN(newPrice)) {
            alert("Giá không hợp lệ");
            return;
          }
        if (!newName) return;

        fetch(`http://localhost:8888/api/products/updateProductById/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...product,
            productName: newName,
            productPrice: Number(newPrice)
          })
        })
        .then(res => {
          if (!res.ok) throw new Error("Sửa thất bại");
          productPage(pageNumber);
        })
        .catch(err => alert("Lỗi khi sửa sản phẩm"));
      };

      window.deleteProduct = function (id) {
        if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

        fetch(`http://localhost:8888/api/products/deleteProductById/${id}`, {
          method: "DELETE"
        })
        .then(res => {
          if (!res.ok) throw new Error("Xóa thất bại");
          productPage(pageNumber);
        })
        .catch(err => alert("Lỗi khi xóa sản phẩm"));
      };

      /* ================= RENDER TABLE ================= */
      let html = `
        <h2>Danh sách sản phẩm</h2>
        <table border="1" width="100%" cellspacing="0" cellpadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Hình ảnh</th>
              <th>Tên</th>
              <th>Giá</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
      `;

      pageProducts.forEach(p => {
        html += `
          <tr>
            <td>${p.productId}</td>
            <td>
              <img src="${p.productImageUrl}" alt="${p.productName}" width="50">
            </td>
            <td>${p.productName}</td>
            <td>${p.productFormattedPrice} VNĐ</td>
            <td>
              <button style="padding: 3px;margin-left: 200px" onclick="editProduct(${p.productId})">Sửa</button>
              <button style="padding: 3px;margin-left: 30px" onclick="deleteProduct(${p.productId})">Xóa</button>
            </td>
          </tr>
        `;
      });

      html += `
          </tbody>
        </table>
      `;

      /* ================= PAGINATION UI ================= */
      html += `<div style="margin-top:15px;">`;

      html += `
        <button style="margin:3 6px; padding: 5px;" ${pageNumber === 1 ? "disabled" : ""}
          onclick="productPage(${pageNumber - 1})">Prev</button>
      `;

      for (let i = 1; i <= totalPages; i++) {
        html += `
          <button 
            style="margin:3 6px; padding: 5px; ${i === pageNumber ? "font-weight:bold" : ""}"
            onclick="productPage(${i})">
            ${i}
          </button>
        `;
      }

      html += `
        <button style="margin:3 6px; padding: 5px;" ${pageNumber === totalPages ? "disabled" : ""}
          onclick="productPage(${pageNumber + 1})">Next</button>
      `;

      html += `</div>`;

      page.innerHTML = html;
    })
    .catch(error => {
      console.error(error);
      page.innerHTML =
        "<p style='color:red'>Không thể tải danh sách sản phẩm</p>";
    });
}
