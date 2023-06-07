export default function removeDuplicate(products, property) {
  const sellers = products?.map((product) => product?.[property]);
  const removeDuplicateSeller = sellers?.filter(
    (v, i) => sellers.indexOf(v) === i
  );
  return removeDuplicateSeller;
}
