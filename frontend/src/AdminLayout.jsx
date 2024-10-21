import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Admin/Header'
import Sidebar from './components/Admin/Sidebar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { ProductContextProvider } from './contexts/ProductContext';
import Modal from './components/Admin/Modal';


function AdminLayout() {
    const [product, setproduct] = useState({})
    const [updateproductImg, setupdateproductImg] = useState('')

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
                        <ProductContextProvider value={{ product, setproduct, updateproductImg, setupdateproductImg }}>
                            <Outlet />
                            <Modal />
                        </ProductContextProvider>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLayout
