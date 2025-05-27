import React from 'react'
import NavBar from '../layout/NavBar'
import Categorys from '../layout/Categorys'
import Hero from '../layout/Hero'

const Homepage = () => {
    return (
        <div className='flex flex-col items-center text-center'>
            <NavBar />
            <Categorys/>
            <Hero/>
        </div>
    )
}

export default Homepage