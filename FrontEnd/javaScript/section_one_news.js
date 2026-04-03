fetch("http://localhost:8888/api/news")
    .then(response => response.json())
    .then(news => {
        let newsSection = document.getElementById("section_one_news");
        newsSection.innerHTML = " ";
        news.data.slice(-3).forEach(item =>{
            newsSection.innerHTML += `
                <a href = "News.html?id=${item.newsId}"><img src="${item.newsImage}" alt="${item.newsTitle}" class="news-image"> </a>
            `;
        });
    })
    .catch(error => console.error("Lỗi khi load dữ liệu từ API:", error));


fetch("http://localhost:8888/api/news")
.then(response => response.json())
.then(news => {
    
    let listNews = document.getElementById("news");
    listNews.innerHTML = " ";
    news.data.slice(-3).forEach(item =>{
        listNews.innerHTML += `
            <a class="news-content" href="News.html?id=${item.newsId}"> <img src="${item.newsImage}" alt="${item.newsTitle}" class="news-image"> </a>
        `;
    });
})
.catch(error => console.error("Lỗi khi load dữ liệu từ API:", error));