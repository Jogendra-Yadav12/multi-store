import React, { useEffect, useState } from 'react'
import HeadingTag from '../HeadingNav'
import SearchBar from '../searchbar/SearchBar'
import axios from 'axios';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductList = () => {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate()


  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/product')
      setProducts(res.data);
    }
    catch (err) {
      console.log("Fetch Error :", err);

    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const editProduct = (id) => {
     navigate(`/admin/edit-product/${id}`)
  }

  const deleteProduct = async (id) => {
      if(window.confirm('Are you sure you want to delete this product')){
        try{
            await axios.delete(`http://localhost:5000/api/product/${id}`)
            toast.error('Product Deleted Successfully')
            fetchProducts();
        }catch(err){
            console.error('Delete error:', err);
            toast.error("Failed to delete product.");
        }
      }
  }

  return (
    <div className='min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8'>
      <HeadingTag title="Products" path="Products" />
      <SearchBar path='Add' to='/admin/add-products' />

      <table className='md:table-auto table-fixed w-full overflow-hidden'>
        <thead className='bg-indigo-100 text-gray-900 border-b border-gray-500/20 text-sm text-left'>
          <tr>
            <th className='px-3 py-3 font-semibold truncate'>S.No</th>
            <th className='px-3 py-3 font-semibold truncate'>Image </th>
            <th className='px-3 py-3 font-semibold truncate'>Name</th>
            <th className='px-3 py-3 font-semibold truncate'>Price</th>
            <th className='px-3 py-3 font-semibold truncate'>Stock</th>
            <th className='px-3 py-3 font-semibold truncate'>Quantity</th>

            <th className='px-3 py-3 font-semibold truncate'>Status</th>
            {/* <th className='px-3 py-3 font-semibold truncate'>Meta Title </th>
                        <th className='px-3 py-3 font-semibold truncate'>Meta Description</th> */}
            {/* <th className='px-3 py-3 font-semibold truncate'>Description</th> */}

            <th className='px-3 py-3 font-semibold truncate'>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((product, index) => {
           
              const productImageArray = product.images ? product.images.split(',') : [];
              const firstImage = productImageArray.slice(0,1)[0]
           
              return (
                <tr key={product.id} className='border-b text-gray-700 border-gray-500/20'>
                  <td className='px-2 py-3'>
                    {index + 1}
                  </td>

                  <td className='md:px-4 pl-2 md:pl-4 py-3'>
                    <div className='flex gap-2'>
                      {firstImage && (
                        <img
                          src={`http://localhost:5000/uploads/${firstImage}`}
                          alt='product img'
                          className='w-16 h-16 object-contain rounded'
                        />
                      )}
                    </div>
                  </td>

                  <td className='px-2 py-3 text-xs md:text-lg'>
                    {product.name}
                  </td>
                  <td className='px-2 py-3 text-xs md:text-lg'>
                    {product.price}
                  </td>
                  <td className='px-2 py-3 text-xs md:text-lg'>
                    {product.stock === 1 ? 'Stock' : 'Out of Stock'}
                  </td>
                  <td className='px-2 py-3 text-xs md:text-lg'>
                    {product.quantity}
                  </td>
                  <td className='px-4 md:px-4 py-3 text-xs md:text-lg'>
                    {product.status === 1 ? 'Active' : 'Inactive'}
                  </td>

                  <td className='px-3'>
                    <div className='flex items-center justify-start gap-2'>
                      <CreateIcon
                        className='cursor-pointer'
                        onClick={() => editProduct(product.id)}
                        sx={{ fontSize: 25 }}
                        color="primary"
                      />
                      <DeleteForeverIcon
                        className='cursor-pointer'
                        onClick={() => deleteProduct(product.id)}
                        sx={{ color: red[500], fontSize: 25 }}
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

export default ProductList