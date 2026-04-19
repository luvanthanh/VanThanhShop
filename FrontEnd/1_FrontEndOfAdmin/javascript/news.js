import { api } from "./api.js";

export async function loadNews() {
    const content = document.getElementById("content");
    const news = await api.get("/news");

    content.innerHTML = news.map(n => `
        <div>
            ${n.newsTitle}
            <button onclick="deleteNews(${n.newsId})">Xóa</button>
        </div>
    `).join("");

    window.deleteNews = async (id) => {
        await api.delete(`/news/${id}`);
        loadNews();
    };
}