import React, { useEffect, useState } from 'react';
import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import ArrowDropUpSharpIcon from '@mui/icons-material/ArrowDropUpSharp';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const MobileCategorySidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [allCategories, setAllCategories] = useState([]);
    const [activeIds, setActiveIds] = useState([]);

    const fetchAllCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/category-tree');
            if (response.data?.data) {
                setAllCategories(response.data.data);
            }
        } catch (error) {
            console.error("Fetching API Error", error);
        }
    };

    useEffect(() => {
        fetchAllCategories();
    }, []);

    const toggleSidebar = () => setSidebarOpen((prev) => !prev);
    const closeSidebar = () => setSidebarOpen(false);

    const toggleCategory = (id) => {
        setActiveIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

   
    const renderNestedCategories = (categories, level = 0) => {
        return (
            <ul className={`mt-1 space-y-1 ${level > 0 ? `ml-${level * 2}` : ''}`}>
                {categories.map((cat) => (
                    <li key={cat.id}>
                        <div
                            className="flex justify-between items-center py-2 cursor-pointer border-b border-gray-400"
                            onClick={() => toggleCategory(cat.id)}
                        >
                           <NavLink to={`/category-list/${cat.id}`}>
                                 <span className="text-white">{cat.name}</span>
                           </NavLink>
                            {cat.children?.length > 0 && (
                                <span className="text-sm text-gray-300">
                                    {activeIds.includes(cat.id) ? <ArrowDropUpSharpIcon /> : <ArrowDropDownSharpIcon />}
                                </span>
                            )}
                        </div>

                        {activeIds.includes(cat.id) && cat.children?.length > 0 &&
                            renderNestedCategories(cat.children, level + 1)}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <>
            {/* Top Nav for mobile */}
            <div className='lg:hidden flex items-center gap-2 justify-start py-3 border-b border-gray-200 px-3 md:px-6 lg:px-12'>
                <div className='flex items-center justify-between w-full gap-1' onClick={toggleSidebar}>
                    <FormatListBulletedSharpIcon color="primary" />
                    <span className='text-gray-500'>All Categories</span>
                </div>
            </div>

            {/* Backdrop */}
            {sidebarOpen && (
                <div
                    className='fixed inset-0 z-40 bg-black/40 backdrop-blur-sm'
                    onClick={closeSidebar}
                ></div>
            )}

            {/* Sidebar Drawer */}
            <div
                className={`fixed top-0 right-0 w-80 h-screen text-left text-white z-50 transition-transform duration-500 ease-in-out px-4
                ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
                backdrop-blur-sm bg-blue-900/50 shadow`}
            >
                <div className='flex items-center justify-end py-2'>
                    <CloseIcon onClick={closeSidebar} />
                </div>

                {/* Recursive Nested Categories */}
                {renderNestedCategories(allCategories)}
            </div>
        </>
    );
};

export default MobileCategorySidebar;
