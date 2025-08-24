import {
    insertAddress,
    getAllAddress,
    getAddress,
    updateAddress,
    deleteAddress,
    getAddressByCustomer
  } from '../Model/address.js';
  
  export const addAddress = (req, res) => {
    const {address,shop_name, city, state,country, postal_code, bank_details, ifsc_code, customer_id } = req.body;
    
    const values = [address,shop_name, city, state,country, postal_code, bank_details, ifsc_code, customer_id];
  
    insertAddress(values, (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error', details: err });
      res.status(201).json({
        status: 'success',
        message: 'Address added successfully',
        AddressId: result.insertId
      });
    });
  };  

export const getAddressById = (req, res) => {
    const { id } = req.params;
    getAddress(id, (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0) return res.status(404).json({ error: 'Product not found' });
      res.json(results[0]);
    });
}

export const getAddresss = (req, res) => {
    getAllAddress((err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
      });
}

export const updateAddressById = (req, res) => {
    const { id } = req.params;
    const { address, country, city, state, postal_code } = req.body;
  
    const values = [address, country, city, state, postal_code, id];
    updateAddress(values, (err) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ message: 'Address updated successfully' });
    });
  };
  
  export const getAddressByCustomerId = (req, res) => {
    const { customer_id } = req.params;
  
    getAddressByCustomer(customer_id, (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error', details: err });
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'No address found for this customer' });
      }
  
      res.status(200).json(results);
    });
  };
  

export const deleteAddressById = (req, res) => {
    const { id } = req.params;
    deleteAddress(id,(err)=>{
        if(err) return res.status(500).json({error:'Databse error'});
        res.json({message:'Address Delete Successfully'});
    })
}