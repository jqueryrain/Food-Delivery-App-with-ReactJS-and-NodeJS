import React, { useState } from 'react'
import { assets } from '../assets/images/assets'
import { useDishContext } from '../contexts/DishesContext'
import axios from 'axios'
import VerifyToken from '../Hooks/verifyToken'
import { useAuthenticateUserContext } from '../contexts/AuthenicateUser'
import config from '../config/config'
import Loader from './Loader'

function Dishes() {
    const [items, setItems] = useState([])
    const { products, loading } = useDishContext()
    const { setloginModal } = useAuthenticateUserContext()

    const addtoCart = async (id) => {
        const user = await VerifyToken()
        if (!user) setloginModal(true)

        const itemExists = items.every(item => item.product_id !== id)
        const Item = { product_id: id }
        setItems([...items, Item])
        if (itemExists) {
            const token = localStorage.getItem('authToken')
            await axios.post(`${config.Server_URL}/product/cart`, {
                token, Item
            })
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>Top dishes near you</h2>
                </div>
                <div className="col-12">
                    <div className="row row-gap-5 mt-3">
                        {loading
                            ? <Loader />
                            : products?.map((product, i) => (
                                <div className="col-md-3 dish" key={i}>
                                    <div className="dishes h-100">
                                        <div className="dish_img">
                                            <img
                                                src={`${config.Server_product_image_URL}/${product.product_image}`}
                                                alt="" />
                                            <div className='quntitybtn'>
                                                <button type='button'
                                                    onClick={() => addtoCart(product._id)}>
                                                    <img src={assets.add_icon_white} alt="" className='add' />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='p-3'>
                                            <div className='d-flex gap-2 flex-lg-row flex-column justify-content-between align-items-center mb-3'>
                                                <h3 className='mb-0 text-center text-lg-start'>
                                                    {product.product_name}
                                                </h3>
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
        </div >
    )
}
export default Dishes