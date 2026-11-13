import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StorePage from "../../components/layout/StorePage.jsx";
import api from "../../lib/axiosClient.js";
import { getErrorMessage, getNewsImage } from "../../utils/format.js";

export default function NewsPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    api.get(`/api/news/id/${encodeURIComponent(id)}`).then((response) => {
      if (!response.data?.data || typeof response.data.data !== "object") {
        throw new Error("Không tìm thấy bài viết.");
      }
      if (active) setItem(response.data.data);
    }).catch((requestError) => {
      if (active) setError(getErrorMessage(requestError, "Không tải được tin tức."));
    });
    return () => { active = false; };
  }, [id]);

  const title = item?.newsTitle || item?.newsName || "Tin tức";
  useEffect(() => { if (item) document.title = `${title} | Văn Thành Shop`; }, [item, title]);

  return <StorePage pageStyles={["News.css"]}>
    <main className="news-page">
      <nav className="news-breadcrumb" aria-label="Điều hướng"><Link to="/">Trang chủ</Link><i className="fa-solid fa-chevron-right" /><Link to="/news">Tin tức</Link><i className="fa-solid fa-chevron-right" /><span>Chi tiết bài viết</span></nav>
      {error && <p className="error" role="alert">{error}</p>}
      {!item && !error && <p>Đang tải bài viết...</p>}
      {item && <article className="news-container">
        <div className="news-header"><div className="article-kicker"><i className="fa-solid fa-newspaper" /> Tin tức công nghệ</div><h1>{title}</h1><div className="meta"><span><i className="fa-regular fa-clock" /> {item.newsTime || ""}</span><span><i className="fa-regular fa-calendar" /> {item.newsDate ? new Date(item.newsDate).toLocaleDateString("vi-VN") : ""}</span></div></div>
        <div className="news-main">{getNewsImage(item) && <img src={getNewsImage(item)} className="main-img" alt={title} />}
          {(item.contentResponses || []).length ? item.contentResponses.map((section, index) => <div className="news-paragraph" key={`${section.contentName}-${index}`}>{section.contentName && <h3>{section.contentName}</h3>}<p>{section.contentText}</p></div>) : <p>{[item.newsContent, item.newsContent1, item.newsContent2].filter(Boolean).join("\n\n")}</p>}
        </div>
        {(item.imageResponses || []).slice(1).map((image) => <div className="news-section" key={image.imageUrl}><img src={image.imageUrl} alt={image.imageDescribe || title} />{image.imageDescribe && <p>{image.imageDescribe}</p>}</div>)}
        <div className="news-actions"><Link to="/news"><i className="fa-solid fa-arrow-left" /> Tất cả tin tức</Link>{item.newsProductId && <Link className="related-product" to={`/phone/${item.newsProductId}`}><i className="fa-solid fa-bag-shopping" /> Xem sản phẩm liên quan</Link>}</div>
      </article>}
    </main>
  </StorePage>;
}
