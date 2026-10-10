export function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
}

const windows1252Bytes = new Map([
    [0x20ac, 0x80], [0x201a, 0x82], [0x0192, 0x83], [0x201e, 0x84],
    [0x2026, 0x85], [0x2020, 0x86], [0x2021, 0x87], [0x02c6, 0x88],
    [0x2030, 0x89], [0x0160, 0x8a], [0x2039, 0x8b], [0x0152, 0x8c],
    [0x017d, 0x8e], [0x2018, 0x91], [0x2019, 0x92], [0x201c, 0x93],
    [0x201d, 0x94], [0x2022, 0x95], [0x2013, 0x96], [0x2014, 0x97],
    [0x02dc, 0x98], [0x2122, 0x99], [0x0161, 0x9a], [0x203a, 0x9b],
    [0x0153, 0x9c], [0x017e, 0x9e], [0x0178, 0x9f]
]);
const mojibakePattern = /(?:Ã|Â|Ä|Å|Æ|â|ä|å|æ|ç|ð|ñ|ø|þ)[\u0080-\u00ff\u2013\u2014\u2018\u2019\u20ac]|á(?:º|»)[\u0080-\u00ff\u2013-\u203a\u20ac]/g;

function recoverUtf8(value) {
    const normalized = value.replace(/Ã /g, "Ã\u00a0");
    const encoder = new TextEncoder();
    const bytes = [];
    const sourceCharacters = [];

    for (const character of normalized) {
        const codePoint = character.codePointAt(0);
        const byte = codePoint <= 0xff ? codePoint : windows1252Bytes.get(codePoint);
        if (byte !== undefined) {
            bytes.push(byte);
            sourceCharacters.push(character);
        } else {
            const encoded = encoder.encode(character);
            bytes.push(...encoded);
            sourceCharacters.push(...Array(encoded.length).fill(character));
        }
    }

    const decoder = new TextDecoder("utf-8", { fatal: true });
    let recovered = "";
    for (let index = 0; index < bytes.length;) {
        const firstByte = bytes[index];
        const sequenceLength = firstByte < 0x80 ? 1
            : firstByte >= 0xc2 && firstByte <= 0xdf ? 2
                : firstByte >= 0xe0 && firstByte <= 0xef ? 3
                    : firstByte >= 0xf0 && firstByte <= 0xf4 ? 4
                        : 0;
        if (sequenceLength && index + sequenceLength <= bytes.length) {
            try {
                recovered += decoder.decode(new Uint8Array(bytes.slice(index, index + sequenceLength)));
                index += sequenceLength;
                continue;
            } catch {
                // Preserve invalid bytes while continuing to recover other sequences.
            }
        }
        recovered += sourceCharacters[index];
        index += 1;
    }
    return recovered;
}

export function repairVietnameseText(value) {
    if (typeof value !== "string") return value;
    let result = value.replace(/([Cc])hÃnh/g, (_, firstLetter) => `${firstLetter}hính`);
    for (let attempt = 0; attempt < 3; attempt += 1) {
        mojibakePattern.lastIndex = 0;
        if (!mojibakePattern.test(result)) break;
        mojibakePattern.lastIndex = 0;
        const recovered = recoverUtf8(result);
        if (recovered === result) break;
        result = recovered;
    }
    mojibakePattern.lastIndex = 0;
    return result;
}

export function formatCurrency(value) {
    if (value === null || value === undefined || value === "") return "—";
    const amount = Number(value);
    return Number.isFinite(amount)
        ? `${new Intl.NumberFormat("vi-VN").format(amount)} ₫`
        : "—";
}

export function formatDate(value) {
    if (!value) return "—";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? escapeHtml(value) : new Intl.DateTimeFormat("vi-VN").format(date);
}

export function initials(value) {
    return String(value || "Admin").trim().split(/\s+/).slice(0, 2)
        .map(part => part.charAt(0).toUpperCase()).join("") || "A";
}

export function showToast(message, type = "success") {
    const region = document.getElementById("toast-region");
    if (!region) return;
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.setAttribute("role", type === "error" ? "alert" : "status");
    toast.textContent = message;
    region.append(toast);
    window.setTimeout(() => toast.remove(), 4500);
}

export function loadingState(message = "Đang tải dữ liệu...") {
    return `<div class="state-card"><span class="spinner" aria-hidden="true"></span><p>${escapeHtml(message)}</p></div>`;
}

export function emptyState(title, description = "Thử thay đổi bộ lọc hoặc thêm dữ liệu mới.") {
    return `<div class="state-card empty-state"><span class="state-icon" aria-hidden="true">⌕</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p></div>`;
}

export function errorState(message, retryAction = "retry") {
    return `<div class="state-card error-state"><span class="state-icon" aria-hidden="true">!</span><h3>Không thể tải dữ liệu</h3><p>${escapeHtml(message)}</p><button class="button button-secondary" type="button" data-action="${retryAction}">Thử lại</button></div>`;
}

export function badge(value) {
    const text = String(value || "Chưa cập nhật");
    const className = text.toLowerCase().includes("cancel") || text.toLowerCase().includes("hủy")
        ? "badge badge-danger"
        : text.toLowerCase().includes("deliver") || text.toLowerCase().includes("hoàn")
            ? "badge badge-success"
            : "badge badge-neutral";
    return `<span class="${className}">${escapeHtml(text)}</span>`;
}

export function openModal(title, body, options = {}) {
    const root = document.getElementById("modal-root");
    root.innerHTML = `
      <div class="modal-backdrop" data-close-modal>
        <section class="modal-card ${options.wide ? "modal-wide" : ""}" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <header class="modal-header">
            <div><p class="eyebrow">VAN THANH SHOP</p><h2 id="modal-title">${escapeHtml(title)}</h2></div>
            <button class="icon-button" type="button" aria-label="Đóng" data-close-modal>×</button>
          </header>
          <div class="modal-body">${body}</div>
        </section>
      </div>`;
    root.querySelectorAll("[data-close-modal]").forEach(element => element.addEventListener("click", event => {
        if (event.target === element || element.closest(".icon-button")) root.innerHTML = "";
    }));
    const firstInput = root.querySelector("input, textarea, select, button");
    if (firstInput) firstInput.focus();
    const handleEscape = event => {
        if (event.key === "Escape") {
            root.innerHTML = "";
            document.removeEventListener("keydown", handleEscape);
        }
    };
    document.addEventListener("keydown", handleEscape);
    return root;
}

export function renderPagination(container, currentPage, totalItems, pageSize, onPageChange) {
    const pages = Math.max(1, Math.ceil(totalItems / pageSize));
    const safePage = Math.min(Math.max(currentPage, 1), pages);
    container.innerHTML = `
      <span class="pagination-info">${totalItems ? `Hiển thị ${(safePage - 1) * pageSize + 1}–${Math.min(safePage * pageSize, totalItems)} / ${totalItems}` : "0 kết quả"}</span>
      <div class="pagination-actions">
        <button class="button button-secondary button-small" type="button" data-page="${safePage - 1}" ${safePage <= 1 ? "disabled" : ""}>Trước</button>
        <span class="page-number">${safePage} / ${pages}</span>
        <button class="button button-secondary button-small" type="button" data-page="${safePage + 1}" ${safePage >= pages ? "disabled" : ""}>Sau</button>
      </div>`;
    container.querySelectorAll("[data-page]").forEach(button => button.addEventListener("click", () => {
        onPageChange(Number(button.dataset.page));
    }));
    return safePage;
}
