import React from 'react'
import NavBar from '../layout/NavBar'
import Categories from './Categories'
import Hero from '../layout/Hero'
import TodayDeals from '../layout/TodayDeals'
import Footer from '../layout/Footer'
import TopElectronicBrands from '../layout/TopElectronicBrands'
import NavCategories from '../layout/NavCategories'

const Homepage = () => {
    return (
        <div className='flex flex-col items-center text-center overflow-hidden'>
            <NavBar />
            <NavCategories/>
            <Hero/>
            <Categories/>
            <TodayDeals />
            <TopElectronicBrands />
            <Footer/>
        </div>
    )
}

export default Homepage