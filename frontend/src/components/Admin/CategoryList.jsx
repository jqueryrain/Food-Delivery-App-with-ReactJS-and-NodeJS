import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useCategoryContext} from '../../contexts/CategoryContext'

function CategoryList() {
    const { data, setState, setCategoryData,setupdatedImg } = useCategoryContext()

    const handledeletecategory = async (id) => {
        const response = await axios.delete(`http://localhost:3000/admin/api/product/category/${id}`)
        if (response.data.message == 'Successfully deleted!') {
            toast.success(response.data.message)
            setState(true)
        }
    }

    const handlegetUpdateData = async (id) => {
        const response = await axios.get(`http://localhost:3000/admin/api/product/category/${id}`)
        setCategoryData(response.data)
        setupdatedImg(false)
    }

    return (
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
                        {(data.map((category, i) => (
                            <tr key={i} className='table-list'>
                                <td>{i + 1}</td>
                                <td>
                                    <img
                                        className='category-list-img'
                                        src={`http://localhost:3000/uploads/product_category_images/${category.category_image}`}
                                        alt="" loading='lazy' />
                                </td>
                                <td>
                                    {category.category_name}
                                </td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button type='button'
                                            onClick={() => handlegetUpdateData(category._id)}
                                            className='btn  btn-primary'>
                                            Edit
                                        </button>
                                        <button type='button'
                                            onClick={() => handledeletecategory(category._id)}
                                            className='btn  btn-danger'>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CategoryList
