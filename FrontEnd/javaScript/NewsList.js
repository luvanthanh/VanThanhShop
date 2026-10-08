document.addEventListener("DOMContentLoaded", () => {
    const newsListDiv = document.getElementById("news_list");
    const newsCount = document.getElementById("news-count");
    if (!newsListDiv) return;

    fetch(`http://localhost:8888/api/news`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Không thể tải danh sách tin tức");
            }
            return res.json();
        })
        .then(newsList => {
            const items = newsList && Array.isArray(newsList.data) ? newsList.data : [];
            if (items.length === 0) {
                if (newsCount) newsCount.textContent = "";
                newsListDiv.innerHTML = `
                    <p class="news-list-state">
                        <i class="fa-regular fa-newspaper"></i>
                        Hiện chưa có bài viết nào. Hãy quay lại sau nhé.
                    </p>
                `;
                return;
            }

            const getThumbnail = newsItem => {
                return newsItem.newsImageThumbnail ||
                    (newsItem.imageResponses && newsItem.imageResponses.length > 0 ? newsItem.imageResponses[0].imageUrl : null) ||
                    "";
            };

            const cards = items.map(news => {
                const date = news.newsDate
                    ? new Date(news.newsDate).toLocaleDateString("vi-VN")
                    : "";
                const content = [
                    news.newsContent,
                    news.newsContent1,
                    news.newsContent2,
                    ...(news.contentResponses || []).map(section => section.contentText)
                ]
                    .filter(Boolean)
                    .join(" ")
                    .replace(/\s+/g, " ")
                    .trim();
                const excerpt = content.length > 180
                    ? `${content.slice(0, 180).trimEnd()}…`
                    : content;
                const imageUrl = getThumbnail(news);
                const title = news.newsTitle || news.newsName || "Tin tức";

                return `
                    <a href="News.html?id=${encodeURIComponent(news.newsId)}" class="news-card">
                        <div class="news-card-image">
                            ${imageUrl ? `<img src="${imageUrl}" alt="${title}" loading="lazy">` : ""}
                        </div>
                        <div class="news-card-content">
                            <span class="news-card-category">Công nghệ</span>
                            <h2>${title}</h2>
                            ${date ? `
                                <span class="news-card-date">
                                    <i class="fa-regular fa-calendar"></i>${date}
                                </span>
                            ` : ""}
                            ${excerpt ? `<p>${excerpt}</p>` : ""}
                            <span class="news-card-read">Đọc bài viết <i class="fa-solid fa-arrow-right"></i></span>
                        </div>
                    </a>
                `;
            });

            newsListDiv.innerHTML = cards.join("");
            if (newsCount) {
                newsCount.textContent = `${items.length} bài viết`;
            }
        })
        .catch(error => {
            console.error("Lỗi:", error);
            newsListDiv.innerHTML = `
                <p class="news-list-state error">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    Không tải được tin tức. Vui lòng thử lại sau.
                </p>
            `;
        });

});