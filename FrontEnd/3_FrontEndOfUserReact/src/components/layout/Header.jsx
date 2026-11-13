import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import logo from "../../assets/images/avatar.jpg";

export default function Header() {
  const { username, token, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [logoutError, setLogoutError] = useState("");
  const navigate = useNavigate();

  async function handleLogout() {
    setLogoutError("");
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setLogoutError(error.message || "Không thể đăng xuất. Vui lòng thử lại.");
    }
  }

  function submitSearch(event) {
    event.preventDefault();
    navigate(`/?search=${encodeURIComponent(search.trim())}`);
  }

  return (
    <header className="navbar">
      <div className="top-bar"><div className="top-bar-content">
        <span><i className="fa-solid fa-shield-halved" /> Sản phẩm chính hãng</span>
        <span><i className="fa-solid fa-truck-fast" /> Miễn phí giao hàng từ 300.000₫</span>
        <span><i className="fa-solid fa-headset" /> Hotline: 999 999 999</span>
      </div></div>
      <div className="main-bar">
        <div className="logo"><Link to="/" aria-label="Văn Thành Shop - Trang chủ"><span className="logo-mark"><img src={logo} alt="" /></span><span className="logo-s">VĂN THÀNH<span className="logo-caption">SHOP CÔNG NGHỆ</span></span></Link></div>
        <div className="btn"><i className="fa-solid fa-house-user" /><Link to="/">Trang chủ</Link></div>
        <div className="btn"><i className="fa-solid fa-circle-info" /><Link to="/about">Giới thiệu</Link></div>
        <div className="news-btn"><Link to="/news"><i className="fa-solid fa-newspaper" /> Tin tức</Link></div>
        <form className="search-box" onSubmit={submitSearch}>
          <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm điện thoại bạn yêu thích..." aria-label="Tìm kiếm sản phẩm" />
          <button className="search-submit" type="submit" aria-label="Tìm kiếm"><i className="fa-solid fa-magnifying-glass" /></button>
        </form>
        <div className="cart"><Link to="/cart"><i className="fa-solid fa-cart-shopping" /><span>Giỏ hàng</span></Link></div>
        <div className={`login-button${token ? " is-authenticated" : ""}`}>
          <i className="fa-regular fa-user" /><span className="account-label">{username || "Tài khoản"}</span>
          <div className="accout-menu-two"><ul>
            {!token && <li><Link to="/login">Đăng nhập</Link></li>}
            <li><Link to="/profile">Tài khoản</Link></li>
            <li><Link to="/orders">Đơn hàng</Link></li>
            {token && <li><button type="button" onClick={handleLogout}>Đăng xuất</button></li>}
          </ul>{logoutError && <p role="alert">{logoutError}</p>}</div>
        </div>
      </div>
    </header>
  );
}
