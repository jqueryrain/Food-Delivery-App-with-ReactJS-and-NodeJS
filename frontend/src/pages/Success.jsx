import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

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
                        <div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster mx-auto mb-4">
                            <div class="wheel"></div>
                            <div class="hamster">
                                <div class="hamster__body">
                                    <div class="hamster__head">
                                        <div class="hamster__ear"></div>
                                        <div class="hamster__eye"></div>
                                        <div class="hamster__nose"></div>
                                    </div>
                                    <div class="hamster__limb hamster__limb--fr"></div>
                                    <div class="hamster__limb hamster__limb--fl"></div>
                                    <div class="hamster__limb hamster__limb--br"></div>
                                    <div class="hamster__limb hamster__limb--bl"></div>
                                    <div class="hamster__tail"></div>
                                </div>
                            </div>
                            <div class="spoke"></div>
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
