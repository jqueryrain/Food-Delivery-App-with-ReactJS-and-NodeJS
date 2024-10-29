import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { assets } from '../../assets/images/assets'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as Yup from 'yup'
import config from '../../config/config'

function AddFood() {
    const [menu_list, setMenu] = useState([])
    const [showImg, setImage] = useState(`${assets.upload_img}`)

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => setImage(reader.result)
            reader.readAsDataURL(file)
        }
    }

    const validateProductSchema = Yup.object({
        product_name: Yup.string()
            .required('Enter Product Name'),
        product_price: Yup.string()
            .required('Enter Product Price'),
        product_description: Yup.string()
            .required('Enter Prouct Description'),
        product_image: Yup.string()
            .required('upload product image'),
        product_category_id: Yup.string()
            .required('select product category')
    })


    const handleFormData = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target)
            const dataObject = {}
            formData.forEach((value, key) => {
                dataObject[key] = value;
                if (typeof value == 'object') dataObject.product_image = value.name;
            })

            // Validate Form
            await validateProductSchema.validate(dataObject, { abortEarly: false })
            const response = await axios.post(`${config.Server_admin_URL}/product`, formData)
            if (response.data.message === 'Unsuccessful!') toast.error(response.data.message)
            toast.success(response.data.message)
            setImage(`${assets.upload_img}`)
            e.target.reset()
        } catch (error) {
            error.inner.forEach(err => toast.error(err.message))
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
        <div className='mx-5 my-5 w-25'>
            <form onSubmit={handleFormData} encType="multipart/form-data">

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
                                defaultValue={0}
                                id="product_category">
                                <option disabled value={0}>
                                    Select Category
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
                                min={0}
                                id="product_price"
                                placeholder='Enter Price' />
                        </div>
                    </div>

                    <button type='submit' className='btn btn-dark px-3'>
                        ADD
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddFood