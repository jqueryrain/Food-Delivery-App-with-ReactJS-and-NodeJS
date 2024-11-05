import React, { useState, useEffect, useCallback } from 'react'
import { assets } from '../../assets/images/assets'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import CategoryList from './CategoryList';
import { CategoryContextProvider } from '../../contexts/CategoryContext';
import config from '../../config/config';



function Product_category() {
    const [showImg, setImage] = useState(`${assets.upload_img}`)
    const [data, setData] = useState([])
    const [state, setState] = useState(false)
    const [checkupdatedImg, setupdatedImg] = useState(false)
    const [CategoryData, setCategoryData] = useState({
        category_name: '',
        category_image: ''
    })

    useEffect(() => {
        if (CategoryData.category_image != '') {
            setImage(`${config.Server_category_image_URL}/${CategoryData.category_image}`)
        }
    }, [CategoryData])


    // Handle Preview Image
    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => setImage(reader.result)
            reader.readAsDataURL(file)
            if (CategoryData.category_image != '') setupdatedImg(true)
        }
    }

    // Handle submit Form Data
    const handelcategorySubmit = useCallback(async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        formData.append('category_image', showImg)
        const response = await axios.post(`${config.Server_admin_URL}/product/category`, formData)
        if (response.data.message == 'Successfully created!') {
            toast.success(response.data.message)
            setImage(`${assets.upload_img}`)
            e.target.reset()
            setState(true)
        }
    }, [])

    // Handle the updation of product category
    const handleupdatecategory = async (e) => {
        e.preventDefault()

        const id = CategoryData._id;
        const formData = new FormData(e.target)
        if (checkupdatedImg == true) formData.append('category_image', showImg)
        formData.append('category_name', CategoryData.category_name)
        const response = await axios.put(`${config.Server_admin_URL}/product/category/${id}`, formData)
        if (response.data.message == 'update successful!') {
            setState(true)
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }
    const reset = () => {
        setCategoryData({ category_image: '', category_name: '' })
        setImage(`${assets.upload_img}`)
        setState(false)
    }

    setTimeout(() => { setState(false) }, 300)
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get(`${config.Server_admin_URL}/get/product/category`)
            setData(response.data)
            if (response.data.message) setData([])
        }
        fetchCategories()
    }, [state])

    return (
        <>
            <div className="row m-5">
                <div className="col-md-6">
                    <form onSubmit={CategoryData.category_image != '' ? handleupdatecategory : handelcategorySubmit} encType="multipart/form-data">
                        <div className="form-group">
                            <p className='mb-3 fw-bold'>Category Image</p>
                            <label htmlFor="category_img" id='img-container'>
                                <img
                                    src={showImg}
                                    alt=""
                                    id='showImg'
                                    loading='lazy'
                                    className='w-100 h-100' />
                            </label>
                            <input
                                type="file"
                                name="category_image"
                                id="category_img"
                                onChange={handleImageUpload}
                                hidden />
                        </div>
                        <div className="form-group mt-3">
                            <label
                                htmlFor="category"
                                className='form-label fw-bold'>
                                {CategoryData.category_image != '' ? 'update Product Category' : 'Enter Product Category'}
                            </label>
                            <input
                                type="text"
                                name='category_name'
                                value={CategoryData.category_name}
                                onChange={(e) => setCategoryData({...CategoryData, category_name: e.target.value.trim() })}
                                className="form-control"
                                id='category' />
                        </div>
                        <div className="d-flex gap-3">
                            <button
                                type='sumbit'
                                className='btn btn-dark mt-3 px-2'>
                                {CategoryData.category_image != '' ? 'update' : 'Add Category'}
                            </button>
                        </div>
                    </form>
                    <button
                        type='button'
                        onClick={() => reset()}
                        className='btn btn-dark mt-3 px-2'>
                        Reset
                    </button>
                </div>
            </div >
            <CategoryContextProvider value={{ data, setState, setCategoryData, setupdatedImg }} >
                <CategoryList />
            </CategoryContextProvider>
        </>
    )
}

export default Product_category