document.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Bạn cần đăng nhập trước khi xem giỏ hàng!");
    window.location.href = "LoginClient.html";
    return;
  }

  try {
    // 1. Tạo cart (đợi chạy xong)
    await fetch(`http://localhost:8888/api/carts/user/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    // 2. Lấy cart
    const cartRes = await fetch(`http://localhost:8888/api/carts/user/${userId}`);
    const cartJson = await cartRes.json();

    const cartId = cartJson.data.cartId;
    localStorage.setItem("cartId", cartId);

    console.log("CartId:", cartId);

    // 3. Lấy cartItems
    const res = await fetch(`http://localhost:8888/api/carts/${cartId}/items`);
    const cartItemsJson = await res.json();

    const cartItems = cartItemsJson.data; // ⚠️ QUAN TRỌNG

    const itemsWithProduct = cartItems.map((item) => ({
      ...item,
      cartItemId: item.cartItemsId, // fix naming
      product: {
        productName: item.productName,
        productPrice: item.productPrice,
        productImage: item.productImage
      }
    }));

    window.cartData = itemsWithProduct;
    renderCart(itemsWithProduct);

  } catch (err) {
    console.error("Lỗi:", err);
  }
});


// ================= RENDER =================
function renderCart(data) {
  const listCartsDiv = document.getElementById("list_carts");
  listCartsDiv.innerHTML = "";

  if (!data || data.length === 0) {
    listCartsDiv.innerHTML = `
      <div class="cartMessages">
        <i class="fa-solid fa-basket-shopping" aria-hidden="true"></i>
        <div>Giỏ hàng của bạn đang trống</div>
        <span>Hãy khám phá sản phẩm và thêm món đồ yêu thích nhé.</span>
        <a class="add_product" href="Home.html">
          <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
          Tiếp tục mua sắm
        </a>
      </div>
    `;
    document.getElementById("sum_money_carts").textContent = "0 VND";
    return;
  }

  let tongTien = 0;

  let html = `
    <div class="cart-table-wrap">
      <table class="cart-products-table">
        <thead>
          <tr>
            <th scope="col">Sản phẩm</th>
            <th scope="col">Giá</th>
            <th scope="col">Số lượng</th>
            <th scope="col">Thành tiền</th>
            <th scope="col"><span class="visually-hidden">Xóa sản phẩm</span></th>
          </tr>
        </thead>
        <tbody>
  `;

  data.forEach((item, index) => {
    const { product, quantity } = item;
    const price = Number(product.productPrice);
    const total = price * quantity;
    const productName = escapeHTML(product.productName);
    const productImage = escapeHTML(product.productImage);

    tongTien += total;

    html += `
      <tr id="row-${index}">
        <td class="cart-product-name">
          <div class="cart-product">
            <img class="cart-product-image" src="${productImage}" alt="${productName}">
            <span>${productName}</span>
          </div>
        </td>
        <td class="cart-product-price" id="price-${index}" data-price="${price}">
          ${price.toLocaleString("vi-VN")} VND
        </td>
        <td class="cart-quantity-cell">
          <div class="quantity-control" aria-label="Số lượng sản phẩm">
          <button type="button" onclick="minus(${index})" aria-label="Giảm số lượng ${productName}">−</button>
          <span id="quantity-${index}">${quantity}</span>
          <button type="button" onclick="plus(${index})" aria-label="Tăng số lượng ${productName}">+</button>
          </div>
        </td>
        <td class="cart-line-total" id="total-${index}">
          ${total.toLocaleString("vi-VN")} VND
        </td>
        <td>
          <button class="remove-item" type="button" onclick="deleteCart(${index})" aria-label="Xóa ${productName}">
            <i class="fa-regular fa-trash-can" aria-hidden="true"></i>
          </button>
        </td>
      </tr>
    `;
  });

  html += `
        <tr class="cart-summary-row">
          <td colspan="3">Tổng cộng</td>
          <td class="sum_money" id="sum_money">${tongTien.toLocaleString("vi-VN")} VND</td>
          <td></td>
        </tr>
      </tbody>
      </table>
    </div>
    <a href="Home.html" class="add_product">
      <i class="fa-solid fa-plus" aria-hidden="true"></i>
      Thêm sản phẩm khác
    </a>
  `;

  listCartsDiv.innerHTML = html;
  document.getElementById("sum_money_carts").textContent =
  tongTien.toLocaleString("vi-VN") + " VND";
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

// ================= UPDATE TOTAL =================
function updateTotalSum() {
  let total = 0;

  const totalEls = document.querySelectorAll('[id^="total-"]');

  totalEls.forEach((el) => {
    total += Number(el.textContent.replace(/\D/g, ""));
  });

  // tổng ở bảng cart
  const sumEl = document.getElementById("sum_money");
  if (sumEl) {
    sumEl.textContent = total.toLocaleString("vi-VN") + " VND";
  }

  // tổng ở form bên phải
  const sumCartEl = document.getElementById("sum_money_carts");
  if (sumCartEl) {
    sumCartEl.textContent = total.toLocaleString("vi-VN") + " VND";
  }
}


// ================= PLUS =================
function plus(index) {
  const item = window.cartData[index];
  if (!item) return;

  const quantityEl = document.getElementById(`quantity-${index}`);
  const price = Number(document.getElementById(`price-${index}`).dataset.price);
  const totalEl = document.getElementById(`total-${index}`);

  let quantity = parseInt(quantityEl.textContent);
  quantity++;

  // update UI trước
  quantityEl.textContent = quantity;
  totalEl.textContent = (quantity * price).toLocaleString("vi-VN") + " VND";
  item.quantity = quantity;

  // 🔥 CALL API ĐÚNG FIELD
  fetch(`http://localhost:8888/api/carts/items/${item.cartItemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productQuantity: quantity,
    }),
  })
    .then(res => res.json())
    .then(data => {
      console.log("Update OK:", data);
    })
    .catch(err => {
      console.error("Lỗi update:", err);
    });

  updateTotalSum();
}

// ================= MINUS =================
function minus(index) {
  const item = window.cartData[index];
  if (!item) return;

  const quantityEl = document.getElementById(`quantity-${index}`);
  const price = Number(document.getElementById(`price-${index}`).dataset.price);
  const totalEl = document.getElementById(`total-${index}`);

  let quantity = parseInt(quantityEl.textContent);

  if (quantity <= 1) return;

  quantity--;

  // update UI
  quantityEl.textContent = quantity;
  totalEl.textContent = (quantity * price).toLocaleString("vi-VN") + " VND";
  item.quantity = quantity;

  // 🔥 CALL API ĐÚNG FIELD
  fetch(`http://localhost:8888/api/carts/items/${item.cartItemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productQuantity: quantity,
    }),
  })
    .then(res => res.json())
    .then(data => {
      console.log("Update OK:", data);
    })
    .catch(err => {
      console.error("Lỗi update:", err);
    });

  updateTotalSum();
}

// ================= DELETE =================
async function deleteCart(index) {
  const item = window.cartData[index];
  if (!item) return;

  if (!confirm(`Xóa "${item.product.productName}"?`)) return;

  try {
    const response = await fetch(
      `http://localhost:8888/api/carts/items/${item.cartItemId}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      throw new Error(`Xóa sản phẩm thất bại (HTTP ${response.status})`);
    }

    window.cartData.splice(index, 1);
    renderCart(window.cartData);
  } catch (err) {
    console.error("Lỗi xóa sản phẩm khỏi giỏ hàng:", err);
    alert("Không thể xóa sản phẩm khỏi giỏ hàng. Vui lòng thử lại.");
  }
}


// ================= ORDER =================

// ================= ORDER =================
async function order() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const cartId = localStorage.getItem("cartId");

  if (!userId || !token) {
    alert("Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại!");
    window.location.href = "LoginClient.html";
    return;
  }

  if (!cartId || !Number.isFinite(Number(cartId))) {
    alert("Không tìm thấy giỏ hàng. Vui lòng tải lại trang!");
    return;
  }

  const customerName = document.getElementById("customerName").value.trim();
  const deliveryAddress = document.getElementById("deliveryAddress").value.trim();
  const customerPhoneNumber = document.getElementById("customerPhoneNumber").value.trim();
  const note = document.getElementById("note").value.trim();
  const paymentMethod = document.getElementById("paymentMethod").value;
  const shopAddress = document.getElementById("shopAddress").textContent;

  const sumEl =
    document.getElementById("sum_money") ||
    document.getElementById("sum_money_carts");

  const totalAmount = sumEl
    ? Number(sumEl.textContent.replace(/\D/g, ""))
    : 0;

  const now = new Date();
  const createdAt = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-") + `T${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

  // ===== VALIDATE =====
  if (!customerName || !deliveryAddress || !customerPhoneNumber) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  if (!window.cartData || window.cartData.length === 0) {
    alert("Giỏ hàng trống!");
    return;
  }

  const orderButton = document.getElementById("order_button");
  if (orderButton) {
    orderButton.disabled = true;
  }

  try {

    // ===== 1. TẠO ORDER =====
    const orderRes = await fetch("http://localhost:8888/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        shopAddress,
        note,
        customerName,
        deliveryAddress,
        customerPhoneNumber,
        paymentMethod,
        totalMoney: totalAmount,
        createdAt,
        order_status: "PENDING",
        userId,
        cartId: Number(cartId),
      }),
    });

    if (!orderRes.ok) {
      throw new Error(`Tạo đơn hàng thất bại (HTTP ${orderRes.status})`);
    }

    const orderData = await orderRes.json();

    console.log("Order created:", orderData);

    alert("🎉 Đặt hàng thành công! Bạn sẽ thanh toán khi nhận hàng.");

    document.getElementById("list_carts").innerHTML =
      `<div class="cartMessages">
        <i class="fa-solid fa-basket-shopping" aria-hidden="true"></i>
        <div>Giỏ hàng của bạn đang trống</div>
        <span>Hãy khám phá sản phẩm và thêm món đồ yêu thích nhé.</span>
      </div>`;
    document.getElementById("sum_money_carts").textContent = "0 VND";
    window.cartData = [];

    window.location.href = "OrderList.html";

  } catch (err) {
    console.error("Lỗi đặt hàng:", err);
    alert(`❌ ${err.message || "Đặt hàng thất bại!"}`);
  } finally {
    if (orderButton) {
      orderButton.disabled = false;
    }
  }
}