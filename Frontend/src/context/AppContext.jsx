import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([])

  const fetchCartCount = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/getcart/${userId}`);
      setCartCount(res.data.length);
      setCartItems(res.data)

    } catch (err) {
      console.error("Cart fetch error:", err);
      setCartItems([]);
    }
  };



  const value = {
    user,
    setUser,
    cartCount,
    setCartCount,
    fetchCartCount,
    cartItems,
    setCartItems
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
