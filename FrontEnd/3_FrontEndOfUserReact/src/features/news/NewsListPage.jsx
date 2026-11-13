import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StorePage from "../../components/layout/StorePage.jsx";
import api from "../../lib/axiosClient.js";
import { getErrorMessage, getNewsImage } from "../../utils/format.js";

export default function NewsListPage() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api.get("/api/news").then((response) => {
      if (!Array.isArray(response.data?.data)) {
        throw new Error("Phản hồi danh sách tin tức không hợp lệ.");
      }
      if (active) setNews(response.data.data);
    }).catch((requestError) => {
      if (active) setError(getErrorMessage(requestError, "Không tải được tin tức."));
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, []);

  return <StorePage pageStyles={["NewsList.css"]}>
    <main className="news-list-page">
      <nav className="news-list-breadcrumb" aria-label="Điều hướng"><Link to="/">Trang chủ</Link><i className="fa-solid fa-chevron-right" /><span>Tin tức</span></nav>
      <section className="news-list-intro"><div className="news-list-intro-copy"><span className="news-list-eyebrow"><i className="fa-solid fa-sparkles" /> Góc công nghệ</span><h1>Tin tức mới nhất</h1><p>Cập nhật xu hướng, sản phẩm mới và những câu chuyện công nghệ đáng chú ý.</p></div><div className="news-list-intro-icon"><i className="fa-regular fa-newspaper" /></div></section>
      <section className="news-list-section"><div className="news-list-section-heading"><div><span className="news-list-section-kicker">Đọc và khám phá</span><h2>Bài viết dành cho bạn</h2></div><span className="news-list-count">{news.length ? `${news.length} bài viết` : ""}</span></div>
        <div className="news-list" aria-live="polite">
          {loading && <p className="news-list-state"><i className="fa-solid fa-spinner fa-spin" /> Đang tải tin tức...</p>}
          {error && <p className="news-list-state error" role="alert">{error}</p>}
          {!loading && !error && !news.length && <p className="news-list-state">Hiện chưa có bài viết nào. Hãy quay lại sau nhé.</p>}
          {!loading && !error && news.map((item) => {
            const title = item.newsTitle || item.newsName || "Tin tức";
            const content = [item.newsContent, item.newsContent1, item.newsContent2, ...(item.contentResponses || []).map((section) => section.contentText)].filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
            return <Link to={`/news/${encodeURIComponent(item.newsId)}`} className="news-card" key={item.newsId}>
              <div className="news-card-image">{getNewsImage(item) && <img src={getNewsImage(item)} alt={title} loading="lazy" />}</div>
              <div className="news-card-content"><span className="news-card-category">Công nghệ</span><h2>{title}</h2>{item.newsDate && <span className="news-card-date"><i className="fa-regular fa-calendar" />{new Date(item.newsDate).toLocaleDateString("vi-VN")}</span>}{content && <p>{content.length > 180 ? `${content.slice(0, 180).trimEnd()}…` : content}</p>}<span className="news-card-read">Đọc bài viết <i className="fa-solid fa-arrow-right" /></span></div>
            </Link>;
          })}
        </div>
      </section>
    </main>
  </StorePage>;
}
