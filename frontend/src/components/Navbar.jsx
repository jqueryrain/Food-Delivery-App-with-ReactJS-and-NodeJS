import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/images/assets'

const Navbar = () => {

    return (
        <div className='container'>
            <div className="row py-4">
                <div className="col-md-4 col-6">
                    <img src={assets.logo} alt="" />
                </div>
                <div className="col-6 d-block d-md-none">
                    <img src={assets.bars} alt="" className='menu float-end' />
                </div>
                <div className="col-md-4 d-none d-md-block align-content-center">
                    <ul className='d-flex justify-content-center gap-3'>
                        <li>
                            <NavLink to="/"
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/menu" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                Menu
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact"
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                Contact Us
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="col-md-4 d-none d-md-block align-content-center">
                    <ul className='d-flex gap-4 float-end'>
                        <li>
                            <img src={assets.search_icon} className='nav-icons' alt="" />
                        </li>
                        <li>
                            <img src={assets.basket_icon} className='nav-icons' alt="" />
                        </li>
                        <li>
                            <button type='buton'
                                data-bs-toggle="modal" data-bs-target="#exampleModal"
                                className='signupbtn'>
                                SignUp</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default Navbar
