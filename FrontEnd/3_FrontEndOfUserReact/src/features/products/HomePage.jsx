import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import StorePage from "../../components/layout/StorePage.jsx";
import Feedback from "../../components/common/Feedback.jsx";
import api from "../../lib/axiosClient.js";
import { formatMoney, getErrorMessage, getProductImage } from "../../utils/format.js";
import slide1 from "../../assets/images/slide1.png";
import slide2 from "../../assets/images/slide2.png";
import slide3 from "../../assets/images/slide3.png";
import slide4 from "../../assets/images/slide4.png";
import slide5 from "../../assets/images/slide5.png";
import promo1 from "../../assets/images/section_one_img1.png";
import promo2 from "../../assets/images/section_one_img2.png";
import promo3 from "../../assets/images/section_one_img3.png";

const slides = [slide1, slide2, slide3, slide4, slide5];
const brands = ["all", "iphone", "samsung", "oppo", "vivo", "realme", "xiaomi", "nubia", "honor", "nothing"];
const filters = [
  { title: "Sắp xếp", icon: "fa-mobile-button", options: [["Giá tiền tăng dần", "sort-up"], ["Giá tiền giảm dần", "sort-down"]] },
  { title: "Mức giá", icon: "fa-sack-dollar", options: [["Dưới 5 triệu", "price:0:5000000"], ["5 - 10 triệu", "price:5000000:10000000"], ["10 - 15 triệu", "price:10000000:15000000"], ["15 - 20 triệu", "price:15000000:20000000"], ["20 - 30 triệu", "price:20000000:30000000"], ["Trên 30 triệu", "price:30000000:50000000"]] },
  { title: "RAM", icon: "fa-microchip", options: [4, 6, 8, 12, 16].map((value) => [`${value} GB`, `ram:${value}`]) },
  { title: "Bộ nhớ trong", icon: "fa-sd-card", options: [32, 64, 128, 256, 512, 1000].map((value) => [`${value >= 1000 ? "1 TB" : `${value} GB`}`, `rom:${value}`]) },
  { title: "Kích thước", icon: "fa-maximize", options: [["Dưới 5 inches", "screen:0:5"], ["5 - 5.5 inches", "screen:5:5.5"], ["5.5 - 6 inches", "screen:5.5:6"], ["6 - 6.5 inches", "screen:6:6.5"], ["Trên 6.5 inches", "screen:6.5:8"]] },
  { title: "Màu sắc", icon: "fa-palette", options: [["Đen", "color:black"], ["Trắng", "color:white"], ["Bạc", "color:metallic"], ["Cam", "color:orange"], ["Xanh", "color:blue"], ["Tím", "color:purple"], ["Hồng", "color:pink"]] },
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [slide, setSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const pageSize = 8;

  useEffect(() => {
    let active = true;
    async function loadProducts() {
      setLoading(true);
      setError("");
      try {
        const path = search ? `/api/products/name/${encodeURIComponent(search)}` : "/api/products";
        const response = await api.get(path);
        if (!Array.isArray(response.data?.data)) {
          throw new Error("Phản hồi danh sách sản phẩm không hợp lệ.");
        }
        if (active) {
          setProducts(response.data.data);
          setPage(1);
        }
      } catch (requestError) {
        if (active) setError(getErrorMessage(requestError, "Không tải được sản phẩm."));
      } finally {
        if (active) setLoading(false);
      }
    }
    loadProducts();
    return () => { active = false; };
  }, [search]);

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  const pageCount = Math.ceil(products.length / pageSize);
  const visibleProducts = useMemo(() => products.slice((page - 1) * pageSize, page * pageSize), [products, page]);

  async function filterProducts(key, value) {
    setLoading(true);
    setError("");
    try {
      const endpoints = {
        brand: `/api/products/brand/${encodeURIComponent(value)}`,
        price: `/api/products/price?min=${value[0]}&max=${value[1]}`,
        ram: `/api/products/ram/${value}`,
        rom: `/api/products/rom/${value}`,
        screen: `/api/products/screen?min=${value[0]}&max=${value[1]}`,
        color: `/api/products/color/${encodeURIComponent(value)}`,
        sort: `/api/products/sort/price/${value}`,
      };
      const response = key === "brand" && value === "all" ? await api.get("/api/products") : await api.get(endpoints[key]);
      if (!Array.isArray(response.data?.data)) {
        throw new Error("Phản hồi danh sách sản phẩm không hợp lệ.");
      }
      setProducts(response.data.data);
      setPage(1);
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Không thể lọc sản phẩm."));
    } finally {
      setLoading(false);
    }
  }

  async function chooseFilter(value) {
    if (value === "sort-up" || value === "sort-down") {
      await filterProducts("sort", value === "sort-up" ? "create" : "decrease");
      return;
    }
    const [key, ...parts] = value.split(":");
    const parsed = parts.length === 2 ? parts.map(Number) : parts[0];
    await filterProducts(key, parsed);
  }

  return (
    <StorePage pageStyles={["Home_section_one.css", "Home_section_two.css"]}>
      <main>
        <section className="section-one" aria-label="Tin tức và chương trình nổi bật">
          <div className="section-one-content">
            <div className="section-one-left">{[promo1, promo2, promo3].map((image, index) => <Link key={image} to="/news" aria-label={`Xem ưu đãi ${index + 1}`}><img src={image} alt={`Ưu đãi tại Văn Thành Shop ${index + 1}`} /></Link>)}</div>
            <div className="section-one-right">
              <div className="slider-controls"><button className="slider-btn" type="button" aria-label="Ảnh trước" onClick={() => setSlide((slide + slides.length - 1) % slides.length)}><i className="fa fa-chevron-left" /></button><button className="slider-btn" type="button" aria-label="Ảnh tiếp theo" onClick={() => setSlide((slide + 1) % slides.length)}><i className="fa fa-chevron-right" /></button></div>
              <div className="list-slides"><img src={slides[slide]} alt={`Ưu đãi nổi bật ${slide + 1}`} /></div>
            </div>
          </div>
        </section>
        <section className="section-two" aria-labelledby="products-heading">
          <div className="top"><div className="section-heading"><span className="section-eyebrow">Khám phá sản phẩm</span><h1 className="top-content" id="products-heading">Điện thoại nổi bật</h1></div>
            <div className="top-list" aria-label="Lọc theo thương hiệu">{brands.map((brand) => <button className="top-list-box" key={brand} type="button" onClick={() => filterProducts("brand", brand)}>{brand.toUpperCase()}</button>)}</div>
          </div>
          <div className="content"><div className="content-left">
            <div className="filter"><div className="filter-top">Tìm kiếm nhanh</div><div className="filter-list">
              {filters.map((filter) => <div className="filter-list-box" key={filter.title}><i className={`fa-solid ${filter.icon}`} />{filter.title}<div className="filter-list-box-menu2"><ul>{filter.options.map(([label, value]) => <li key={value} onClick={() => chooseFilter(value)}>{label}</li>)}</ul></div></div>)}
            </div></div>
            <div className="news">{[promo1, promo2, promo3].map((image) => <Link to="/news" key={image}><img src={image} alt="Tin tức Văn Thành Shop" /></Link>)}</div>
          </div>
          <div className="list-products" aria-live="polite">
            {loading && <Feedback>Đang tải sản phẩm...</Feedback>}
            {!loading && error && <Feedback error>{error}</Feedback>}
            {!loading && !error && visibleProducts.map((product) => {
              const variant = product.productVariantResponses?.[0] || {};
              return <article className="product" key={product.productId}>
                <Link to={`/phone/${product.productId}`}><img src={getProductImage(product)} alt={product.productName || "Điện thoại"} /><div className="product-name">{product.productName}</div>
                  <div className="configuration-product"><span className="configuration-product-button">{product.productScreenSize ?? "-"} inches</span><span className="configuration-product-button">{variant.productRam ?? "N/A"} GB</span><span className="configuration-product-button">{variant.productRom ?? "N/A"} GB</span></div>
                  <div className="describe-product">{product.productDescription}</div><div className="price-product">{formatMoney(variant.productPrice)}</div>
                </Link><Link className="product-phone" to={`/phone/${product.productId}`}>Mua ngay</Link>
              </article>;
            })}
            {!loading && !error && products.length === 0 && <Feedback>Không tìm thấy sản phẩm phù hợp.</Feedback>}
          </div></div>
          <div className="pagination"><button type="button" aria-label="Trang trước" disabled={page <= 1} onClick={() => setPage((value) => value - 1)}>&lt;</button>
            {Array.from({ length: pageCount }, (_, index) => <button type="button" key={index + 1} className={page === index + 1 ? "active-page" : ""} onClick={() => setPage(index + 1)}>{index + 1}</button>)}
            <button type="button" aria-label="Trang sau" disabled={page >= pageCount} onClick={() => setPage((value) => value + 1)}>&gt;</button></div>
        </section>
      </main>
    </StorePage>
  );
}
