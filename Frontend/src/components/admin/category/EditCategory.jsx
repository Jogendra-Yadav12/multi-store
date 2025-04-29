import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import HeadingTag from '../HeadingNav';
import { toast } from 'react-toastify';

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        status: '',
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
        axios.get(`http://localhost:5000/api/categories/${id}`)
            .then(res => {
                const cat = res.data;
                setFormData({
                    ...cat,
                    slug: cat.slug || generateSlug(cat.name),
                });
                setImagePreview(`http://localhost:5000/uploads/${cat.image}`);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching category', err);
                setLoading(false);
            });
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

    // Submit update
    const handleSubmit = async (e) => {
        e.preventDefault();

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
            toast.success('✅ Category updated successfully!')
            navigate('/admin/view-category'); // Adjust route as per your app
        } catch (err) {
            console.error('Update error:', err);
            toast.error('❌ Failed to update category!')
        }
    };

    if (loading) return <p className="text-center mt-10 text-gray-500">Loading category data...</p>;

    return (
        <div className="min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8">
            <HeadingTag title="Edit Category" path={`Edit Category #${id}`} />
            <form onSubmit={handleSubmit} className="space-y-5 bg-gray-100 p-6 rounded shadow">
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
                </div>
              

                <textarea name="meta_desc" value={formData.meta_desc} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Meta Description" ></textarea>

                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Description"></textarea>

                <div>
                    <label className="block mb-2 text-gray-700">Category Image</label>
                    <input type="file" onChange={handleUploadChange} />
                    {imagePreview && (
                        <div className="mt-3 w-32 h-32 border rounded overflow-hidden">
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>

                <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded">Update Category</button>
            </form>
        </div>
    );
};

export default EditCategory;
