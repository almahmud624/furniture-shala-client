import { useQuery } from "@tanstack/react-query";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Component/Loader";

export const DataStoreContext = createContext();

const DataProvider = ({ children }) => {
  const [sellerProducts, setSellerProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reportedItems, setReportedItems] = useState([]);

  // get all products
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "https://furniture-shala-server.vercel.app/products"
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const dataStore = {
    sellerProducts,
    setSellerProducts,
    orders,
    setOrders,
    reportedItems,
    setReportedItems,
    products,
    isLoading,
    error,
  };

  return (
    <DataStoreContext.Provider value={dataStore}>
      {children}
    </DataStoreContext.Provider>
  );
};

export default DataProvider;
