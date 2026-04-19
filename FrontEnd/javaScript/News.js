const params = new URLSearchParams(window.location.search);
const newsId = params.get('id');

fetch(`http://localhost:8888/api/news/${newsId}`)
    .then(res => {
        if (!res.ok) throw new Error("Không tìm thấy tin tức");
        return res.json();
    })
    .then(news => {

        const data = news.data;
        const newsDiv = document.getElementById("section_two_content");

        const date = data.newsDate 
            ? new Date(data.newsDate).toLocaleDateString("vi-VN") 
            : "";

        newsDiv.innerHTML = `
            <div class="news-container">

                <div class="news-header">
                    <h1>${data.newsTitle}</h1>
                    <div class="meta">
                        <span><i class="fa-regular fa-clock"></i> ${data.newsTime || ""}</span>
                        <span><i class="fa-regular fa-calendar"></i> ${date}</span>
                    </div>
                </div>

                <div class="news-main">
                    <img src="${data.newsImage}" class="main-img">
                    <p>${data.newsContent || ""}</p>
                </div>

                ${data.newsImage1 ? `
                <div class="news-section">
                    <img src="${data.newsImage1}">
                    <p>${data.newsContent1 || ""}</p>
                </div>` : ""}

                ${data.newsImage2 ? `
                <div class="news-section">
                    <img src="${data.newsImage2}">
                    <p>${data.newsContent2 || ""}</p>
                </div>` : ""}

                ${data.newsImage3 ? `
                <div class="news-section">
                    <img src="${data.newsImage3}">
                    <p>${data.newsContent3 || ""}</p>
                </div>` : ""}

                <div class="product-box">
                    <a href="Phone.html?id=${data.newsProductId}">
                        🛒 Xem sản phẩm liên quan
                    </a>
                </div>

            </div>
        `;
    })
    .catch(error => {
        console.error("Lỗi:", error);
        document.getElementById("section_two_content").innerHTML =
            "<p class='error'>Không tải được tin tức</p>";
    });