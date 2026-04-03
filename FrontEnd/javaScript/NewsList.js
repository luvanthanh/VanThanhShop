fetch(`http://localhost:8888/api/news`)
    .then(res => {
        if (!res.ok) {
            throw new Error("Không thể tải danh sách tin tức");
        }
        return res.json();
    })
    .then(newsList => {
        const newsListDiv = document.getElementById("news_list");

        // ✅ check data tồn tại
        if (!newsList || !newsList.data || newsList.data.length === 0) {
            newsListDiv.innerHTML = "<p>Không có tin tức</p>";
            return;
        }

        // ✅ build HTML trước (tối ưu performance)
        let html = "";

        newsList.data.forEach(news => {
            html += `
                <a href="News.html?id=${news.newsId}">
                    <div class="news-item">
                        <img 
                            src="${news.newsImage || 'default.jpg'}" 
                            alt="${news.newsTitle || 'No title'}" 
                            class="news-item-image"
                        >
                        <div class="news-item-content">
                            <p><b>Ngày đăng:</b> ${news.newsDate || ''}</p>
                            <p>-${news.newsContent ? news.newsContent.substring(0, 200) : ""}...</p>
                            <p>-${news.newsContent1 ? news.newsContent1.substring(0, 200) : ""}...</p>
                            <p>-${news.newsContent2 ? news.newsContent2.substring(0, 200) : ""}...</p>
                        </div>
                    </div>
                </a>
            `;
        });

        // ✅ render 1 lần
        newsListDiv.innerHTML = html;
    })
    .catch(error => {
        console.error("Lỗi khi load dữ liệu từ API:", error);
        document.getElementById("news_list").innerHTML =
            "<p>Lỗi tải dữ liệu, vui lòng thử lại</p>";
    });