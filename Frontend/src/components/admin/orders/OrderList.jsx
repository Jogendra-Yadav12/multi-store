import React, { useEffect, useState } from 'react'
import HeadingTag from '../layout/HeadingNav'
import SearchBar from '../searchbar/SearchBar'
import axios from 'axios';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';

const OrderList = () => {

  const [ordersList, setOrdersList] = useState([]);
  const navigate = useNavigate()


  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/getorder')
      setOrdersList(res.data);
    }
    catch (err) {
      console.log("Fetch Error :", err);

    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const editOrder = (id) => {
    navigate(`/edit/${id}`)
  }

  const deleteOrder = async (id) => {
    if (window.confirm('Are you sure you want to delete this Order')) {
      try {
        await axios.delete(`http://localhost:5000/api/deleteOrder/${id}`)
        toast.error('Order Deleted Successfully')
        fetchProducts();
      } catch (err) {
        console.error('Delete error:', err);
        toast.error("Failed to delete product.");
      }
    }
  }


  const viewOrder = (id) => {
    navigate(`/view-order/${id}`)
  }

  return (
    <div className='min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8'>
      <HeadingTag title="Order List" path="Orders" />
      <SearchBar path='Add' to='/add-products' />

      <table className='md:table-auto table-fixed w-full overflow-hidden'>
        <thead className='bg-indigo-100 text-gray-900 border-b border-gray-500/20 text-sm text-left'>
          <tr>
            <th className='px-3 py-3 font-semibold truncate'>S.No</th>
            <th className='px-3 py-3 font-semibold truncate'>Order Id</th>
            <th className='px-3 py-3 font-semibold truncate'>Price</th>
            <th className='px-3 py-3 font-semibold truncate'>Status</th>
            <th className='px-3 py-3 font-semibold truncate'>Order Date</th>

            <th className='px-3 py-3 font-semibold truncate'>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            ordersList.map((order, index) => {

              const orderDate = (oDate) => {
                const date = new Date(oDate);
                return date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                })
              }

              return (
                <tr key={order.id} className='border-b text-gray-700 border-gray-500/20'>
                  <td className='px-2 py-3'>
                    {index + 1}
                  </td>



                  <td className='px-2 py-3 text-xs md:text-base wrap'>
                    {order.id}
                  </td>
                  <td className='px-2 py-3 text-xs md:text-base'>
                    {order.total}
                  </td>
                  <td className='px-4 md:px-4 py-3 text-xs md:text-base'>
                    {order.status}
                  </td>
                  <td className='px-4 md:px-4 py-3 text-xs md:text-base'>
                    {orderDate(order.created_at)}
                  </td>
                  <td className='px-3'>
                    <div className='flex items-center justify-start gap-2'>

                      <CreateIcon
                        titleAccess='Edit Order'
                        className='cursor-pointer'
                        onClick={() => editOrder(order.id)}
                        sx={{ fontSize: 25 }}
                        color="primary"
                      />
                      <DeleteForeverIcon
                        titleAccess='Delete Order'
                        className='cursor-pointer'
                        onClick={() => deleteOrder(order.id)}
                        sx={{ color: red[500], fontSize: 25 }}
                      />

                      <VisibilityIcon
                        titleAccess='View Order'
                        className='cursor-pointer'
                        sx={{ fontSize: 28 }}
                        color="disabled"
                        onClick={() => viewOrder(order.id)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })
          }
        </tbody>

      </table>
    </div>
  )
}

export default OrderList