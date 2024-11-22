import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDishContext } from '../contexts/DishesContext'
import { assets } from '../assets/images/assets'
import config from '../config/config'

function Explore_menu() {
    const { setproducts, fetchProducts, setloading } = useDishContext()
    const [menu_list, setMenu] = useState([])

    const getProductbyCategory = async (id) => {
        setloading(true)
        setproducts([])
        const response = await axios.get(`${config.Server_URL}/get/products/by/category/${id}`)
        setproducts(response.data.categoryproducts)
        setloading(false)
    }

    useEffect(() => {
        const fetchproCategories = async () => {
            const categories = await axios.get(`${config.Server_URL}/get/product/category`)
            setMenu(categories.data)
        }
        fetchproCategories()
    }, [])
    return (
        <div id='Explore_menu' className='container mt-5'>
            <div className="row">
                <div className="col-12">
                    <h2>Explore Our Menu</h2>
                    <p className='w-75'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dolore ea omnis enim a eius cum veritatis delectus facilis quos!</p>
                </div>
            </div>
            <div className="row justify-content-between">
                <div className="col-md-1 col-6">
                    <div className='menu w-100'
                        onClick={() => { fetchProducts() }}>
                        <div className='menu_img mb-2 mx-auto'>
                            <img src={assets.menu_1} alt="" loading='lazy' />
                        </div>
                        <p className='menu_name text-center'> All</p>
                    </div>
                </div>
                {
                    menu_list.map((menu, i) => (
                        <div className="col-md-1 col-6">
                            <div className='menu w-100'
                                onClick={() => { getProductbyCategory(menu._id) }}
                                key={i}>
                                <div className='menu_img mb-2 mx-auto'>
                                    <img
                                        src={`${config.Server_category_image_URL}/${menu.category_image}`}
                                        alt="" loading='lazy' />
                                </div>
                                <p className='menu_name text-center'>
                                    {menu.category_name}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='divider'></div>
        </div>
    )
}

export default Explore_menu
