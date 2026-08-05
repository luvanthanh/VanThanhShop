const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`http://localhost:8888/api/products/id/${id}`)
    .then(res => res.json())
    .then(result => {
        if (result.code !== 1000) {
            throw new Error(result.message);
        }

        const p = result.data;
        const container = document.getElementById("Phone");
        const mainImage = p.productImageThumbnail || (p.imageResponses && p.imageResponses[0]?.imageUrl) || 'https://via.placeholder.com/400x400?text=No+Image';
        const images = [
            ...(p.imageResponses || []).map(img => img.imageUrl),
        ];
        const variants = Array.isArray(p.productVariantResponses) ? p.productVariantResponses : [];
        let selectedVariantIndex = 0;

        const getSelectedVariant = () => {
            return variants[selectedVariantIndex] || {};
        };

        const selectedVariant = getSelectedVariant();
        const priceText = selectedVariant.productPrice != null ? Number(selectedVariant.productPrice).toLocaleString('vi-VN') + '₫' : 'Liên hệ';
        const ramText = selectedVariant.productRam != null ? `${selectedVariant.productRam} GB` : 'N/A';
        const romText = selectedVariant.productRom != null ? `${selectedVariant.productRom} GB` : 'N/A';
        const colorText = selectedVariant.productColor || 'N/A';
        const variantButtonsHtml = variants.length > 0 ? variants.map((variant, index) => `
            <button type="button" class="variant-option${index === selectedVariantIndex ? ' selected' : ''}" data-index="${index}">
                ${variant.productRam ?? '?'} GB / ${variant.productRom ?? '?'} GB / ${variant.productColor || 'N/A'}
            </button>
        `).join('') : '<span>Không có biến thể</span>';

        container.innerHTML = `
            <div class="product-detail">
                <div class="images">
                    <img class="main-img" src="${mainImage}" alt="${p.productName}">
                    <div class="sub-images">
                        ${images.slice(0, 3).map(url => `<img src="${url}">`).join('')}
                    </div>
                </div>

                <div class="info">
                    <h1>${p.productName || 'Không xác định'}</h1>

                    <p><b>Thương hiệu:</b> ${p.productBrand || 'N/A'}</p>
                    <p><b>Màn hình:</b> ${p.productScreenSize ?? 'N/A'} inch</p>
                    <div class="variant-list">
                        <p><b>Biến thể:</b></p>
                        ${variantButtonsHtml}
                    </div>
                    <p><b>Màu:</b> <span id="selected-color">${colorText}</span></p>
                    <p><b>RAM:</b> <span id="selected-ram">${ramText}</span></p>
                    <p><b>ROM:</b> <span id="selected-rom">${romText}</span></p>
                    <p><b>Bảo hành:</b> ${p.productWarranty ?? 'N/A'} tháng</p>

                    <p class="desc">${p.productDescription || ''}</p>

                    <p class="old-price" id="selected-price">${priceText}</p>
                    <h2 class="price" id="selected-price-large">${priceText}</h2>

                    <button class="buy-btn">🛒 Thêm vào giỏ hàng</button>
                </div>
            </div>
        `;

        const updateSelectedVariantDisplay = () => {
            const variant = getSelectedVariant();
            const price = variant.productPrice != null ? Number(variant.productPrice).toLocaleString('vi-VN') + '₫' : 'Liên hệ';
            const ram = variant.productRam != null ? `${variant.productRam} GB` : 'N/A';
            const rom = variant.productRom != null ? `${variant.productRom} GB` : 'N/A';
            const color = variant.productColor || 'N/A';

            document.getElementById('selected-price').textContent = price;
            document.getElementById('selected-price-large').textContent = price;
            document.getElementById('selected-ram').textContent = ram;
            document.getElementById('selected-rom').textContent = rom;
            document.getElementById('selected-color').textContent = color;

            document.querySelectorAll('.variant-option').forEach(btn => {
                btn.classList.toggle('selected', Number(btn.dataset.index) === selectedVariantIndex);
            });
        };

        document.querySelectorAll('.variant-option').forEach(button => {
            button.addEventListener('click', () => {
                selectedVariantIndex = Number(button.dataset.index);
                updateSelectedVariantDisplay();
            });
        });

        // đổi ảnh (và active state)
        const mainImg = document.querySelector(".main-img");
        const subImages = Array.from(document.querySelectorAll(".sub-images img"));
        // set first active if exists
        if (subImages.length > 0) subImages[0].classList.add('active');
        subImages.forEach((img, idx) => {
            img.addEventListener("click", () => {
                mainImg.src = img.src;
                subImages.forEach(i => i.classList.remove('active'));
                img.classList.add('active');
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

            const payload = {
                productId: p.productId,
                quantity: 1
            };
            // include selected variant index for potential backend support
            if (typeof selectedVariantIndex !== 'undefined' && variants.length > 0) {
                payload.productVariantIndex = selectedVariantIndex;
            }

            fetch(`http://localhost:8888/api/carts/${cartId}/items`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
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