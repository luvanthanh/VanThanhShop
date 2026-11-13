import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StorePage from "../../components/layout/StorePage.jsx";
import useAuth from "../../hooks/useAuth.js";
import api from "../../lib/axiosClient.js";
import { formatMoney, getErrorMessage } from "../../utils/format.js";

const initialCheckout = { customerName: "", deliveryAddress: "", customerPhoneNumber: "", note: "", paymentMethod: "COD" };

export default function CartPage() {
  const { userId, token } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [checkout, setCheckout] = useState(initialCheckout);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      navigate("/login", { replace: true });
      return;
    }
    let active = true;
    async function loadCart() {
      setLoading(true);
      setError("");
      try {
        await api.post(`/api/carts/user/${encodeURIComponent(userId)}`);
        const cartResponse = await api.get(`/api/carts/user/${encodeURIComponent(userId)}`);
        const cartId = cartResponse.data?.data?.cartId;
        if (!cartId) throw new Error("Không tìm thấy giỏ hàng.");
        localStorage.setItem("cartId", cartId);
        const response = await api.get(`/api/carts/${cartId}/items`);
        if (!Array.isArray(response.data?.data)) {
          throw new Error("Phản hồi giỏ hàng không hợp lệ.");
        }
        const cartItems = response.data.data;
        if (active) setItems(cartItems.map((item) => ({ ...item, cartItemId: item.cartItemsId, product: { productName: item.productName, productPrice: item.productPrice, productImage: item.productImage } })));
      } catch (requestError) {
        if (active) setError(getErrorMessage(requestError, "Không tải được giỏ hàng."));
      } finally {
        if (active) setLoading(false);
      }
    }
    loadCart();
    return () => { active = false; };
  }, [userId, navigate]);

  const total = useMemo(() => items.reduce((sum, item) => sum + Number(item.product?.productPrice || 0) * Number(item.quantity || 0), 0), [items]);
  const changeField = (field) => (event) => setCheckout((current) => ({ ...current, [field]: event.target.value }));

  async function changeQuantity(item, amount) {
    const quantity = Number(item.quantity) + amount;
    if (quantity < 1) return;
    setError("");
    try {
      await api.put(`/api/carts/items/${item.cartItemId}`, { productQuantity: quantity });
      setItems((current) => current.map((entry) => entry.cartItemId === item.cartItemId ? { ...entry, quantity } : entry));
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Không thể cập nhật số lượng."));
    }
  }

  async function removeItem(item) {
    if (!window.confirm(`Xóa "${item.product?.productName || "sản phẩm"}" khỏi giỏ hàng?`)) return;
    setError("");
    try {
      await api.delete(`/api/carts/items/${item.cartItemId}`);
      setItems((current) => current.filter((entry) => entry.cartItemId !== item.cartItemId));
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Không thể xóa sản phẩm khỏi giỏ hàng."));
    }
  }

  async function placeOrder(event) {
    event.preventDefault();
    if (!token || !userId) {
      navigate("/login");
      return;
    }
    if (!items.length) {
      setError("Giỏ hàng đang trống.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await api.post("/api/orders", {
        shopAddress: "Thôn 6 Vành, xã Bảo Yên, Lào Cai",
        ...checkout,
        totalMoney: total,
        createdAt: new Date().toISOString(),
        order_status: "PENDING",
        userId,
        cartId: Number(localStorage.getItem("cartId")),
      });
      window.alert("Đặt hàng thành công! Bạn sẽ thanh toán khi nhận hàng.");
      navigate("/orders");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Đặt hàng thất bại. Vui lòng thử lại."));
    } finally {
      setSubmitting(false);
    }
  }

  return <StorePage pageStyles={["Carts.css"]}>
    <main className="cart-page">
      <div className="cart-page-heading"><div><p className="cart-eyebrow">VĂN THÀNH SHOP</p><h1>Giỏ hàng của bạn</h1><p className="cart-intro">Kiểm tra sản phẩm và điền thông tin nhận hàng để hoàn tất đơn.</p></div><Link className="continue-shopping" to="/"><i className="fa-solid fa-arrow-left" /> Tiếp tục mua sắm</Link></div>
      {error && <p role="alert">{error}</p>}
      <div className="cart-layout">
        <section className="list-carts cart-card" aria-label="Sản phẩm trong giỏ hàng">
          {loading && <p>Đang tải giỏ hàng...</p>}
          {!loading && !items.length && <div className="cartMessages"><i className="fa-solid fa-basket-shopping" /><div>Giỏ hàng của bạn đang trống</div><span>Hãy khám phá sản phẩm và thêm món đồ yêu thích nhé.</span><Link className="add_product" to="/">Tiếp tục mua sắm</Link></div>}
          {!loading && items.length > 0 && <>
            <div className="cart-table-wrap"><table className="cart-products-table"><thead><tr><th>Sản phẩm</th><th>Giá</th><th>Số lượng</th><th>Thành tiền</th><th><span className="visually-hidden">Xóa sản phẩm</span></th></tr></thead><tbody>
              {items.map((item) => {
                const price = Number(item.product?.productPrice || 0);
                return <tr key={item.cartItemId}><td className="cart-product-name"><div className="cart-product"><img className="cart-product-image" src={item.product?.productImage} alt={item.product?.productName || "Sản phẩm"} /><span>{item.product?.productName}</span></div></td><td className="cart-product-price">{formatMoney(price)}</td><td className="cart-quantity-cell"><div className="quantity-control"><button type="button" onClick={() => changeQuantity(item, -1)} aria-label="Giảm số lượng">−</button><span>{item.quantity}</span><button type="button" onClick={() => changeQuantity(item, 1)} aria-label="Tăng số lượng">+</button></div></td><td className="cart-line-total">{formatMoney(price * item.quantity)}</td><td><button className="remove-item" type="button" onClick={() => removeItem(item)} aria-label={`Xóa ${item.product?.productName}`}><i className="fa-regular fa-trash-can" /></button></td></tr>;
              })}
              <tr className="cart-summary-row"><td colSpan="3">Tổng cộng</td><td className="sum_money">{formatMoney(total)}</td><td /></tr>
            </tbody></table></div><Link to="/" className="add_product"><i className="fa-solid fa-plus" /> Thêm sản phẩm khác</Link>
          </>}
        </section>
        <form className="information_cart cart-card" onSubmit={placeOrder}>
          <div className="checkout-heading"><span className="checkout-icon"><i className="fa-solid fa-truck-fast" /></span><div><h2>Thông tin nhận hàng</h2><p>Vui lòng nhập chính xác thông tin liên hệ.</p></div></div>
          <div className="shop-address"><i className="fa-solid fa-location-dot" /><div><span>Địa chỉ cửa hàng</span><strong>Thôn 6 Vành, xã Bảo Yên, Lào Cai</strong></div></div>
          <div className="checkout-fields">
            <label htmlFor="customerName">Họ và tên người nhận <span>*</span></label><input id="customerName" value={checkout.customerName} onChange={changeField("customerName")} autoComplete="name" required placeholder="Ví dụ: Lù Văn Thành" />
            <label htmlFor="deliveryAddress">Địa chỉ nhận hàng <span>*</span></label><input id="deliveryAddress" value={checkout.deliveryAddress} onChange={changeField("deliveryAddress")} autoComplete="street-address" required placeholder="Số nhà, đường, phường/xã, tỉnh/thành" />
            <label htmlFor="customerPhoneNumber">Số điện thoại <span>*</span></label><input id="customerPhoneNumber" type="tel" value={checkout.customerPhoneNumber} onChange={changeField("customerPhoneNumber")} autoComplete="tel" required placeholder="Nhập số điện thoại nhận hàng" />
            <label htmlFor="note">Ghi chú <span className="optional-label">(không bắt buộc)</span></label><input id="note" value={checkout.note} onChange={changeField("note")} placeholder="Lưu ý khi giao hàng" />
            <label htmlFor="paymentMethod">Phương thức thanh toán</label><select id="paymentMethod" value={checkout.paymentMethod} onChange={changeField("paymentMethod")}><option value="COD">Thanh toán khi nhận hàng (COD)</option></select>
          </div>
          <div className="checkout-total"><span>Tổng thanh toán</span><strong className="sum_money_cart">{formatMoney(total)}</strong></div>
          <button className="order_button" type="submit" disabled={submitting}><i className="fa-solid fa-lock" />{submitting ? "Đang đặt hàng..." : "Đặt hàng"}</button>
          <Link className="order-list" to="/orders"><i className="fa-solid fa-receipt" /> Xem lịch sử đơn hàng</Link>
        </form>
      </div>
    </main>
  </StorePage>;
}
