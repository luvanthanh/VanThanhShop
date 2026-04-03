document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Bạn cần đăng nhập trước khi xem giỏ hàng!");
    window.location.href = "LoginClient.html";
    return;
  }

  // 1 Tạo cart nếu chưa có
  fetch(`http://localhost:8888/api/carts/createdCartByUserId/${userId}`, {
    method: "POST",
  });

  // 2 Lấy cart theo userId
  fetch(`http://localhost:8888/api/carts/getCartByUserId/${userId}`)
  .then((response) => response.json())
  .then((cart) => {
    localStorage.setItem("cartId", cart.data.cartId);
    const cartId = cart.data.cartId;
    console.log("CartId lấy từ localStorage:", cartId);

    // 3. Lấy danh sách cartItem theo cartId
    return fetch(`http://localhost:8888/api/carts/${cartId}/cartItems`)
      .then((res) => res.json())
      .then((cartItems) => {

        const itemsWithProduct = cartItems.map((item) => {
          console.log("RAW cartItem từ backend:", item);

          return {
            ...item,
            cartItemsId: item.cartItemId,
            product: {
              productName: item.productName,
              productPrice: item.productPrice,
              productImageUrl: item.imageUrl
            }
          };
        });

        window.cartData = itemsWithProduct;
        renderCart(itemsWithProduct);
      });
  })
  .catch((error) => console.error("Lỗi khi lấy giỏ hàng:", error));

});

// =====================================================
// RENDER CART UI
// =====================================================
function renderCart(data) {
  const listCartsDiv = document.getElementById("list_carts");
  listCartsDiv.innerHTML = "";

  if (data.length === 0) {
    listCartsDiv.innerHTML = "<p class = 'cartMessages'>Giỏ hàng trống!</p>";
    return;
  }

  let tongTien = 0;

  let tableHTML = `
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
    const price = product.productPrice;
    const total = price * quantity;

    tongTien += total;

    tableHTML += `
      <tr id="row-${index}">
          <td><img src="${product.productImageUrl}" alt="${product.productName}"></td>
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

  tableHTML += `
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td><b>Tổng cộng:</b></td>
            <td class="sum-money" id="sum_money">${tongTien.toLocaleString("vi-VN")} VND</td>
          </tr>
        </tbody>
    </table>

    <div class="add_product"><a href="Home.html">Thêm sản phẩm</a></div>
  `;

  listCartsDiv.innerHTML = tableHTML;
  updateTotalSum();
}


// =====================================================
// CẬP NHẬT TỔNG TIỀN
// =====================================================
function updateTotalSum() {
  let total = 0;
  const totalEls = document.querySelectorAll('[id^="total-"]');

  totalEls.forEach((el) => {
    total += Number(el.textContent.replace(/\D/g, ""));
  });

  document.getElementById("sum_money").textContent =
    total.toLocaleString("vi-VN") + " VND";

const sum_money = document.getElementById("sum_money");
console.log(sum_money);
const sum_money_carts = document.getElementById("sum_money_carts").textContent = sum_money.textContent;
console.log(sum_money_carts);
}

// =====================================================
// TĂNG NUMBER
// =====================================================
function plus(index) {
  const quantityEl = document.getElementById(`quantity-${index}`);
  const price = Number(document.getElementById(`price-${index}`).dataset.price);
  const totalEl = document.getElementById(`total-${index}`);

  let quantity = parseInt(quantityEl.textContent);
  quantity++;

  quantityEl.textContent = quantity;
  totalEl.textContent = (quantity * price).toLocaleString("vi-VN") + " VND";

  fetch(`http://localhost:8888/api/carts/cartItems/${window.cartData[index].cartItemsId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quantity: quantity,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Cập nhật số lượng thất bại!");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Cập nhật số lượng thành công:", data);
    })
    .catch((error) => {
      console.error("Lỗi khi cập nhật số lượng:", error);
      alert("Lỗi khi cập nhật số lượng: " + error.message);
    });

  updateTotalSum();
}

// =====================================================
// GIẢM NUMBER
// =====================================================
function minus(index) {
  const quantityEl = document.getElementById(`quantity-${index}`);
  const price = Number(document.getElementById(`price-${index}`).dataset.price);
  const totalEl = document.getElementById(`total-${index}`);

  let quantity = parseInt(quantityEl.textContent);

  if (quantity > 1) {
    quantity--;
    quantityEl.textContent = quantity;
    totalEl.textContent = (quantity * price).toLocaleString("vi-VN") + " VND";
  }
    fetch(`http://localhost:8888/api/carts/cartItems/${window.cartData[index].cartItemsId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quantity: quantity,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Cập nhật số lượng thất bại!");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Lỗi khi cập nhật số lượng:", error);
      alert("Lỗi khi cập nhật số lượng: " + error.message);
    });

  updateTotalSum();
}

// =====================================================
// XÓA CART ITEM
// =====================================================
function deleteCart(index) {
  const cartItem = window.cartData[index];
  if (!cartItem) return;

  if (!confirm(`Xóa "${cartItem.product.productName}" khỏi giỏ hàng?`)) return;

  fetch(`http://localhost:8888/api/carts/cartItems/${cartItem.cartItemsId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) throw new Error("Xóa thất bại!");

      // Xóa khỏi DOM
      document.getElementById(`row-${index}`).remove();

      // Xóa khỏi mảng (để tránh lỗi khi xóa lần 2)
      window.cartData.splice(index, 1);

      updateTotalSum();
      alert("Đã xóa sản phẩm!");
    })
    .catch((err) => {
      console.error(err);
      // alert("Không thể xóa sản phẩm!");
    });
}


function order() {

  const shopAddress = document.getElementById("shopAddress").textContent.trim();
  const customerName = document.getElementById("customerName").value;
  const deliveryAddress = document.getElementById("deliveryAddress").value;
  const customerPhoneNumber = document.getElementById("customerPhoneNumber").value;
  const note = document.getElementById("note").value;
  const paymentMethod = document.getElementById("paymentMethod").value;
  const sum_money_carts = document.getElementById("sum_money_carts").textContent;
  const cartId = localStorage.getItem("cartId");

  fetch(`http://localhost:8888/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      shopAddress: shopAddress,
      customerName: customerName,
      deliveryAddress: deliveryAddress,
      customerPhoneNumber: customerPhoneNumber,
      note: note,
      paymentMethod: paymentMethod,
      totalMoney: parseInt(sum_money_carts.replace(/\D/g, "")),
      cartId: cartId,
      userId: localStorage.getItem("userId"),
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Đặt hàng thất bại!");
      }
      return response.json();
    })
    .then((data) => {
      alert("Đặt hàng thành công!");
      window.location.href = "OrderList.html";
    })
    .catch((error) => {
      alert("Lỗi khi đặt hàng: " + error.message);
    });
}



