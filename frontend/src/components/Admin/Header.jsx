import React from 'react'
import { assets } from '../../assets/images/assets'

function Header() {
    return (
       <div className='bg-light bg-gradient border-bottom border-dark'>
         <div className="container-fluid py-3 ">
            <div className="row">
                <div className="col-md-6">
                    <img src={assets.logo} alt="" />
                    <h1 className='h6 mt-2 mb-0'>Admin Panel</h1>
                </div>
                <div className="col-md-6">
                    <img src={assets.profile_image} alt="" className='float-end' />
                </div>
            </div>
        </div>
       </div>
    )
}

export default Header
