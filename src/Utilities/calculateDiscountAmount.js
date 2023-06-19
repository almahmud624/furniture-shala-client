export const calculateDiscountAmount = (discount, productInfo) => {
  const discountAmount = productInfo?.newPrice * (discount / 100);
  const discountedPrice = parseFloat(
    (productInfo?.newPrice - discountAmount).toFixed(2)
  );
  return discountedPrice;
};
