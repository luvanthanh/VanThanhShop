document.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Bạn cần đăng nhập trước khi xem giỏ hàng!");
    window.location.href = "LoginClient.html";
    return;
  }

  try {
    // 1. Tạo cart (đợi chạy xong)
    await fetch(`http://localhost:8888/api/carts/createdCartByUserId/${userId}`, {
      method: "POST",
    });

    // 2. Lấy cart
    const cartRes = await fetch(`http://localhost:8888/api/carts/getCartByUserId/${userId}`);
    const cartJson = await cartRes.json();

    const cartId = cartJson.data.cartId;
    localStorage.setItem("cartId", cartId);

    console.log("CartId:", cartId);

    // 3. Lấy cartItems
    const res = await fetch(`http://localhost:8888/api/carts/${cartId}/cartItems`);
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
    listCartsDiv.innerHTML = "<p class='cartMessages'>Giỏ hàng trống!</p>";
    return;
  }

  let tongTien = 0;

  let html = `
    <table>
      <thead>
        <tr>
          <th>Hình ảnh</th>
          <th>Tên sản phẩm</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Tổng tiền</th>
          <th>Xóa</th>
        </tr>
      </thead>
      <tbody>
  `;

  data.forEach((item, index) => {
    const { product, quantity } = item;
    const price = Number(product.productPrice);
    const total = price * quantity;

    tongTien += total;

    html += `
      <tr id="row-${index}">
        <td><img src="${product.productImage}" width="80"></td>
        <td>${product.productName}</td>
        <td id="price-${index}" data-price="${price}">
          ${price.toLocaleString("vi-VN")} VND
        </td>
        <td>
          <button onclick="minus(${index})">-</button>
          <span id="quantity-${index}">${quantity}</span>
          <button onclick="plus(${index})">+</button>
        </td>
        <td id="total-${index}">
          ${total.toLocaleString("vi-VN")} VND
        </td>
        <td><button onclick="deleteCart(${index})">Xóa</button></td>
      </tr>
    `;
  });

  html += `
      <tr>
        <td colspan="3"></td>
        <td><b>Tổng cộng:</b></td>
        <td class= "sum_money" id="sum_money">${tongTien.toLocaleString("vi-VN")} VND</td>
      </tr>
    </tbody>
    </table>
    <a href="Home.html" class ="add_product"> Thêm Sản phẩm </a>
  `;

  listCartsDiv.innerHTML = html;
  document.getElementById("sum_money_carts").textContent =
  tongTien.toLocaleString("vi-VN") + " VND";
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

  // 🔥 CALL API ĐÚNG FIELD
  fetch(`http://localhost:8888/api/carts/cartItems/${item.cartItemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productQuantity: quantity, // ✅ FIX Ở ĐÂY
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

  // 🔥 CALL API ĐÚNG FIELD
  fetch(`http://localhost:8888/api/carts/cartItems/${item.cartItemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productQuantity: quantity, // ✅ FIX
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
function deleteCart(index) {
  const item = window.cartData[index];
  if (!item) return;

  if (!confirm(`Xóa "${item.product.productName}"?`)) return;

  fetch(`http://localhost:8888/api/carts/cartItems/${item.cartItemId}`, {
    method: "DELETE",
  }).then(() => {
    document.getElementById(`row-${index}`).remove();
    window.cartData.splice(index, 1);
    updateTotalSum();
  });
}


// ================= ORDER =================

// ================= ORDER =================
async function order() {
  const userId = localStorage.getItem("userId");
  const cartId = localStorage.getItem("cartId");

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

  // ===== VALIDATE =====
  if (!customerName || !deliveryAddress || !customerPhoneNumber) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  if (!window.cartData || window.cartData.length === 0) {
    alert("Giỏ hàng trống!");
    return;
  }

  try {

    // ===== 1. TẠO ORDER =====
    const orderRes = await fetch("http://localhost:8888/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        cartId: cartId,
        shopAddress: shopAddress,
        customerName: customerName,
        deliveryAddress: deliveryAddress,
        customerPhoneNumber: customerPhoneNumber,
        note: note,
        paymentMethod: paymentMethod,
        totalMoney: totalAmount
      }),
    });

    if (!orderRes.ok) {
      throw new Error("Tạo order thất bại");
    }

    const orderData = await orderRes.json();

    console.log("Order created:", orderData);

    const orderId = orderData.data.orderId;

    // ===== 2. TẠO ORDER DETAILS =====
    const detailRes = await fetch(
      `http://localhost:8888/api/orders/${orderId}/details`,
      {
        method: "POST",
      }
    );

    if (!detailRes.ok) {
      throw new Error("Tạo order details thất bại");
    }

    // ===== 3. CHECK PAYMENT METHOD =====

    // ===== COD =====
    if (paymentMethod === "receive") {

      alert("🎉 Đặt hàng thành công!");

      document.getElementById("list_carts").innerHTML =
        "<p class='cartMessages'>Giỏ hàng trống!</p>";

      window.cartData = [];

      window.location.href = "OrderList.html";

      return;
    }

    // ===== VNPAY =====
    if (paymentMethod === "Viettel pay") {

      const paymentRes = await fetch(
        "http://localhost:8888/api/payments/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: orderId,
            amount: totalAmount,
            paymentMethod: "VNPAY"
          }),
        }
      );

      if (!paymentRes.ok) {
        throw new Error("Tạo thanh toán VNPay thất bại");
      }

      // API trả về URL
      const paymentUrl = await paymentRes.text();

      console.log("VNPay URL:", paymentUrl);

      // redirect sang VNPay
      window.open(paymentUrl, "_blank");
    }

  } catch (err) {

    console.error(err);

    alert("❌ Đặt hàng thất bại!");
  }
}