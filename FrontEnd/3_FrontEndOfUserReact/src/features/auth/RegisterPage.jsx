import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../lib/axiosClient.js";
import usePageStyles from "../../hooks/usePageStyles.js";
import avatar from "../../assets/images/avatar.jpg";
import { getErrorMessage } from "../../utils/format.js";

const initialForm = { userName: "", userPassword: "", userLastName: "", userFirstName: "", userAddress: "", userEmail: "", userPhoneNumber: "" };

export default function RegisterPage() {
  usePageStyles(["CreateAccout.css"]);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const change = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      await api.post("/api/users", form);
      navigate("/login", { state: { message: "Đăng ký thành công. Hãy đăng nhập." } });
    } catch (error) {
      setMessage(getErrorMessage(error, "Đăng ký thất bại. Vui lòng thử lại."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page"><div className="auth-card">
      <div className="brand-panel"><div className="brand-badge"><img src={avatar} alt="" className="brand-logo" /></div><p className="brand-tag">Van Thanh Shop</p><h1>Tạo tài khoản mới</h1><p className="brand-text">Đăng ký để trải nghiệm mua sắm nhanh chóng, an toàn và thuận tiện hơn.</p><ul className="feature-list"><li>Ưu đãi thành viên độc quyền</li><li>Giỏ hàng và đơn hàng được lưu tự động</li><li>Hỗ trợ nhanh chóng 24/7</li></ul></div>
      <form className="register" onSubmit={handleSubmit}><h2>Đăng ký tài khoản</h2>
        <div className="field-row"><div className="form-group"><label htmlFor="userName">Tên đăng nhập</label><input id="userName" value={form.userName} onChange={change("userName")} placeholder="Nhập tên đăng nhập" required /></div><div className="form-group"><label htmlFor="userPassword">Mật khẩu</label><input id="userPassword" type="password" value={form.userPassword} onChange={change("userPassword")} placeholder="Nhập mật khẩu" required /></div></div>
        <div className="field-row"><div className="form-group"><label htmlFor="userLastName">Họ</label><input id="userLastName" value={form.userLastName} onChange={change("userLastName")} placeholder="Lù" required /></div><div className="form-group"><label htmlFor="userFirstName">Tên</label><input id="userFirstName" value={form.userFirstName} onChange={change("userFirstName")} placeholder="Văn" required /></div></div>
        <div className="form-group"><label htmlFor="userAddress">Địa chỉ</label><input id="userAddress" value={form.userAddress} onChange={change("userAddress")} placeholder="Nhập địa chỉ của bạn" required /></div>
        <div className="field-row"><div className="form-group"><label htmlFor="userEmail">Email</label><input id="userEmail" type="email" value={form.userEmail} onChange={change("userEmail")} placeholder="example@gmail.com" required /></div><div className="form-group"><label htmlFor="userPhoneNumber">SĐT</label><input id="userPhoneNumber" type="tel" value={form.userPhoneNumber} onChange={change("userPhoneNumber")} placeholder="0987 654 321" /></div></div>
        {message && <p role="alert">{message}</p>}
        <button type="submit" id="register_button" className={loading ? "loading" : ""} disabled={loading}>{loading ? "Đang xử lý..." : "Đăng ký"}</button><p className="login-link">Bạn đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link></p>
      </form>
    </div></main>
  );
}
