import axios from 'axios';
import React, { useEffect, useState } from 'react'

const FilterSidebar = ({ categoryId, min = 0, max = 50000, onChange }) => {

    const [fetchBrands, setBrands] = useState([]);
    const [value, setValue] = useState(max);

    const handleChange = (e) => {
        const newValue = parseInt(e.target.value);
        setValue(newValue);
        if (onChange) onChange(newValue);
    };
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/productCategory/${categoryId}`)
                // console.log(res.data);

                const allBrands = res.data.map(item => item.brand_id);
                const uniqueBrand = [...new Set(allBrands)]
                setBrands(uniqueBrand)

            } catch (err) {
                console.error("Fetching category api error:", err);

            }
        }
        

        if (categoryId) {
            fetchCategory();
        }
    }, [categoryId])

    return (
        <div className="flex w-40 md:w-64 text-left h-full border-r border-gray-300 p-2">



            <div className="z-10 w-full px-4 bg-white h-screen py-2">
                <div>
                    <h5 className="mb-3 text-lg font-medium text-blue-500">
                        Brands
                    </h5>
                    <ul className="space-y-2 text-sm">

                        {
                            fetchBrands.map((items, index) => (
                                <li key={index} className="flex items-center">
                                    <input id={`brand-${index}`} type="checkbox" value={items}
                                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500" />

                                    <label htmlFor="apple" className="ml-2 text-sm font-medium text-gray-600">
                                        {items}
                                    </label>
                                </li>
                            ))
                        }

                    </ul>
                </div>
                <div className='mt-5'>
                    <div className="w-full">
                        <h5 className="text-blue-500 text-lg font-medium mb-3">Price Range</h5>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>₹{min}</span>
                            <span className="font-semibold text-gray-700">Up to ₹{value}</span>
                        </div>
                        <input
                            type="range"
                            min={min}
                            max={max}
                            value={value}
                            onChange={handleChange}
                            className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer slider-thumb transition"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterSidebar