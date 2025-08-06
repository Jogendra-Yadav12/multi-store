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

   const calculateSummary = (cartItems, user) => {
        if (cartItems == 0 || !user) {
            return {
                price: 0,
                saving: 0,
                deliveryFee: 0,
                platformFee: 0,
                totalPrice: 0,
                totalPrice1:0,
                totalQty:0,
            };
        }

        const platformFee = 5;
        const deliveryFee = 50;
        const saving = 299;
        const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice1 = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
        const totalPrice = platformFee + deliveryFee + totalPrice1;

        return {platformFee, deliveryFee,saving, totalQty, totalPrice, totalPrice1}
    }


  const value = {
    user,
    setUser,
    cartCount,
    setCartCount,
    fetchCartCount,
    cartItems,
    setCartItems,
    calculateSummary
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
