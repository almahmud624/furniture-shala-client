export default function displayProductCount(count, itemText) {
  if (count <= 0) {
    return `No ${itemText}s`;
  } else if (count === 1) {
    return `01 ${itemText}`;
  } else if (count >= 2 && count <= 9) {
    return `0${count} ${itemText}s`;
  } else {
    return `${count} ${itemText}s`;
  }
}
