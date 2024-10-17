import React, { useState } from 'react'
import { assets } from '../../assets/images/assets'

function AddFood() {

    const [showImg, setImage] = useState(`${assets.upload_img}`)
    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => setImage(reader.result)
            reader.readAsDataURL(file)
        }
    }
    const handleFormData = (e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
    }

    return (
        <div className='mx-5 my-5 w-25'>
            <form onSubmit={handleFormData}>
                <div className="form-group">
                    {/* upload Product Image */}
                    <div className='d-flex flex-column gap-2'>
                        <p>Upload Image</p>
                        <label htmlFor="upload_img" id='img-container'>
                            <img src={showImg} alt="" id='showImg' className='w-100 h-100' />
                        </label>
                        <input type="file"
                            name="prodduct_img"
                            id="upload_img"
                            onChange={handleImageUpload}
                            hidden required />
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
                    <div className="d-flex gap-3 justify-content-between">
                        <div className="form-group my-3">
                            <label htmlFor="product_category"
                                className="form-label">Category</label>
                            <select
                                className='form-select'
                                name='product_category'
                                id="product_category">
                                <option>Select Category</option>
                                <option value="noddles">Noddles</option>
                            </select>
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="product_price"
                                className="form-label">$price</label>
                            <input type="text"
                            name='product_price'
                                className='form-control'
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
