import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import * as Yup from 'yup'
import Modal from 'react-modal'
import { useAuthenticateUserContext } from '../contexts/AuthenicateUser'
import { toast } from 'react-toastify'

Modal.setAppElement('#root')

function Login() {
    const [data, getData] = useState({})
    const [errors, setError] = useState({})
    const [message, setMessage] = useState('')
    const { showlogin, setloginModal, setsignupModal } = useAuthenticateUserContext()

    // To Form Validation Schema
    const userSchema = Yup.object({
        email: Yup.string().email().trim()
            .matches(/^[a-z0-9]+@gmail.com$/, 'Invalid email!'),
        password: Yup.string().trim()
            .min(6, 'password must be length of 6!')
            .matches(/[!@#$%^&*()_<>?{}|]/, 'password must be contains one sybmol!')
            .matches(/[a-z]/, 'password must be contains one lowercase letter!')
            .matches(/[A-Z]/, 'password must be contains one uppercase letter!')
            .matches(/[0-9]/, 'password must be contains one number!')
    })

    // Handle User Login
    const handleuserLogin = async (e) => {
        try {
            e.preventDefault()
            const response = await userSchema.validate(data, { abortEarly: false })

            if (response) {
                const apiResponse = await axios.post('http://localhost:3000/api/user/login', data)
                // Handle the API Response
                if (apiResponse.data.message === 'User Authenticated!') {
                    toast.success(apiResponse.data.message)
                    setError('')
                    setloginModal(false)
                    localStorage.setItem('authToken', apiResponse.data.token)
                } else if (apiResponse.data.message === 'Not Found') {
                    toast.error(apiResponse.data.message)
                }
                // setMessage(apiResponse.data.message)
            }
        } catch (error) {
            const Errors = {}
            error.inner.forEach(err => Errors[err.path] = err.message)
            setError(Errors)
        }
    }
    return (
        <>
            <div className='position-relative'>
                <Modal className='bg-light p-5 rounded w-50 mx-auto position-absolute top-50 start-50 translate-middle'
                    isOpen={showlogin}
                >
                    <div >
                        <button type="button"
                            className='btn btn-dark float-end'
                            onClick={() => setloginModal(false)}
                        >Close</button>
                        <div className='d-flex  justify-content-between'>
                            <h2 className='my-3'>Login</h2>
                        </div>
                        <form onSubmit={handleuserLogin}>
                            <input type="email"
                                placeholder='Your Email'
                                className='form-control my-3'
                                required
                                onChange={(e) => { getData({ ...data, email: e.target.value }) }} />
                            {errors.email && <div className="alert alert-danger mt-3 py-1" role="alert"> {errors.email} </div>}

                            <input type="password"
                                placeholder='Your password'
                                className='form-control'
                                required
                                onChange={(e) => { getData({ ...data, password: e.target.value }) }} />
                            {errors.password && <div className="alert alert-danger mt-3 py-1" role="alert"> {errors.password} </div>}
                            {message == 'User Not Authenticated!' ? <div className="alert alert-danger mt-3 mb-0 py-1" role="alert"> {message} </div> : ''}

                            <button type='submit' className="btn w-100 createUser text-center my-3">Login</button>
                        </form>
                    </div>
                    <div className='mt-3'>
                        <p>Have not account ?
                            <button type="button"
                                onClick={() => {
                                    setloginModal(false)
                                    setsignupModal(true)
                                }}
                                className="loginbtn ms-2">
                                Create Account here?
                            </button>
                        </p>
                    </div>
                </Modal>
            </div>
        </>
    )
}
export default Login
