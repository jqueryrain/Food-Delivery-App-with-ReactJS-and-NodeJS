import React from 'react'
import { assets } from '../assets/images/assets'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div id='footer' className='py-5'>
            <div className='container'>
                <div className="row">
                    <div className="col-md-4">
                        <img src={assets.logo} alt="" />
                        <p className='text-white my-3 desc'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam neque architecto quaerat. Recusandae beatae laboriosam inventore eos iste repellendus minus eius tenetur quae ad, in nihil fuga odio. Doloremque, quisquam?</p>
                        <ul className='d-flex gap-3'>
                            <li>
                                <img src={assets.facebook_icon} alt="" />
                            </li>
                            <li>
                                <img src={assets.linkedin_icon} alt="" />
                            </li>
                            <li>
                                <img src={assets.twitter_icon} alt="" />
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <div className='w-50 mx-auto'>
                            <h4 className='text-white'>Company</h4>
                            <ul className='d-flex flex-column gap-2 my-3'>
                                <li>
                                    <Link to="/" className='footer-links'>Home</Link>
                                </li>
                                <li>
                                    <Link to="/about" className='footer-links'>About Us</Link>
                                </li>
                                <li>
                                    <Link to="/contact" className='footer-links'>contact Us</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4">
                    <h4 className='text-white'>Get in Touch</h4>
                    <ul className='d-flex flex-column gap-2 my-3'>
                        <li className='footer-links'>+91 8472372321</li>
                        <li className='footer-links'>contact@gmail.com</li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
