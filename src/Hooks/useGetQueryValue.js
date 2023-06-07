import { useSearchParams } from "react-router-dom";

const useGetQueryValue = () => {
  const [searchParams] = useSearchParams();
  const queryMaxPrice = parseInt(searchParams.get("maxPrice"));
  const queryMinPrice = parseInt(searchParams.get("minPrice"));
  const queryCategory = searchParams.get("_category");
  const queryDiscount = searchParams.get("_discount");
  const querySeller = searchParams.get("_seller");
  return [
    queryCategory,
    queryDiscount,
    querySeller,
    queryMaxPrice,
    queryMinPrice,
  ];
};

export default useGetQueryValue;
