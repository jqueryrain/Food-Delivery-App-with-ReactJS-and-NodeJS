import React, { useEffect, useState } from 'react'
import { assets } from '../assets/images/assets'
import { useDishContext } from '../contexts/DishesContext'
import axios from 'axios'
import VerifyToken from '../Hooks/verifyToken'
import { useAuthenticateUserContext } from '../contexts/AuthenicateUser'

function Dishes() {
    const [quantity, setQuantity] = useState(1)
    const { products } = useDishContext()
    const { ShowLogging } = useAuthenticateUserContext()

    const addtocart = async () => {
        const response = await axios.post('')
    }
    
    useEffect(() => {
        return async () => {
            const message = await VerifyToken()
            if (message === 'Not Found') ShowLogging(true)
        }
    }, [])

    useEffect(() => { if (quantity < 0) setQuantity(0) }, [quantity])
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>Top dishes near you</h2>
                </div>
                <div className="col-12">
                    <div className="row mt-3">
                        {
                            products.map((product, i) => (
                                <div className="col-md-3 dish" key={i}>
                                    <div className="dishes h-100">
                                        <div className="dish_img"
                                            onMouseLeave={(e) => { e.target.closest('.dish_img').classList.remove('active') }}>
                                            <img
                                                src={`http://localhost:3000/uploads/productImages/${product.product_image}`}
                                                alt="" />
                                            <div className='quntitybtn'>
                                                <div className='productCart'>
                                                    {/* Decrease Quantity */}
                                                    <button onClick={() =>
                                                        setQuantity((prev) => prev - 1)}>
                                                        <img src={assets.remove_icon_red} alt="" />
                                                    </button>

                                                    {/* Quantity */}
                                                    <input type="text"
                                                        value={quantity}
                                                        readOnly />

                                                    {/* Increase Quantity */}
                                                    <button type='button'
                                                        onClick={() =>
                                                            setQuantity((prev) => prev + 1)}>
                                                        <img src={assets.add_icon_green} alt="" />
                                                    </button>

                                                </div>
                                                <button type='button'
                                                    onClick={
                                                        (e) => {
                                                            e.target.closest('.dish_img').classList.add('active')
                                                            addtocart()
                                                        }
                                                    }>
                                                    <img src={assets.add_icon_white} alt="" className='add' />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='p-3'>
                                            <div className='d-flex 
                                                gap-2 flex-lg-row flex-column 
                                                justify-content-between
                                                align-items-center mb-3'>
                                                <h3 className='mb-0 text-center text-lg-start'>
                                                    {product.product_name}
                                                </h3>
                                                <img src={assets.rating_starts} alt="" />
                                            </div>
                                            <p className='desc'>
                                                {product.product_description}
                                            </p>
                                            <p className='price mb-0'>
                                                ${product.product_price}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dishes