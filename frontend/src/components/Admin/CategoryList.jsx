import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function CategoryList(props) {
    const handledeletecategory = async (id) => {
        const response = await axios.delete(`http://localhost:3000/admin/api/product/category/${id}`)
        toast.success(response.data.message)
        props.state(false)
    }


    return (
        <tr className='table-list'>
            <td>{props.index + 1}</td>
            <td>
                <img
                    className='category-list-img'
                    src={`http://localhost:3000/uploads/product_category_images/${props.category_image}`}
                    alt="" loading='lazy' />
            </td>
            <td>
                {props.category_name}
            </td>
            <td>
                <div className="d-flex gap-2">
                    <button type='button'
                        className='btn  btn-primary'>
                        Edit
                    </button>
                    <button type='button'
                        onClick={() => handledeletecategory(`${props.id}`)}
                        className='btn  btn-danger'>
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default CategoryList
