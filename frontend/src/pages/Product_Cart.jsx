import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Product_Cart() {
    const [Quantity,setQuantity] = useState(1)
    const [cartItems, setItems] = useState([])

    useEffect(() => {
        return async () => {
            const token = localStorage.getItem('authToken')
            const response = await axios.post('http://localhost:3000/api/get/cart/details', { token })
            if (response.data.length > 0) setItems(response.data[0])
        }
    }, [])
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-12">
                    <table className='table table-striped'>
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
                            {
                                cartItems?.product?.map((product, i) => (
                                    <tr className='table-list ' key={i}>
                                        <td>
                                            <img src={`http://localhost:3000/uploads/productImages/${product.product_image}`}
                                                style={{
                                                    width: '100px',
                                                    height: 'auto',
                                                }}
                                                alt="" />
                                        </td>
                                        <td>
                                            {product.product_name}
                                        </td>
                                        <td>
                                            ${product.product_price}
                                        </td>
                                        <td>
                                            <input type="text" value={Quantity} readOnly />
                                        </td>
                                        <td>
                                            ${product.product_price * Quantity}
                                        </td>
                                        <td></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Product_Cart
