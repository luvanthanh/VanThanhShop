document.addEventListener("DOMContentLoaded", () => {
    const getThumbnail = item => {
        return item.newsImageThumbnail ||
            (item.imageResponses && item.imageResponses.length > 0 ? item.imageResponses[0].imageUrl : null) ||
            'default.jpg';
    };

    fetch("http://localhost:8888/api/news")
        .then(response => response.json())
        .then(news => {
            const newsSection = document.getElementById("section_one_news");
            if (!newsSection) return;
            const items = (news.data || []).slice(-3);
            if (items.length === 0) return;
            newsSection.innerHTML = "";
            items.forEach(item => {
                const title = window.repairVietnameseText(item.newsTitle || '');
                newsSection.innerHTML += `
                    <a href="News.html?id=${item.newsId}"><img src="${getThumbnail(item)}" alt="${title}" class="news-image"></a>
                `;
            });
        })
        .catch(error => console.error("Lỗi khi load dữ liệu từ API:", error));

    fetch("http://localhost:8888/api/news")
        .then(response => response.json())
        .then(news => {
            const listNews = document.getElementById("news");
            if (!listNews) return;
            listNews.innerHTML = "";
            (news.data || []).slice(-3).forEach(item => {
                const title = window.repairVietnameseText(item.newsTitle || '');
                listNews.innerHTML += `
                    <a class="news-content" href="News.html?id=${item.newsId}"> <img src="${getThumbnail(item)}" alt="${title}" class="news-image"> </a>
                `;
            });
        })
        .catch(error => console.error("Lỗi khi load dữ liệu từ API:", error));
});