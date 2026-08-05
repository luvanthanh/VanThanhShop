fetch(`http://localhost:8888/api/products`)
    .then(response => response.json())
    .then(result => {

        const listContainer = document.getElementById("list-products");
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        const pageNumbers = document.getElementById('page-numbers');

        const productsPerPage = 8;

        let currentPage = 1;

        let allProducts = result.data;
        let filteredProducts = result.data;

        const formatCurrency = (value) => {
            if (value == null || Number.isNaN(Number(value))) return "Liên hệ";
            return Number(value).toLocaleString('vi-VN');
        };

        const getPrimaryVariant = (product) => {
            if (!product || !Array.isArray(product.productVariantResponses)) return {};
            return product.productVariantResponses[0] || {};
        };

        const getProductImage = (product) => {
            if (product.productImageThumbnail) return product.productImageThumbnail;
            if (product.imageResponses && product.imageResponses.length > 0) {
                return product.imageResponses[0].imageUrl;
            }
            return 'https://via.placeholder.com/300x300?text=No+Image';
        };

        // =========================
        // HIỂN THỊ SẢN PHẨM
        // =========================
        function renderProducts(page, data = filteredProducts) {

            listContainer.innerHTML = "";

            const totalPages = Math.ceil(data.length / productsPerPage);

            const start = (page - 1) * productsPerPage;
            const end = start + productsPerPage;

            const productsToShow = data.slice(start, end);

            productsToShow.forEach(product => {
                const variant = getPrimaryVariant(product);
                const imageUrl = getProductImage(product);
                const ramText = variant.productRam != null ? `${variant.productRam} GB` : 'N/A';
                const romText = variant.productRom != null ? `${variant.productRom} GB` : 'N/A';
                const priceText = variant.productPrice != null ? `${formatCurrency(variant.productPrice)}₫` : 'Liên hệ';

                const productDiv = document.createElement("div");

                productDiv.classList.add("product");

                productDiv.innerHTML = `
                    <a href="Phone.html?id=${product.productId}">
                        <img src="${imageUrl}" alt="${product.productName}">

                        <div class="product-name">
                            ${product.productName}
                        </div>

                        <div class="configuration-product">
                            <span class="configuration-product-button">
                                ${product.productScreenSize ?? '-'} inches
                            </span>

                            <span class="configuration-product-button">
                                ${ramText}
                            </span>

                            <span class="configuration-product-button">
                                ${romText}
                            </span>
                        </div>

                        <div class="describe-product">
                            ${product.productDescription || ''}
                        </div>

                        <div class="price-product">
                            ${priceText}
                        </div>
                    </a>

                    <button class="product-phone">
                        Xem thêm
                    </button>
                `;

                const btn = productDiv.querySelector('.product-phone');

                btn.addEventListener('click', function () {
                    window.location.href =
                        `Phone.html?id=${product.productId}`;
                });

                listContainer.appendChild(productDiv);
            });

            renderPageNumbers(totalPages);

            updateBtnState(totalPages);
        }

        // =========================
        // PHÂN TRANG
        // =========================
        function renderPageNumbers(totalPages) {

            pageNumbers.innerHTML = '';

            for (let i = 1; i <= totalPages; i++) {

                const btn = document.createElement('button');

                btn.textContent = i;

                btn.className =
                    (i === currentPage)
                        ? 'active-page'
                        : '';

                btn.addEventListener('click', function () {

                    currentPage = i;

                    renderProducts(currentPage);

                });

                pageNumbers.appendChild(btn);
            }
        }

        function updateBtnState(totalPages) {

            prevBtn.disabled = currentPage === 1;

            nextBtn.disabled = currentPage === totalPages;
        }

        prevBtn.addEventListener('click', function () {

            if (currentPage > 1) {

                currentPage--;

                renderProducts(currentPage);

            }
        });

        nextBtn.addEventListener('click', function () {

            const totalPages =
                Math.ceil(filteredProducts.length / productsPerPage);

            if (currentPage < totalPages) {

                currentPage++;

                renderProducts(currentPage);

            }
        });

        // =========================
        // SEARCH PRODUCT
        // =========================
        window.searchProduct = function () {

            const keyword = document
                .getElementById("search-input")
                .value
                .trim();

            // input rỗng -> load toàn bộ
            if (keyword === "") {

                filteredProducts = allProducts;

                currentPage = 1;

                renderProducts(currentPage, filteredProducts);

                return;
            }

            fetch(`http://localhost:8888/api/products/name/${encodeURIComponent(keyword)}`)

                .then(response => response.json())

                .then(data => {

                    filteredProducts = data.data;

                    currentPage = 1;

                    renderProducts(currentPage, filteredProducts);

                })

                .catch(error =>
                    console.error("Lỗi tìm kiếm:", error)
                );
        };

        // =========================
        // ENTER ĐỂ SEARCH
        // =========================
        document
            .getElementById("search-input")
            .addEventListener("keypress", function (event) {

                if (event.key === "Enter") {

                    searchProduct();

                }

            });

        // =========================
        // FILTER BRAND
        // =========================
        window.filterByBrand = function (brand) {

            if (brand === 'all') {

                filteredProducts = allProducts;

                currentPage = 1;

                renderProducts(currentPage, filteredProducts);

            }

            else {

                fetch(`http://localhost:8888/api/products/brand/${encodeURIComponent(brand)}`)

                    .then(response => response.json())

                    .then(data => {

                        filteredProducts = data.data;

                        currentPage = 1;

                        renderProducts(currentPage, filteredProducts);

                    })

                    .catch(error =>
                        console.error("Lỗi brand:", error)
                    );
            }
        };

        // =========================
        // FILTER PRICE
        // =========================
        window.filterByPrice = function (priceMin, priceMax) {

            fetch(`http://localhost:8888/api/products/price?min=${priceMin}&max=${priceMax}`)

                .then(response => response.json())

                .then(data => {

                    filteredProducts = data.data;

                    currentPage = 1;

                    renderProducts(currentPage, filteredProducts);

                })

                .catch(error =>
                    console.error("Lỗi price:", error)
                );
        };

        // =========================
        // FILTER RAM
        // =========================
        window.filterByRam = function (ram) {

            fetch(`http://localhost:8888/api/products/ram/${ram}`)

                .then(response => response.json())

                .then(data => {

                    filteredProducts = data.data;

                    currentPage = 1;

                    renderProducts(currentPage, filteredProducts);

                })

                .catch(error =>
                    console.error("Lỗi ram:", error)
                );
        };

        // =========================
        // FILTER ROM
        // =========================
        window.filterByRom = function (rom) {

            fetch(`http://localhost:8888/api/products/rom/${rom}`)

                .then(response => response.json())

                .then(data => {

                    filteredProducts = data.data;

                    currentPage = 1;

                    renderProducts(currentPage, filteredProducts);

                })

                .catch(error =>
                    console.error("Lỗi rom:", error)
                );
        };

        // =========================
        // FILTER SCREEN SIZE
        // =========================
        window.filterByScreenSize = function (min, max) {

            fetch(`http://localhost:8888/api/products/screen?min=${min}&max=${max}`)

                .then(response => response.json())

                .then(data => {

                    filteredProducts = data.data;

                    currentPage = 1;

                    renderProducts(currentPage, filteredProducts);

                })

                .catch(error =>
                    console.error("Lỗi screen size:", error)
                );
        };

        // =========================
        // FILTER COLOR
        // =========================
        window.filterByColor = function (color) {

            fetch(`http://localhost:8888/api/products/color/${encodeURIComponent(color)}`)

                .then(response => response.json())

                .then(data => {

                    filteredProducts = data.data;

                    currentPage = 1;

                    renderProducts(currentPage, filteredProducts);

                })

                .catch(error =>
                    console.error("Lỗi color:", error)
                );
        };

        // =========================
        // SORT PRICE INCREASE
        // =========================
        window.sortPriceIncrease = function () {

            fetch(`http://localhost:8888/api/products/sort/price/create`)

                .then(response => response.json())

                .then(data => {

                    filteredProducts = data.data;

                    currentPage = 1;

                    renderProducts(currentPage, filteredProducts);

                })

                .catch(error =>
                    console.error("Lỗi sort tăng:", error)
                );
        };

        // =========================
        // SORT PRICE DECREASE
        // =========================
        window.sortPriceDecrease = function () {

            fetch(`http://localhost:8888/api/products/sort/price/decrease`)

                .then(response => response.json())

                .then(data => {

                    filteredProducts = data.data;

                    currentPage = 1;

                    renderProducts(currentPage, filteredProducts);

                })

                .catch(error =>
                    console.error("Lỗi sort giảm:", error)
                );
        };

        // =========================
        // LOAD BAN ĐẦU
        // =========================
        renderProducts(currentPage);

    })

    .catch(error =>
        console.error("Lỗi load dữ liệu:", error)
    );