import React, { useEffect, useState } from 'react'
import { useProductContext } from '../../contexts/ProductContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import config from '../../config/config'

function Modal() {
    const { product, updateproductImg } = useProductContext()
    const [menu_list, setMenu] = useState([])
    const [checkupdatedImg, setupdatedImg] = useState(false)
    const [showImg, setImage] = useState('')


    useEffect(() => {
        setImage(`${config.Server_product_image_URL}/${updateproductImg}`)
    }, [updateproductImg])

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setImage(reader.result)
                setupdatedImg(true)
            }
            reader.readAsDataURL(file)
        }
    }


    const handleUpdateProduct = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        if (checkupdatedImg == true) formData.append('product_image', showImg)
        const response = await axios.put(`${config.Server_admin_URL}/product/${product._id}`, formData)
        if (response.data.message == 'Successfully updated!') {
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }
    useEffect(() => {
        const fetchproCategories = async () => {
            const categories = await axios.get(`${config.Server_admin_URL}/get/product/category`)
            setMenu(categories.data)
        }
        fetchproCategories()
    }, [])
    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Product Details</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleUpdateProduct} encType="multipart/form-data">
                            <div className="form-group">
                                {/* upload Product Image */}
                                <div className='d-flex flex-column gap-2'>
                                    <p>Upload Image</p>
                                    <label htmlFor="upload_img" id='img-container'>
                                        <img src={showImg}
                                            alt="" id='showImg'
                                            className='w-100 h-100' />
                                    </label>
                                    <input type="file"
                                        name="product_image"
                                        id="upload_img"
                                        onChange={handleImageUpload}
                                        hidden />
                                </div>

                                {/* Product Image */}
                                <div className="form-group my-3">
                                    <label htmlFor="food_name"
                                        className="form-label">
                                        Product Name
                                    </label>
                                    <input type="text"
                                        name='product_name'
                                        className='form-control'
                                        id="food_name"
                                        defaultValue={product.product_name}
                                        placeholder='Enter Food Name' />
                                </div>

                                {/* Product Description */}
                                <div className="form-group">
                                    <label htmlFor="product_description"
                                        className="form-label">
                                        Product Description
                                    </label>
                                    <textarea
                                        name='product_description'
                                        placeholder='Enter Product Description'
                                        className='form-control'
                                        defaultValue={product.product_description}
                                        id="product_description">
                                    </textarea>
                                </div>

                                {/* product category And Price */}
                                <div className="d-flex flex-column gap-1 justify-content-between">
                                    <div className="form-group my-3">
                                        <label htmlFor="product_category"
                                            className="form-label">Category</label>
                                        <select
                                            className='form-select'
                                            name='product_category_id'
                                            defaultChecked={product.product_category?._id}
                                            id="product_category">
                                            <option
                                                value={product.product_category?._id} >
                                                {product.product_category?.category_name}
                                            </option>
                                            {
                                                menu_list.map((item, i) => (
                                                    <option key={i} value={item._id}>
                                                        {item.category_name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="product_price"
                                            className="form-label">$price</label>
                                        <input type='text'
                                            name='product_price'
                                            className='form-control mb-3'
                                            id="product_price"
                                            defaultValue={product.product_price}
                                            placeholder='Enter Price' />
                                    </div>
                                </div>
                                <div className='d-flex gap-3 float-end'>
                                    <button type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal">
                                        Close
                                    </button>
                                    <button type="submit"
                                        className="btn btn-primary">
                                        update
                                    </button>
                                </div>
                            </div>
                        </form>
                        {/* End of Form */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
