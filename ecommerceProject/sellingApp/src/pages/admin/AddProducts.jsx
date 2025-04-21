import React, { useState } from 'react'
import HeadingTag from '../../components/admin/HeadingNav';

const AddProducts = () => {
  const [activeTab, setActiveTab] = useState('general');

  const [formData, setFormData] = useState({
    productname: '',
    category: '',
    brandname: '',
    size: '',
    price: '',
    pdate: '',
    availability: '',
    discount: '',
    color: '',
    status: '',
    description: '',
    images: []
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFormData((prev => ({
      ...prev,
      images: (prev.images || []), ...selectedFiles
    })))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Final Product Data', formData);

  }
  return (
    <div className='min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8'>
      <HeadingTag title="General Product Info" path="Add Product" />
      {/* tabs */}
      <div className='flex gap-3'>
        <button className={`px-4 py-2 rounded ${activeTab === 'general' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`} onClick={() => setActiveTab('general')}>General Info</button>
        <button className={`px-4 py-2 rounded ${activeTab === 'images' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`} onClick={() => setActiveTab('images')} >Images</button>
      </div>

      {/* tab content */}

      <div className='w-full bg-gray-100 p-6 rounded shadow'>

        <form onSubmit={handleSubmit} className='spacy-y-4'>
          {activeTab === 'general' && (
            <>
              <div className='flex flex-col md:flex-row items-center gap-5'>
                <div className='w-full md:mb-5'>
                  <label htmlFor="product_name" className='block mb-2 text-gray-600'>Product Name</label>
                  <input type='text' id='productname' value={formData.productname} onChange={handleChange} name='productname' className='w-full p-2 border border-gray-300 rounded' required />
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
                  <input type='text' id='brandname' value={formData.brandname} onChange={handleChange} name='brandname' className='w-full p-2 border border-gray-300 rounded' required />
                </div>

                <div className='w-full md:mb-5'>
                  <label htmlFor="Size" className='block mb-2 text-gray-600'>Size</label>
                  <input type='text' id='size' value={formData.size} onChange={handleChange} name='size' className='w-full p-2 border border-gray-300 rounded' required />
                </div>
                <div className='w-full mb-5'>
                  <label htmlFor="Price" className='block mb-2 text-gray-600'>Price</label>
                  <input type='text' id='price' value={formData.price} onChange={handleChange} name='price' className='w-full p-2 border border-gray-300 rounded' required />
                </div>
              </div>


              <div className='flex flex-col md:flex-row items-center gap-5'>
                <div className='w-full md:mb-5'>
                  <label htmlFor="Publish_Date" className='block mb-2 text-gray-600'>Publish Date</label>
                  <input type='date' id='pdate' value={formData.pdate} onChange={handleChange} name='pdate' className='w-full p-2 border border-gray-300 text-gray-600 rounded' required />
                </div>

                <div className='w-full mb-5'>
                  <label htmlFor="Availability" className='block mb-2 text-gray-600'>Availability</label>
                  <select name='availability' id='availability' value={formData.availability} onChange={handleChange} className='w-full p-2.5 border border-gray-300 rounded text-gray-600 placeholder-gray-200 text-sm' required>
                    <option value=''>Select Category</option>
                    <option value='electronics'>In Stock</option>
                    <option value='fashion'>Out of Stock</option>
                  </select>
                </div>

              </div>

              <div className='flex flex-col md:flex-row items-center gap-5'>
                <div className='w-full md:mb-5'>
                  <label htmlFor="Discount_Price" className='block mb-2 text-gray-600'>Discount Price</label>
                  <input type='text' name='discount' id='discount' value={formData.discount} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded' required />
                </div>

                <div className='w-full md:mb-5'>
                  <label htmlFor="Color" className='block mb-2 text-gray-600'>Color</label>
                  <input type='text' name='color' id='color' value={formData.color} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded' required />
                </div>
                <div className='w-full mb-5'>
                  <label htmlFor="Status" className='block mb-2 text-gray-600'>Status</label>
                  <select name='status' id='status' value={formData.status} onChange={handleChange} className='w-full p-2.5 border border-gray-300 rounded text-gray-600 placeholder-gray-200 text-sm' required>
                    <option value=''>Select Category</option>
                    <option value='electronics'>Active</option>
                    <option value='fashion'>InActive</option>
                  </select>
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
                  className='w-full p-2 border border-gray-300 rounded'
                  required
                />
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
                      className="w-full h-32 object-cover rounded border"
                    />
                  ))}
                </div>
              )}
            </>
          )}



          {/* Submit Button */}
          <button
            type='submit'
            className='bg-indigo-600 text-white px-4 py-2 rounded'
          >
            Submit Product
          </button>
        </form>


      </div>
    </div>
  )
}

export default AddProducts
