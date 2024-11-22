import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import LoginModal from './components/login'
import Modal from './components/signupModal'
import { ToastContainer } from 'react-toastify';
import { AuthenticateUserProvider } from './contexts/AuthenicateUser'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import VerifyToken from './Hooks/verifyToken'

function AppLayout() {
    const [showlogin, setloginModal] = useState(false)
    const [showsignup, setsignupModal] = useState(false)
    useEffect(() => {
        return async () => {
            const token = await VerifyToken()
            if (token) {
                setloginModal(false)
            } else {
                setloginModal(true)
            }
        }
    }, [])
    return (
        <>
            <div className="container-fluid m-0 p-0">
                <div className="row">
                    <div className="col-12">
                        <ToastContainer />
                        <AuthenticateUserProvider value={{ showlogin, setloginModal, showsignup, setsignupModal }}>
                            <Navbar />
                            <LoginModal />
                            <Modal />
                            <Outlet />
                            <Footer />
                        </AuthenticateUserProvider>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AppLayout