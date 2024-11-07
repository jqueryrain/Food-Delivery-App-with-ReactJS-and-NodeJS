import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import config from '../config/config'
import { toast } from 'react-toastify'
import { assets } from '../assets/images/assets'
import { useAuthenticateUserContext } from '../contexts/AuthenicateUser';
import OrderForm from './OrderForm'
import Loader from '../components/Loader'

Modal.setAppElement('#root')

export default function Product_Cart() {
    const InputRef = useRef([])
    const [amount, setAmount] = useState(0)
    const [cart, setCart] = useState([])
    const [Items, setItems] = useState(false)
    const [totalPrice, setTotalPrice] = useState([])
    const [quantity, setquantity] = useState([])
    const [orderForm, setOrderForm] = useState(false)
    const [loading, setloading] = useState(false)

    console.log(cart);

    const handleQuantityChange = (i, item) => {
        setAmount(0)

        let price = item.product_price
        let Quantity = parseInt(InputRef.current[i].value)

        setquantity((prev) => {
            const newquantity = [...prev]
            newquantity[i] = Quantity
            return newquantity
        })

        setTotalPrice((prev) => {
            const newTotalPrices = [...prev]
            newTotalPrices[i] = Quantity * price;
            return newTotalPrices
        })
    }

    const handleupdateCart = async () => {
        const items = []
        let grandTotal = 0;

        const rows = document.querySelectorAll('.table-list')
        rows.forEach(row => {
            const id = row.dataset.id;
            const quantity = parseInt(row.dataset.quantity || 1);
            const total = parseInt(row.dataset.total)
            grandTotal += total;
            items.push({ id, quantity, total })
        })

        setAmount(grandTotal)
        const token = localStorage.getItem('authToken')
        if (token) {
            const response = await axios.put(`${config.Server_URL}/update/product/cart/items`, { items, grandTotal }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response && response.status === 200) toast.success('updated')
        }
    }

    const deleteCartItem = async (id) => {
        const token = localStorage.getItem('authToken')
        if (token) {
            const response = await axios.put(`${config.Server_URL}/delete/product/cart/item/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.data) setItems(true)
        }
    }

    const closeForm = () => { setOrderForm(false) }
    const productCartDetails = async () => {
        setloading(true)
        setItems(false)
        const token = localStorage.getItem('authToken')
        if (token) {
            const response = await axios.post(`${config.Server_URL}/get/product/cart`, { token })
            console.log(response.data[0]);
            setCart(response.data[0])
        }
        setloading(false)
    }

    useEffect(() => { productCartDetails() }, [Items])
    return (
        <div className="container mt-4">
            <div className='position-relative'>
                <Modal className='bg-light p-5 rounded w-50 mx-auto position-absolute top-50 start-50 translate-middle'
                    isOpen={orderForm}>
                    <OrderForm FormChange={closeForm} />
                </Modal>
            </div>
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
                            {loading
                                ? <Loader />
                                : cart?.product?.map((item, i) => (
                                    <tr key={i} className='table-list'
                                        data-quantity={quantity[i]}
                                        data-id={item._id}
                                        data-total={totalPrice[i] ?? item.product_price * 1}>
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
                                            <div className='d-flex justify-content-around'>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const count = parseInt(InputRef.current[i].value) - 1
                                                        InputRef.current[i].value = count
                                                        if (count < 0) InputRef.current[i].value = 0
                                                        handleQuantityChange(i, item)
                                                    }}>
                                                    -
                                                </button>
                                                <input
                                                    type="text"
                                                    defaultValue={1}
                                                    readOnly
                                                    ref={(el) => InputRef.current[i] = el}
                                                    className='form-control text-center w-50' />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const count = parseInt(InputRef.current[i].value) + 1
                                                        InputRef.current[i].value = count
                                                        handleQuantityChange(i, item)
                                                    }}>
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td >
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
                        onClick={() => { handleupdateCart() }}>
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
                            <p>${amount}</p>
                        </li>
                        <li className='d-flex justify-content-between mb-2'>
                            <p>Total :</p>
                            <p>${amount}</p>
                        </li>
                    </ul>
                    {
                        amount > 0 && (
                            <button type="button"
                                onClick={() => setOrderForm(true)}
                                className='btn btn-danger mt-3'>
                                Proceed To Checkout
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}