import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './components/Admin/Header'
import Sidebar from './components/Admin/Sidebar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { ProductContextProvider } from './contexts/ProductContext';
import Modal from './components/Admin/Modal';
import AdminLogin from './pages/AdminLogin';
import VerifyAdmin from './Hooks/VerifyAdmin';


function AdminLayout() {
    const navigate = useNavigate()
    const [product, setproduct] = useState({})
    const [updateproductImg, setupdateproductImg] = useState('')
    const [LoginFrom, setLoginForm] = useState(false)
    const [isAuthenticated, setisAuthenticated] = useState(false)

    useEffect(() => {
        return async () => {
            const isAuthenticated = await VerifyAdmin()
            if (isAuthenticated) {
                setisAuthenticated(true)
            } else {
                setLoginForm(true)
                navigate('/admin/login')
            }
        }
    }, [])
    return (
        <>
            <ToastContainer />
            <Header />
            <div id='Admin-content' className="container-fluid">
                <div className="row h-100">
                    <div className="col-2 p-0">
                        <Sidebar />
                    </div>
                    <div className="col-md-10 h-100">
                        <ProductContextProvider value={{ product, setproduct, updateproductImg, setupdateproductImg, setisAuthenticated, LoginFrom, setLoginForm }}>
                            {isAuthenticated
                                ? <Outlet />
                                : <AdminLogin />}
                            <Modal />
                        </ProductContextProvider>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLayout
