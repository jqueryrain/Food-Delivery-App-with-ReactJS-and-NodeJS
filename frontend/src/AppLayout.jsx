import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Login from './components/login'
import Modal from './components/signupModal'
import { AuthenticateUserProvider } from './contexts/AuthenicateUser'

function AppLayout() {
    const [islogged, ShowLogging] = useState(false)

    return (
        <>
            <Navbar />
            <AuthenticateUserProvider value={{ islogged, ShowLogging }}>
                <Login />
                <Modal />
                <Outlet />
            </AuthenticateUserProvider>
            <Footer />
        </>
    )
}

export default AppLayout
