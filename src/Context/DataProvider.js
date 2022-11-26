import React, { createContext, useState } from "react";

export const DataStoreContext = createContext();

const DataProvider = ({ children }) => {
  const [formData, setFormData] = useState();
  const [sellerProducts, setSellerProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const dataStore = {
    formData,
    setFormData,
    sellerProducts,
    setSellerProducts,
    orders,
    setOrders,
  };
  return (
    <DataStoreContext.Provider value={dataStore}>
      {children}
    </DataStoreContext.Provider>
  );
};

export default DataProvider;