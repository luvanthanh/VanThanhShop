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
                    ${content.contentName ? `<h3>${content.contentName}</h3>` : ""}
                    <p>${content.contentText || ""}</p>
                </div>
            `).join("") || `<p>${data.newsContent || ""}</p>`;

            const extraImagesHtml = (data.imageResponses || []).slice(1).map(image => `
                <div class="news-section">
                    <img src="${image.imageUrl}" alt="${image.imageDescribe || data.newsTitle || 'Tin tức'}">
                    ${image.imageDescribe ? `<p>${image.imageDescribe}</p>` : ""}
                </div>
            `).join("");

            newsDiv.innerHTML = `
                <div class="news-container">

                    <div class="news-header">
                        <h1>${data.newsTitle || data.newsName || 'Tin tức'}</h1>
                        <div class="meta">
                            <span><i class="fa-regular fa-clock"></i> ${data.newsTime || ""}</span>
                            <span><i class="fa-regular fa-calendar"></i> ${date}</span>
                        </div>
                    </div>

                    <div class="news-main">
                        <img src="${getThumbnail(data)}" class="main-img" alt="${data.newsTitle || data.newsName || 'Tin tức'}">
                        ${contentHtml}
                    </div>

                    ${extraImagesHtml}

                    <div class="product-box">
                        <a href="Phone.html?id=${data.newsProductId || ''}">
                            🛒 Xem sản phẩm liên quan
                        </a>
                    </div>

                </div>
            `;
        })
        .catch(error => {
            console.error("Lỗi:", error);
            newsDiv.innerHTML = "<p class='error'>Không tải được tin tức</p>";
        });
});