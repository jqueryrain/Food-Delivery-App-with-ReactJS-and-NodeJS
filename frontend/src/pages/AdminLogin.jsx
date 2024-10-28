import React, { useState } from 'react'
import Modal from 'react-modal'
import { useProductContext } from '../contexts/ProductContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../config/config'

function AdminLogin() {
    const navigate = useNavigate()
    const [FormData, SetFormData] = useState({})
    const { LoginFrom, setisAuthenticated, setLoginForm } = useProductContext()

    const handleLogin = async (e) => {
        e.preventDefault()
        const response = await axios.post(`${config.Server_admin_URL}/authenticate/admin`, { FormData })
        if (response && response.status == 200) {
            navigate('/admin')
            setisAuthenticated(true)
            setLoginForm(false)
            localStorage.setItem('token', response.data.token)
        }
    }
    return (
        <div className='position-relative'>
            <Modal className='position-absolute top-50 start-50 translate-middle'
                isOpen={LoginFrom}
            >
                <form className="form" onSubmit={handleLogin}>
                    <p className="form-title">Sign in to your account</p>
                    <div className="input-container">
                        <input placeholder="Enter email"
                            name='email'
                            onChange={(e) => SetFormData({ ...FormData, email: e.target.value })}
                            type="email" />
                        <span>
                            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                            </svg>
                        </span>
                    </div>
                    <div className="input-container">
                        <input placeholder="Enter password"
                            name='password'
                            onChange={(e) => SetFormData({ ...FormData, password: e.target.value })}
                            type="password" />
                        <span>
                            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                            </svg>
                        </span>
                    </div>
                    <button className="submit"
                        type="submit">
                        Sign in
                    </button>
                </form>
            </Modal >
        </div>

    )
}

export default AdminLogin
