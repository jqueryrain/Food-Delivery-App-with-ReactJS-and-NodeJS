import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Admin/Header'
import Sidebar from './components/Admin/Sidebar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function AdminLayout() {
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
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLayout
