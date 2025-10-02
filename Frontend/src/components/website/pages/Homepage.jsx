import React from 'react'
import NavBar from '../layout/NavBar'
import Hero from '../layout/Hero'
import TodayDeals from '../layout/TodayDeals'
import Footer from '../layout/Footer'
import TopElectronicBrands from '../layout/TopElectronicBrands'
import NavCategories from '../layout/NavCategories'
// import UserLocation from './UserLocation'
import Categories from './category/Categories'

const Homepage = () => {
    return (
        <div className="text-center overflow-hidden">
            <NavBar />
            <NavCategories />
            <Hero />
            <Categories />
            <TodayDeals />
            <TopElectronicBrands />
            <Footer />
        </div>
    )
}

export default Homepage
