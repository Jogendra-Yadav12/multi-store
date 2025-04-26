import React, { useRef, useState } from 'react';
import axios from 'axios';
import HeadingTag from '../HeadingNav';
import { assets } from '../../../assets/assets'

const AddCategory = () => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    parent_id: '',
    image: '',
    description: '',
    status: '',
    meta_title: '',
    meta_desc: ''
  });

  const [imagePreview, setImagePreview] = useState(null);

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      const newSlug = generateSlug(value);
      setFormData(prev => ({
        ...prev,
        name: value,
        slug: newSlug
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('category data', formData);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('slug', formData.slug);
    data.append('parent_id', formData.parent_id || null);
    data.append('status', formData.status || 'active');
    data.append('description', formData.description);
    data.append('meta_title', formData.meta_title);
    data.append('meta_desc', formData.meta_desc);
    data.append('image', formData.image);

    try {
      const res = await axios.post("http://localhost:5000/api/add-category", data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Server Response:', res.data);
      alert(`✅ Category added successfully! ID: ${res.data.categoryId}`);
      
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
      setImagePreview(null);

    } catch (err) {
      console.error('Error adding category', err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8">
      <HeadingTag title="Category Management" path="Add Category" />
      <div className="w-full bg-gray-100 p-6 rounded shadow">
        <form onSubmit={handleSubmit} className="space-y-5 mt-5">
          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="w-full">
              <label className="block mb-2 text-gray-600">Category Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-gray-600">Slug</label>
              <input type="text" name="slug" id="slug" value={formData.slug} className="w-full p-2 border rounded" readOnly />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-gray-600">Parent Category</label>
              <select name="parent_id" value={formData.parent_id} onChange={handleChange} className="w-full p-2.5 border rounded">
                <option value="">None</option>
                <option value="fashion">Fashion</option>
                <option value="electronics">Electronics</option>
                <option value="books">Books</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="w-full">
              <label className="block mb-2 text-gray-600">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2.5 border rounded text-gray-600">
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-gray-600">Category Image</label>
            
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleUploadChange}
                className="hidden"
              />

              <div onClick={handleImageClick} className="cursor-pointer w-32 h-32 border rounded overflow-hidden flex items-center justify-center bg-white">
                <img
                  src={imagePreview || `http://localhost:5000/uploads/dummy.jpg`}
                  alt="Category Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-gray-600">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded"></textarea>
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Meta Title</label>
            <input type="text" name="meta_title" value={formData.meta_title} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Meta Description</label>
            <textarea name="meta_desc" value={formData.meta_desc} onChange={handleChange} className="w-full p-2 border rounded"></textarea>
          </div>

          <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded">Submit Category</button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
