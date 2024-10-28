import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { assets } from '../assets/images/assets'
import { useAuthenticateUserContext } from '../contexts/AuthenicateUser'

const Navbar = () => {
    const { showlogin, setsignupModal,setloginModal } = useAuthenticateUserContext()
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
                            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                About
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
                <div className="col-md-4 d-none d-md-block">
                    <ul className='d-flex gap-4 float-end align-items-center'>
                        <li>
                            {showlogin ? '' : <Link to='/cart'>
                                <img src={assets.basket_icon} className='nav-icons' alt="" />
                            </Link>}
                        </li>
                        <li>
                            <button type='buton'
                                onClick={() => setsignupModal(true)}>
                                SignUp
                            </button>
                        </li>
                        <li>
                            {showlogin
                                ? (<button type='buton'
                                    onClick={() => setloginModal(true)}
                                    className='Btn'>
                                    <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                                    <div className="text">Login</div>
                                </button>)
                                : (<button className="Btn" type='button'
                                    onClick={() => {
                                        localStorage.removeItem('authToken')
                                        toast.success('Your Are Logout')
                                    }}>
                                    <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                                    <div className="text">Logout</div>
                                </button>
                                )}
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default Navbar
