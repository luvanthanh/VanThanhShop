import { createBrowserRouter, Link, Navigate } from "react-router-dom";
import StorePage from "../components/layout/StorePage.jsx";
import CartPage from "../features/cart/CartPage.jsx";
import LoginPage from "../features/auth/LoginPage.jsx";
import RegisterPage from "../features/auth/RegisterPage.jsx";
import ProfilePage from "../features/auth/ProfilePage.jsx";
import HomePage from "../features/products/HomePage.jsx";
import ProductPage from "../features/products/ProductPage.jsx";
import NewsListPage from "../features/news/NewsListPage.jsx";
import NewsPage from "../features/news/NewsPage.jsx";
import OrdersPage from "../features/orders/OrdersPage.jsx";
import intro1 from "../assets/images/introduct1.jpg";
import intro2 from "../assets/images/introduct2.jpg";
import intro3 from "../assets/images/introduct3.jpg";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/phone/:id", element: <ProductPage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/about",
    element: (
      <StorePage pageStyles={["Introduce.css"]}>
        <AboutPage />
      </StorePage>
    ),
  },
  { path: "/news", element: <NewsListPage /> },
  { path: "/news/:id", element: <NewsPage /> },
  { path: "/orders", element: <OrdersPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "*", element: <Navigate to="/" replace /> },
]);

function AboutPage() {
  return (
    <main className="about-page">
      <nav className="about-breadcrumb" aria-label="Điều hướng">
        <Link to="/">Trang chủ</Link><i className="fa-solid fa-chevron-right" aria-hidden="true" /><span>Giới thiệu</span>
      </nav>
      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-hero-copy">
          <span className="about-eyebrow"><i className="fa-solid fa-sparkles" aria-hidden="true" /> VỀ VĂN THÀNH SHOP</span>
          <h1 id="about-title">Công nghệ kết nối<br /><span>trải nghiệm mua sắm.</span></h1>
          <p>Văn Thành Shop là website bán điện thoại được xây dựng với mục tiêu mang đến trải nghiệm tìm hiểu và mua sắm trực quan, thuận tiện.</p>
          <div className="about-hero-actions"><Link className="about-button about-button-primary" to="/">Khám phá sản phẩm <i className="fa-solid fa-arrow-right" /></Link><a className="about-button about-button-secondary" href="#about-project">Tìm hiểu dự án</a></div>
        </div>
        <div className="about-hero-art" aria-hidden="true">
          <div className="about-art-glow" /><div className="about-device"><div className="about-device-speaker" /><div className="about-device-screen"><span className="about-device-icon"><i className="fa-solid fa-mobile-screen-button" /></span><span className="about-device-caption">SHOP SMART</span><span className="about-device-title">Chọn điều<br />bạn yêu thích.</span><span className="about-device-line" /><span className="about-device-dots"><i /><i /><i /></span></div></div>
          <span className="about-float about-float-top"><i className="fa-solid fa-bolt" /> Trải nghiệm số</span><span className="about-float about-float-bottom"><i className="fa-solid fa-layer-group" /> Microservices</span>
        </div>
      </section>
      <section className="about-personal" aria-labelledby="personal-title">
        <div className="about-personal-copy"><span className="about-section-kicker">NGƯỜI ĐỨNG SAU DỰ ÁN</span><h2 id="personal-title">Xin chào, mình là Thành.</h2><p>Mình xây dựng Văn Thành Shop như một dự án kết hợp niềm yêu thích công nghệ với trải nghiệm mua sắm trực tuyến. Từ giao diện đến các chức năng sản phẩm, giỏ hàng và đơn hàng, mỗi phần đều là cơ hội để mình học hỏi và hoàn thiện kỹ năng phát triển web.</p><p>Mục tiêu của mình là tạo nên một nơi giúp bạn dễ dàng khám phá các thiết bị công nghệ và tìm được sản phẩm phù hợp.</p><Link className="about-personal-link" to="/">Khám phá sản phẩm <i className="fa-solid fa-arrow-right" /></Link></div>
        <div className="about-personal-gallery" aria-label="Một vài hình ảnh của Thành">
          <figure className="about-personal-photo about-personal-photo-main"><img src={intro1} alt="Thành, người xây dựng dự án Văn Thành Shop" /><figcaption>Người xây dựng Văn Thành Shop</figcaption></figure>
          <figure className="about-personal-photo about-personal-photo-top"><img src={intro2} alt="Ảnh chân dung của Thành" /></figure><figure className="about-personal-photo about-personal-photo-bottom"><img src={intro3} alt="Ảnh cá nhân của Thành" /></figure><span className="about-personal-decoration"><i className="fa-solid fa-heart" /> Công nghệ & trải nghiệm</span>
        </div>
      </section>
      <section className="about-project" id="about-project"><div className="about-section-heading"><span className="about-section-kicker">CÂU CHUYỆN PHÍA SAU</span><h2>Một website, nhiều dịch vụ phối hợp</h2><p>Dự án được tổ chức theo kiến trúc microservices để từng nhóm chức năng có thể phát triển và vận hành độc lập.</p></div><div className="about-feature-grid">
        <article className="about-feature-card"><span className="about-feature-icon"><i className="fa-solid fa-bag-shopping" /></span><h3>Tập trung vào mua sắm</h3><p>Tìm hiểu sản phẩm, quản lý giỏ hàng, theo dõi đơn hàng và cập nhật thông tin tài khoản trên cùng một website.</p></article>
        <article className="about-feature-card"><span className="about-feature-icon"><i className="fa-solid fa-cubes-stacked" /></span><h3>Chia nhỏ theo chức năng</h3><p>Các nghiệp vụ sản phẩm, người dùng, giỏ hàng, đơn hàng và tin tức được xử lý bởi những service riêng.</p></article>
        <article className="about-feature-card"><span className="about-feature-icon"><i className="fa-solid fa-shield-halved" /></span><h3>Nền tảng có cấu trúc</h3><p>Spring Security hỗ trợ xác thực và kiểm soát truy cập; dữ liệu của các service được lưu trong MySQL.</p></article>
      </div></section>
      <section className="about-architecture"><div className="about-architecture-copy"><span className="about-section-kicker">CÁCH HỆ THỐNG HOẠT ĐỘNG</span><h2>Từ giao diện đến từng dịch vụ</h2><p>Yêu cầu từ giao diện đi qua API Gateway, sau đó được định tuyến đến service phù hợp. Eureka hỗ trợ đăng ký và khám phá các service trong hệ thống.</p><div className="about-tech-list"><span>Java</span><span>Spring Boot</span><span>Spring Cloud</span><span>MySQL</span><span>React</span></div></div>
        <div className="about-flow"><div className="about-flow-entry"><span className="about-flow-icon"><i className="fa-solid fa-display" /></span><span><strong>Giao diện</strong><small>React</small></span></div><div className="about-flow-connector"><span /><i className="fa-solid fa-chevron-right" /></div><div className="about-flow-gateway"><span className="about-flow-icon"><i className="fa-solid fa-shuffle" /></span><span><strong>API Gateway</strong><small>Điều phối yêu cầu</small></span></div><div className="about-flow-services"><div><i className="fa-solid fa-mobile-screen-button" /> Product</div><div><i className="fa-solid fa-user" /> User</div><div><i className="fa-solid fa-cart-shopping" /> Cart</div><div><i className="fa-solid fa-box" /> Order</div><div><i className="fa-solid fa-newspaper" /> News</div></div><div className="about-flow-note"><i className="fa-solid fa-diagram-project" /> Eureka hỗ trợ khám phá dịch vụ</div></div>
      </section>
      <section className="about-cta"><div><span className="about-section-kicker">SẴN SÀNG KHÁM PHÁ?</span><h2>Đi tìm thiết bị phù hợp với bạn.</h2><p>Khám phá danh sách sản phẩm và những tin tức công nghệ mới trên Văn Thành Shop.</p></div><div className="about-cta-actions"><Link to="/">Xem sản phẩm <i className="fa-solid fa-arrow-right" /></Link><Link to="/news">Đọc tin tức</Link></div></section>
    </main>
  );
}

export default router;
