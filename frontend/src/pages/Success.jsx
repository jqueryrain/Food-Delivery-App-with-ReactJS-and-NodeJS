import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Success() {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => { navigate('/') }, 3000)
    }, [])

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12 py-5">
                    <div className='w-50 mx-auto'>
                        <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster mx-auto mb-4">
                            <div className="wheel"></div>
                            <div className="hamster">
                                <div className="hamster__body">
                                    <div className="hamster__head">
                                        <div className="hamster__ear"></div>
                                        <div className="hamster__eye"></div>
                                        <div className="hamster__nose"></div>
                                    </div>
                                    <div className="hamster__limb hamster__limb--fr"></div>
                                    <div className="hamster__limb hamster__limb--fl"></div>
                                    <div className="hamster__limb hamster__limb--br"></div>
                                    <div className="hamster__limb hamster__limb--bl"></div>
                                    <div className="hamster__tail"></div>
                                </div>
                            </div>
                            <div className="spoke"></div>
                        </div>
                        <h2 className='text-center'>Payment SuccessFull</h2>
                        <h3 className='text-center'>You be redirecting in few seconds...</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Success
