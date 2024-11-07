import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import config from '../../config/config'
import { useProductContext } from '../../contexts/ProductContext'

function ViewItems() {
    const [items, setItems] = useState([])
    const [message, setmessage] = useState('')
    const [usercart, setusercart] = useState([])
    const [loading, setloading] = useState(false)
    const { setproduct, setupdateproductImg } = useProductContext()


    const fetchProducts = async () => {
        setloading(true)
        const response = await axios.get(`${config.Server_admin_URL}/get/products`)
        if (response.data.message) toast.error(response.data.message)
        if (response.data.length > 0) setItems(response.data)
        setloading(false)
    }

    // To get Single Product data
    const getsingleproductData = async (id) => {
        const response = await axios.get(`${config.Server_admin_URL}/product/${id}`)
        setproduct(response.data[0])
        setupdateproductImg(response.data[0].product_image)
    }

    // To delete product
    const deleteProduct = async (id) => {
        const response = await axios.delete(`${config.Server_admin_URL}/product/${id}`)
        if (response.data.message == 'Successfully Deleted!') {
            toast.success(response.data.message)
            setmessage(response.data.message)
        } else {
            toast.error(response.data.message)
        }
        setTimeout(() => { setmessage('') }, 10)
    }

    const orderedProductIds = new Set()
    usercart.forEach(order => {
        order.items.forEach(item => orderedProductIds.add(item.product_id))
    })

    const orders = async () => {
        const response = await axios.get(`${config.Server_admin_URL}/view/orders`)
        setusercart(response.data)
    }
    useEffect(() => { fetchProducts() }, [message])
    useEffect(() => { orders() }, [])
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-12">
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>s.no</th>
                                <th>Product</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, i) => (

                                <tr key={i} className='table-list'>
                                    <td>{i + 1}</td>
                                    <td>{item.product_name}</td>
                                    <td>
                                        <img
                                            className='category-list-img w-50'
                                            src={`${config.Server_product_image_URL}/${item.product_image}`}
                                            alt="" loading='lazy' />
                                    </td>
                                    <td>
                                        {item.product_category.category_name}
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <button type='button'
                                                onClick={() => getsingleproductData(item._id)}
                                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                                className='btn  btn-primary'>
                                                Edit
                                            </button>
                                            {orderedProductIds.has(item._id)
                                                ? null
                                                : <button
                                                    type='button'
                                                    onClick={() => deleteProduct(item._id)}
                                                    className='btn btn-danger'>
                                                    Delete
                                                </button>}
                                        </div>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                    {loading ? <Loader /> : ''}
                </div>
            </div>
        </div>
    )
}

export default ViewItems
