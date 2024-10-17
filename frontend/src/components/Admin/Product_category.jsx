import React, { useState, useEffect, useCallback } from 'react'
import { assets } from '../../assets/images/assets'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import CategoryList from './CategoryList';



function Product_category() {
    const [showImg, setImage] = useState(`${assets.upload_img}`)
    const [data, setData] = useState([])
    const [state, setState] = useState(false)
    const [getData,setCategoryData]= useState({})

    console.log(getData)


    // Handle Preview Image
    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => setImage(reader.result)
            reader.readAsDataURL(file)
        }
    }

    // Handle submit Form Data
    const handelcategorySubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        formData.append('category_image', showImg)
        const response = await axios.post('http://localhost:3000/admin/api/product/category', formData)
        if (response.data.message == 'Successfully created!') {
            toast.success(response.data.message)
            setImage(`${assets.upload_img}`)
            e.target.reset()
            setState(true)
        }
    }
    const handlegetcategoryData = async (id) => {
        const response = await axios.get(`http://localhost:3000/admin/api/product/category/${id}`)
        // setCategoryData(response.data)
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3000/admin/api/get/product/category')
            setData(response.data)
            if (response.data.message == 'Not Found') setData([])
        }
        fetchData()
    }, [state])

    return (
        <>
            <div className="row m-5">
                <div className="col-md-6">
                    <form onSubmit={handelcategorySubmit}>
                        <div className="form-group">
                            <p className='mb-3'>Category Image</p>
                            <label htmlFor="category_img" id='img-container'>
                                <img src={showImg} alt="" id='showImg' className='w-100 h-100' />
                            </label>
                            <input type="file"
                                name="category_image"
                                id="category_img"
                                onChange={handleImageUpload}
                                hidden required />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="category"
                                className='form-label'>
                                Enter Product Category
                            </label>
                            <input type="text"
                                name='category_name'
                                className="form-control"
                                id='category' />
                            <button type='sumbit'
                                className='btn btn-dark mt-3 swalDefaultSuccess'
                            >Add Category</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* // Category List */}
            <div className="row">
                <div className="col-12">
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>s.no</th>
                                <th>Category Image</th>
                                <th>Category Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((data, i) => (
                                    <CategoryList
                                        key={i}
                                        index={i}
                                        state={setState}
                                        getData={setCategoryData}
                                        id={data._id}
                                        category_name={data.category_name}
                                        category_image={data.category_image} />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}


export default Product_category
