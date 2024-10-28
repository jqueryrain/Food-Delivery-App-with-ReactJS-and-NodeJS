import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Success() {
    const navigate = useNavigate()

    useEffect(() => {
        toast.success("You be redirecting in few seconds...")
        setTimeout(() => navigate('/'), 2500)
    }, [])

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12 py-5">
                    <div className='w-50 mx-auto'>
                        <h2 className='text-center'>Payment SuccessFull</h2>
                        <button type='button'
                            className='btn btn-dark my-3 mx-auto d-block'
                            onClick={() => navigate('/')}>
                            Continue Shopping</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Success
