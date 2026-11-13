export function formatMoney(value) {
  if (value === null || value === undefined || value === "") {
    return "Liên hệ";
  }
  const amount = Number(value);
  return Number.isFinite(amount) ? `${amount.toLocaleString("vi-VN")}₫` : "Liên hệ";
}

export function getProductImage(product) {
  return product?.productImageThumbnail ||
    product?.imageResponses?.[0]?.imageUrl ||
    "https://via.placeholder.com/300x300?text=No+Image";
}

export function getNewsImage(item) {
  return item?.newsImageThumbnail || item?.imageResponses?.[0]?.imageUrl || "";
}

export function getErrorMessage(error, fallback) {
  return error?.response?.data?.message || error?.message || fallback;
}
