
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
let currentProduct = null;

fetch(`http://localhost:8888/api/products/getProductById/${productId}`)
  .then(res => {
    if (!res.ok) throw new Error("Không tìm thấy sản phẩm");
    return res.json();
  })
  .then(product => {
    currentProduct = product; // ✅ Lưu lại để dùng cho addCart()
    const detailDiv = document.getElementById("Phone");
    detailDiv.innerHTML = `
    
          <div class="section-two">
                <div class = "list-image">
                    <div class="main-image" id="mainImage"> <img src="${product.data.productImageUrl}" alt="${product.data.productName}"></div>
                    <div class="list-image-box">
                        <div class= "image" id="image0" onclick="changeMainImage('${product.data.productImageUrl}')"> <img src="${product.data.productImageUrl}" alt="${product.data.productName}"></div>
                        <div class="image" id="image1" onclick="changeMainImage('${product.data.productImageUrl1}')"> <img src="${product.data.productImageUrl1}" alt="${product.data.productName}" ></div>
                        <div class="image" id="image2" onclick="changeMainImage('${product.data.productImageUrl2}')"> <img src="${product.data.productImageUrl2}" alt="${product.data.productName}" ></div>
                        <div class="image" id="image3" onclick="changeMainImage('${product.data.productImageUrl3}')"> <img src="${product.data.productImageUrl3}" alt="${product.data.productName}" ></div>
                    </div>
                </div>

                <div class="content-phone">
                      
                      <div class="content-phone-right">
                          <h2>${product.data.productName}</h2>
                          <div> <b> Hãng Phát Hành:</b> ${product.data.productBrand}</div>
                          <div><b>Thời Gian Phát Hành :</b> ${product.data.productReleaseDate} </div>
                          <div><b>Màn hình:</b> ${product.data.productScreenSize} inches</div>
                          <div><b>Số Lượng Kho:</b> ${product.data.productStockQuantity} Chiếc</div>
                          <div><b>RAM:</b> ${product.data.productRam} Gigabyte</div>
                          <div><b>ROM:</b> ${product.data.productRom} Gigabyte</div>
                          <div><b>Màu sắc:</b> ${product.data.productColor} màu sắc độc đáo</div>
                          <div><b>Thời Gian Bảo Hành:</b> ${product.data.productWarranty}</div>
                          <div><b>Mô tả:</b> ${product.data.productDescription}</div>
                          <div><b>Giá:</b> ${product.data.productFormattedPrice}₫</div>
                      </div>
                      <div class="Shopping-Cart">
                          <div class="cart-container">
                              <div class="cart-total">
                                  <i class="fa-solid fa-cart-shopping"></i>
                                  <a href="Carts.html"><button class="checkout-btn" id="addCart" onclick="addCart()">Thêm vào giỏ hàng</button></a>
                              </div>
                          </div>
                      </div>

                </div>

          </div>

    `;
    const mainImage = document.getElementById('mainImage');
    // Hàm cần là global nếu bạn vẫn dùng onclick inline — gán vào window
    window.changeMainImage = function(imageUrl) {
      if (!mainImage) return;
      const img = mainImage.querySelector('img');
      if (img) img.src = imageUrl;
    };

    })
  .catch(err => {
    document.getElementById("Phone").textContent = err.message;
  });



const cartId = localStorage.getItem("cartId");
  function addCart(){
    const userId = localStorage.getItem("userId");
    console.log("UserId lấy từ localStorage:", userId);

    fetch(`http://localhost:8888/api/carts/${cartId}/cartItems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cartId: cartId,
        productId: currentProduct.productId,
        quantity: 1
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Thêm vào giỏ hàng thất bại!");
      }
      return response.json();
    })
    .then(data => {
      alert("Đã thêm sản phẩm vào giỏ hàng!");
    })
    .catch(error => {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Lỗi khi thêm vào giỏ hàng: " + error.message);
    });
}


