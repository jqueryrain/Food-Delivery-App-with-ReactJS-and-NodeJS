import axios from 'axios'
import React, { useEffect, useState } from 'react'
import config from '../../config/config'
import { assets } from '../../assets/images/assets'
import { toast } from 'react-toastify'

function ViewOrders() {
    const [orders, setorders] = useState([])

    const updateOrderStatus = async (id, status) => {
        const response = await axios.put(`${config.Server_admin_URL}/update/order/status/${id}`, { status })
        if(response.data && response.status == 200) toast.success('Order status updated successfully')
    }
    useEffect(() => {
        return async () => {
            const response = await axios.get(`${config.Server_admin_URL}/view/orders`)
            setorders(response.data)
        }
    }, [])
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-12">
                    <h2 className='text-black mb-3'>Order Page</h2>
                    <ul>
                        {
                            orders?.map((order, i) => (
                                <li key={i}>
                                    <div className='row py-4 my-2 border'>
                                        <div className="col-md-1">
                                            <img src={assets.parcel_icon} alt="" />
                                        </div>
                                        <div className="col-md-4 ps-3">
                                            <ul className="d-flex gap-2 mb-3">
                                                {
                                                    order.product.map((product, i) => (
                                                        <li key={i}>
                                                            <p>{product.product_name} x {order.items[i].quantity}</p>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                            <div>
                                                <p>{order.customerDetails.name}</p>
                                                <p>{order.customerDetails.email}</p>
                                                <address className='my-2'>
                                                    {order.customerDetails.address},
                                                    {order.customerDetails.state},
                                                    {order.customerDetails.country}
                                                </address>
                                                <p>{order.customerDetails.phone}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <p>
                                                Items : {order.items.length}
                                            </p>
                                        </div>
                                        <div className="col-md-2">
                                            <p>${order.grandTotal}</p>
                                        </div>
                                        <div className="col-md-2">
                                            <select name="status"
                                                onChange={(e) => {
                                                    updateOrderStatus(order._id, e.target.value)
                                                }}
                                                className='form-select'>
                                                {
                                                    <option value={order.status} selected>
                                                        {order.status}
                                                    </option>
                                                }
                                                {
                                                    order.status !== "delivered"
                                                        ? <option value="delivered">Delivered</option>
                                                        : ''
                                                }
                                                {
                                                    order.status !== "Out of Delivery"
                                                        ? <option value="Out of Delivery">Out of Delivery</option>
                                                        : ''
                                                }
                                                {
                                                    order.status !== "processing"
                                                        ? <option value="processing">Processing</option>
                                                        : ''
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ViewOrders
