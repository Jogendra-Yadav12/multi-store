import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import axios from 'axios';

const NavCategories = () => {
    const [allCategories, setAllCategories] = useState([]);
    const [activeChildId, setActiveChildId] = useState(null);

    const fetchAllCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/category-tree');
            setAllCategories(response.data.data);
        } catch (error) {
            console.error("Fetching API Error", error);
        }
    };

    useEffect(() => {
        fetchAllCategories();
    }, []);

    const renderAllCategories = (categories) => {
        return categories.map((cat) => (
            <div key={cat.id} className="relative group text-left">
                <NavLink
                    to="#"
                    className="px-4 py-1 rounded-full text-gray-700 bg-blue-100 flex items-center gap-1  whitespace-nowrap"
                >
                    {cat.name}
                    {cat.children && cat.children.length > 0 && (
                        <span className="transform transition-transform duration-200 group-hover:rotate-90">
                            <KeyboardArrowRightOutlinedIcon fontSize="small" />
                        </span>
                    )}


                </NavLink>

                {/* Children dropdown */}
                {cat.children && cat.children.length > 0 && (
                    <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-md rounded z-10 min-w-[180px] p-2 space-y-1">
                        {cat.children.map((child) => (
                            <div
                                key={child.id}
                                className="relative group"
                                onMouseEnter={() => setActiveChildId(child.id)}
                            >
                                <NavLink
                                    to="#"
                                    className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded flex justify-between items-center"
                                >
                                    {child.name}
                                    {child.children && child.children.length > 0 && (
                                        <span className={`transform transition-transform duration-200 ${activeChildId === child.id ? 'rotate-90' : ''}`}>
                                            <KeyboardArrowRightOutlinedIcon fontSize="small" />
                                        </span>
                                    )}

                                </NavLink>

                                {/* Only show grandchild if this child is active */}
                                {child.children && child.children.length > 0 && activeChildId === child.id && (
                                    <div className="absolute top-0 left-full bg-white shadow-md rounded z-10 min-w-[180px] p-2 space-y-1">
                                        {child.children.map((subChild) => (
                                            <NavLink
                                                key={subChild.id}
                                                to="#"
                                                className="block text-sm px-3 py-1 text-gray-700 hover:bg-gray-100 rounded"
                                            >
                                                {subChild.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <div className="flex items-center gap-5 w-full px-2 md:px-6 lg:px-12 pt-24 py-5 border-b border-gray-200 relative">
            {renderAllCategories(allCategories)}
        </div>
    );
};

export default NavCategories;
