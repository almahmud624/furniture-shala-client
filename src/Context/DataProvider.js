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
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/products");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    // refetchInterval: 1000,
  });

  if (isLoading) {
    return <Loader />;
  }

  const dataStore = {
    sellerProducts,
    setSellerProducts,
    orders,
    setOrders,
    reportedItems,
    setReportedItems,
    products,
    isLoading,
  };

  return (
    <DataStoreContext.Provider value={dataStore}>
      {children}
    </DataStoreContext.Provider>
  );
};

export default DataProvider;
