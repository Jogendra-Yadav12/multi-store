import React, { useRef, useState } from 'react'
import HeadingTag from '../HeadingNav';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProducts = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [imagePreview, setImagePreview] = useState(null)
  const filesInputRef = useRef(null);


  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    discount_price: '',
    status: '',
    stock: '',
    quantity: '',
    description: '',
    images: []
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 0) {
      const previews = selectedFiles.map((file) => URL.createObjectURL(file));

      setImagePreview(previews); // set array of preview URLs

      setFormData((prev) => ({
        ...prev,
        images: selectedFiles, // store actual file objects
      }));
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Final Product Data', formData);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('brand', formData.brand);
    data.append('price', formData.price);
    data.append('discount_price',formData.discount_price);
    data.append('status', formData.status || 'active');
    data.append('stock', formData.stock);
    data.append('quantity', formData.quantity);
    data.append('description', formData.description);
    data.append('images', formData.images);
    for(let [key, value] of data.entries()){
      console.log(`${key}`, value);
      
    }

    try {
      await axios.post('http://localhost:5000/api/add-product', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success('Product Successfully added!');

      setFormData({
        name: '',
        category: '',
        brand: '',
        price: '',
        discount_price: '',
        status: '',
        stock: '',
        quantity: '',
        description: '',
        images: []
      })

    } catch (err) {
      console.error('Error adding product', err);
      alert('Something went wrong!');
    }

  }

  const handleImageClick = () => {
    if (filesInputRef.current) {
      filesInputRef.current.click()
    }
  }

  return (
    <div className='min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8'>
      <HeadingTag title="General Product Info" path="Add Product" />
      {/* tabs */}
      <div className='flex justify-between'>
        <div className='flex gap-3'>
          <button className={`px-4 py-2 rounded ${activeTab === 'general' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`} onClick={() => setActiveTab('general')}>General Info</button>
          <button className={`px-4 py-2 rounded ${activeTab === 'images' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`} onClick={() => setActiveTab('images')} >Images</button>
        </div>
        <div>
          {/* Submit Button */}
          <button type='submit' form='addProductForm' className='bg-indigo-600 text-white px-4 py-2 rounded'>
            Save
          </button>
        </div>
      </div>

      {/* tab content */}

      <div className='w-full bg-gray-100 p-6 rounded shadow'>

        <form id='addProductForm' onSubmit={handleSubmit} className='spacy-y-4'>
          {activeTab === 'general' && (
            <>
              <div className='flex flex-col md:flex-row items-center gap-5'>
                <div className='w-full md:mb-5'>
                  <label htmlFor="product_name" className='block mb-2 text-gray-600'>Product Name</label>
                  <input type='text' id='name' value={formData.name} onChange={handleChange} name='name' className='w-full p-2 border border-gray-300 rounded' required />
                </div>
                <div className='w-full mb-5'>
                  <label htmlFor="category" className="block mb-2 text-gray-600">Category</label>
                  <select name='category' id='category' value={formData.category} onChange={handleChange} className='w-full p-2.5 border border-gray-300 rounded text-gray-600 text-sm placeholder-gray-200' required>
                    <option value=''>Select Category</option>
                    <option value='electronics'>Electronics</option>
                    <option value='fashion'>Fashion</option>
                    <option value='home'>Home</option>
                    <option value='books'>Books</option>
                  </select>

                </div>
              </div>

              <div className='flex flex-col md:flex-row items-center gap-5'>
                <div className='w-full md:mb-5'>
                  <label htmlFor="Barnd_name" className='block mb-2 text-gray-600'>Brand Name</label>
                  <input type='text' id='brand' value={formData.brand} onChange={handleChange} name='brand' className='w-full p-2 border border-gray-300 rounded' required />
                </div>

                <div className='w-full md:mb-5'>
                  <label htmlFor="Price" className='block mb-2 text-gray-600'>Price</label>
                  <input type='text' id='price' value={formData.price} onChange={handleChange} name='price' className='w-full p-2 border border-gray-300 rounded' required />
                </div>

                <div className='w-full md:mb-5'>
                  <label htmlFor="Discount_Price" className='block mb-2 text-gray-600'>Discount Price</label>
                  <input type='text' name='discount_price' id='discount_price' value={formData.discount_price} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded' required />
                </div>

              </div>


              <div className='flex flex-col md:flex-row items-center gap-5'>
                <div className='w-full mb-5'>
                  <label htmlFor="Status" className='block mb-2 text-gray-600'>Status</label>
                  <select name='status' id='status' value={formData.status} onChange={handleChange} className='w-full p-2.5 border border-gray-300 rounded text-gray-600 placeholder-gray-200 text-sm' required>
                    <option value='1'>Active</option>
                    <option value='0'>InActive</option>
                  </select>
                </div>

                <div className='w-full mb-5'>
                  <label htmlFor="Availability" className='block mb-2 text-gray-600'>Availability</label>
                  <select name='stock' id='stock' value={formData.stock} onChange={handleChange} className='w-full p-2.5 border border-gray-300 rounded text-gray-600 placeholder-gray-200 text-sm' required>
                    <option value=''>Stock</option>
                    <option value='Stock'>In Stock</option>
                    <option value='Out of Stock'>Out of Stock</option>
                  </select>
                </div>

                <div className='w-full md:mb-5'>
                  <label htmlFor="Quantity" className='block mb-2 text-gray-600'>Quantity</label>
                  <input type='number' name='quantity' id='quantity' value={formData.quantity} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded' required />
                </div>

              </div>
              <div className='flex flex-col md:flex-row items-center gap-5'>
                <div className='w-full mb-5'>
                  <label htmlFor="Product_Description" className='block mb-2 text-gray-600'>Product Description</label>
                  <textarea
                    id='description'
                    value={formData.description} onChange={handleChange}
                    name='description'
                    placeholder='Product Description'
                    className='w-full p-2 border border-gray-300 rounded'
                    required
                  ></textarea>
                </div>
              </div>

            </>


          )}

          {/* multipal images */}

          {activeTab === "images" && (
            <>
              <div className='mb-5'>
                <input
                  onChange={handleImageChange}
                  type='file'
                  multiple
                  className='w-full p-2 border border-gray-300 rounded hidden'
                  ref={filesInputRef}
                />
                <div onClick={handleImageClick} className="cursor-pointer w-32 h-32 border rounded overflow-hidden flex items-center justify-center bg-white">
                  <img
                    src={imagePreview && imagePreview.length > 0 ? imagePreview[0] : 'http://localhost:5000/uploads/dummy.jpg'}
                    alt="Product Preview"
                    className="object-contain w-full h-full"
                  />

                </div>

                <p className='text-sm text-gray-600 mt-1'>
                  You can select multiple images
                </p>
              </div>

              {/* ✅ Image Preview Grid */}
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((img, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(img)}
                      alt={`preview-${index}`}
                      className="w-full h-full object-cover shadow-lg rounded border"
                    />
                  ))}
                </div>
              )}

            </>
          )}
        </form>
      </div>
    </div>
  )
}

export default AddProducts
