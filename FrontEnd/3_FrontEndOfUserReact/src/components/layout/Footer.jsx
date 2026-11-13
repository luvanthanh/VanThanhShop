import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="section-three">
        <div className="section-three-content">
          <div className="box"><div className="box-Head">Về Văn Thành Shop</div><Link to="/about">Giới thiệu công ty</Link><Link to="/">Sản phẩm</Link><Link to="/news">Tin tức</Link></div>
          <div className="box"><div className="box-Head">Tổng đài hỗ trợ</div><div className="box-Body">Tư vấn mua hàng: 999 999 999 (7h - 22h)</div><div className="box-Body">CSKH: 999 999 999 (8h - 21h)</div></div>
          <div className="box"><div className="box-Head">Hỗ trợ khách hàng</div><Link to="/cart">Giỏ hàng</Link><Link to="/orders">Đơn hàng của bạn</Link><Link to="/profile">Tài khoản</Link></div>
          <div className="box"><div className="box-Head">Kết nối với chúng tôi</div><a href="https://facebook.com"><i className="fa-brands fa-facebook" /> Facebook</a><a href="https://instagram.com"><i className="fa-brands fa-instagram" /> Instagram</a><a href="https://youtube.com"><i className="fa-brands fa-youtube" /> YouTube</a><a href="https://tiktok.com"><i className="fa-brands fa-tiktok" /> TikTok</a></div>
        </div>
      </footer>
      <div className="footer"><span>© 2025 Văn Thành Shop. Địa chỉ: Lào Cai. Điện thoại: 999 999 999. Email: luvanthanh@gmail.com</span></div>
    </>
  );
}
