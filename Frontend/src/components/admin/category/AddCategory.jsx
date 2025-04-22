import React, { useState } from 'react'
import axios from 'axios';
import HeadingTag from '../HeadingNav';

const AddCategory = () => {

    const [category, setCategory] = useState('');
    const [slug, setSlug] = useState('')



    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        parent_id: '',
        image: '',
        description: '',
        status: '',
        meta_title: '',
        meta_desc: ''
    })

    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setCategory(value);
        setSlug(generateSlug(value))
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "name") {
            const newSlug = generateSlug(value)
            setFormData({ ...formData, [name]: value, slug: newSlug });
        }
        else {
            setFormData({ ...formData, [name]: value });
        }
    }
    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('category data', formData);
        const data = new FormData();
        data.append('name', formData.name || category);
        data.append('slug', slug);
        data.append('parent_id', formData.parent_id);
        data.append('status', formData.status);
        data.append('description', formData.description);
        data.append('meta_title', formData.meta_title);
        data.append('meta_desc', formData.meta_desc);
        data.append('image', formData.image);

        try {
            const res = await axios.post('http://localhost:5000/api/add-category', formData);
            console.log('category added', res.data);
            alert('Category Successfully added!');
            // ✅ Reset the form
            setCategory('');
            setSlug('');
            setFormData({
                name: '',
                slug: '',
                parent_id: '',
                image: '',
                description: '',
                status: '',
                meta_title: '',
                meta_desc: ''
            });

        } catch (err) {
            console.log('Error adding category', err);
            alert('Somthing went wrong!')
        }

    }
    return (
        <div className='min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8'>
            <HeadingTag title="Category Management" path="Add Category" />

            <div className='w-full bg-gray-100 p-6 rounded shadow'>
                <form onSubmit={handleSubmit} className='space-y-5 mt-5'>
                    <div className='flex flex-col md:flex-row items-center gap-5'>
                        <div className='w-full'>
                            <label className='block mb-2 text-gray-600'>Category Name</label>
                            <input type='text' name='name' value={category} onChange={handleCategoryChange} required className='w-full p-2 border rounded' />
                        </div>

                        <div className='w-full'>
                            <label className='block mb-2 text-gray-600'>Slug</label>
                            <input type='text' name='slug' id='slug' value={slug} className='w-full p-2 border rounded' readOnly />
                        </div>
                        <div className='w-full'>
                            <label className='block mb-2 text-gray-600'>Parent Category</label>
                            <select name='parent_id' value={formData.parent_id} onChange={handleChange} className='w-full p-2.5 border rounded'>
                                <option value=''>None</option>
                                <option value='fashion'>Fashion</option>
                                <option value='electronics'>Electronics</option>
                                <option value='books'>Books</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row items-center gap-5'>
                        <div className='w-full'>
                            <label className='block mb-2 text-gray-600'>Status</label>
                            <select name='status' value={formData.status} onChange={handleChange} className='w-full p-2.5 border rounded placeholder-gray-200 text-gray-600'>
                                <option value='active'>Active</option>
                                <option value='inactive'>Inactive</option>
                            </select>
                        </div>
                        <div className='w-full'>
                            <label className='block mb-2 text-gray-600'>Category Image</label>
                            <input type='file' name='image' onChange={handleImageChange} className='w-full p-2 border rounded bg-white' />
                        </div>
                    </div>



                    <div>
                        <label className='block mb-2 text-gray-600'>Description</label>
                        <textarea name='description' value={formData.description} onChange={handleChange} className='w-full p-2 border rounded'></textarea>
                    </div>



                    <div>
                        <label className='block mb-2 text-gray-700'>Meta Title</label>
                        <input type='text' name='meta_title' value={formData.meta_title} onChange={handleChange} className='w-full p-2 border rounded' />
                    </div>

                    <div>
                        <label className='block mb-2 text-gray-700'>Meta Description</label>
                        <textarea name='meta_desc' value={formData.meta_desc} onChange={handleChange} className='w-full p-2 border rounded'></textarea>
                    </div>

                    <button type='submit' className='bg-indigo-600 text-white px-6 py-2 rounded'>Submit Category</button>
                </form>
            </div>
        </div>
    )
}

export default AddCategory