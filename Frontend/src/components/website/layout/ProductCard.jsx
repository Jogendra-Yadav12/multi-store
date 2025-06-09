import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const ProductCard = ({ product }) => {

  const productImageArray = product.images ? product.images.split(',') : []
  const firstImage = productImageArray.slice(0, 1)[0]
  const percentOff = Math.round(((product.price - product.discount_price) / product.price) * 100);


  return (

    <div className=" bg-white w-full text-left shadow-md border cursor-pointer overflow-hidden relative group hover:shadow-lg transition-all duration-300 hover:border-blue-400">

      {/* Top Discount Badge */}
      <div className="absolute top-0 right-0 bg-green-600 text-white text-sm font-semibold px-2 py-3 rounded-bl-lg z-10">
        {percentOff}% OFF
      </div>

      {/* Top wishList icon */}
      <div className="absolute top-0 left-1  text-orange-300 text-sm font-semibold px-2 py-3  z-10">
        <FavoriteBorderIcon />
      </div>

      {/* Product Image */}
      <img
        src={`http://localhost:5000/uploads/${firstImage}`}
        alt={product.name}
        className="w-full rounded-xl h-52 object-contain p-4"
      />

      {/* Product Info */}
      <div className="px-4 py-3 border-t">
        <h4 className="text-gray-800 font-semibold text-md">{product.name.slice(0, 25)}..</h4>

        <div className="flex gap-2 mt-1">
          <span className="text-lg font-bold text-black">₹{product.discount_price}</span>
          <span className="text-sm text-red-400 line-through">₹{product.price}</span>
        </div>

        <p className="text-green-600 text-sm mt-1 font-medium">
          Save - ₹{product.price - product.discount_price}
        </p>
      </div>
    </div>

  )
}

export default ProductCard