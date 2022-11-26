import React, { createContext, useState } from "react";

export const DataStoreContext = createContext();

const DataProvider = ({ children }) => {
  const [formData, setFormData] = useState();
  const [sellerProducts, setSellerProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reportedItems, setReportedItems] = useState([]);

  const dataStore = {
    formData,
    setFormData,
    sellerProducts,
    setSellerProducts,
    orders,
    setOrders,
    reportedItems,
    setReportedItems,
  };

  return (
    <DataStoreContext.Provider value={dataStore}>
      {children}
    </DataStoreContext.Provider>
  );
};

export default DataProvider;
