import { apiRequest, getCollection, responseData } from "./api.js";
import { badge, emptyState, errorState, escapeHtml, formatCurrency, formatDate, openModal, renderPagination, showToast } from "./ui.js";

const content = document.getElementById("page-content");
const PAGE_SIZE = 8;
let products = [];
let currentPage = 1;
let sortKey = "productName";
let sortDirection = "asc";

function stockOf(product) {
    return (product.productVariantResponses || []).reduce((sum, variant) => sum + (Number(variant.productStockQuantity) || 0), 0);
}

function minPrice(product) {
    const prices = (product.productVariantResponses || []).map(variant => variant.productPrice)
        .filter(price => price !== null && price !== undefined && price !== "")
        .map(Number).filter(Number.isFinite);
    return prices.length ? Math.min(...prices) : null;
}

function imageUrl(value) {
    const url = String(value || "").trim();
    return /^(https?:\/\/|\/)/i.test(url) ? escapeHtml(url) : "";
}

function imagePayload(lines) {
    return lines.split(/\r?\n/).map(line => line.trim()).filter(Boolean).map(line => {
        const separator = line.indexOf("|");
        return {
            imageUrl: (separator < 0 ? line : line.slice(0, separator)).trim(),
            imageDescribe: separator < 0 ? "" : line.slice(separator + 1).trim()
        };
    });
}

function filteredProducts() {
    const query = document.getElementById("product-search")?.value.trim().toLocaleLowerCase("vi") || "";
    const brand = document.getElementById("brand-filter")?.value || "";
    const minimum = document.getElementById("min-price")?.value;
    const maximum = document.getElementById("max-price")?.value;
    const min = minimum === "" || minimum == null ? null : Number(minimum);
    const max = maximum === "" || maximum == null ? null : Number(maximum);
    return products.filter(product => {
        const matchesQuery = !query || `${product.productName || ""} ${product.productBrand || ""}`.toLocaleLowerCase("vi").includes(query);
        const price = minPrice(product);
        return matchesQuery && (!brand || product.productBrand === brand)
            && (min === null || price !== null && price >= min)
            && (max === null || price !== null && price <= max);
    }).sort((left, right) => {
        const a = sortKey === "productPrice" ? minPrice(left) : sortKey === "stock" ? stockOf(left) : String(left[sortKey] || "").toLocaleLowerCase("vi");
        const b = sortKey === "productPrice" ? minPrice(right) : sortKey === "stock" ? stockOf(right) : String(right[sortKey] || "").toLocaleLowerCase("vi");
        const comparison = typeof a === "number" && typeof b === "number" ? (a ?? -1) - (b ?? -1) : String(a).localeCompare(String(b), "vi");
        return sortDirection === "asc" ? comparison : -comparison;
    });
}

function renderTable() {
    const brands = [...new Set(products.map(product => product.productBrand).filter(Boolean))].sort((a, b) => a.localeCompare(b, "vi"));
    const brandSelect = document.getElementById("brand-filter");
    if (brandSelect) {
        const previous = brandSelect.value;
        brandSelect.innerHTML = `<option value="">Tất cả thương hiệu</option>${brands.map(brand => `<option value="${escapeHtml(brand)}">${escapeHtml(brand)}</option>`).join("")}`;
        brandSelect.value = brands.includes(previous) ? previous : "";
    }
    const filtered = filteredProducts();
    currentPage = Math.max(1, Math.min(currentPage, Math.ceil(filtered.length / PAGE_SIZE) || 1));
    const rows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const tbody = document.getElementById("products-body");
    tbody.innerHTML = rows.map(product => {
        const price = minPrice(product);
        const thumbnail = imageUrl(product.productImageThumbnail);
        const variant = (product.productVariantResponses || [])[0];
        const config = variant ? `${variant.productRam || "—"} GB / ${variant.productRom || "—"} GB · ${variant.productColor || "—"}` : "Chưa có biến thể";
        const stock = stockOf(product);
        return `<tr>
          <td>${thumbnail ? `<img class="table-thumb" src="${thumbnail}" alt="" loading="lazy">` : `<span class="table-thumb product-placeholder" aria-label="Không có ảnh">VT</span>`}</td>
          <td><span class="table-primary">${escapeHtml(product.productName)}</span><div class="table-subtext">#${escapeHtml(product.productId)}</div></td>
          <td>${escapeHtml(product.productBrand || "—")}</td>
          <td>${escapeHtml(config)}</td>
          <td class="table-primary">${price === null ? "—" : formatCurrency(price)}</td>
          <td>${stock <= 5 ? badge(`${stock} tồn`) : `${stock} tồn`}</td>
          <td><div class="table-actions">
            <button class="button button-secondary" type="button" data-action="details" data-id="${escapeHtml(product.productId)}">Chi tiết</button>
            <button class="button button-secondary" type="button" data-action="edit" data-id="${escapeHtml(product.productId)}">Sửa</button>
            <button class="button button-danger" type="button" data-action="delete" data-id="${escapeHtml(product.productId)}">Xóa</button>
          </div></td>
        </tr>`;
    }).join("");
    if (!rows.length) {
        tbody.innerHTML = `<tr><td colspan="7">${emptyState(products.length ? "Không tìm thấy sản phẩm" : "Chưa có sản phẩm", "Sản phẩm sẽ được hiển thị sau khi API trả về dữ liệu.")}</td></tr>`;
    }
    renderPagination(document.getElementById("products-pagination"), currentPage, filtered.length, PAGE_SIZE, page => {
        currentPage = page;
        renderTable();
    });
}

function renderPage() {
    content.innerHTML = `
      <section class="panel">
        <header class="panel-header"><div><h2>Danh sách sản phẩm</h2><p id="products-count">${products.length} sản phẩm từ API</p></div>
          <button class="button button-primary" type="button" id="add-product">＋ Thêm sản phẩm</button>
        </header>
        <div class="panel-body"><div class="toolbar">
          <input class="search-input" id="product-search" type="search" placeholder="Tìm theo tên hoặc thương hiệu..." aria-label="Tìm sản phẩm">
          <select class="filter-select" id="brand-filter" aria-label="Lọc thương hiệu"><option value="">Tất cả thương hiệu</option></select>
          <input class="filter-select" id="min-price" type="number" min="0" placeholder="Giá từ" aria-label="Giá thấp nhất">
          <input class="filter-select" id="max-price" type="number" min="0" placeholder="Giá đến" aria-label="Giá cao nhất">
        </div></div>
        <div class="table-wrap"><table class="data-table">
          <thead><tr><th>Ảnh</th><th><button class="sort-button" type="button" data-sort="productName">Sản phẩm ↕</button></th><th>Thương hiệu</th><th>Cấu hình</th><th><button class="sort-button" type="button" data-sort="productPrice">Giá từ ↕</button></th><th><button class="sort-button" type="button" data-sort="stock">Tồn kho ↕</button></th><th>Thao tác</th></tr></thead>
          <tbody id="products-body">${products.length ? "" : `<tr><td colspan="7">${emptyState("Chưa có sản phẩm")}</td></tr>`}</tbody>
        </table></div><div class="pagination-bar" id="products-pagination"></div>
      </section>`;
    ["product-search", "brand-filter", "min-price", "max-price"].forEach(id => {
        document.getElementById(id).addEventListener("input", () => { currentPage = 1; renderTable(); });
        document.getElementById(id).addEventListener("change", () => { currentPage = 1; renderTable(); });
    });
    content.querySelectorAll("[data-sort]").forEach(button => button.addEventListener("click", () => {
        const nextKey = button.dataset.sort;
        sortDirection = sortKey === nextKey && sortDirection === "asc" ? "desc" : "asc";
        sortKey = nextKey;
        renderTable();
    }));
    document.getElementById("add-product").addEventListener("click", () => openProductForm(null));
    renderTable();
}

function variantRow(variant = {}) {
    return `<div class="variant-row form-grid">
      <label class="field-label">RAM (GB)<input name="productRam" type="number" min="1" required value="${escapeHtml(variant.productRam ?? "")}"></label>
      <label class="field-label">ROM (GB)<input name="productRom" type="number" min="1" required value="${escapeHtml(variant.productRom ?? "")}"></label>
      <label class="field-label">Màu sắc<input name="productColor" required maxlength="60" value="${escapeHtml(variant.productColor ?? "")}"></label>
      <label class="field-label">Giá (VNĐ)<input name="productPrice" type="number" min="0" step="1" required value="${escapeHtml(variant.productPrice ?? "")}"></label>
      <label class="field-label">Tồn kho<input name="productStockQuantity" type="number" min="0" required value="${escapeHtml(variant.productStockQuantity ?? 0)}"></label>
      <div class="variant-row-actions"><button class="button button-danger button-small" type="button" data-remove-variant>Xóa biến thể</button></div>
    </div>`;
}

function openProductForm(product) {
    const variants = product ? product.productVariantResponses || [] : [{}];
    const modal = openModal(product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới", `
      <form id="product-form" class="form-stack">
        <div class="form-grid">
          <label class="field-label">Tên sản phẩm<input name="productName" required maxlength="180" value="${escapeHtml(product?.productName || "")}"></label>
          <label class="field-label">Thương hiệu<input name="productBrand" required maxlength="100" value="${escapeHtml(product?.productBrand || "")}"></label>
          <label class="field-label">Kích thước màn hình (inch)<input name="productScreenSize" type="number" min="0" step="0.1" required value="${escapeHtml(product?.productScreenSize ?? "")}"></label>
          <label class="field-label">Bảo hành (tháng)<input name="productWarranty" type="number" min="0" required value="${escapeHtml(product?.productWarranty ?? "")}"></label>
          <label class="field-label">Ngày ra mắt<input name="productReleaseDate" type="date" value="${product?.productReleaseDate ? escapeHtml(String(product.productReleaseDate).slice(0, 10)) : ""}"></label>
          <label class="field-label">Ảnh đại diện (URL)<input name="productImageThumbnail" type="url" placeholder="https://..." value="${escapeHtml(product?.productImageThumbnail || "")}"></label>
          <label class="field-label field-full">Mô tả<textarea name="productDescription" maxlength="5000">${escapeHtml(product?.productDescription || "")}</textarea></label>
        </div>
        <div><div class="section-subhead"><strong>Biến thể, giá và tồn kho</strong><button class="button button-secondary button-small" type="button" id="add-variant">＋ Thêm biến thể</button></div>
          <div id="variant-list">${variants.map(variantRow).join("")}</div></div>
        <label class="field-label">Ảnh sản phẩm (mỗi dòng: URL | mô tả)<textarea name="images" placeholder="https://example.com/image.jpg | Mặt trước">${escapeHtml((product?.imageResponses || []).map(image => `${image.imageUrl || ""}${image.imageDescribe ? ` | ${image.imageDescribe}` : ""}`).join("\n"))}</textarea></label>
        <label class="field-label">Thông số kỹ thuật (mỗi dòng: Tên: Giá trị)<textarea name="attributes" placeholder="Chip: Snapdragon&#10;Pin: 5000 mAh">${escapeHtml((product?.attributeResponses || []).map(attribute => `${attribute.attributeName}: ${attribute.attributeValue}`).join("\n"))}</textarea></label>
        <p class="form-note">Dữ liệu được gửi theo ProductCreationRequest/ProductUpdateRequest của backend. Ảnh nhập bằng URL; backend hiện không cung cấp API tải tệp ảnh.</p>
        <p class="form-message" id="product-form-message" role="alert"></p>
        <div class="form-actions"><button class="button button-secondary" type="button" data-close-modal>Hủy</button><button class="button button-primary" type="submit">Lưu sản phẩm</button></div>
      </form>`, { wide: true });
    const list = modal.querySelector("#variant-list");
    modal.querySelector("#add-variant").addEventListener("click", () => list.insertAdjacentHTML("beforeend", variantRow()));
    list.addEventListener("click", event => {
        if (event.target.closest("[data-remove-variant]")) {
            const rows = list.querySelectorAll(".variant-row");
            if (rows.length === 1) return showToast("Sản phẩm cần ít nhất một biến thể.", "error");
            event.target.closest(".variant-row").remove();
        }
    });
    modal.querySelector("#product-form").addEventListener("submit", event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.reportValidity()) return;
        const values = new FormData(form);
        const variantsPayload = [...list.querySelectorAll(".variant-row")].map(row => ({
            productRam: Number(row.querySelector('[name="productRam"]').value),
            productRom: Number(row.querySelector('[name="productRom"]').value),
            productColor: row.querySelector('[name="productColor"]').value.trim(),
            productPrice: Number(row.querySelector('[name="productPrice"]').value),
            productStockQuantity: Number(row.querySelector('[name="productStockQuantity"]').value)
        }));
        const images = imagePayload(String(values.get("images") || ""));
        if (images.some(image => !/^https?:\/\//i.test(image.imageUrl))) {
            modal.querySelector("#product-form-message").textContent = "Mỗi URL hình ảnh phải bắt đầu bằng http:// hoặc https://.";
            return;
        }
        const thumbnail = String(values.get("productImageThumbnail") || "").trim();
        if (thumbnail && !/^https?:\/\//i.test(thumbnail)) {
            modal.querySelector("#product-form-message").textContent = "URL ảnh đại diện phải bắt đầu bằng http:// hoặc https://.";
            return;
        }
        const attributes = String(values.get("attributes") || "").split(/\r?\n/).map(line => {
            const separator = line.indexOf(":");
            return separator < 0 ? null : {
                attributeName: line.slice(0, separator).trim(),
                attributeValue: line.slice(separator + 1).trim()
            };
        }).filter(item => item && item.attributeName && item.attributeValue);
        const dateValue = String(values.get("productReleaseDate") || "");
        const payload = {
            productName: String(values.get("productName")).trim(),
            productBrand: String(values.get("productBrand")).trim(),
            productScreenSize: Number(values.get("productScreenSize")),
            productWarranty: Number(values.get("productWarranty")),
            productReleaseDate: dateValue ? new Date(`${dateValue}T00:00:00`).toISOString() : null,
            productImageThumbnail: thumbnail,
            productDescription: String(values.get("productDescription") || "").trim(),
            variants: variantsPayload,
            images,
            attributes
        };
        const submit = form.querySelector('[type="submit"]');
        submit.disabled = true;
        submit.textContent = "Đang lưu...";
        const request = product
            ? apiRequest(`/products/update/${encodeURIComponent(product.productId)}`, { method: "PUT", body: payload })
            : apiRequest("/products/post", { method: "POST", body: payload });
        request.then(() => {
            modal.innerHTML = "";
            showToast(product ? "Đã cập nhật sản phẩm." : "Đã thêm sản phẩm.");
            return loadProducts();
        }).catch(error => {
            modal.querySelector("#product-form-message").textContent = error.message;
            submit.disabled = false;
            submit.textContent = "Lưu sản phẩm";
        });
    });
}

function showDetails(productId) {
    return apiRequest(`/products/id/${encodeURIComponent(productId)}`).then(response => {
        const product = responseData(response);
        const variants = product.productVariantResponses || [];
        const attributes = product.attributeResponses || [];
        const images = product.imageResponses || [];
        openModal("Chi tiết sản phẩm", `
          <div class="detail-list">
            <div class="detail-item"><span>Tên sản phẩm</span><strong>${escapeHtml(product.productName)}</strong></div>
            <div class="detail-item"><span>Thương hiệu</span><strong>${escapeHtml(product.productBrand)}</strong></div>
            <div class="detail-item"><span>Màn hình</span><strong>${escapeHtml(product.productScreenSize)} inch</strong></div>
            <div class="detail-item"><span>Bảo hành</span><strong>${escapeHtml(product.productWarranty)} tháng</strong></div>
            <div class="detail-item"><span>Ngày ra mắt</span><strong>${formatDate(product.productReleaseDate)}</strong></div>
            <div class="detail-item"><span>Mô tả</span><strong>${escapeHtml(product.productDescription || "Chưa có mô tả")}</strong></div>
          </div>
          <h3 class="modal-section-title">Biến thể</h3>
          ${variants.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th>RAM</th><th>ROM</th><th>Màu</th><th>Giá</th><th>Tồn</th></tr></thead><tbody>${variants.map(variant => `<tr><td>${escapeHtml(variant.productRam)} GB</td><td>${escapeHtml(variant.productRom)} GB</td><td>${escapeHtml(variant.productColor)}</td><td>${formatCurrency(variant.productPrice)}</td><td>${escapeHtml(variant.productStockQuantity)}</td></tr>`).join("")}</tbody></table></div>` : `<p class="text-muted">Chưa có biến thể.</p>`}
          <h3 class="modal-section-title">Thông số</h3>
          ${attributes.length ? `<div class="detail-list">${attributes.map(item => `<div class="detail-item"><span>${escapeHtml(item.attributeName)}</span><strong>${escapeHtml(item.attributeValue)}</strong></div>`).join("")}</div>` : `<p class="text-muted">Chưa có thông số.</p>`}
          <h3 class="modal-section-title">Hình ảnh</h3>
          ${images.length ? `<div class="image-preview-list">${images.map(image => {
              const url = imageUrl(image.imageUrl);
              return url ? `<img src="${url}" alt="${escapeHtml(image.imageDescribe || product.productName)}" loading="lazy">` : "";
          }).join("")}</div>` : `<p class="text-muted">Chưa có hình ảnh bổ sung.</p>`}`, { wide: true });
    }).catch(error => showToast(error.message, "error"));
}

function loadProducts() {
    content.innerHTML = `<section class="panel panel-body">${`<span class="spinner" aria-hidden="true"></span>`} <span class="text-muted">Đang tải danh sách sản phẩm...</span></section>`;
    return apiRequest("/products").then(response => {
        products = getCollection(response);
        renderPage();
    }).catch(error => {
        content.innerHTML = errorState(error.message);
    });
}

export function initPage() {
    loadProducts();
    content.addEventListener("click", event => {
        if (event.target.closest('[data-action="retry"]')) return loadProducts();
        const button = event.target.closest("[data-action][data-id]");
        if (!button) return;
        const product = products.find(item => String(item.productId) === button.dataset.id);
        if (button.dataset.action === "details") showDetails(button.dataset.id);
        if (button.dataset.action === "edit" && product) openProductForm(product);
        if (button.dataset.action === "delete" && product && window.confirm(`Xóa sản phẩm "${product.productName}"? Thao tác này không thể hoàn tác.`)) {
            apiRequest(`/products/delete/${encodeURIComponent(product.productId)}`, { method: "DELETE" })
                .then(() => { showToast("Đã xóa sản phẩm."); return loadProducts(); })
                .catch(error => showToast(error.message, "error"));
        }
    });
}
