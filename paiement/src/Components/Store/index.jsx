import React, { createContext, useState } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  return (
    <StoreContext.Provider value={{ formData, setFormData }}>
      {children}
    </StoreContext.Provider>
  );
};
