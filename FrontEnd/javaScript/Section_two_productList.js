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

                const productDiv = document.createElement("div");

                productDiv.classList.add("product");

                productDiv.innerHTML = `
                    <a href="Phone.html?id=${product.productId}">
                        <img src="${product.productImage}" alt="${product.productName}">

                        <div class="product-name">
                            ${product.productName}
                        </div>

                        <div class="configuration-product">
                            <span class="configuration-product-button">
                                ${product.productScreenSize} inches
                            </span>

                            <span class="configuration-product-button">
                                ${product.productRam} GB
                            </span>

                            <span class="configuration-product-button">
                                ${product.productRom} GB
                            </span>
                        </div>

                        <div class="describe-product">
                            ${product.productDescription}
                        </div>

                        <div class="price-product">
                            ${product.productFormattedPrice}₫
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

            fetch(`http://localhost:8888/api/products/getProductByName/${keyword}`)

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

                fetch(`http://localhost:8888/api/products/getProductByBrand/${brand}`)

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

            fetch(`http://localhost:8888/api/products/getProductByPrice?min=${priceMin}&max=${priceMax}`)

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

            fetch(`http://localhost:8888/api/products/getProductByRam/${ram}`)

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

            fetch(`http://localhost:8888/api/products/getProductByRom/${rom}`)

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

            fetch(`http://localhost:8888/api/products/getProductByScreenSize?min=${min}&max=${max}`)

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

            fetch(`http://localhost:8888/api/products/getProductByColor/${color}`)

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

            fetch(`http://localhost:8888/api/products/getAndSortByPrice/increase`)

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

            fetch(`http://localhost:8888/api/products/getAndSortByPrice/decrease`)

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