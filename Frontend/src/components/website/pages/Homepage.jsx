import React from 'react'
import NavBar from '../layout/NavBar'
import Categorys from '../layout/Categorys'
import Hero from '../layout/Hero'
import FeaturedCategories from '../layout/FeaturedCategories'
import TodayDeals from '../layout/TodayDeals'
import Footer from '../layout/Footer'
import TopElectronicBrands from '../layout/TopElectronicBrands'

const Homepage = () => {
    return (
        <div className='flex flex-col items-center text-center'>
            <NavBar />
            <Categorys/>
            <Hero/>
            <FeaturedCategories/>
            <TodayDeals />
            <TopElectronicBrands />
            <Footer/>
        </div>
    )
}

export default Homepage