import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const SearchBar = () => {
    return (
        <div className='w-44 md:w-full'>

            <form className="w-full">
               
                <div className="relative flex items-center">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pt-1 pointer-events-none">
                            <SearchOutlinedIcon sx={{ color: '#3FA8E9', fontSize: 22 }} />
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-0 focus:border-gray-300 focus:shadow-none"
                        placeholder="Search for Products and More..."
                        autoComplete="off"
                    />


                </div>
            </form>

        </div>
    )
}

export default SearchBar