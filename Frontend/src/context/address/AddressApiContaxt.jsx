import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext";

const AddressApiContext = createContext();

export const AddressApiProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [getAddress, setGetAddress] = useState([]);
  const {user} = useAuth();

  const customerId = user?.id;

  //  Add Address
  const addAddress = async (newAddress, customerId) => {
    try {
      if (!customerId) {
        console.error("Customer ID missing!");
        return;
      }

      const payload = { ...newAddress, customer_id: customerId };
      console.log("Payload sending:", payload); 

      const res = await axios.post("http://localhost:5000/api/add-address", payload);

      if (res.data) {
        toast.success("Address Added Successfully");

        await fetchAddress(customerId);

       
      }
    } catch (err) {
      console.error("Error adding address", err);
      toast.error("Failed to add address");
    }
  };



  //  Update Address
  const updateAddress = (id, updatedData) => {
    setAddresses((prev) =>
      prev.map((addr) => (addr.id === id ? { ...addr, ...updatedData } : addr))
    );

  };

  //  Delete Address
  const deleteAddress = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));

  };


  const fetchAddress = async (customer_id) => {
      try{
        const res  = await axios.get(`http://localhost:5000/api/cus_address/${customer_id}`)
        console.log("Fetched addresses:", res.data);
        setGetAddress(res.data)
      }catch(err) {
        console.error("Address Fetch error!", err);
      }
  }

  useEffect(() => {
    if(customerId){
      fetchAddress(customerId)
    }
  }, [customerId])

  const value = {
    addresses,
    addAddress,
    updateAddress,
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
