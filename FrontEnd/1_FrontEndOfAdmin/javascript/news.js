import { apiRequest, getCollection } from "./api.js";
import { badge, emptyState, errorState, escapeHtml, formatDate, openModal, renderPagination, repairVietnameseText, showToast } from "./ui.js";

const content = document.getElementById("page-content");
const PAGE_SIZE = 8;
let articles = [];
let currentPage = 1;
let sortDirection = "desc";
let sortKey = "newsCreateAt";

function safeImage(value) {
    const url = String(value || "").trim();
    return /^https?:\/\//i.test(url) ? escapeHtml(url) : "";
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

function filteredArticles() {
    const query = document.getElementById("news-search")?.value.trim().toLocaleLowerCase("vi") || "";
    const category = document.getElementById("news-category-filter")?.value || "";
    return articles.filter(article =>
        (!query || `${repairVietnameseText(article.newsTitle || "")} ${repairVietnameseText(article.newsName || "")} ${repairVietnameseText(article.newsCategory || "")}`.toLocaleLowerCase("vi").includes(query))
        && (!category || article.newsCategory === category)
    ).sort((a, b) => {
        const comparison = repairVietnameseText(String(a.newsTitle || "")).localeCompare(repairVietnameseText(String(b.newsTitle || "")), "vi");
        const dated = new Date(a.newsCreateAt || 0) - new Date(b.newsCreateAt || 0);
        const result = sortKey === "newsTitle" ? comparison : dated;
        return sortDirection === "asc" ? result : -result;
    });
}

function renderTable() {
    const categories = [...new Set(articles.map(article => article.newsCategory).filter(Boolean))].sort((a, b) => repairVietnameseText(a).localeCompare(repairVietnameseText(b), "vi"));
    const categorySelect = document.getElementById("news-category-filter");
    const selectedCategory = categorySelect.value;
    categorySelect.innerHTML = `<option value="">Tất cả danh mục</option>${categories.map(category => `<option value="${escapeHtml(category)}">${escapeHtml(repairVietnameseText(category))}</option>`).join("")}`;
    categorySelect.value = categories.includes(selectedCategory) ? selectedCategory : "";
    const matches = filteredArticles();
    currentPage = Math.min(currentPage, Math.ceil(matches.length / PAGE_SIZE) || 1);
    const shown = matches.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const body = document.getElementById("news-body");
    body.innerHTML = shown.map(article => {
        const thumbnail = safeImage(article.newsImageThumbnail);
        return `<tr>
          <td>${thumbnail ? `<img class="table-thumb" src="${thumbnail}" alt="" loading="lazy">` : `<span class="table-thumb product-placeholder">VT</span>`}</td>
          <td><span class="table-primary">${escapeHtml(repairVietnameseText(article.newsTitle || article.newsName || "Không có tiêu đề"))}</span><div class="table-subtext">#${escapeHtml(article.newsId)} · ${escapeHtml(repairVietnameseText(article.newsName || ""))}</div></td>
          <td>${badge(repairVietnameseText(article.newsCategory))}</td><td>${formatDate(article.newsCreateAt)}</td>
          <td><div class="table-actions">
            <button class="button button-secondary" type="button" data-action="preview" data-id="${escapeHtml(article.newsId)}">Xem</button>
            <button class="button button-secondary" type="button" data-action="edit" data-id="${escapeHtml(article.newsId)}">Sửa</button>
            <button class="button button-danger" type="button" data-action="delete" data-id="${escapeHtml(article.newsId)}">Xóa</button>
          </div></td>
        </tr>`;
    }).join("");
    if (!shown.length) body.innerHTML = `<tr><td colspan="5">${emptyState(articles.length ? "Không tìm thấy bài viết" : "Chưa có bài viết")}</td></tr>`;
    renderPagination(document.getElementById("news-pagination"), currentPage, matches.length, PAGE_SIZE, page => {
        currentPage = page;
        renderTable();
    });
}

function renderPage() {
    content.innerHTML = `
      <section class="panel">
        <header class="panel-header"><div><h2>Danh sách tin tức</h2><p>${articles.length} bài viết từ API</p></div><button class="button button-primary" id="add-article" type="button">＋ Thêm bài viết</button></header>
        <div class="panel-body"><div class="toolbar">
          <input class="search-input" id="news-search" type="search" placeholder="Tìm tiêu đề hoặc danh mục..." aria-label="Tìm bài viết">
          <select class="filter-select" id="news-category-filter" aria-label="Lọc danh mục"><option value="">Tất cả danh mục</option></select>
        </div></div>
        <div class="table-wrap"><table class="data-table"><thead><tr><th>Ảnh</th><th><button class="sort-button" type="button" data-sort="newsTitle">Bài viết ↕</button></th><th>Danh mục</th><th><button class="sort-button" type="button" data-sort="newsCreateAt">Ngày đăng ↕</button></th><th>Thao tác</th></tr></thead><tbody id="news-body"></tbody></table></div>
        <div class="pagination-bar" id="news-pagination"></div>
      </section>`;
    document.getElementById("news-search").addEventListener("input", () => { currentPage = 1; renderTable(); });
    document.getElementById("news-category-filter").addEventListener("change", () => { currentPage = 1; renderTable(); });
    content.querySelectorAll("[data-sort]").forEach(button => button.addEventListener("click", () => {
        const nextKey = button.dataset.sort;
        sortDirection = sortKey === nextKey && sortDirection === "asc" ? "desc" : "asc";
        sortKey = nextKey;
        renderTable();
    }));
    document.getElementById("add-article").addEventListener("click", () => openArticleForm(null));
    renderTable();
}

function contentBlock(item = {}) {
    return `<div class="content-editor">
      <label class="field-label">Tên phần nội dung<input name="contentName" maxlength="180" value="${escapeHtml(repairVietnameseText(item.contentName || ""))}" placeholder="Ví dụ: Điểm nổi bật"></label>
      <label class="field-label">Nội dung<textarea name="contentText" required>${escapeHtml(repairVietnameseText(item.contentText || ""))}</textarea></label>
      <button class="button button-danger button-small" type="button" data-remove-content>Xóa phần này</button>
    </div>`;
}

function previewMarkup(values, form) {
    const contentBlocks = [...form.querySelectorAll(".content-editor")].map(block => ({
        contentName: repairVietnameseText(block.querySelector('[name="contentName"]').value.trim()),
        contentText: repairVietnameseText(block.querySelector('[name="contentText"]').value.trim())
    })).filter(block => block.contentText);
    const image = safeImage(values.get("newsImageThumbnail"));
    return `<div class="article-preview">
      <div class="section-subhead"><strong>Xem trước · ${escapeHtml(values.get("newsCategory") || "Chưa phân loại")}</strong><button class="button button-secondary button-small" type="button" data-hide-preview>Ẩn xem trước</button></div>
      ${image ? `<img class="article-preview-image" src="${image}" alt="${escapeHtml(values.get("newsTitle"))}">` : ""}
      <div class="article-preview-meta">${escapeHtml(values.get("newsCategory") || "Chưa phân loại")} · ${formatDate(values.get("newsCreateAt"))}</div>
      <h1 class="article-preview-title">${escapeHtml(values.get("newsTitle") || "Tiêu đề bài viết")}</h1>
      <p class="article-preview-name">${escapeHtml(values.get("newsName") || "")}</p>
      ${contentBlocks.length ? contentBlocks.map(block => `<section class="article-preview-content">${block.contentName ? `<h2>${escapeHtml(block.contentName)}</h2>` : ""}<p>${escapeHtml(block.contentText).replace(/\r?\n/g, "<br>")}</p></section>`).join("") : `<p class="text-muted">Chưa có nội dung.</p>`}</div>`;
}

function openArticleForm(article) {
    const existingBlocks = article?.contentResponses?.length ? article.contentResponses : [{}];
    const modal = openModal(article ? "Chỉnh sửa bài viết" : "Tạo bài viết mới", `
      <form id="news-form" class="form-stack">
        <div class="form-grid">
          <label class="field-label">Tên bài viết<input name="newsName" maxlength="180" required value="${escapeHtml(repairVietnameseText(article?.newsName || ""))}"></label>
          <label class="field-label">Tiêu đề<input name="newsTitle" maxlength="240" required value="${escapeHtml(repairVietnameseText(article?.newsTitle || ""))}"></label>
          <label class="field-label">Danh mục<input name="newsCategory" maxlength="100" required value="${escapeHtml(repairVietnameseText(article?.newsCategory || ""))}"></label>
          <label class="field-label">ID sản phẩm liên quan<input name="newsProductId" type="number" min="0" required value="${escapeHtml(article?.newsProductId ?? "")}"></label>
          <label class="field-label">Ngày đăng<input name="newsCreateAt" type="date" required value="${article?.newsCreateAt ? escapeHtml(String(article.newsCreateAt).slice(0, 10)) : ""}"></label>
          <label class="field-label">Ảnh thumbnail (URL)<input name="newsImageThumbnail" type="url" placeholder="https://..." value="${escapeHtml(article?.newsImageThumbnail || "")}"></label>
        </div>
        <label class="field-label">Ảnh liên quan (mỗi dòng: URL | mô tả)<textarea name="images" placeholder="https://example.com/image.jpg | Ảnh sản phẩm">${escapeHtml((article?.imageResponses || []).map(image => `${image.imageUrl || ""}${image.imageDescribe ? ` | ${repairVietnameseText(image.imageDescribe)}` : ""}`).join("\n"))}</textarea></label>
        <div><div class="section-subhead"><strong>Nội dung bài viết</strong><button class="button button-secondary button-small" type="button" id="add-content">＋ Thêm phần</button></div><div id="content-block-list">${existingBlocks.map(contentBlock).join("")}</div></div>
        <div id="article-preview" hidden></div>
        <p class="form-note">Ảnh được lưu bằng URL. Backend hiện không có API tải tệp. Dữ liệu gửi theo NewsCreationRequest/NewsUpdateRequest.</p>
        <p id="news-form-message" class="form-message" role="alert"></p>
        <div class="form-actions"><button class="button button-secondary" type="button" id="preview-article">Xem trước</button><button class="button button-secondary" type="button" data-close-modal>Hủy</button><button class="button button-primary" type="submit">Lưu bài viết</button></div>
      </form>`, { wide: true });
    const blocks = modal.querySelector("#content-block-list");
    blocks.addEventListener("click", event => {
        if (!event.target.closest("[data-remove-content]")) return;
        const items = blocks.querySelectorAll(".content-editor");
        if (items.length === 1) {
            showToast("Bài viết cần ít nhất một phần nội dung.", "error");
            return;
        }
        event.target.closest(".content-editor").remove();
    });
    modal.querySelector("#add-content").addEventListener("click", () => blocks.insertAdjacentHTML("beforeend", contentBlock()));
    const form = modal.querySelector("#news-form");
    modal.querySelector("#preview-article").addEventListener("click", () => {
        if (!form.reportValidity()) return;
        const preview = form.querySelector("#article-preview");
        preview.innerHTML = previewMarkup(new FormData(form), form);
        preview.hidden = false;
        preview.querySelector("[data-hide-preview]").addEventListener("click", () => { preview.hidden = true; });
        preview.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const values = new FormData(form);
        const images = imagePayload(String(values.get("images") || ""));
        if (images.some(image => !/^https?:\/\//i.test(image.imageUrl))) {
            modal.querySelector("#news-form-message").textContent = "Mỗi URL hình ảnh phải bắt đầu bằng http:// hoặc https://.";
            return;
        }
        const thumbnail = String(values.get("newsImageThumbnail") || "").trim();
        if (thumbnail && !/^https?:\/\//i.test(thumbnail)) {
            modal.querySelector("#news-form-message").textContent = "URL thumbnail phải bắt đầu bằng http:// hoặc https://.";
            return;
        }
        const contents = [...blocks.querySelectorAll(".content-editor")].map(block => ({
            contentName: block.querySelector('[name="contentName"]').value.trim(),
            contentText: block.querySelector('[name="contentText"]').value.trim()
        })).filter(block => block.contentText);
        if (!contents.length) {
            modal.querySelector("#news-form-message").textContent = "Vui lòng nhập nội dung bài viết.";
            return;
        }
        const date = String(values.get("newsCreateAt"));
        const payload = {
            newsProductId: Number(values.get("newsProductId")),
            newsName: String(values.get("newsName")).trim(),
            newsTitle: String(values.get("newsTitle")).trim(),
            newsCreateAt: new Date(`${date}T00:00:00`).toISOString(),
            newsCategory: String(values.get("newsCategory")).trim(),
            newsImageThumbnail: thumbnail,
            images,
            contents
        };
        const button = form.querySelector('[type="submit"]');
        button.disabled = true;
        button.textContent = "Đang lưu...";
        const request = article
            ? apiRequest(`/news/update/${encodeURIComponent(article.newsId)}`, { method: "PUT", body: payload })
            : apiRequest("/news/post", { method: "POST", body: payload });
        request.then(() => {
            modal.innerHTML = "";
            showToast(article ? "Đã cập nhật bài viết." : "Đã tạo bài viết.");
            return loadArticles();
        }).catch(error => {
            modal.querySelector("#news-form-message").textContent = error.message;
            button.disabled = false;
            button.textContent = "Lưu bài viết";
        });
    });
}

function previewArticle(article) {
    const thumbnail = safeImage(article.newsImageThumbnail);
    const contentBlocks = article.contentResponses || [];
    openModal("Xem trước bài viết", `
      ${thumbnail ? `<img class="article-preview-image" src="${thumbnail}" alt="${escapeHtml(repairVietnameseText(article.newsTitle || ""))}">` : ""}
      <div class="article-preview-meta">${escapeHtml(repairVietnameseText(article.newsCategory || "Chưa phân loại"))} · ${formatDate(article.newsCreateAt)}</div>
      <h1 class="article-preview-title">${escapeHtml(repairVietnameseText(article.newsTitle || article.newsName || ""))}</h1>
      <p class="article-preview-name">${escapeHtml(repairVietnameseText(article.newsName || ""))}</p>
      ${contentBlocks.map(block => `<section class="article-preview-content">${block.contentName ? `<h2>${escapeHtml(repairVietnameseText(block.contentName))}</h2>` : ""}<p>${escapeHtml(repairVietnameseText(block.contentText || "")).replace(/\r?\n/g, "<br>")}</p></section>`).join("")}`, { wide: true });
}

function loadArticles() {
    content.innerHTML = `<section class="panel panel-body"><span class="spinner" aria-hidden="true"></span> <span class="text-muted">Đang tải tin tức...</span></section>`;
    return apiRequest("/news").then(response => {
        articles = getCollection(response);
        renderPage();
    }).catch(error => { content.innerHTML = errorState(error.message); });
}

export function initPage() {
    loadArticles();
    content.addEventListener("click", event => {
        if (event.target.closest('[data-action="retry"]')) return loadArticles();
        const button = event.target.closest("[data-action][data-id]");
        if (!button) return;
        const article = articles.find(item => String(item.newsId) === button.dataset.id);
        if (!article) return;
        if (button.dataset.action === "preview") previewArticle(article);
        if (button.dataset.action === "edit") openArticleForm(article);
        if (button.dataset.action === "delete" && window.confirm(`Xóa bài viết "${repairVietnameseText(article.newsTitle || article.newsName || "")}"? Thao tác này không thể hoàn tác.`)) {
            apiRequest(`/news/delete/${encodeURIComponent(article.newsId)}`, { method: "DELETE" })
                .then(() => { showToast("Đã xóa bài viết."); return loadArticles(); })
                .catch(error => showToast(error.message, "error"));
        }
    });
}
