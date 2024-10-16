import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import * as Yup from 'yup'

function Login() {
    const [data, getData] = useState({})
    const [errors, setError] = useState({})
    const [message, setMessage] = useState('')
    const [showModal, setModal] = useState(true)

    // To Form Validation Schema
    const userSchema = Yup.object({
        email: Yup.string().email()
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
                    setModal(false)
                    localStorage.setItem('authToken', apiResponse.data.token)
                    document.querySelector('.modal-backdrop').className = '';
                }
                setMessage(apiResponse.data.message)
            }
        } catch (error) {
            const Errors = {}
            error.inner.forEach(err => Errors[err.path] = err.message)
            setError(Errors)
        }
    }
    setTimeout(() => setModal(true), 800)

    return (
        <>
            {showModal && (<div className="modal fade" id="loginModal" tabIndex="1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="loginModal">Log In</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleuserLogin}>
                                <input type="text"
                                    placeholder='Your Email'
                                    className='form-control my-3'
                                    required
                                    onChange={(e) => { getData({ ...data, email: e.target.value }) }} />
                                {errors.email && <div className="alert alert-danger mt-3 py-1" role="alert"> {errors.email} </div>}

                                <input type="text"
                                    placeholder='Your password'
                                    className='form-control'
                                    required
                                    onChange={(e) => { getData({ ...data, password: e.target.value }) }} />
                                {errors.password && <div className="alert alert-danger mt-3 py-1" role="alert"> {errors.password} </div>}
                                {message == 'User Not Authenticated!' ? <div className="alert alert-danger mt-3 mb-0 py-1" role="alert"> {message} </div> : ''}

                                <button type='submit' className="btn w-100 createUser text-center my-3">Login</button>
                            </form>
                        </div>
                        <div className='px-4 pb-4'>
                            <p>Have not account ?
                                <button
                                    type="button"
                                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    className="loginbtn">
                                    Create Account here?</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>)
            }
        </>
    )
}

export default Login
