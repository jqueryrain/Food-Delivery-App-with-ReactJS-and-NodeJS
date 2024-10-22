import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Login from './components/login'
import Modal from './components/signupModal'
import { ToastContainer } from 'react-toastify';
import { AuthenticateUserProvider } from './contexts/AuthenicateUser'
import 'react-toastify/dist/ReactToastify.css'

function AppLayout() {
    const [showModal, setModal] = useState(true)
    return (
        <>
            <ToastContainer />
            <Navbar />
            <AuthenticateUserProvider value={{ showModal, setModal }}>
                <Login />
                <Modal />
                <Outlet />
            </AuthenticateUserProvider>
            <Footer />
        </>
    )
}

export default AppLayout