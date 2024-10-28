import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate()
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12 py-5">
                    <div className='w-50 mx-auto'>
                        <h2 className='text-center display-1 text-bold'>404</h2>
                        <h4 className='text-center'>Page Not Found</h4>
                        <button type='button'
                            className='btn btn-dark my-3 mx-auto d-block'
                            onClick={() => navigate('/')}>
                            Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
