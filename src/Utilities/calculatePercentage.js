export default function calculatePercentage(oldPrice, newPrice) {
  const pricePercentage = ((oldPrice - newPrice) / oldPrice) * 100;
  const twoDecimalPrice = pricePercentage.toFixed(2);
  const splitPrice = twoDecimalPrice.split(".");
  if (splitPrice[1] === "00") {
    return splitPrice[0];
  }
  return twoDecimalPrice;
}
