import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StorePage from "../../components/layout/StorePage.jsx";
import api from "../../lib/axiosClient.js";
import useAuth from "../../hooks/useAuth.js";
import { formatMoney, getErrorMessage, getProductImage } from "../../utils/format.js";

export default function ProductPage() {
  const { id } = useParams();
  const { userId } = useAuth();
  const [product, setProduct] = useState(null);
  const [variantIndex, setVariantIndex] = useState(0);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    let active = true;
    api.get(`/api/products/id/${encodeURIComponent(id)}`).then((response) => {
      if (!response.data?.data || typeof response.data.data !== "object") {
        throw new Error("Không tìm thấy sản phẩm.");
      }
      if (active) {
        setProduct(response.data.data);
        setImage(getProductImage(response.data.data));
      }
    }).catch((requestError) => {
      if (active) setError(getErrorMessage(requestError, "Không tải được sản phẩm."));
    });
    return () => { active = false; };
  }, [id]);

  async function addToCart() {
    if (!userId) {
      window.location.assign("/login");
      return;
    }
    setAdding(true);
    setError("");
    try {
      await api.post(`/api/carts/user/${encodeURIComponent(userId)}`);
      const cart = await api.get(`/api/carts/user/${encodeURIComponent(userId)}`);
      const cartId = cart.data?.data?.cartId;
      if (!cartId) throw new Error("Không tìm thấy giỏ hàng của bạn.");
      localStorage.setItem("cartId", cartId);
      await api.post(`/api/carts/${cartId}/items`, { productId: product.productId, quantity: 1, productVariantIndex: variantIndex });
      window.alert("Đã thêm sản phẩm vào giỏ hàng.");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Không thể thêm sản phẩm vào giỏ hàng."));
    } finally {
      setAdding(false);
    }
  }

  const variants = product?.productVariantResponses || [];
  const selected = variants[variantIndex] || {};
  const images = product?.imageResponses || [];

  return <StorePage pageStyles={["Phone.css"]}>
    <main className="section-one">
      {error && <p className="error" role="alert">{error}</p>}
      {!product && !error && <p>Đang tải sản phẩm...</p>}
      {product && <div className="phone">
        <div className="product-detail">
          <div className="images"><img className="main-img" src={image || getProductImage(product)} alt={product.productName} /><div className="sub-images">{images.slice(0, 3).map((item) => <button type="button" key={item.imageUrl} onClick={() => setImage(item.imageUrl)}><img src={item.imageUrl} alt={item.imageDescribe || product.productName} /></button>)}</div></div>
          <div className="info"><h1>{product.productName}</h1><p><b>Thương hiệu:</b> {product.productBrand || "N/A"}</p><p><b>Màn hình:</b> {product.productScreenSize ?? "N/A"} inch</p>
            <div className="variant-list"><p><b>Biến thể:</b></p>{variants.length ? variants.map((variant, index) => <button type="button" key={`${variant.productRam}-${variant.productRom}-${variant.productColor}-${index}`} className={`variant-option${index === variantIndex ? " selected" : ""}`} onClick={() => setVariantIndex(index)}>{variant.productRam ?? "?"} GB / {variant.productRom ?? "?"} GB / {variant.productColor || "N/A"}</button>) : <span>Không có biến thể</span>}</div>
            <p><b>Màu:</b> {selected.productColor || "N/A"}</p><p><b>RAM:</b> {selected.productRam ?? "N/A"} GB</p><p><b>ROM:</b> {selected.productRom ?? "N/A"} GB</p><p><b>Bảo hành:</b> {product.productWarranty ?? "N/A"} tháng</p>
            <p className="desc">{product.productDescription}</p><p className="old-price">{formatMoney(selected.productPrice)}</p><h2 className="price">{formatMoney(selected.productPrice)}</h2>
            <button className="buy-btn" type="button" disabled={adding} onClick={addToCart}>{adding ? "Đang thêm..." : "🛒 Thêm vào giỏ hàng"}</button><p><Link to="/">← Tiếp tục mua sắm</Link></p>
          </div>
        </div>
      </div>}
    </main>
  </StorePage>;
}
