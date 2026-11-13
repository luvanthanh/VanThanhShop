import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StorePage from "../../components/layout/StorePage.jsx";
import useAuth from "../../hooks/useAuth.js";
import api from "../../lib/axiosClient.js";
import { getErrorMessage } from "../../utils/format.js";

const fields = [
  ["userFirstName", "Họ"],
  ["userLastName", "Tên"],
  ["userEmail", "Email"],
  ["userPhoneNumber", "Số điện thoại"],
  ["userAddress", "Địa chỉ"],
];

export default function ProfilePage() {
  const { userId, token } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!userId || !token) {
      navigate("/login", { replace: true });
      return;
    }
    let active = true;
    api.get("/api/users/myInfo").then((response) => {
      const data = response.data?.data;
      if (!data || typeof data !== "object") {
        throw new Error("Phản hồi thông tin tài khoản không hợp lệ.");
      }
      if (active) {
        setUser(data);
        setForm(data);
      }
    }).catch((requestError) => {
      if (active) setError(getErrorMessage(requestError, "Không tải được thông tin tài khoản."));
    });
    return () => { active = false; };
  }, [userId, token, navigate]);

  async function saveProfile(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const data = Object.fromEntries(fields.map(([key]) => [key, String(form[key] || "").trim()]));
    try {
      await api.put(`/api/users/${encodeURIComponent(userId)}`, data);
      setUser((current) => ({ ...current, ...data }));
      setForm((current) => ({ ...current, ...data }));
      setEditing(false);
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Cập nhật thông tin thất bại."));
    } finally {
      setSaving(false);
    }
  }

  return <StorePage pageStyles={["Profile.css"]}>
    <main className="section-one">
      <div id="user_info">
        <form className="profile-card" onSubmit={saveProfile}>
          <h2>👤 Thông Tin Cá Nhân</h2>
          {error && <p className="error" role="alert">{error}</p>}
          {!user && !error && <p>Đang tải thông tin...</p>}
          {user && <>
            <div className="profile-grid">
              <div className="field"><label>ID</label><input value={user.userId || userId} readOnly /></div>
              <div className="field"><label>Tên đăng nhập</label><input value={user.userName || ""} readOnly /></div>
              {fields.map(([key, label]) => <div className={`field${key === "userAddress" ? " full" : ""}`} key={key}><label htmlFor={key}>{label}</label><input id={key} type={key === "userEmail" ? "email" : "text"} value={form[key] || ""} readOnly={!editing} onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))} /></div>)}
            </div>
            <div className="profile-actions">
              {!editing ? <button className="btn-update" type="button" onClick={() => setEditing(true)}>✏️ Cập nhật thông tin</button> : <><button className="btn-update" type="submit" disabled={saving}>{saving ? "Đang lưu..." : "💾 Lưu thông tin"}</button><button className="btn-update" type="button" onClick={() => { setForm(user); setEditing(false); }}>Hủy</button></>}
            </div>
          </>}
          <p><Link to="/orders">Xem đơn hàng của bạn</Link></p>
        </form>
      </div>
    </main>
  </StorePage>;
}
