import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StorePage from "../../components/layout/StorePage.jsx";
import useAuth from "../../hooks/useAuth.js";
import api from "../../lib/axiosClient.js";
import { formatMoney, getErrorMessage } from "../../utils/format.js";

const statuses = {
  PENDING: ["Chờ xác nhận", "status-pending"],
  CONFIRMED: ["Đã xác nhận", "status-confirmed"],
  PROCESSING: ["Đang xử lý", "status-processing"],
  SHIPPING: ["Đang giao", "status-shipping"],
  DELIVERED: ["Đã giao", "status-delivered"],
  COMPLETED: ["Hoàn thành", "status-delivered"],
  CANCELLED: ["Đã hủy", "status-cancelled"],
  CANCELED: ["Đã hủy", "status-cancelled"],
};

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Không rõ thời gian" : new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short" }).format(date);
}

export default function OrdersPage() {
  const { userId, token } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [details, setDetails] = useState({});
  const [open, setOpen] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    if (!userId || !token) {
      navigate("/login", { replace: true });
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await api.get(`/api/orders/${encodeURIComponent(userId)}`);
      if (!Array.isArray(response.data?.data)) {
        throw new Error("Phản hồi danh sách đơn hàng không hợp lệ.");
      }
      const list = response.data.data;
      setOrders(list.sort((first, second) => Date.parse(second.createdAt) - Date.parse(first.createdAt)));
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Không thể tải đơn hàng."));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadOrders(); }, [userId, token]);

  async function toggleDetails(orderId) {
    const show = !open[orderId];
    setOpen((current) => ({ ...current, [orderId]: show }));
    if (!show || details[orderId]) return;
    setDetails((current) => ({ ...current, [orderId]: { loading: true } }));
    try {
      const response = await api.get(`/api/orders/${encodeURIComponent(orderId)}/details`);
      if (!Array.isArray(response.data?.data)) {
        throw new Error("Phản hồi chi tiết đơn hàng không hợp lệ.");
      }
      setDetails((current) => ({ ...current, [orderId]: { items: response.data.data } }));
    } catch (requestError) {
      setDetails((current) => ({ ...current, [orderId]: { error: getErrorMessage(requestError, "Không tải được chi tiết đơn hàng.") } }));
    }
  }

  return <StorePage pageStyles={["OrderList.css"]}>
    <main className="order-page">
      <div className="order-page-heading"><div><p className="order-eyebrow">VĂN THÀNH SHOP</p><h1>Đơn hàng của bạn</h1><p className="order-page-intro">Theo dõi trạng thái và xem lại các sản phẩm bạn đã đặt.</p></div><Link className="continue-shopping" to="/"><i className="fa-solid fa-arrow-left" /> Tiếp tục mua sắm</Link></div>
      <section className="order-list" aria-label="Danh sách đơn hàng">
        {loading && <div className="order-state"><span className="order-state-icon"><i className="fa-solid fa-spinner fa-spin" /></span><h2>Đang tải đơn hàng</h2><p>Vui lòng chờ trong giây lát.</p></div>}
        {!loading && error && <div className="order-state order-state-error"><i className="fa-solid fa-triangle-exclamation" /><h2>Không thể tải đơn hàng</h2><p>{error}</p><button className="order-retry" type="button" onClick={loadOrders}>Thử lại</button></div>}
        {!loading && !error && !orders.length && <div className="order-state"><span className="order-state-icon"><i className="fa-solid fa-receipt" /></span><h2>Bạn chưa có đơn hàng nào</h2><p>Các đơn hàng bạn đặt sẽ xuất hiện tại đây.</p><Link className="order-retry" to="/">Khám phá sản phẩm</Link></div>}
        {!loading && !error && orders.map((order) => {
          const [label, className] = statuses[String(order.order_status || "").toUpperCase()] || [order.order_status || "Chưa cập nhật", "status-default"];
          const detail = details[order.orderId];
          return <article className="order-card" key={order.orderId}>
            <div className="order-card-top"><div className="order-card-heading"><span className="order-caption">MÃ ĐƠN HÀNG</span><h2>{order.orderId || "Không có mã"}</h2></div><span className={`order-status ${className}`}><span className="status-dot" />{label}</span></div>
            <div className="order-card-info">
              <div className="order-info-item"><span className="order-info-icon"><i className="fa-regular fa-calendar" /></span><div><span>Ngày đặt</span><strong>{formatDate(order.createdAt)}</strong></div></div>
              <div className="order-info-item"><span className="order-info-icon"><i className="fa-regular fa-user" /></span><div><span>Người nhận</span><strong>{order.customerName || "Chưa cập nhật"}</strong></div></div>
              <div className="order-info-item"><span className="order-info-icon"><i className="fa-solid fa-location-dot" /></span><div><span>Địa chỉ giao hàng</span><strong>{order.deliveryAddress || "Chưa cập nhật"}</strong></div></div>
            </div>
            <div className="order-card-bottom"><div className="order-total"><span>Tổng thanh toán</span><strong>{formatMoney(order.totalMoney)}</strong></div><button className="order-details-toggle" type="button" aria-expanded={Boolean(open[order.orderId])} onClick={() => toggleDetails(order.orderId)}><span>{open[order.orderId] ? "Ẩn chi tiết" : "Xem chi tiết"}</span><i className="fa-solid fa-chevron-down" /></button></div>
            {open[order.orderId] && <div className="order-details">
              {detail?.loading && <p className="details-message">Đang tải sản phẩm trong đơn...</p>}
              {detail?.error && <p className="details-message details-error">{detail.error}</p>}
              {detail?.items && (!detail.items.length ? <p className="details-message">Đơn hàng chưa có thông tin sản phẩm.</p> : <><h3>Sản phẩm trong đơn</h3><div className="order-products">{detail.items.map((item, index) => <div className="order-product" key={`${item.productName}-${index}`}><img src={item.productImage} alt={item.productName || "Sản phẩm"} loading="lazy" /><div className="order-product-info"><strong>{item.productName || "Sản phẩm"}</strong><span>{formatMoney(item.productPrice)} × {item.productQuantity ?? 0}</span></div><strong className="order-product-total">{formatMoney(item.productTotalPrice)}</strong></div>)}</div></>)}
            </div>}
          </article>;
        })}
      </section>
    </main>
  </StorePage>;
}
