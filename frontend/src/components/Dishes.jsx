import React from 'react'
import { assets } from '../assets/images/assets'

function Dishes() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>Top dishes near you</h2>
                </div>
                <div className="col-12">
                    <div className="row mt-3">
                        <div className="col-md-3">
                            <div className="dishes">
                                <div className="dish_img mb-3">
                                    <img src="/src/assets/images/food_11.png" alt="" />
                                    <img src={assets.add_icon_white} alt="" className='add' />
                                </div>
                                <div className='p-3'>
                                    <div className='d-flex justify-content-between align-items-center mb-3'>
                                        <h3 className='mb-0'>Greek Salad</h3>
                                        <img src={assets.rating_starts} alt="" />
                                    </div>
                                    <p className='desc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora, mollitia!</p>
                                    <p className='price'>$12</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dishes
