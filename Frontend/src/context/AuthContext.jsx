import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let storedUser = localStorage.getItem("user");
  let initialUser = null;

  try {
    // Check if storedUser is not "undefined" or invalid
    if (storedUser && storedUser !== "undefined") {
      initialUser = JSON.parse(storedUser);
    } else {
      localStorage.removeItem("user");
    }
  } catch (e) {
    console.error("Invalid user data in localStorage", e);
    localStorage.removeItem("user"); // Clean up invalid data
  }

  const [user, setUser] = useState(initialUser);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
