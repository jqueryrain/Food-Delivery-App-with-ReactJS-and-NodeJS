import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Explore_menu() {
    const [menu_list, setMenu] = useState([])
    useEffect(() => {
        const fetchproCategories = async () => {
            const categories = await axios.get('http://localhost:3000/admin/api/get/product/category')
            setMenu(categories.data)
        }
        fetchproCategories()
    }, [])
    return (
        <div id='Explore_menu' className='container'>
            <div className="row">
                <div className="col-12">
                    <h2>Explore Our Menu</h2>
                    <p className='w-75'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dolore ea omnis enim a eius cum veritatis delectus facilis quos!</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className='d-flex gap-3 justify-content-between mt-4'>
                        {
                            menu_list.map((menu, i) => (
                                <div className='menu w-100 d-flex flex-column align-items-center' key={i}>
                                    <div className='menu_img mb-2'>
                                        <img
                                            src={`http://localhost:3000/uploads/product_category_images/${menu.category_image}`}
                                            alt="" loading='lazy' />
                                    </div>
                                    <p className='menu_name text-center'>
                                        {menu.category_name}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='divider'></div>
        </div>
    )
}

export default Explore_menu
