import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import HeadingTag from '../layout/HeadingNav';
import { toast } from 'react-toastify';

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const fileInputRef = useRef(null)


    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        status: '',
        parent_id: '',
        meta_title: '',
        meta_desc: '',
        image: '',
    });

    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(true);

    // Slug generator
    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    };

    // Fetch existing category data
    useEffect(() => {
        const fetchCategoryAndCategories = async () => {
            try {
                const [catRes, allCatsRes] = await Promise.all([
                    axios.get(`http://localhost:5000/api/categories/${id}`),
                    axios.get("http://localhost:5000/api/categories")
                ]);

                const cat = catRes.data;
                setFormData({
                    ...cat,
                    slug: cat.slug || generateSlug(cat.name),
                });
                setImagePreview(`http://localhost:5000/uploads/${cat.image}`);

                // remove self from parent dropdown
                const filtered = allCatsRes.data.filter(c => c.id !== parseInt(id));
                setCategories(filtered);

                setLoading(false);
            } catch (err) {
                console.error("Error loading data", err);
                setLoading(false);
            }
        };

        fetchCategoryAndCategories();
    }, [id]);


    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'name') {
            setFormData(prev => ({
                ...prev,
                name: value,
                slug: generateSlug(value)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Handle image change
    const handleUploadChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setFormData(prev => ({
                ...prev,
                image: file
            }));
        }
    };
    const handleImageClick = () => {
        fileInputRef.current.click();
    };
    // Submit update
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('category full data:', formData);

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            await axios.put(`http://localhost:5000/api/categories/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Category updated successfully!')
            navigate('/view-category');
        } catch (err) {
            console.error('Update error:', err);
            toast.error('Failed to update category!')
        }
    };

    if (loading) return <p className="text-center mt-10 text-gray-500">Loading customer data...</p>;

    return (
        <div className="min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8">
            <HeadingTag title="Edit Category" path='Edit Category' />
            <div className='flex items-center justify-end'>
                <button type="submit" form='updateCategoryForm' className="bg-indigo-600 text-white px-6 py-2 rounded">Update</button>
            </div>
            <form id='updateCategoryForm' onSubmit={handleSubmit} className="space-y-5 bg-gray-100 p-6 rounded shadow">
                <div className="flex flex-col md:flex-row gap-5">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Category Name" className="w-full p-2 border rounded" />
                    <input type="text" name="slug" value={formData.slug} readOnly className="w-full p-2 border rounded bg-gray-100 text-gray-500" />

                </div>

                <div className="flex flex-col md:flex-row gap-5">
                    <input type="text" name="meta_title" value={formData.meta_title} onChange={handleChange} placeholder="Meta Title" className="w-full p-2 border rounded" />


                    <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2.5 border rounded text-gray-600">
                        <option value="">Select Status</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>

                    <select
                        name="parent_id"
                        value={formData.parent_id || 0}
                        onChange={handleChange}
                        className="w-full p-2.5 border rounded text-gray-600"
                    >
                        <option value="0">None</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                </div>


                <textarea name="meta_desc" value={formData.meta_desc} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Meta Description" ></textarea>

                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Description"></textarea>

                <div>
                    <label className="block mb-2 text-gray-700">Update Image</label>
                    <input type="file" onChange={handleUploadChange} className='hidden' ref={fileInputRef} />
                    <div onClick={handleImageClick} className="cursor-pointer w-32 h-32 border rounded overflow-hidden flex items-center justify-center bg-white">
                        <img
                            src={imagePreview || `http://localhost:5000/uploads/dummy.jpg`}
                            alt="Category Preview"
                            className="object-fill w-full h-full"
                        />
                    </div>
                </div>


            </form>
        </div>
    );
};

export default EditCategory;
