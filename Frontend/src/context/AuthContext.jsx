import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

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

  // update users details 
  const updateUserDetails = async (userId, updatedData) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/customer/${userId}`,
        {
          ...user,         
          ...updatedData,  
        }
      );
      if (res.data) {
        const customerData = await axios.get(`http://localhost:5000/api/customer/${userId}`);
        console.log(customerData);

        setUser(customerData.data); 
        localStorage.setItem("user", JSON.stringify(customerData.data)); // storage update
        toast.success("Your Details updated successfully!");
      }
    } catch (err) {
      console.error("Update user api error", err);
      toast.error("Failed to update details");
    }
  };


  return (
    <AuthContext.Provider value={{
      adminUser, login, logout,
      user, loginCustomer, logoutCustomer, updateUserDetails
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
