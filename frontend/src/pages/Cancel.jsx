import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import config from '../config/config'
import { useNavigate, useLocation } from 'react-router-dom'

function Cancel() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const success = queryParams.get('success')
    const orderId = queryParams.get('orderId')

    useEffect(() => {
        return async () => {
            await axios.delete(`${config.Server_URL}/delete/order/${orderId}/${success}`)
        }
    }, [])
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12 py-5">
                    <div className='w-50 mx-auto'>
                        <h2 className='text-center mb-4'>Payment failed. Please try again.</h2>
                        <button type='button'
                            className='btn btn-dark my-3 mx-auto d-block'
                            onClick={() => navigate('/cart')}>
                            Home</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cancel
