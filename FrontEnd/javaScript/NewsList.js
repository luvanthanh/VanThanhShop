document.addEventListener("DOMContentLoaded", () => {

    fetch(`http://localhost:8888/api/news`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Không thể tải danh sách tin tức");
            }
            return res.json();
        })
        .then(newsList => {

            const newsListDiv = document.getElementById("news_list");

            if (!newsList || !newsList.data || newsList.data.length === 0) {
                newsListDiv.innerHTML = "<p class='empty'>Không có tin tức</p>";
                return;
            }

            let html = "";

            newsList.data.forEach(news => {

                const date = news.newsDate 
                    ? new Date(news.newsDate).toLocaleDateString("vi-VN") 
                    : "";

                const content =
                    (news.newsContent || "") +
                    " " +
                    (news.newsContent1 || "") +
                    " " +
                    (news.newsContent2 || "");

                html += `
                    <a href="News.html?id=${news.newsId}" class="news-link">
                        <div class="news-item">

                            <div class="news-img">
                                <img src="${news.newsImage || 'default.jpg'}">
                            </div>

                            <div class="news-content">
                                <h2>${news.newsTitle || "Tin tức"}</h2>

                                <span class="date">
                                    <i class="fa-regular fa-calendar"></i>
                                    ${date}
                                </span>

                                <p>
                                    ${content.substring(0, 180)}...
                                </p>

                                <span class="read-more">Xem chi tiết →</span>
                            </div>

                        </div>
                    </a>
                `;
            });

            newsListDiv.innerHTML = html;

        })
        .catch(error => {
            console.error("Lỗi:", error);
            document.getElementById("news_list").innerHTML =
                "<p class='error'>Lỗi tải dữ liệu, vui lòng thử lại</p>";
        });

});