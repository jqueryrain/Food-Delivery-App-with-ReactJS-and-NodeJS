import React, { useState } from 'react'
import axios from 'axios'
import * as Yup from 'yup'

function Modal() {
    const [data, getData] = useState({})
    const [Error, setError] = useState({})
    const [message, setMessage] = useState('')
    const [showModal, setModal] = useState(true)

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
                const response = await axios.post('http://localhost:3000/api/create/user', data)

                // Handle the API Response
                if (response.data.message == 'Successful!') {
                    setModal(false)
                    document.querySelector('.modal-backdrop').className = '';
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
    setTimeout(() => setModal(true), 800)
    return (
        <>
            {
                showModal && (<div className="modal fade" id="exampleModal" tabIndex="1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Sign Up</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
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
                            <div className='px-4 pb-4'>
                                <p>Already have a account ?
                                    <button type="button"
                                        data-bs-toggle="modal" data-bs-target="#loginModal"
                                        className="loginbtn">
                                        login here?</button>
                                </p>
                            </div>
                        </div>
                    </div >
                </div >)
            }
        </>
    )
}

export default Modal
