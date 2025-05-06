import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HeadingTag from '../HeadingNav';
import { toast } from 'react-toastify';

const EditProduct = () => {

    const [activeTab, setActiveTab] = useState('general');
    const [imagePreview, setImagePreview] = useState('');
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const filesInputRef = useRef(null)
    const navigate = useNavigate()
    const [categories, setCategories] = useState([]);
    const [existingImageList, setExistingImageList] = useState([]);


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

    useEffect(() => {
        axios.get(`http://localhost:5000/api/product/${id}`)
            .then(res => {
                const product = res.data;
                console.log("Fetched product:", product);

                setFormData({
                    name: product.name || '',
                    category: product.category || '',
                    brand: product.brand || '',
                    price: product.price || '',
                    discount_price: product.discount_price || '',
                    status: product.status || '',
                    stock: product.stock || '',
                    quantity: product.quantity || '',
                    description: product.description || '',
                    images: [], // clear for file input
                });

                //  Assuming product.images is comma separated string: "img1.jpg,img2.jpg"
                const imagesArray = product.images
                    ? product.images.split(',').map(img => `http://localhost:5000/uploads/${img.trim()}`)
                    : [];

                    setExistingImageList(product.image ? product.image.split(',') : []);

                setImagePreview(imagesArray); // multiple preview
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products', err);
                setLoading(false);
            });

        // Categories load
        axios.get('http://localhost:5000/api/categories')
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => {
                console.error('Error fetching categories', err);
            });
    }, [id]);




    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("product form data", formData);
        const data = new FormData();
      
        for (let key in formData) {
          if (key === "images") {
            if (formData.images.length > 0) {
              formData.images.forEach((img) => {
                if (img instanceof File) {
                  const validTypes = ["image/png", "image/jpg", "image/jpeg"];
                  if (validTypes.includes(img.type)) {
                    data.append("images", img);
                  } else {
                    alert("Only PNG, JPG, and JPEG files are allowed.");
                  }
                }
              });
            }
          } else {
            data.append(key, formData[key]);
          }
        }
      
        //  Append existing images
        if (existingImageList.length > 0) {
          data.append("existing_images", existingImageList.join(','));
        }
      console.log(data)
        try {
          await axios.put(`http://localhost:5000/api/product/${id}`, data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          toast.success('Product updated successfully!');
          navigate('/admin/view-products');
        } catch (err) {
          console.log('Update error', err.response?.data || err);
          toast.error('Failed to update product!');
        }
      };
      


    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'name') {
            setFormData(prev => ({
                ...prev,
                name: value,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Handle image change
    // Handle Image Change
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            images: files
        }));

        // Overwrite existing preview if uploading new images
        setImagePreview([]);
    };


    const handleImageClick = () => {
        filesInputRef.current.click();
    };


    if (loading) return <p className="text-center mt-10 text-gray-500">Loading products data...</p>;
    return (
        <div className='min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8'>
            <HeadingTag title="Edit Product" path="Edit Product" />
            {/* tabs */}
            <div className='flex justify-between'>
                <div className='flex gap-3'>
                    <button className={`px-4 py-2 rounded ${activeTab === 'general' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`} onClick={() => setActiveTab('general')}>General Info</button>
                    <button className={`px-4 py-2 rounded ${activeTab === 'images' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`} onClick={() => setActiveTab('images')} >Images</button>
                </div>
                <div>
                    {/* Submit Button */}
                    <button type='submit' form='updateProductForm' className='bg-indigo-600 text-white px-4 py-2 rounded'>
                        Update
                    </button>
                </div>
            </div>

            {/* tab content */}

            <div className='w-full bg-gray-100 p-6 rounded shadow'>

                <form id='updateProductForm' onSubmit={handleSubmit} className='spacy-y-4'>
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
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
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

                                        <option value='stock'>In Stock</option>
                                        <option value='out of stock'>Out of Stock</option>
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
                                    accept="image/png, image/jpg, image/jpeg"
                                    onChange={handleImageChange}
                                    type='file'
                                    multiple
                                    className='w-full p-2 border border-gray-300 rounded hidden'
                                    ref={filesInputRef}
                                />

                                {/* Clickable upload area */}
                                <div onClick={handleImageClick} className="cursor-pointer w-32 h-32 border rounded overflow-hidden flex items-center justify-center bg-white">
                                    <img
                                        src={imagePreview?.[0] || 'http://localhost:5000/uploads/dummy.jpg'}
                                        alt="Product Preview"
                                        className="object-contain w-full h-full"
                                    />
                                </div>

                                <p className='text-sm text-gray-600 mt-1'>You can select multiple images</p>
                            </div>

                            {/*  Show Existing + New Image Previews */}
                            {(imagePreview.length > 0 || formData.images.length > 0) && (
                                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {/* Existing preview (from server) */}
                                    {imagePreview.map((src, index) => (
                                        <img
                                            key={`existing-${index}`}
                                            src={src}
                                            alt={`existing-${index}`}
                                            className="w-full h-full object-cover shadow-lg rounded border"
                                        />
                                    ))}

                                    {/* New uploaded previews */}
                                    {formData.images.map((file, index) => (
                                        <img
                                            key={`new-${index}`}
                                            src={URL.createObjectURL(file)}
                                            alt={`new-${index}`}
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

export default EditProduct