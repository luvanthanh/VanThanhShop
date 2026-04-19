const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`http://localhost:8888/api/products/getProductById/${id}`)
    .then(res => res.json())
    .then(result => {
        if (result.code !== 1000) {
            throw new Error(result.message);
        }

        const p = result.data;
        const container = document.getElementById("Phone");

        container.innerHTML = `
            <div class="product-detail">

                <!-- LEFT -->
                <div class="images">
                    <img class="main-img" src="${p.productImage}" alt="${p.productName}">
                    <div class="sub-images">
                        <img src="${p.productImage1}">
                        <img src="${p.productImage2}">
                        <img src="${p.productImage3}">
                    </div>
                </div>

                <!-- RIGHT -->
                <div class="info">
                    <h1>${p.productName}</h1>

                    <p><b>Thương hiệu:</b> ${p.productBrand}</p>
                    <p><b>Màn hình:</b> ${p.productScreenSize} inch</p>
                    <p><b>Màu:</b> ${p.productColor}</p>
                    <p><b>RAM:</b> ${p.productRam} GB</p>
                    <p><b>ROM:</b> ${p.productRom} GB</p>
                    <p><b>Bảo hành:</b> ${p.productWarranty} tháng</p>

                    <p class="desc">${p.productDescription}</p>

                    <p class="old-price">${p.productPrice.toLocaleString()}₫</p>
                    <h2 class="price">${p.productFormattedPrice}₫</h2>

                    <!-- ✅ BUTTON -->
                    <button class="buy-btn">🛒 Thêm vào giỏ hàng</button>
                </div>

            </div>
        `;

        // đổi ảnh
        const mainImg = document.querySelector(".main-img");
        document.querySelectorAll(".sub-images img").forEach(img => {
            img.addEventListener("click", () => {
                mainImg.src = img.src;
            });
        });

        // thêm giỏ hàng
        document.querySelector(".buy-btn").addEventListener("click", () => {

            const userId = localStorage.getItem("userId");
            const cartId = localStorage.getItem("cartId");

            if (!userId || !cartId) {
                alert("Bạn cần đăng nhập!");
                window.location.href = "LoginClient.html";
                return;
            }

            fetch(`http://localhost:8888/api/carts/${cartId}/cartItems`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId: p.productId,
                    quantity: 1
                })
            })
            .then(res => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(() => {
                alert("🛒 Đã thêm vào giỏ hàng!");
            })
            .catch(() => {
                alert("❌ Lỗi thêm giỏ hàng!");
            });

        });

    })
    .catch(err => console.error(err));