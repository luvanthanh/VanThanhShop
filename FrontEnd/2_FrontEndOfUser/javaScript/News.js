document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const newsId = params.get('id');

    const newsDiv = document.getElementById("section_two_content");
    if (!newsDiv) {
        console.error('Không tìm thấy element section_two_content');
        return;
    }

    if (!newsId) {
        newsDiv.innerHTML = "<p class='error'>Thiếu ID tin tức</p>";
        return;
    }

    fetch(`http://localhost:8888/api/news/id/${newsId}`)
        .then(res => {
            if (!res.ok) throw new Error("Không tìm thấy tin tức");
            return res.json();
        })
        .then(news => {
            const data = news.data || {};
            const title = window.repairVietnameseText(data.newsTitle || data.newsName || 'Tin tức');

            const date = data.newsDate
                ? new Date(data.newsDate).toLocaleDateString("vi-VN")
                : "";

            const getThumbnail = dataItem => {
                return dataItem.newsImageThumbnail ||
                    (dataItem.imageResponses && dataItem.imageResponses.length > 0 ? dataItem.imageResponses[0].imageUrl : null) ||
                    'default.jpg';
            };

            const contentHtml = (data.contentResponses || []).map(content => `
                <div class="news-paragraph">
                    ${content.contentName ? `<h3>${window.repairVietnameseText(content.contentName)}</h3>` : ""}
                    <p>${window.repairVietnameseText(content.contentText || "")}</p>
                </div>
            `).join("") || `<p>${window.repairVietnameseText(data.newsContent || "")}</p>`;

            const extraImagesHtml = (data.imageResponses || []).slice(1).map(image => `
                <div class="news-section">
                    <img src="${image.imageUrl}" alt="${window.repairVietnameseText(image.imageDescribe || title)}">
                    ${image.imageDescribe ? `<p>${window.repairVietnameseText(image.imageDescribe)}</p>` : ""}
                </div>
            `).join("");

            document.title = `${title} | Văn Thành Shop`;
            newsDiv.innerHTML = `
                <article class="news-container">
                    <div class="news-header">
                        <div class="article-kicker"><i class="fa-solid fa-newspaper"></i> Tin tức công nghệ</div>
                        <h1>${title}</h1>
                        <div class="meta">
                            <span><i class="fa-regular fa-clock"></i> ${data.newsTime || ""}</span>
                            <span><i class="fa-regular fa-calendar"></i> ${date}</span>
                        </div>
                    </div>

                    <div class="news-main">
                        <img src="${getThumbnail(data)}" class="main-img" alt="${title}">
                        ${contentHtml}
                    </div>

                    ${extraImagesHtml}

                    <div class="news-actions">
                        <a href="ListNews.html"><i class="fa-solid fa-arrow-left"></i> Tất cả tin tức</a>
                        ${data.newsProductId ? `
                            <a class="related-product" href="Phone.html?id=${data.newsProductId}">
                                <i class="fa-solid fa-bag-shopping"></i> Xem sản phẩm liên quan
                            </a>
                        ` : ""}
                    </div>
                </article>
            `;
        })
        .catch(error => {
            console.error("Lỗi:", error);
            newsDiv.innerHTML = "<p class='error'>Không tải được tin tức</p>";
        });
});