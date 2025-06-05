import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let storedAdminUser = localStorage.getItem("adminUser");
  let storedCustomerUser = localStorage.getItem("user");

  let initialAdminUser = null;
  let initalCustomerUser = null;

  try {
    // Check if storedAdminUser is not "undefined" or invalid
    if (storedAdminUser && storedAdminUser !== "undefined") {
      initialAdminUser = JSON.parse(storedAdminUser);
    } else {
      localStorage.removeItem("adminUser");
    }

    // // Check if storedCustomerUser is not "undefined" or invalid
    if (storedCustomerUser && storedCustomerUser !== "undefined") {
      initalCustomerUser = JSON.parse(storedCustomerUser);
    } else {
      localStorage.removeItem("user");
    }

  } catch (e) {
    console.error("Invalid user data in localStorage", e);
    localStorage.removeItem("adminUser");
    localStorage.removeItem("user");
  }

  const [adminUser, setAdminUser] = useState(initialAdminUser);
  const [user, setUser] = useState(initalCustomerUser);

  const login = (userData) => {
    localStorage.setItem("adminUser", JSON.stringify(userData));
    setAdminUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("adminUser");
    setAdminUser(null);
  };

  const loginCustomer = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };


  const logoutCustomer = () => {
    localStorage.removeItem("user");
    setUser(null)
  }
  return (
    <AuthContext.Provider value={{
      adminUser, login, logout,
      user, loginCustomer, logoutCustomer
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
