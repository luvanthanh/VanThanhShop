const params = new URLSearchParams(window.location.search);
const newsId = params.get('id');


fetch(`http://localhost:8888/api/news/${newsId}`)
    .then(res => {
        if (!res.ok) throw new Error("Không tìm thấy tin tức");
        return res.json();
    })
    .then(news => {
        const newsDiv = document.getElementById("section_two_content");
        newsDiv.innerHTML = " ";
        newsDiv.innerHTML = `
            <a href="Phone.html?id=${news.data.newsProductId}">
            <div class="news-detail">
                <div class="news-detail-content">
                    <h2>${news.data.newsTitle}</h2>
                    <div><b>Thời gian: </b> ${news.data.newsTime} </div>
                    <div><b>Ngày đăng: </b> ${news.data.newsDate} </div>
                    <img  src="${news.data.newsImage}" alt="${news.data.newsTitle}" class="news-detail-image">
                    <p>${news.data.newsContent}</p>
                </div>

                <div class="news-detail-content">
                    <img src="${news.data.newsImage1}" alt="${news.data.newsTitle1}" class="news-detail-image">
                    <p>${news.data.newsContent1}</p>
                </div>

                <div class="news-detail-content">
                    <img src="${news.data.newsImage2}" alt="${news.data.newsTitle2}" class="news-detail-image">
                    <p>${news.data.newsContent2}</p>
                </div>
                <div class="news-detail-content">
                    <img src="${news.data.newsImage3}" alt="${news.data.newsTitle3}" class="news-detail-image">
                    <p>${news.data.newsContent3}</p>
                </div>
            </div>
            </a>
        `;
    })
    .catch(error => console.error("Lỗi khi load dữ liệu từ API:", error));