import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/banner'
import Explore_menu from '../components/Explore-menu'
import Dishes from '../components/Dishes'
import Footer from '../components/Footer'
import Login from '../components/login'
import Modal from '../components/signupModal'


function Home() {
    return (
        <>
            <Login />
            <Modal />
            <Banner />
            <Explore_menu />
            <Dishes />
        </>
    )
}

export default Home
