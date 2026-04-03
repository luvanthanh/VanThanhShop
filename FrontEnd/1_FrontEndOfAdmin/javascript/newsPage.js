function newsPage() {
    const page = document.getElementById("content-right-page");

    page.innerHTML = "<p>Đang tải danh sách tin tức...</p>";

    fetch("http://localhost:8888/api/news")
        .then(res => {
            if (!res.ok) throw new Error("Không gọi được API");
            return res.json();
        })
        .then(newsItems => {

            let html = `
                <h2>Danh sách tin tức</h2>
                <table border="1" width="100%" cellspacing="0" cellpadding="8">
                    <thead>
                        <tr>
                            <th>News ID</th>
                            <th>Hình ảnh</th>
                            <th>Tiêu đề</th>
                            <th>Nội dung</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            newsItems.forEach(item => {
                html += `
                    <tr>
                        <td>${item.newsId}</td>
                        <td>
                            <img src="${item.newsImage}" 
                                alt="${item.newsTitle}" 
                                style="width:100px;height:auto;">
                        </td>
                        <td>${item.newsTitle}</td>
                        <td>${item.newsContent
                        ? (item.newsContent.length > 100 
                            ? item.newsContent.slice(0, 100) + "..." 
                            : item.newsContent)
                        : ""}
                        </td>
                        
                        <td>
                            <button onclick="editNews(${item.newsId})">Sửa</button>
                            <button onclick="deleteNews(${item.newsId})">Xóa</button>
                        </td>
                    </tr>
                `;
            });

            html += `
                    </tbody>
                </table>
            `;

            page.innerHTML = html;
        })
        .catch(err => {
            console.error("Lỗi khi lấy danh sách tin tức:", err);
            page.innerHTML = "<p style='color:red'>Đã xảy ra lỗi khi tải tin tức.</p>";
        });
}
