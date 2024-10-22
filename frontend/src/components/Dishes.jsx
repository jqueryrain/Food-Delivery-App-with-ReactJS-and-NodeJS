import React, { useEffect, useState } from 'react'
import { assets } from '../assets/images/assets'
import { useDishContext } from '../contexts/DishesContext'
import axios from 'axios'
import VerifyToken from '../Hooks/verifyToken'
import { useAuthenticateUserContext } from '../contexts/AuthenicateUser'

function Dishes() {
    const [quantity, setQuantity] = useState(1)
    const [items, setItems] = useState([])
    const { products } = useDishContext()
    const { setModal } = useAuthenticateUserContext()
    const token = localStorage.getItem('authToken')

    const addtoCart = async (id) => {
        const itemExists = items.some(item => item.product_id === id)
        if (!itemExists) {
            const newItem = { product_id: id }
            const updatedItems = [...items, newItem]
            setItems(updatedItems)
            await axios.put(`http://localhost:3000/api/update/product/cart`, {
                token, items: updatedItems
            })
        }
    }

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
                                        <div className="dish_img">
                                            <img
                                                src={`http://localhost:3000/uploads/productImages/${product.product_image}`}
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