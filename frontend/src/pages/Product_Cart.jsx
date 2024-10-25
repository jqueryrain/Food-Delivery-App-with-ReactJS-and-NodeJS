import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/images/assets'

function Product_Cart() {

    return (
        <div className="container mt-3">
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Product_Cart
