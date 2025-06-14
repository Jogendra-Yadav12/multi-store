import React, { useEffect, useState } from 'react';
import HeadingTag from '../layout/HeadingNav';
import SearchBar from '../searchbar/SearchBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red } from '@mui/material/colors';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';

const CustomerList = () => {
  const user = useAuth();
  const userType = user.adminUser.user_type; // 'A', 'S', or 'C'

  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const userTypeMap = {
    A: "Admin",
    S: "Seller",
    C: "Customer"
  };

  const editCustomer = (id) => {
    navigate(`/edit-customer/${id}`);
  };

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/customers');
      setCustomers(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const deleteCustomer = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await axios.delete(`http://localhost:5000/api/customer/${id}`);
        toast.error('Customer deleted successfully!');
        fetchCustomers();
      } catch (err) {
        console.error('Delete API error:', err);
        toast.error("Failed to delete customer.");
      }
    }
  };

  // 👇 Show only 'C' type users if logged-in user is a 'S'
  const filteredCustomers = userType === 'S'
    ? customers.filter(cstm => cstm.user_type === 'C')
    : customers;

  return (
    <div className='min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8'>
      <HeadingTag title='Customers' path='customers' />
      <SearchBar path='Add' to='/add-customer' />

      <table className='md:table-auto table-fixed w-full overflow-hidden'>
        <thead className='bg-indigo-100 text-gray-900 border-b border-gray-500/20 text-sm text-left'>
          <tr>
            <th className='px-3 py-3 font-semibold truncate'>S.No</th>
            <th className='px-3 py-3 font-semibold truncate'>Name</th>
            <th className='px-3 py-3 font-semibold truncate'>Email</th>
            <th className='px-3 py-3 font-semibold truncate'>Number</th>
            <th className='px-3 py-3 font-semibold truncate'>User Type</th>
            <th className='px-3 py-3 font-semibold truncate'>Action</th>
          </tr>
        </thead>

        <tbody className='text-gray-700 text-left'>
          {filteredCustomers.map((cstm, index) => (
            <tr key={cstm.id} className='border-b border-gray-500/20'>
              <td className='px-2 py-3'>{index + 1}</td>
              <td className='px-2 py-3 text-sm md:text-base'>
                {cstm.f_name}&nbsp;{cstm.l_name}
              </td>
              <td className='px-2 py-3 text-sm md:text-base'>{cstm.email}</td>
              <td className='px-2 py-3 text-sm md:text-base'>{cstm.number}</td>
              <td className='px-2 py-3 text-sm md:text-base'>
                <span
                  className={`px-2 py-1 rounded text-sm text-white ${
                    cstm.user_type === 'A'
                      ? 'bg-red-500'
                      : cstm.user_type === 'S'
                      ? 'bg-green-500'
                      : 'bg-blue-500'
                  }`}>
                  {userTypeMap[cstm.user_type]}
                </span>
              </td>
              <td className='px-3'>
                <div className='flex items-center justify-start gap-2'>
                  <CreateIcon
                    className='cursor-pointer'
                    onClick={() => editCustomer(cstm.id)}
                    sx={{ fontSize: 25 }}
                    color="primary"
                  />
                  <DeleteForeverIcon
                    className='cursor-pointer'
                    onClick={() => deleteCustomer(cstm.id)}
                    sx={{ color: red[500], fontSize: 25 }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
