import React, { createContext, useState } from "react";

export const DataStoreContext = createContext();

const DataProvider = ({ children }) => {
  const [formData, setFormData] = useState();

  const dataStore = { formData, setFormData };
  return (
    <DataStoreContext.Provider value={dataStore}>
      {children}
    </DataStoreContext.Provider>
  );
};

export default DataProvider;
