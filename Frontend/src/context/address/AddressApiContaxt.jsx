import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext";

const AddressApiContext = createContext();

export const AddressApiProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [getAddress, setGetAddress] = useState([]);
  const { user } = useAuth();

  const customerId = user?.id;

  //  Add Address
  const saveAndUpdateAddress = async (addressData, customerId) => {
    try {
      if (!customerId) {
        console.error("Customer ID missing!");
        return;
      }
      let res;
      
      

      if (addressData.id) {
        res = await axios.put(`http://localhost:5000/api/address/${addressData.id}`, { ...addressData, customer_id: customerId });
        // console.log(res);
        
        toast.success("Address Updated Successfully");
      } else {
        res = await axios.post("http://localhost:5000/api/add-address", { ...addressData, customer_id: customerId });
        // console.log(res);
        
        toast.success("Address Added Successfully");
      }

      if (res.data) {
        await fetchAddress(customerId);
      }
    } catch (err) {
      console.error("Error adding address", err);
      toast.error("Failed to add address");
    }
  };



  //  Delete Address
  const deleteAddress = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));

  };


  const fetchAddress = async (customer_id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cus_address/${customer_id}`)
      // console.log("Fetched addresses:", res.data);
      setGetAddress(res.data)
    } catch (err) {
      console.error("Address Fetch error!", err);
    }
  }

  useEffect(() => {
    if (customerId) {
      fetchAddress(customerId)
    }
  }, [customerId])

  const value = {
    addresses,
    saveAndUpdateAddress,
    deleteAddress,
    fetchAddress,
    getAddress
  };

  return (
    <AddressApiContext.Provider value={value}>
      {children}
    </AddressApiContext.Provider>
  );
};

export const useAddressApi = () => useContext(AddressApiContext);
