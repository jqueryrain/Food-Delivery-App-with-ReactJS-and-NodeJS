import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
import config from '../config/config'
import { toast } from 'react-toastify'
import { assets } from '../assets/images/assets'
import { useAuthenticateUserContext } from '../contexts/AuthenicateUser';

export default function Product_Cart() {
    const InputRef = useRef([])
    const [cart, setCart] = useState([])
    const [Items, setItems] = useState(false)
    const [totalPrice, setTotalPrice] = useState([])
    const [updatecart, Setupdatecart] = useState([])
    const { showlogin } = useAuthenticateUserContext()

    const handleQuantityChange = (i, item) => {
        const price = item.product_price
        const Quantity = parseInt(InputRef.current[i].value)
        setTotalPrice((prev) => {
            const newTotalPrices = [...prev]
            newTotalPrices[i] = Quantity * price;
            return newTotalPrices
        })
    }
    const updateCart = () => {
    }


    const deleteCartItem = async (id) => {
        const token = localStorage.getItem('authToken')
        const response = await axios.put(`${config.Server_URL}/delete/product/cart/item/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.data) setItems(true)
    }
    useEffect(() => {
        return async () => {
            setItems(false)
            const token = localStorage.getItem('authToken')
            if (token) {
                const response = await axios.post(`${config.Server_URL}/get/product/cart`, { token })
                setCart(response.data[0])
            }
        }
    }, [Items, showlogin])
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.product?.map((item, i) => (
                                <tr key={i} className='table-list'>
                                    <td>
                                        <img src={`${config.Server_product_image_URL}/${item.product_image}`}
                                            alt="product"
                                            style={{
                                                width: '120px',
                                            }}
                                            className='img-fluid' />
                                    </td>
                                    <td>
                                        <p>{item.product_name}</p>
                                    </td>
                                    <td>
                                        <p>${item.product_price}</p>
                                    </td>
                                    <td className='w-15'>
                                        <div className='d-flex gap-3 justify-content-between'>
                                            <button type="button"
                                                onClick={() => {
                                                    const count = parseInt(InputRef.current[i].value) - 1
                                                    InputRef.current[i].value = count
                                                    if (count < 0) InputRef.current[i].value = 0
                                                    handleQuantityChange(i, item)
                                                }}>
                                                -
                                            </button>
                                            <input type="text"
                                                defaultValue={1}
                                                ref={(el) => InputRef.current[i] = el}
                                                className='form-control text-center w-50' />
                                            <button type="button"
                                                onClick={() => {
                                                    const count = parseInt(InputRef.current[i].value) + 1
                                                    InputRef.current[i].value = count
                                                    handleQuantityChange(i, item)
                                                }}>
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <p>
                                            ${totalPrice[i] ?? item.product_price * 1}
                                        </p>
                                    </td>
                                    <td>
                                        <button type="button"
                                            onClick={() => { deleteCartItem(item._id) }}
                                        >
                                            <img src={assets.cross_icon} alt="" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button type="button" className='btn btn-dark float-end mt-4'
                        onClick={() => { updateCart() }}>
                        update cart
                    </button>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-6 offset-md-6">
                    <div className='w-100 my-3'>
                        <h2>Cart Totals</h2>
                    </div>
                    <ul>
                        <li className='d-flex justify-content-between mb-2'>
                            <p>SubTotal :</p>
                            <p>$60</p>
                        </li>
                        <li className='d-flex justify-content-between mb-2'>
                            <p>Delivery :</p>
                            <p>$5</p>
                        </li>
                        <li className='d-flex justify-content-between mb-2'>
                            <p>Total :</p>
                            <p>$65</p>
                        </li>
                    </ul>
                    <button type="button"
                        className='btn btn-danger mt-3'>
                        Proceed To Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}