import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeadingTag from '../layout/HeadingNav';
import { toast } from 'react-toastify';

const EditProduct = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [imagePreview, setImagePreview] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const filesInputRef = useRef(null);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [existingImageList, setExistingImageList] = useState([]);
    const [getBrand, setGetBrand] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        brand_id: '',
        price: '',
        discount_price: '',
        status: '',
        stock: '',
        quantity: '',
        description: '',
        images: []
    });

    useEffect(() => {
        let fetchedProduct = null;
        axios.get(`http://localhost:5000/api/product/${id}`)
            .then(res => {
                fetchedProduct = res.data;

                return axios.get('http://localhost:5000/api/categories');
            })
            .then(res => {
                const fetchedCategories = res.data;
                setCategories(fetchedCategories);
                console.log(fetchedProduct);

                setFormData({
                    name: fetchedProduct.name,
                    category: fetchedProduct.category,
                    brand_id: fetchedProduct.brand_id,
                    price: fetchedProduct.price,
                    discount_price: fetchedProduct.discount_price,
                    status: fetchedProduct.status,
                    stock: fetchedProduct.stock,
                    quantity: fetchedProduct.quantity,
                    description: fetchedProduct.description,
                    images: [],
                });

                const imagesArray = fetchedProduct.images
                    ? fetchedProduct.images.split(',').map(img => `http://localhost:5000/uploads/${img.trim()}`)
                    : [];

                setExistingImageList(fetchedProduct.images ? fetchedProduct.images.split(',') : []);
                setImagePreview(imagesArray);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching product or categories', err);
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (key !== "images") {
                data.append(key, value);
            }
        });

        let hasValidImages = false;
        if (formData.images && formData.images.length > 0) {
            formData.images.forEach((img) => {
                if (img instanceof File) {
                    const validTypes = ["image/png", "image/jpg", "image/jpeg"];
                    if (validTypes.includes(img.type)) {
                        data.append("images", img);
                        hasValidImages = true;
                    } else {
                        alert("Only PNG, JPG, and JPEG files are allowed.");
                    }
                }
            });
        }

        if (!hasValidImages) {
            data.append("images", '');
        }

        if (existingImageList.length > 0) {
            data.append("existing_images", existingImageList.join(','));
        } else {
            data.append("existing_images", '');
        }

        try {
            await axios.put(`http://localhost:5000/api/product/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Product updated successfully!');
            navigate('/view-products');
        } catch (err) {
            console.log('Update error', err.response?.data || err);
            toast.error('Failed to update product!');
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        // Replace both formData.images and imagePreview
        setFormData(prev => ({
            ...prev,
            images: files
        }));


        const newImagePreviews = files.map(file => URL.createObjectURL(file));
        setImagePreview(newImagePreviews);

        // Also clear old uploaded image list from preview (if you want)
        setExistingImageList([]); // Optional: clear server images if new selected
    };


    const handleImageClick = () => {
        filesInputRef.current.click();
    };

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/getbrand');
                setGetBrand(res.data);
            } catch (err) {
                console.error("Brand api Error:", err);
            }
        }
        fetchBrands()
    }, [])

    if (loading) return <p className="text-center mt-10 text-gray-500">Loading products data...</p>;


    return (
        <div className='min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8'>
            <HeadingTag title="Edit Product" path="Edit Product" />

            <div className='flex justify-between'>
                <div className='flex gap-3'>
                    <button className={`px-4 py-2 rounded ${activeTab === 'general' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`} onClick={() => setActiveTab('general')}>General Info</button>
                    <button className={`px-4 py-2 rounded ${activeTab === 'images' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`} onClick={() => setActiveTab('images')}>Images</button>
                </div>
                <div>
                    <button type='submit' form='updateProductForm' className='bg-indigo-600 text-white px-4 py-2 rounded'>Update</button>
                </div>
            </div>

            <div className='w-full bg-gray-100 p-6 rounded shadow'>
                <form id='updateProductForm' onSubmit={handleSubmit} className='space-y-4'>
                    {activeTab === 'general' && (
                        <>
                            <div className='flex flex-col md:flex-row items-center gap-5'>
                                <div className='w-full md:mb-5'>
                                    <label htmlFor="product_name" className='block mb-2 text-gray-600'>Product Name</label>
                                    <input type='text' id='name' value={formData.name} onChange={handleChange} name='name' className='w-full p-2 border border-gray-300 rounded' required />
                                </div>
                                <div className='w-full mb-5'>
                                    <label htmlFor="category" className="block mb-2 text-gray-600">Category</label>
                                    <select name='category' id='category' value={formData.category} onChange={handleChange} className='w-full p-2.5 border border-gray-300 rounded text-gray-600 text-sm' required>
                                        <option value=''>Select Category</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row items-center gap-5'>
                                <div className='w-full md:mb-5'>
                                    <label htmlFor="brand_id" className='block mb-2 text-gray-600'>Brand Name</label>
                                    <select name='brand_id' id='brand_id' value={formData.brand_id} onChange={handleChange} className='w-full p-2.5 border border-gray-300 rounded text-gray-600 text-sm placeholder-gray-200' required>
                                        {/* <option value=''>Select Brand Name</option> */}
                                        {getBrand.map((brand) => (
                                            <option key={brand.id} value={brand.id}>
                                                {brand.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='w-full md:mb-5'>
                                    <label htmlFor="price" className='block mb-2 text-gray-600'>Price</label>
                                    <input type='text' id='price' value={formData.price} onChange={handleChange} name='price' className='w-full p-2 border border-gray-300 rounded' required />
                                </div>
                                <div className='w-full md:mb-5'>
                                    <label htmlFor="discount_price" className='block mb-2 text-gray-600'>Discount Price</label>
                                    <input type='text' name='discount_price' id='discount_price' value={formData.discount_price} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded' required />
                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row items-center gap-5'>
                                <div className='w-full mb-5'>
                                    <label htmlFor="status" className='block mb-2 text-gray-600'>Status</label>
                                    <select name='status' id='status' value={formData.status} onChange={handleChange} className='w-full p-2.5 border border-gray-300 rounded text-gray-600 text-sm' required>
                                        <option value={1}>Active</option>
                                        <option value={0}>Inactive</option>
                                    </select>
                                </div>
                                <div className='w-full mb-5'>
                                    <label htmlFor="stock" className='block mb-2 text-gray-600'>Availability</label>
                                    <select name='stock' id='stock' value={formData.stock} onChange={handleChange} className='w-full p-2.5 border border-gray-300 rounded text-gray-600 text-sm' required>
                                        <option value={1}>Stock</option>
                                        <option value={0}>Out of Stock</option>
                                    </select>
                                </div>
                                <div className='w-full md:mb-5'>
                                    <label htmlFor="quantity" className='block mb-2 text-gray-600'>Quantity</label>
                                    <input type='number' name='quantity' id='quantity' value={formData.quantity} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded' required />
                                </div>
                            </div>

                            <div className='w-full mb-5'>
                                <label htmlFor="description" className='block mb-2 text-gray-600'>Product Description</label>
                                <textarea id='description' name='description' value={formData.description} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded' required></textarea>
                            </div>
                        </>
                    )}

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
                                <div onClick={handleImageClick} className="cursor-pointer w-32 h-32 border rounded overflow-hidden flex items-center justify-center bg-white">
                                    <img
                                        src={imagePreview?.[0] || 'http://localhost:5000/uploads/dummy.jpg'}
                                        alt="Product Preview"
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                                <p className='text-sm text-gray-600 mt-1'>You can select multiple images</p>
                            </div>

                            {(imagePreview.length > 0 || existingImageList.length > 0) && (
                                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {imagePreview.map((src, index) => (
                                        <img key={`preview-${index}`} src={src} alt={`preview-${index}`} className="w-full h-full object-cover shadow-lg rounded border" />
                                    ))}
                                </div>
                            )}

                        </>
                    )}
                </form>
            </div>
        </div>
    );
}


export default EditProduct;