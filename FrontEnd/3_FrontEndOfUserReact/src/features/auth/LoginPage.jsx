import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../lib/axiosClient.js";
import useAuth from "../../hooks/useAuth.js";
import usePageStyles from "../../hooks/usePageStyles.js";
import avatar from "../../assets/images/avatar.jpg";
import { getErrorMessage } from "../../utils/format.js";

export default function LoginPage() {
  usePageStyles(["LoginClient.css"]);
  const location = useLocation();
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(location.state?.message || "");
  const [loading, setLoading] = useState(false);
  const { saveSession } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const response = await api.post("/api/users/auth/login", {
        userName: form.username.trim(),
        password: form.password,
      });
      const session = response.data?.data;
      if (!session?.token || !session?.userId || !session?.checkLogin) {
        setMessage("Sai tài khoản hoặc mật khẩu!");
        return;
      }
      saveSession(session, form.username.trim());
      navigate("/about");
    } catch (error) {
      setMessage(getErrorMessage(error, "Không thể đăng nhập. Vui lòng thử lại."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <Link className="back-home" to="/"><span aria-hidden="true">←</span> Quay lại cửa hàng</Link>
      <section className="login-card" aria-label="Đăng nhập Văn Thành Shop">
        <aside className="brand-panel">
          <Link className="brand" to="/" aria-label="Văn Thành Shop - Trang chủ"><span className="brand-mark">VT</span><span>VĂN THÀNH<small>SHOP CÔNG NGHỆ</small></span></Link>
          <div className="brand-message"><div className="avatar-frame"><img src={avatar} alt="Ảnh đại diện Văn Thành" /></div><p className="eyebrow">Chào mừng bạn trở lại</p><h1>Công nghệ bạn cần,<br />trong tầm tay.</h1><p className="brand-copy">Đăng nhập để tiếp tục khám phá và mua sắm tại Văn Thành Shop.</p><div className="brand-note"><span>✦</span> Chọn sản phẩm phù hợp với bạn</div></div>
          <p className="brand-footer">Mua sắm dễ dàng · Hỗ trợ tận tâm</p>
        </aside>
        <div className="login-content"><div className="mobile-brand-mark">VT</div><p className="eyebrow">Tài khoản của bạn</p><h2>Đăng nhập</h2><p className="form-intro">Nhập thông tin tài khoản để tiếp tục.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-field"><label htmlFor="username">Tên đăng nhập</label><input id="username" name="username" value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} placeholder="Nhập tên đăng nhập" required autoComplete="username" /></div>
            <div className="form-field"><label htmlFor="password">Mật khẩu</label><input id="password" name="password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Nhập mật khẩu" required autoComplete="current-password" /></div>
            <button type="submit" disabled={loading}>{loading ? "Đang đăng nhập..." : <>Đăng nhập <span aria-hidden="true">→</span></>}</button>
          </form>
          <p id="error-msg" role="status" aria-live="polite">{message}</p>
          <p className="register-prompt">Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p><div className="form-divider"><span>VĂN THÀNH SHOP</span></div><p className="secure-note"><span>✓</span> Thông tin của bạn được bảo vệ an toàn</p>
        </div>
      </section>
    </main>
  );
}
