import React, { useState } from 'react'
import config from '../config/config'
import axios from 'axios'

function OrderFrom({ FormChange }) {
    const [FormData, setFormData] = useState({})

    const makepayment = async () => {
        try {
            const token = localStorage.getItem('authToken')
            if (token) {
                const response = await axios.post(`${config.Server_URL}/payment`, { token, FormData })
                if (response && response.status == 200) {
                    window.location.href = response.data.url
                }
            }
        } catch (error) {
            console.log('makepayment : ' + error.message)
        }
    }
    return (
        <div>
            <div className='d-flex justify-content-between'>
                <h2>Order Form</h2>
                <button type="button"
                className='btn btn-dark'
                    onClick={FormChange}>Close</button>
            </div>
            <form>
                <div className="form-group my-2">
                    <label htmlFor="name" className='my-2'>Full Name</label>
                    <input type="text"
                        onChange={(e) => setFormData({ ...FormData, name: e.target.value.trim() })}
                        className="form-control"
                        id="name" />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="exampleInputEmail1" className='my-2'>Email address</label>
                    <input type="email"
                        onChange={(e) => setFormData({ ...FormData, email: e.target.value.trim() })}
                        className="form-control"
                        id="exampleInputEmail1" />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="Phone" className='my-2'>Phone No</label>
                    <input type="text"
                        onChange={(e) => setFormData({ ...FormData, phone: e.target.value.trim() })}
                        className="form-control" id="Phone" />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="state" className='my-2'>State</label>
                    <input type="text"
                        onChange={(e) => setFormData({ ...FormData, state: e.target.value.trim() })}
                        className="form-control" id="state" />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="country" className='my-2'>Country</label>
                    <input type="text"
                        onChange={(e) => setFormData({ ...FormData, country: e.target.value.trim() })}
                        className="form-control" id="country" />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="zipcode" className='my-2'>Zipcode</label>
                    <input type="text"
                        onChange={(e) => setFormData({ ...FormData, zipcode: e.target.value.trim() })}
                        className="form-control" id="zipcode" />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="address" className='my-2'>Address</label>
                    <textarea type="text"
                        onChange={(e) => setFormData({ ...FormData, address: e.target.value.trim() })}
                        className="form-control" id="address" >
                    </textarea>
                </div>
                <button type="button"
                    onClick={() => makepayment()}
                    className='btn btn-dark my-3'>
                    Proceed
                </button>
            </form>
        </div>
    )
}

export default OrderFrom
