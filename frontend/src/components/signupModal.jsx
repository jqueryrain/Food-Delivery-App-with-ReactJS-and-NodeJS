import React, { useState } from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import Modal from 'react-modal'
import { useAuthenticateUserContext } from '../contexts/AuthenicateUser'
import config from '../config/config'

function LoginModal() {
    const [data, getData] = useState({})
    const [Error, setError] = useState({})
    const [message, setMessage] = useState('')
    const { setloginModal, showsignup, setsignupModal } = useAuthenticateUserContext()

    // To Validate Schema For Form Data
    const userSchema = Yup.object({
        username: Yup.string().trim()
            .matches(/^[a-z]+$/, 'Invalid username'),
        email: Yup.string().trim()
            .email()
            .matches(/^[a-z0-9]+@gmail.com$/, 'Invalid Email!'),
        password: Yup.string().trim()
            .min(6, 'password must be length of 6!')
            .matches(/[!@#$%^&*()_<>?{}|]/, 'password must be contains one sybmol!')
            .matches(/[a-z]/, 'password must be contains one lowercase letter!')
            .matches(/[A-Z]/, 'password must be contains one uppercase letter!')
            .matches(/[0-9]/, 'password must be contains one number!')
    })

    // Handle User Register
    const handlecreateUser = async (e) => {
        e.preventDefault()
        try {
            const res = await userSchema.validate(data, { abortEarly: false })
            if (res) {
                const response = await axios.post(`${config.Server_URL}/create/user`, data)

                // Handle the API Response
                if (response.data.message == 'Successful!') {
                    setError('')
                    setsignupModal(false)
                    localStorage.setItem('authToken', Response.data.token)
                }
                setMessage(response.data.message)
            }
        } catch (error) {
            const errors = {}
            error.inner.forEach((err) => errors[err.path] = err.message)
            setError(errors)
        }
    }
    return (
        <>
            <div className='position-relative'>
                <Modal className='bg-light p-5 rounded w-50 mx-auto position-absolute top-50 start-50 translate-middle'
                    isOpen={showsignup}
                >
                    <div >
                        <button type="button"
                            className='btn btn-dark float-end'
                            onClick={() => setsignupModal(false)}
                        >Close</button>
                        <div className='d-flex  justify-content-between'>
                            <h2 className='my-3'>SignUp</h2>
                        </div>
                        <form onSubmit={handlecreateUser}>

                            <input type="text"
                                onChange={(e) => { getData({ ...data, username: e.target.value }) }}
                                placeholder='Your Name'
                                required
                                className='form-control' />
                            {Error.username && <div className="alert alert-danger mt-3 py-1" role="alert"> {Error.username} </div>}

                            <input type="text"
                                onChange={(e) => { getData({ ...data, email: e.target.value }) }}
                                placeholder='Your Email'
                                required
                                className='form-control my-3' />
                            {Error.email && <div className="alert alert-danger py-1" role="alert"> {Error.email} </div>}

                            <input type="password"
                                onChange={(e) => { getData({ ...data, password: e.target.value }) }}
                                placeholder='Your password'
                                required
                                className='form-control' />
                            {Error.password && <div className="alert alert-danger mt-3 py-1" role="alert"> {Error.password} </div>}
                            {message == 'Unsuccessful!' ? <div className="alert alert-danger mt-3 mb-0 py-1" role="alert"> {message} </div> : ''}

                            <button type="submit"
                                className="btn w-100 createUser text-center my-3">
                                Create Account
                            </button>
                        </form>
                    </div>
                    <div className='mt-3'>
                        <p>Already Have Account ?
                            <button type="button"
                                onClick={() => {
                                    setsignupModal(false)
                                    setloginModal(true)
                                }}
                                className="loginbtn ms-2">
                                Login here?</button>
                        </p>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default LoginModal
